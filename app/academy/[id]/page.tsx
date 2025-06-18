'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PaystackPop from '@paystack/inline-js';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(setCourse)
      .catch(console.error);
  }, [id]);

  const handlePayment = () => {
    if (!name || !email) {
      alert('Please enter your name and email before making payment.');
      return;
    }

    if (!course || !course.price || course.price <= 0) return;

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: 'pk_test_278dd459f559b57fcd4e0353434dbafac37431f2', // Replace with your key
      amount: course.price * 100,
      email,
      onSuccess: async (response: any) => {
        alert('Payment complete! Reference: ' + response.reference);

        // Save to database
        await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            amount: course.price,
            courseId: id,
            reference: response.reference,
            status: 'success',
          }),
        });
      },
      onCancel: () => {
        alert('Payment canceled');
      },
    });
  };

  if (!course) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <img
        src={course.imageUrl || '/placeholder.png'}
        alt={course.title}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-6">{course.title}</h1>

      <div
        className="text-gray-700 mt-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: course.description }}
      />

      <p className="text-xl font-semibold text-green-700 mt-6">
        {course.price && course.price > 0
          ? `₦${course.price.toLocaleString()}`
          : 'Free'}
      </p>

      {/* Name & Email Input */}
      <div className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border px-4 py-2 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {course.price > 0 && (
        <button
          onClick={handlePayment}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Enroll & Pay with Paystack
        </button>
      )}
    </div>
  );
}
