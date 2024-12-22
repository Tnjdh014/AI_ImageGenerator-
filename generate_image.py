import modal
from diffusers import DiffusionPipeline
import torch

# Define the required dependencies for the Modal app
image = modal.Image.from_dockerfile("./Dockerfile")  # Use the local Dockerfile

app = modal.App("stable-diffusion-xl-example", image=image)

@app.function(timeout=3600)
def generate_image(prompt: str):
    print("This code is running on a remote worker!")

    # Load the base model
    base = DiffusionPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float32, use_safetensors=True
    )
    base.to("cpu")

    # Load the refiner model
    refiner = DiffusionPipeline.from_pretrained(
        "stabilityai/stable-diffusion-xl-refiner-1.0",
        text_encoder_2=base.text_encoder_2,
        vae=base.vae,
        torch_dtype=torch.float32,
        use_safetensors=True,
    )
    refiner.to("cpu")

    # Run base model
    n_steps = 40
    image = base(
        prompt=prompt,
        num_inference_steps=n_steps,
        output_type="latent",
    ).images

    # Run refiner model
    image = refiner(
        prompt=prompt,
        num_inference_steps=n_steps,
        image=image,
    ).images[0]

    # Save and return image
    image.save("generated_image.png")
    return "Image generation complete!"

@app.local_entrypoint()
def main():
    print("Starting the image generation process...")
    prompt = "A majestic lion jumping from a big stone at night"
    result = generate_image.remote(prompt)
    print(result)
