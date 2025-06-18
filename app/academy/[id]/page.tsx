'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PaystackPop from '@paystack/inline-js'; // npm install @paystack/inline-js

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(setCourse)
      .catch(console.error);
  }, [id]);

  const handlePayment = () => {
    if (!course || !course.price || course.price <= 0) return;

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: 'pk_test_xxxxxxxxxxxxx', // Replace with your real Paystack key
      amount: course.price * 100, // kobo
      email: 'student@example.com',
      onSuccess: (response: any) => {
        alert('Payment complete! Reference: ' + response.reference);
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
