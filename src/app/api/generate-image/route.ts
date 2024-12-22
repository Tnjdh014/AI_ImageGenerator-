import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

// Helper function to log user activities
const logUserActivity = (username: string, prompt: string, success: boolean, errorMsg: string | null = null) => {
  const logPath = path.join(process.cwd(), 'logs', `${username}_activity.log`);
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - Prompt: ${prompt} - Success: ${success} - Error: ${errorMsg || 'N/A'}\n`;

  // Ensure the logs directory exists
  if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
  }

  fs.appendFileSync(logPath, logMessage);
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, username } = body; // Assuming 'username' is passed in the body

    if (!text || text.trim().length === 0) {
      logUserActivity(username, text, false, "Prompt text is required");
      return NextResponse.json(
        { success: false, error: "Prompt text is required" },
        { status: 400 }
      );
    }

    const huggingFaceAPIUrl =
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

    const response = await fetch(huggingFaceAPIUrl, {
      method: "POST",
      headers: {
        Authorization: "Bearer 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", // Replace with your Hugging Face API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      logUserActivity(username, text, false, `Image generation failed with status ${response.status}: ${errorDetails}`);
      throw new Error(`Image generation failed: ${errorDetails}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    logUserActivity(username, text, true);

    return NextResponse.json({
      success: true,
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (error: any) {
    console.error("Error during image generation:", error.message || error);

    logUserActivity("Unknown", "", false, error.message || error);

    return NextResponse.json(
      { success: false, error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
