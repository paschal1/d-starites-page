'use client';

import { useEffect, useState } from 'react';
import TipTapEditor from '@/components/TipTapEditor';

interface ICourse {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

export default function CourseAdminPage() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);
  const [newCourse, setNewCourse] = useState<Omit<ICourse, '_id'>>({
    title: '',
    description: '',
    imageUrl: '',
    price: 0,
  });

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => {
        console.error(err);
        alert('Failed to load courses');
      });
  }, []);

  const handleDelete = async (_id: string) => {
    if (!confirm('Delete this course?')) return;
    const res = await fetch(`/api/courses/${_id}`, { method: 'DELETE' });
    if (res.ok) {
      setCourses((prev) => prev.filter((c) => c._id !== _id));
    } else alert('Failed to delete course');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
    if (res.ok) {
      const added = await res.json();
      setCourses((prev) => [...prev, added]);
      setNewCourse({ title: '', description: '', imageUrl: '', price: 0 });
    } else alert('Failed to add course');
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    const res = await fetch(`/api/courses/${editingCourse._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCourse),
    });

    if (res.ok) {
      const updated = await res.json();
      setCourses((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
      setEditingCourse(null);
    } else alert('Failed to update course');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Course Admin Panel</h1>

      {/* Add Course */}
      <section className="mb-8 bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
            className="border rounded p-2 col-span-2 sm:col-span-1"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newCourse.imageUrl}
            onChange={(e) => setNewCourse((prev) => ({ ...prev, imageUrl: e.target.value }))}
            className="border rounded p-2 col-span-2 sm:col-span-1"
          />
          <input
            type="number"
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) =>
              setNewCourse((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
            }
            className="border rounded p-2 col-span-2"
          />

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <TipTapEditor
              value={newCourse.description}
              onChange={(val) => setNewCourse((prev) => ({ ...prev, description: val }))}
            />
          </div>

          <button className="bg-green-600 text-white px-4 py-2 rounded col-span-2">
            Add Course
          </button>
        </form>
      </section>

      {/* Edit Course */}
      {editingCourse && (
        <section className="mb-8 bg-yellow-50 border border-yellow-200 rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-700">Edit Course</h2>
          <form onSubmit={handleEdit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={editingCourse.title}
              onChange={(e) =>
                setEditingCourse((prev) => (prev ? { ...prev, title: e.target.value } : null))
              }
              className="border rounded p-2 col-span-2 sm:col-span-1"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editingCourse.imageUrl}
              onChange={(e) =>
                setEditingCourse((prev) => (prev ? { ...prev, imageUrl: e.target.value } : null))
              }
              className="border rounded p-2 col-span-2 sm:col-span-1"
            />
            <input
              type="number"
              placeholder="Price"
              value={editingCourse.price}
              onChange={(e) =>
                setEditingCourse((prev) =>
                  prev ? { ...prev, price: parseFloat(e.target.value) } : null
                )
              }
              className="border rounded p-2 col-span-2"
            />

            <div className="col-span-2">
              <label className="block mb-1 font-medium">Description</label>
              <TipTapEditor
                value={editingCourse.description}
                onChange={(val) =>
                  setEditingCourse((prev) => (prev ? { ...prev, description: val } : null))
                }
              />
            </div>

            <div className="col-span-2 flex gap-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Course List */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="p-3 border">{course.title}</td>
                <td className="p-3 border">₦{course.price}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="bg-yellow-400 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
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
