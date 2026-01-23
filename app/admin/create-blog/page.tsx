"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { blogService } from "@/lib/blogService";

// Dynamic import to avoid SSR issues
const RichTextEditor = dynamic(
  () => import("@/app/admin/create-blog/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 bg-white/5 border border-white/10 rounded-sm animate-pulse flex items-center justify-center">
        <span className="text-white/40 text-sm">Loading editor...</span>
      </div>
    ),
  }
);

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export default function CreateBlogPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Handle authentication
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      setAuthError("Invalid password");
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    setFormData((prev) => ({
      ...prev,
      slug,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (
      !formData.title ||
      !formData.slug ||
      !formData.content ||
      !formData.imageUrl
    ) {
      setSubmitMessage({
        type: "error",
        text: "All fields are required",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await blogService.createBlog({
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        imageUrl: formData.imageUrl,
      });

      setSubmitMessage({
        type: "success",
        text: "Blog post created successfully!",
      });

      // Reset form
      setFormData({
        title: "",
        slug: "",
        content: "",
        imageUrl: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = `/blog/${formData.slug}`;
      }, 2000);
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Failed to create blog post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not authenticated, show password form
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="px-6 md:px-12 max-w-2xl mx-auto">
          <div className="border border-white/5 rounded-sm p-8 bg-white/2">
            <h1 className="text-4xl font-bold font-display mb-8">
              Admin Access
            </h1>

            <form onSubmit={handleAuthenticate} className="space-y-6">
              <div>
                <label className="block text-sm font-light text-white/60 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                />
                {authError && (
                  <p className="text-red-500/70 text-sm mt-2">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-sm hover:bg-white/90 transition-colors"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5">
              <Link
                href="/"
                className="text-[11px] font-bold tracking-[0.3em] text-white/40 hover:text-white transition-colors uppercase"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Authenticated - show form
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-white/60 hover:text-white transition-colors uppercase"
          >
            <span>←</span> Back to home
          </Link>
        </div>

        <div className="border border-white/5 rounded-sm p-8 bg-white/2">
          <h1 className="text-4xl font-bold font-display mb-2">
            Create New Blog Post
          </h1>
          <p className="text-white/40 text-sm mb-8">
            Fill in the details below to create a new blog post
          </p>

          {submitMessage && (
            <div
              className={`mb-6 p-4 rounded-sm ${
                submitMessage.type === "success"
                  ? "bg-green-500/10 border border-green-500/30 text-green-500"
                  : "bg-red-500/10 border border-red-500/30 text-red-500"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-light text-white/60 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Slug with auto-generate button */}
            <div>
              <label className="block text-sm font-light text-white/60 mb-2">
                URL Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-slug-here"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-sm text-white/60 hover:text-white hover:bg-white/15 transition-colors text-sm font-light"
                >
                  Auto-Generate
                </button>
              </div>
              <p className="text-[10px] text-white/30 mt-1">
                Example: my-first-blog-post
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-light text-white/60 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            {/* Content - Rich Text Editor */}
            <div>
              <label className="block text-sm font-light text-white/60 mb-2">
                Blog Content *
              </label>
              <RichTextEditor
                value={formData.content}
                onChange={(value: string) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: value,
                  }))
                }
              />
              <p className="text-[10px] text-white/30 mt-2">
                Use the toolbar above for rich text formatting
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-white text-black font-bold rounded-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Blog Post"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: "",
                    slug: "",
                    content: "",
                    imageUrl: "",
                  });
                  setSubmitMessage(null);
                }}
                className="px-6 py-3 border border-white/20 text-white rounded-sm hover:bg-white/5 transition-colors font-light"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Preview Section */}
          {formData.title && (
            <div className="mt-12 pt-12 border-t border-white/10">
              <h3 className="text-lg font-display font-bold mb-4">Preview</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-white/40">URL:</span>{" "}
                  <span className="text-white/60">
                    /blog/{formData.slug || "url-slug"}
                  </span>
                </p>
                <p>
                  <span className="text-white/40">Title:</span>{" "}
                  <span className="text-white/60">{formData.title}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
