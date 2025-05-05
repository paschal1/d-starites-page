// components/Projects.tsx
export default function Projects() {
    return (
      <section className="bg-gray-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-green-700 mb-8">Explore Our Recent Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Project Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <img src="/service1.png" alt="Project One" className="h-40 w-full object-cover rounded mb-4" />
              <h4 className="font-bold text-lg text-green-700 mb-2">Furniture Ecommerce</h4>
              <p className="text-sm text-gray-600">A web-based Furniture platform for service providers.</p>
            </div>
            {/* Project Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <img src="/service2.png" alt="Project Two" className="h-40 w-full object-cover rounded mb-4" />
              <h4 className="font-bold text-lg text-green-700 mb-2">E-Learning Portal</h4>
              <p className="text-sm text-gray-600">A scalable online academy built for remote learning.</p>
            </div>
            {/* Project Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <img src="/service3.jpg" alt="Project Three" className="h-40 w-full object-cover rounded mb-4" />
              <h4 className="font-bold text-lg text-green-700 mb-2">Inventory Tracker</h4>
              <p className="text-sm text-gray-600">An AI-enhanced inventory monitoring system for SMEs.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  