// components/admin/ProjectForm.tsx
'use client';

import { useState } from 'react';

export default function ProjectForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, imageUrl, published }),
    });

    if (res.ok) {
      setTitle('');
      setDescription('');
      setImageUrl('');
      setPublished(true);
      alert('Project added!');
    } else {
      alert('Failed to add project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Project</h2>

      <input
        type="text"
        placeholder="Project Title"
        className="w-full border p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Project Description"
        className="w-full border p-2 mb-2"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full border p-2 mb-2"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="mr-2"
        />
        Publish this project
      </label>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
