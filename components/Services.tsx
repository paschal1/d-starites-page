'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Import router

interface IService {
  title: string;
  description: string;
  imageUrl: string;
}

export default function Services() {
  const [services, setServices] = useState<IService[]>([]);
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setServices(data);
        } else if (Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          console.error('Unexpected services response format:', data);
        }
      })
      .catch(error => {
        console.error('Failed to fetch services:', error);
      });
  }, []);

  const handleCardClick = () => {
    router.push('/contact'); // ✅ Redirect to /contact
  };

  return (
    <section className="bg-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-green-700 mb-8">Our Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={handleCardClick} // ✅ Make clickable
              className="cursor-pointer bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h4 className="font-bold text-lg text-green-700 mb-2">{service.title}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
