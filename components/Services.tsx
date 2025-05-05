// components/Services.tsx
export default function Services() {
    return (
      <section className="bg-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-green-700 mb-8">Our Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <img src="/tech1.jpg" alt="Software Dev Icon" className="w-120 h-120 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-green-700 mb-2">Software Development</h4>
              <p className="text-sm text-gray-600">Custom software solutions tailored to your business needs.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <img src="/tech2.jpg" alt="Academy Icon" className="w-120 h-120 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-green-700 mb-2">Tech Academy</h4>
              <p className="text-sm text-gray-600">Train with industry experts in software, design, and tech skills.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <img src="/tech3.jpg" alt="Consulting Icon" className="w-120 h-120 mx-auto mb-4" />
              <h4 className="font-bold text-lg text-green-700 mb-2">IT Consulting</h4>
              <p className="text-sm text-gray-600">Expert advice to guide your digital transformation journey.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  