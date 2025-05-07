'use client';

import { useState } from 'react';

export default function AboutForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setImageUrl('');
      alert('About Us created!');
    } else {
      alert('Failed to create');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">Create About Section</h2>

      <input
        type="text"
        className="w-full border p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter section title (e.g. Who We Are)"
      />

      <textarea
        className="w-full border p-2 mb-2"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter about content"
      />

      <input
        type="text"
        className="w-full border p-2 mb-2"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
