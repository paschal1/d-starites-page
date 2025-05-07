'use client';

import { useEffect, useState } from 'react';

interface IHero {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

export default function Hero() {
  const [hero, setHero] = useState<IHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch('/api/hero', { cache: 'no-store' }); // Ensure fresh data
        if (!res.ok) {
          console.error('Failed to fetch hero section');
          setLoading(false);
          return;
        }

        const data: IHero = await res.json();
        setHero(data);
      } catch (error) {
        console.error('Error fetching hero:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">No hero data found</h2>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.imageUrl || '/hero-placeholder.jpg'}
          alt={hero.title || 'Empowering Innovation'}
          className="w-full h-full object-cover transform scale-110 animate-slowZoom"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp hero-title">
          {hero.title || 'Empowering Growth Through Innovation'}
        </h1>

        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          <p className="text-md md:text-lg text-green-300 inline-block animate-marquee">
            {hero.subtitle || 'We build software, train talents, and transform businesses with the power of technology.'}
          </p>
        </div>

        <a
          href="#"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 animate-fadeInUp delay-200"
        >
          {hero.buttonText || 'Learn More'}
        </a>
      </div>
    </section>
  );
}
