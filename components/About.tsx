'use client';
import { useEffect, useState } from 'react';

interface IAbout {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export default function About() {
  const [about, setAbout] = useState<IAbout | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => {console.log("About data:", data); setAbout(data)});
  }, []);

  if (!about) {
    return (
      <section className="py-16 text-center text-gray-600">
        <p>Loading About Us content...</p>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h3 className="text-3xl font-semibold text-green-700 mb-4">
            {about.title}
          </h3>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {about.content}
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={about.imageUrl}
            alt="About Us"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
    </section>
  );
}
