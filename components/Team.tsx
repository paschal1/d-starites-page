'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ITeam {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<ITeam[]>([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/teams');
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section className="bg-white py-16 text-center">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-semibold text-green-700 mb-10">
          Meet the Team
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          The passionate minds driving innovation and delivering value at D-Starite Technologies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="bg-gray-50 p-4 rounded-lg shadow text-center hover:shadow-md transition"
            >
              <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h4 className="text-lg font-bold text-green-700">
                {member.name}
              </h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
