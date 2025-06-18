'use client';

import { useEffect, useState } from 'react';
import TipTapEditor from '@/components/TipTapEditor';

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
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || data);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to load blog data');
      });
  }, []);

  const handleDelete = async (_id: string) => {
    if (!confirm('Delete this blog post?')) return;
    const res = await fetch(`/api/blogs/${_id}`, { method: 'DELETE' });
    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b._id !== _id));
    } else alert('Failed to delete blog post');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });
    if (res.ok) {
      const added = await res.json();
      setBlogs((prev) => [...prev, added]);
      setNewBlog({ title: '', excerpt: '', image: '', author: '', date: '', slug: '' });
    } else alert('Failed to add blog post');
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const res = await fetch(`/api/blogs/${editingBlog._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBlog),
    });

    if (res.ok) {
      const updated = await res.json();
      setBlogs((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      setEditingBlog(null);
    } else alert('Failed to update blog post');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Blog Admin Panel</h1>

      {/* Add Blog */}
      <section className="mb-8 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Blog</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog((prev) => ({ ...prev, title: e.target.value }))}
            className="border rounded p-2 col-span-2 sm:col-span-1"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBlog.image}
            onChange={(e) => setNewBlog((prev) => ({ ...prev, image: e.target.value }))}
            className="border rounded p-2 col-span-2 sm:col-span-1"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBlog.author}
            onChange={(e) => setNewBlog((prev) => ({ ...prev, author: e.target.value }))}
            className="border rounded p-2 col-span-2 sm:col-span-1"
          />
          <input
            type="text"
            placeholder="Date"
            value={newBlog.date}
            onChange={(e) => setNewBlog((prev) => ({ ...prev, date: e.target.value }))}
            className="border rounded p-2 col-span-2 sm:col-span-1"
          />
          <input
            type="text"
            placeholder="Slug"
            value={newBlog.slug}
            onChange={(e) => setNewBlog((prev) => ({ ...prev, slug: e.target.value }))}
            className="border rounded p-2 col-span-2"
          />
          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Excerpt</label>
            <TipTapEditor
              value={newBlog.excerpt}
              onChange={(value) => setNewBlog((prev) => ({ ...prev, excerpt: value }))}
            />
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded col-span-2">
            Add Blog Post
          </button>
        </form>
      </section>

      {/* Edit Blog */}
      {editingBlog && (
        <section className="mb-8 bg-yellow-50 border border-yellow-200 rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-700">Edit Blog</h2>
          <form onSubmit={handleEdit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={editingBlog.title}
              onChange={(e) => setEditingBlog((prev) => (prev ? { ...prev, title: e.target.value } : null))}
              className="border rounded p-2 col-span-2 sm:col-span-1"
            />
            <input
              type="text"
              placeholder="Image"
              value={editingBlog.image}
              onChange={(e) => setEditingBlog((prev) => (prev ? { ...prev, image: e.target.value } : null))}
              className="border rounded p-2 col-span-2 sm:col-span-1"
            />
            <input
              type="text"
              placeholder="Author"
              value={editingBlog.author}
              onChange={(e) => setEditingBlog((prev) => (prev ? { ...prev, author: e.target.value } : null))}
              className="border rounded p-2 col-span-2 sm:col-span-1"
            />
            <input
              type="text"
              placeholder="Date"
              value={editingBlog.date}
              onChange={(e) => setEditingBlog((prev) => (prev ? { ...prev, date: e.target.value } : null))}
              className="border rounded p-2 col-span-2 sm:col-span-1"
            />
            <input
              type="text"
              placeholder="Slug"
              value={editingBlog.slug}
              onChange={(e) => setEditingBlog((prev) => (prev ? { ...prev, slug: e.target.value } : null))}
              className="border rounded p-2 col-span-2"
            />
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Excerpt</label>
              <TipTapEditor
                value={editingBlog.excerpt}
                onChange={(value) =>
                  setEditingBlog((prev) => (prev ? { ...prev, excerpt: value } : null))
                }
              />
            </div>
            <div className="col-span-2 flex gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
              <button
                type="button"
                onClick={() => setEditingBlog(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Blog List */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="p-3 border">{blog.title}</td>
                <td className="p-3 border">{blog.author}</td>
                <td className="p-3 border">{blog.date}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => setEditingBlog(blog)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded"
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
      </section>
    </div>
  );
}
