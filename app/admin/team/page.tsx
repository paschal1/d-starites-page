'use client';

import { useEffect, useState } from 'react';

interface ITeam {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export default function TeamAdminPage() {
  const [team, setTeam] = useState<ITeam[]>([]);
  const [editingMember, setEditingMember] = useState<ITeam | null>(null);
  const [newMember, setNewMember] = useState<Omit<ITeam, '_id'>>({
    name: '',
    role: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/teams'); // <-- fixed: plural 'teams'
        if (!res.ok) throw new Error('Failed to fetch team');
        const data = await res.json();
        setTeam(data);
      } catch (error) {
        console.error(error);
        alert('Failed to load team data');
      }
    };
    fetchTeam();
  }, []);

  const handleDelete = async (_id: string) => {
    if (!confirm('Delete this team member?')) return;
    try {
      const res = await fetch(`/api/teams/${_id}`, { method: 'DELETE' }); // <-- fixed: plural 'teams'
      if (res.ok) {
        setTeam((prev) => prev.filter((m) => m._id !== _id));
      } else {
        alert('Failed to delete');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting team member');
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      });
      if (res.ok) {
        const added = await res.json();
        setTeam((prev) => [...prev, added]);
        setNewMember({ name: '', role: '', imageUrl: '' });
      } else {
        alert('Failed to add team member');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding team member');
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;
    try {
      const res = await fetch(`/api/teams/${editingMember._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMember),
      });
      if (res.ok) {
        const updated = await res.json();
        setTeam((prev) =>
          prev.map((m) => (m._id === updated._id ? updated : m))
        );
        setEditingMember(null);
      } else {
        alert('Failed to update');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating team member');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team Management</h1>

      <form onSubmit={handleAdd} className="mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Add Team Member</h2>
        <input
          type="text"
          placeholder="Name"
          value={newMember.name}
          onChange={(e) =>
            setNewMember({ ...newMember, name: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Role"
          value={newMember.role}
          onChange={(e) =>
            setNewMember({ ...newMember, role: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newMember.imageUrl}
          onChange={(e) =>
            setNewMember({ ...newMember, imageUrl: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {editingMember && (
        <form
          onSubmit={handleEdit}
          className="mb-6 border p-4 rounded bg-yellow-100"
        >
          <h2 className="text-lg font-semibold mb-2">Edit Team Member</h2>
          <input
            type="text"
            value={editingMember.name}
            onChange={(e) =>
              setEditingMember({ ...editingMember, name: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={editingMember.role}
            onChange={(e) =>
              setEditingMember({ ...editingMember, role: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={editingMember.imageUrl}
            onChange={(e) =>
              setEditingMember({
                ...editingMember,
                imageUrl: e.target.value,
              })
            }
            className="border p-2 mr-2"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditingMember(null)}
            className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      )}

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member) => (
            <tr key={member._id}>
              <td className="px-4 py-2 border">{member.name}</td>
              <td className="px-4 py-2 border">{member.role}</td>
              <td className="px-4 py-2 border">{member.imageUrl}</td>
              <td className="px-4 py-2 border flex gap-2">
                <button
                  onClick={() => setEditingMember(member)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
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
