"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Utility to strip HTML tags from a string
function stripHtmlTags(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "");
}

const POSTS_PER_PAGE = 6;

export default function BlogSection() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogs.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Latest Insights & Articles
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore deep dives, updates, and innovations from the minds at
            D-Starite Technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link href={`/blog/${post._id}`}>
                <div className="relative w-full h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-6">
                <p className="text-sm text-green-600 font-semibold mb-1">
                  {post.date}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  <Link
                    href={`/blog/${post._id}`}
                    className="hover:text-green-700 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {stripHtmlTags(post.excerpt).length > 100
                    ? `${stripHtmlTags(post.excerpt).slice(0, 100)}...`
                    : stripHtmlTags(post.excerpt)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 italic">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post._id}`}
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
