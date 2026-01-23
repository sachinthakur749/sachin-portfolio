"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types";
import { blogService } from "@/lib/blogService";

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const fetchedPosts = await blogService.getAllPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Extract excerpt from content
  const getExcerpt = (content: string, length: number = 150) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  console.log(posts);

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-20 reveal">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">
            <span>Articles</span>
            <span className="w-12 h-px bg-white/10"></span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black font-display tracking-tighter leading-tight">
            Articles <span className="text-white/10">&</span> <br />
            Insights
          </h1>

          <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-8">
            Thoughts on frontend development, web performance, and building
            scalable applications. Deep dives into technologies and patterns
            that shape modern web development.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-white/50 font-light">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500/70 font-light">{error}</p>
          </div>
        ) : (
          <div className="space-y-1 border-t border-white/5">
            {posts.map((post, index) => (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <article
                  className="group border-b border-white/5 py-12 md:py-16 reveal hover:bg-white/2 transition-colors duration-300 px-0 md:px-6 mx-0 md:mx-0 cursor-pointer"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-6 text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">
                        <span>Nº {String(index + 1).padStart(2, "0")}</span>
                        <span className="w-8 h-px bg-white/10"></span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tighter mb-4 group-hover:italic transition-all duration-500 leading-tight">
                        {post.title}
                      </h2>

                      <p className="text-gray-500 font-light text-base mb-6 leading-relaxed max-w-2xl">
                        {getExcerpt(post.content)}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-[11px] font-mono text-white/40 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-6">
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Arrow */}
                    <div className="hidden md:flex items-center justify-end">
                      <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && !error && posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/50 font-light">No articles found.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default BlogPage;
