'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function stripHtmlTags(html: string) {
  return html.replace(/<[^>]*>/g, '');
}

export default function Academy() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6">Our Academy</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Upskill yourself with cutting-edge technology courses taught by industry experts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={course.imageUrl || '/placeholder.png'}
                alt={course.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>

                <p className="text-xl font-semibold text-green-700 mb-2">
                  {course.price && course.price > 0
                    ? `₦${course.price.toLocaleString()}`
                    : 'Free'}
                </p>

                <p className="text-gray-600 mb-6 text-sm">
                  {stripHtmlTags(course.description).slice(0, 100)}...
                </p>

                <Link
                  href={`/academy/${course._id}`}
                  className="text-green-600 font-semibold hover:text-green-700 transition"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
