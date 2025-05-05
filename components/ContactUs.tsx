// components/ContactUs.tsx
export default function ContactUs() {
  return (
    <section className="bg-gray-500 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-8">
          Have questions or want to work with us? Reach out today and let’s get started.
        </p>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-8">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                className="w-full p-4 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email address"
                className="w-full p-4 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                rows={6} // fixed: changed from "6" to {6}
                className="w-full p-4 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
