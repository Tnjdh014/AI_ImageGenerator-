"use client";

import { useState, useEffect } from "react";

interface GeneratedImage {
  url: string;
  likes: number;
  comments: string[];
}

interface User {
  username: string;
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  // Load user and images from local storage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedImages = localStorage.getItem("images");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  // Save images and user to local storage whenever changes occur
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem("images", JSON.stringify(images));
    }
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [images, user]);

  // Handle user login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = prompt("Enter your username");
    if (username) {
      setUser({ username });
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Handle image generation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.image) {
        setImages((prev) => [
          ...prev,
          { url: data.image, likes: 0, comments: [] },
        ]);
        setPromptHistory((prev) => [inputText, ...prev]);
        setInputText("");
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle like functionality
  const handleLike = (index: number) => {
    setImages((prev) =>
      prev.map((image, i) =>
        i === index ? { ...image, likes: image.likes + 1 } : image
      )
    );
  };

  // Handle comment functionality
  const handleComment = (index: number, comment: string) => {
    setImages((prev) =>
      prev.map((image, i) =>
        i === index
          ? { ...image, comments: [...image.comments, comment] }
          : image
      )
    );
  };

  // Handle remove single image
  const handleRemoveImage = (index: number) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle remove all images
  const handleRemoveAllImages = () => {
    if (window.confirm("Are you sure you want to remove all images?")) {
      setImages([]);
    }
  };

  // Handle remove single prompt from history
  const handleRemovePrompt = (index: number) => {
    if (window.confirm("Are you sure you want to remove this prompt?")) {
      setPromptHistory((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Handle remove all prompts from history
  const handleRemoveAllPrompts = () => {
    if (window.confirm("Are you sure you want to remove all prompts?")) {
      setPromptHistory([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">AI Image Generator</h1>
        <p className="text-gray-500">Generate, like, comment, and share!</p>
      </header>

      {/* Login or Logout */}
      <div className="text-center mb-4">
        {user ? (
          <div>
            <p>Welcome, {user.username}!</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex justify-center gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          </form>
        )}
      </div>

      <main className="flex-1 flex flex-col items-center gap-6">
        {/* Display prompt history */}
        <div className="w-full">
          <h2 className="text-xl font-semibold">Prompt History</h2>
          <button
            onClick={handleRemoveAllPrompts}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove All Prompts
          </button>
          <ul className="space-y-2">
            {promptHistory.map((prompt, index) => (
              <li key={index} className="text-sm text-gray-600">
                {prompt}
                <button
                  onClick={() => handleRemovePrompt(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Display generated images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
              <img src={image.url} alt="Generated" className="rounded-md mb-4" />
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => handleLike(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  👍 {image.likes}
                </button>
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️ Remove
                </button>
              </div>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const comment = formData.get("comment") as string;
                    if (comment) handleComment(index, comment);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    placeholder="Add a comment..."
                    className="flex-1 p-2 rounded border border-gray-300 text-black"
                    type="text"
                    name="comment"
                  />
                  <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Post
                  </button>
                </form>
                <div className="mt-2">
                  {image.comments.map((comment, i) => (
                    <p key={i} className="text-sm text-gray-600 border-t pt-2 mt-2">
                      {comment}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </main>

      <footer className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Describe the image you want to generate..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>

        {/* Remove all images button */}
        <button
          onClick={handleRemoveAllImages}
          className="mt-6 w-full px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Remove All Images
        </button>
      </footer>
    </div>
  );
}
