'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IHero {
  _id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

export default function HeroList() {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [editingHero, setEditingHero] = useState<IHero | null>(null);
  const router = useRouter();

  // Fetch the list of hero sections from the API
  useEffect(() => {
    const fetchHeroes = async () => {
      const res = await fetch('/api/hero');
      const data = await res.json();
      setHeroes(data); // Assuming backend always returns a single latest hero in an array
    };
    fetchHeroes();
  }, []);

  // Handle delete action
  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this hero section?');
    if (confirmed) {
      try {
        const res = await fetch(`/api/hero/${_id}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // Refresh the list after deletion
          setHeroes(heroes.filter((hero) => hero._id !== _id));
        } else {
          alert('Failed to delete the hero section');
        }
      } catch (error) {
        console.error('Error deleting hero:', error);
        alert('Failed to delete the hero section');
      }
    }
  };

  // Handle edit action
  const handleEdit = (hero: IHero) => {
    setEditingHero(hero);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hero Sections</h1>
      <h2 className="text-xl font-semibold mt-8 mb-4">Saved Hero Sections</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Subtitle</th>
            <th className="px-4 py-2 border">Button Text</th>
            <th className="px-4 py-2 border">Image URL</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroes.map((hero) => (
            <tr key={hero._id}>
              <td className="px-4 py-2 border">{hero.title}</td>
              <td className="px-4 py-2 border">{hero.subtitle}</td>
              <td className="px-4 py-2 border">{hero.buttonText}</td>
              <td className="px-4 py-2 border">{hero.imageUrl}</td>
              <td className="px-4 py-2 border flex space-x-2">
                {/* Edit Button */}
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  onClick={() => handleEdit(hero)}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(hero._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Edit Form if Editing a Hero */}
      {editingHero && (
        <div className="mt-6 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-semibold mb-4">Edit Hero</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              // Send PUT request to update the hero
              const res = await fetch(`/api/hero/${editingHero._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingHero),
              });

              if (res.ok) {
                // Refresh the list after editing
                const updatedHero = await res.json();
                setHeroes((prevHeroes) =>
                  prevHeroes.map((hero) =>
                    hero._id === updatedHero._id ? updatedHero : hero
                  )
                );
                setEditingHero(null); // Close the edit form
              } else {
                alert('Failed to update the hero section');
              }
            }}
          >
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={editingHero.title}
                onChange={(e) => setEditingHero({ ...editingHero, title: e.target.value })}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Subtitle</label>
              <input
                type="text"
                value={editingHero.subtitle}
                onChange={(e) =>
                  setEditingHero({ ...editingHero, subtitle: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Button Text</label>
              <input
                type="text"
                value={editingHero.buttonText}
                onChange={(e) =>
                  setEditingHero({ ...editingHero, buttonText: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                value={editingHero.imageUrl}
                onChange={(e) =>
                  setEditingHero({ ...editingHero, imageUrl: e.target.value })
                }
                className="border p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditingHero(null)}
              className="ml-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
