# Use Python 3.9 slim as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install the required dependencies
RUN pip install --no-cache-dir diffusers torch transformers

# Copy the current directory contents into the container
COPY . /app

# Set the default command to run your script
CMD ["python", "generate_image.py"]
