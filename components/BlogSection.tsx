'use client';

import { useEffect, useState } from 'react';
import BlogForm from './BlogForm'; // adjust import path as needed

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
      .then((data) => setBlogs(data.blogs || data))
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
        <BlogForm
          formData={newBlog}
          onChange={(field, value) =>
            setNewBlog((prev) => ({ ...prev, [field]: value }))
          }
          onSubmit={handleAdd}
        />
      </section>

      {/* Edit Blog */}
      {editingBlog && (
        <section className="mb-8 bg-yellow-50 border border-yellow-200 rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-700">Edit Blog</h2>
          <BlogForm
            formData={editingBlog}
            onChange={(field, value) =>
              setEditingBlog((prev) => (prev ? { ...prev, [field]: value } : null))
            }
            onSubmit={handleEdit}
            onCancel={() => setEditingBlog(null)}
            isEditing
          />
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
