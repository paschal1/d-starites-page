"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "5 Ways AI is Transforming Small Businesses",
    excerpt: "Discover how artificial intelligence is empowering small businesses to scale smarter and faster.",
    image: "/blog/blog1.jpg",
    author: "D-Starite Team",
    date: "May 2, 2025",
    slug: "/blog/ai-transforming-small-businesses",
  },
  {
    id: 2,
    title: "Top 7 Tech Trends to Watch in 2025",
    excerpt: "From quantum computing to sustainable tech — stay ahead with the latest trends shaping tomorrow.",
    image: "/blog/blog3.jpg",
    author: "Jane Okoro",
    date: "April 18, 2025",
    slug: "/blog/top-tech-trends-2025",
  },
  {
    id: 3,
    title: "Building Scalable Digital Products: A Step-by-Step Guide",
    excerpt: "Learn how to design, develop, and deploy scalable tech solutions with our expert framework.",
    image: "/blog/blog2.jpg",
    author: "D-Starite Dev Team",
    date: "April 4, 2025",
    slug: "/blog/building-scalable-products",
  },
  // Add more dummy posts here if needed...
];

export default function BlogSection() {
  const postsPerLoad = 3;
  const [visibleCount, setVisibleCount] = useState(postsPerLoad);

  const visiblePosts = blogPosts.slice(0, visibleCount);
  const hasMore = visibleCount < blogPosts.length;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Latest Insights & Articles</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore deep dives, updates, and innovations from the minds at D-Starite Technologies.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link href={post.slug}>
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
                <p className="text-sm text-green-600 font-semibold mb-1">{post.date}</p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  <Link href={post.slug} className="hover:text-green-700 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 italic">By {post.author}</span>
                  <Link
                    href={post.slug}
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((prev) => prev + postsPerLoad)}
              className="px-6 py-3 bg-green-700 text-white text-sm font-semibold rounded-full hover:bg-green-800 transition-all duration-300 shadow"
            >
              View More Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
