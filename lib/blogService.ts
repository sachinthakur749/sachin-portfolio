import { BlogPost } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const blogService = {
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
      }

      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      });

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch blog post: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw error;
    }
  },

  async getRelatedPosts(slug: string, limit: number = 3): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/blog/${slug}/related?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 60 },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch related posts: ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching related posts:", error);
      return [];
    }
  },

  async createBlog(
    blogData: Omit<BlogPost, "_id" | "createdAt" | "updatedAt" | "__v">
  ): Promise<BlogPost> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create blog post: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  },
};
