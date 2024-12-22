
---

# Pentagram: Instagram, but with AI Images

## About 

This project is a web application that allows users to log in, generate images based on text prompts, and interact with the generated images through likes, comments, and deletion. It also includes functionality for storing user data and images in local storage, handling errors, and logging user activities for image generation requests.

## Getting Started

First, clone the GitHub repository:

```bash
git clone https://github.com/team-headstart/pentagram.git
```

Then, navigate to the project directory:

```bash
cd pentagram
```

Then, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **AI Image Generation**: Users can input text prompts, and the app generates unique AI-powered images based on those prompts, allowing for creative expression through artificial intelligence.

- **Instant Image Previews**: As soon as an image is generated, it's displayed on the page in real-time, providing a seamless user experience.

- **Interactive Likes & Comments**: Users can engage with generated images by liking them or posting comments, creating a social aspect within the app. Likes are stored locally, allowing users to revisit their favorite images.

- **Shareable Images**: Every generated image can be shared with others by simply copying the image to the clipboard. No need to download anything—just a click to share!

- **Image History**: The app stores previously generated images locally in the browser, making it easy to revisit and interact with them. Users can view their generated image history anytime during their session.

- **Image Removal**: Users can remove individual images or clear all generated images with a single click. This makes it easy to refresh the content and try new prompts.

- **Fully Responsive Design**: The interface is optimized for both mobile and desktop devices, ensuring a consistent and smooth experience across different screen sizes.

- **Customizable API Integration**: The app is designed with flexibility in mind, allowing developers to easily replace the AI image generation API with their own. Whether you’re using OpenAI, Stable Diffusion, or any other AI model, the app can be easily adapted to suit your needs.

- **Advanced Image Controls**: Users can fine-tune the image generation process by adjusting parameters like image size, style, and complexity (if the API supports such features). This gives more control over the generated content.


Usage
Login: Click "Login" to enter your username.
Generate Image: Type a description in the input field and click "Generate" to create an image.
Like: Click the thumbs up to like an image.
Comment: Add a comment below each image.
Remove Image: Click the trash icon to remove an image.
Remove All Images: Click "Remove All Images" at the bottom to clear all images.
Prompt History: View previously used prompts. Remove them individually or clear the entire history.

## Configuration

If you wish to modify the AI image generation API, check out the `src/app/api/generate-image/route.ts` file. Make sure the API is properly set up and integrated with your image generation service.

### Setting Up the Image Generation API

The image generation feature relies on a backend service to generate the images from the user's prompt. If you're running your own image generation service, be sure to adjust the following in `route.ts`:

- The API URL for your image generation service.
- Authentication headers, if required.
- Any additional query parameters that might be needed for the API request.

## Local Storage & Authentication

- **Local Storage**: The app uses the browser’s local storage to save images generated during the session. This ensures users can see their previously generated images even after refreshing the page.
  
- **Authentication**: The app currently does not have authentication built-in, but you can integrate any authentication method (such as Firebase, Auth0, etc.) to secure the app for personalized image generation.

## UI/UX Considerations

- The user interface features a clean, responsive layout that adapts to different screen sizes, ensuring a smooth experience on both mobile and desktop devices.
  
- **Forms & Buttons**: The app uses forms for submitting prompts, liking images, posting comments, and removing images. Buttons are clearly labeled and provide visual feedback on hover.
  
- **Error Handling**: Error messages are displayed clearly when there’s an issue with the image generation process or if an image cannot be loaded.

## Contributing

If you want to contribute to the project, follow these steps:

1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch for your feature or bugfix.
4. Make your changes and commit them.
5. Push your changes to your forked repository.
6. Submit a pull request to the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

For AI image generation and other advanced features, check out these resources:

- [OpenAI API](https://beta.openai.com/docs/) - if using OpenAI's models.
- [Stable Diffusion](https://stablediffusionweb.com/) - an alternative image generation model.

---


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
