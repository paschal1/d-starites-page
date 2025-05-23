'use client';
import { useEffect, useState } from 'react';

interface IProject {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm('Delete this project?');
    if (!confirmed) return;

    const res = await fetch(`/api/projects/${_id}`, { method: 'DELETE' });
    if (res.ok) setProjects((prev) => prev.filter((p) => p._id !== _id));
    else alert('Failed to delete');
  };

  const handleEdit = (project: IProject) => setEditingProject(project);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Image URL</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td className="px-4 py-2 border">{p.title}</td>
              <td className="px-4 py-2 border">{p.description}</td>
              <td className="px-4 py-2 border">{p.imageUrl}</td>
              <td className="px-4 py-2 border flex space-x-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProject && (
        <div className="mt-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const res = await fetch(`/api/projects/${editingProject._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProject),
              });

              if (res.ok) {
                const updated = await res.json();
                setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
                setEditingProject(null);
              } else alert('Failed to update');
            }}
          >
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              placeholder="Title"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              placeholder="Description"
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              value={editingProject.imageUrl}
              onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
              placeholder="Image URL"
              className="border p-2 mb-2 w-full"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setEditingProject(null)}
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
