'use client';
import { useEffect, useState } from 'react';

interface IAbout {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
}

export default function AboutList() {
  const [about, setAbout] = useState<IAbout | null>(null);
  const [editing, setEditing] = useState<IAbout | null>(null);

  useEffect(() => {
    fetch('/api/about')
      .then(res => res.json())
      .then(data => {
        // Ensure the API response includes the title
        console.log(data); // Check the response structure
        setAbout(data);
      });
  }, []);

  const handleDelete = async () => {
    if (!about) return;
    if (confirm('Delete this section?')) {
      const res = await fetch(`/api/about/${about._id}`, { method: 'DELETE' });
      if (res.ok) setAbout(null);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const res = await fetch(`/api/about/${editing._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });

    if (res.ok) {
      const updated = await res.json();
      setAbout(updated);
      setEditing(null);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">About Us Section</h2>

      {about ? (
        <div className="border p-4 rounded mb-4">
          <h3 className="text-2xl font-semibold text-green-700 mb-2">{about.title}</h3>
          <p>{about.content}</p>
          <img src={about.imageUrl} alt="about" className="w-full h-48 object-cover my-2" />
          <div className="flex gap-2 mt-2">
            <button
              className="bg-yellow-500 px-4 py-2 rounded text-white"
              onClick={() => setEditing(about)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>No About Us section created yet.</p>
      )}

      {editing && (
        <form onSubmit={handleUpdate} className="border p-4 rounded mt-4">
          <h3 className="text-lg font-semibold mb-2">Edit About Section</h3>
          <input
            type="text"
            className="w-full border p-2 mb-2"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            placeholder="Section title"
          />
          <textarea
            className="w-full border p-2 mb-2"
            rows={4}
            value={editing.content}
            onChange={(e) => setEditing({ ...editing, content: e.target.value })}
          />
          <input
            type="text"
            className="w-full border p-2 mb-2"
            value={editing.imageUrl}
            onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
          />
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
