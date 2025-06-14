'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) throw new Error(data.message);

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-500 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-8">
          Have questions or want to work with us? Reach out today and let’s get started.
        </p>

        <div className="max-w-xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border rounded mb-4"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-4 border rounded mb-4"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
