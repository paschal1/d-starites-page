'use client';

import { useEffect, useState } from 'react';

interface IBlog {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  slug: string;
}

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [newBlog, setNewBlog] = useState<Omit<IBlog, '_id'>>({
    title: '',
    excerpt: '',
    image: '',
    author: '',
    date: '',
    slug: '',
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
        alert('Failed to load blog data');
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (_id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${_id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== _id));
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting blog post');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      if (res.ok) {
        const added = await res.json();
        setBlogs((prev) => [...prev, added]);
        setNewBlog({
          title: '',
          excerpt: '',
          image: '',
          author: '',
          date: '',
          slug: '',
        });
      } else {
        alert('Failed to add blog post');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding blog post');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    try {
      const res = await fetch(`/api/blogs/${editingBlog._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBlog),
      });
      if (res.ok) {
        const updated = await res.json();
        setBlogs((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
        setEditingBlog(null);
      } else {
        alert('Failed to update blog post');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating blog post');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Management</h1>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Add Blog Post</h2>
        {['title', 'excerpt', 'image', 'author', 'date', 'slug'].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={(newBlog as any)[field]}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, [field]: e.target.value }))
            }
            className="border p-2 mr-2 mb-2 w-full"
          />
        ))}
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      {/* Edit Form */}
      {editingBlog && (
        <form
          onSubmit={handleEdit}
          className="mb-6 border p-4 rounded bg-yellow-100"
        >
          <h2 className="text-lg font-semibold mb-2">Edit Blog Post</h2>
          {['title', 'excerpt', 'image', 'author', 'date', 'slug'].map((field) => (
            <input
              key={field}
              type="text"
              value={(editingBlog as any)[field]}
              onChange={(e) =>
                setEditingBlog((prev) =>
                  prev ? { ...prev, [field]: e.target.value } : null
                )
              }
              className="border p-2 mr-2 mb-2 w-full"
            />
          ))}
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button
            type="button"
            onClick={() => setEditingBlog(null)}
            className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Blog Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td className="px-4 py-2 border">{blog.title}</td>
              <td className="px-4 py-2 border">{blog.author}</td>
              <td className="px-4 py-2 border">{blog.date}</td>
              <td className="px-4 py-2 border flex gap-2">
                <button
                  onClick={() => setEditingBlog(blog)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
