'use client';
import { useEffect, useState } from 'react';

interface IService {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ServiceList() {
  const [services, setServices] = useState<IService[]>([]);
  const [editingService, setEditingService] = useState<IService | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    };
    fetchServices();
  }, []);

  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm('Delete this service?');
    if (!confirmed) return;

    const res = await fetch(`/api/service/${_id}`, { method: 'DELETE' });
    if (res.ok) setServices((prev) => prev.filter((s) => s._id !== _id));
    else alert('Failed to delete');
  };

  const handleEdit = (service: IService) => setEditingService(service);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Icon URL</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td className="px-4 py-2 border">{s.title}</td>
              <td className="px-4 py-2 border">{s.description}</td>
              <td className="px-4 py-2 border">{s.imageUrl}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(s)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingService && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Edit Service</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetch(`/api/service/${editingService._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingService),
              });

              if (res.ok) {
                const updated = await res.json();
                setServices((prev) =>
                  prev.map((s) => (s._id === updated._id ? updated : s))
                );
                setEditingService(null);
              } else alert('Failed to update');
            }}
          >
            <input
              type="text"
              value={editingService.title}
              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
              placeholder="Title"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingService.description}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
              placeholder="Description"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingService.imageUrl}
              onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
              placeholder="Icon URL"
              className="border p-2 mb-2 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditingService(null)} type="button">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
