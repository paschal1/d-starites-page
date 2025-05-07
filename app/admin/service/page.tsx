// admin/ServiceUpload.tsx
'use client';

import { useState } from 'react';

export default function ServiceUpload() {
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Service created!');
      setForm({ title: '', description: '', imageUrl: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <input
        name="title"
        placeholder="Service Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Service Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Upload Service</button>
    </form>
  );
}
