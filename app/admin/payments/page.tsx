'use client';

import { useEffect, useState } from 'react';

interface IPayment {
  _id: string;
  name: string;
  email: string;
  amount: number;
  courseId: string;
  reference: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/payment')
      .then((res) => res.json())
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch payments:', err);
        alert('Failed to load payments');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Payment List</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border-collapse border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Course ID</th>
                <th className="border p-2">Reference</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.email}</td>
                  <td className="border p-2">₦{p.amount.toLocaleString()}</td>
                  <td className="border p-2">{p.courseId}</td>
                  <td className="border p-2">{p.reference}</td>
                  <td className={`border p-2 ${p.status === 'success' ? 'text-green-600' : p.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {p.status}
                  </td>
                  <td className="border p-2">{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
