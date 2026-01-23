"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types";
import { blogService } from "@/lib/blogService";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const initializePost = async () => {
      try {
        const resolvedParams = await params;

        const fetchedPost = await blogService.getPostBySlug(
          resolvedParams.slug,
        );

        if (!fetchedPost) {
          setError("Article not found");
          setIsLoading(false);
          return;
        }

        setPost(fetchedPost);

        // Fetch related posts
        const related = await blogService.getRelatedPosts(
          resolvedParams.slug,
          3,
        );
        setRelatedPosts(related);

        setError(null);
      } catch (err) {
        setError("Failed to load article. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initializePost();
  }, [params]);

  console.log(post);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="text-center py-40">
          <p className="text-white/50 font-light">Loading article...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-black text-white pt-32 pb-20">
        <div className="text-center py-40">
          <p className="text-red-500/70 font-light">
            {error || "Article not found"}
          </p>
          <Link
            href="/blog"
            className="inline-block mt-8 text-[11px] font-bold tracking-[0.3em] text-white/60 hover:text-white transition-colors uppercase"
          >
            ← Back to articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      {/* Back Button */}
      <div className="px-6 md:px-12 max-w-4xl mx-auto mb-12 reveal">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-300 uppercase"
        >
          <span>←</span> Back to articles
        </Link>
      </div>

      {/* Article Header */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-16 reveal">
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tighter leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-[11px] font-mono text-white/50 uppercase tracking-[0.3em] pt-6 border-t border-white/5">
            <div>
              <p className="text-white/40 mb-1">Published</p>
              <p className="text-white">{formatDate(post.createdAt)}</p>
            </div>
            <span className="hidden sm:block w-px h-10 bg-white/10"></span>
            <div>
              <p className="text-white/40 mb-1">Last Updated</p>
              <p className="text-white">{formatDate(post.updatedAt)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-16 reveal">
        <div className="w-full h-96 md:h-125 overflow-hidden border border-white/5 rounded-sm">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-500"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="px-6 md:px-12 max-w-4xl mx-auto reveal">
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-400 font-light">
          {post.content.split("\n\n").map((paragraph, index) => {
            // Handle headers
            if (paragraph.startsWith("# ")) {
              return (
                <h2
                  key={index}
                  className="text-3xl md:text-4xl font-bold font-display text-white tracking-tighter mt-12 mb-6"
                >
                  {paragraph.replace("# ", "")}
                </h2>
              );
            }

            // Handle code blocks
            if (paragraph.startsWith("```")) {
              return (
                <pre
                  key={index}
                  className="bg-white/5 border border-white/10 rounded p-6 overflow-x-auto text-[13px] text-white/80 my-8"
                >
                  <code>{paragraph.replace(/```/g, "").trim()}</code>
                </pre>
              );
            }

            // Handle inline code and emphasis
            const formattedText = paragraph
              .replace(/`([^`]+)`/g, "<code>$1</code>")
              .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
              .replace(/\*([^*]+)\*/g, "<em>$1</em>");

            return (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: formattedText }}
              />
            );
          })}
        </div>
      </article>

      {/* Author Section */}
      {/* <section className="px-6 md:px-12 max-w-4xl mx-auto mb-20 reveal">
        <div className="border border-white/5 rounded-sm p-8 bg-white/2">
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase">
              About Author
            </p>
            <h3 className="text-2xl font-bold font-display">Sachin Thakur</h3>
            <p className="text-gray-500 font-light leading-relaxed max-w-2xl">
              Frontend developer with expertise in React and Next.js. Passionate
              about building scalable web applications and sharing knowledge
              about modern web development practices. Always exploring new
              technologies and best practices to improve user experiences.
            </p>
            <div className="pt-4 flex gap-4">
              <a
                href="https://twitter.com"
                className="text-[11px] font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors uppercase"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                className="text-[11px] font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors uppercase"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 md:px-12 max-w-6xl mx-auto">
          <div className="space-y-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase mb-8">
                Related Articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug}`}>
                  <article
                    className="group border border-white/5 rounded-sm p-6 bg-white/2 hover:bg-white/5 transition-all duration-300 reveal h-full flex flex-col"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className="w-full h-40 mb-6 overflow-hidden rounded-sm bg-white/5 border border-white/5">
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold font-display tracking-tight mb-3 group-hover:italic transition-all duration-300">
                        {relatedPost.title}
                      </h3>

                      <p className="text-gray-600 font-light text-sm mb-6 flex-1">
                        {relatedPost.content.substring(0, 100)}...
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                        <span>{formatDate(relatedPost.createdAt)}</span>
                        <span className="text-white/10">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mt-20 reveal">
        <div className="border-t border-white/5 pt-20 text-center space-y-8">
          <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
            Interested in building scalable web applications? Let&rsquo;s work
            together.
          </p>
          <Link
            href="/#contact"
            className="inline-block group relative text-xs font-bold uppercase tracking-[0.4em] py-4 px-8 border border-white/20 hover:border-white transition-all duration-300"
          >
            <span className="relative z-10">Get in Touch</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
