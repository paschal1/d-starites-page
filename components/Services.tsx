// // components/Services.tsx
// export default function Services() {
//     return (
//       <section className="bg-white py-16 text-center">
//         <div className="container mx-auto px-4">
//           <h3 className="text-3xl font-semibold text-green-700 mb-8">Our Services</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
//               <img src="/tech1.jpg" alt="Software Dev Icon" className="w-120 h-120 mx-auto mb-4" />
//               <h4 className="font-bold text-lg text-green-700 mb-2">Software Development</h4>
//               <p className="text-sm text-gray-600">Custom software solutions tailored to your business needs.</p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
//               <img src="/tech2.jpg" alt="Academy Icon" className="w-120 h-120 mx-auto mb-4" />
//               <h4 className="font-bold text-lg text-green-700 mb-2">Tech Academy</h4>
//               <p className="text-sm text-gray-600">Train with industry experts in software, design, and tech skills.</p>
//             </div>
//             <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
//               <img src="/tech3.jpg" alt="Consulting Icon" className="w-120 h-120 mx-auto mb-4" />
//               <h4 className="font-bold text-lg text-green-700 mb-2">IT Consulting</h4>
//               <p className="text-sm text-gray-600">Expert advice to guide your digital transformation journey.</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
  
// components/Services.tsx
'use client';

import { useEffect, useState } from 'react';

interface IService {
  title: string;
  description: string;
  imageUrl: string;
}

export default function Services() {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched services data:', data); // For debugging
        if (Array.isArray(data)) {
          setServices(data); // Case when API returns an array directly
        } else if (Array.isArray(data.services)) {
          setServices(data.services); // Case when wrapped in { services: [...] }
        } else {
          console.error('Unexpected services response format:', data);
        }
      })
      .catch(error => {
        console.error('Failed to fetch services:', error);
      });
  }, []);

  return (
    <section className="bg-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-green-700 mb-8">Our Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
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
