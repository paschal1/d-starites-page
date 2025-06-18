'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import ContactUs from '@/components/ContactUs';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to fetch blog');
        }

        const data = await res.json();
        setBlog(data);
      } catch (err: any) {
        console.error('Failed to fetch blog:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        <p className="text-lg font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div>
      <Header />

      {/* Services section */}
      <section className="py-16 bg-gray-100">
        <Services />
      </section>

      {/* Blog content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="relative w-full h-80 md:h-[28rem] rounded-md overflow-hidden mb-6">
          <Image
            src={blog.image || '/default-blog.jpg'}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <p className="text-sm text-green-600 font-semibold mb-2">{blog.date}</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <p className="text-gray-500 italic mb-6">By {blog.author}</p>
        <div
          className="prose prose-green max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.excerpt }}
        />
      </section>

      {/* Contact section */}
      <section className="py-20 bg-white">
        <ContactUs />
      </section>

      <Footer />
    </div>
  );
}
