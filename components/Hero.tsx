"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-placeholder.jpg"
          alt="Empowering Innovation"
          className="w-full h-full object-cover transform scale-110 animate-slowZoom"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp hero-title">
          Empowering Growth Through Innovation
        </h1>

        {/* Marquee Line Below Title */}
        <div className="w-full overflow-hidden whitespace-nowrap mb-4">
          <p className="text-md md:text-lg text-green-300 inline-block animate-marquee">
            We build software, train talents, and transform businesses with the power of technology.
          </p>
        </div>

        <a
          href="#"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300 animate-fadeInUp delay-200"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}
