'use client';
import { useState } from 'react';

export default function EditHeroSection() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subtitle,
          buttonText,
          imageUrl,
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to update hero section');
      }
  
      const data = await res.json();
      alert('Hero section updated successfully!');
      console.log(data);
  
      // Reset form fields
      setTitle('');
      setSubtitle('');
      setButtonText('');
      setImageUrl('');
  
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the hero section.');
    }
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Hero Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Hero Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Hero Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Button Text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
