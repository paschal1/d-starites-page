// components/Footer.tsx
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div className="space-y-4">
          <h3 className="text-green-500 text-lg font-bold">D-Starite Technologies</h3>
          <p className="text-sm text-gray-400">
            Empowering businesses with innovative IT solutions. Building for the future, one tech at a time.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-green-500 text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-green-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-green-400">About</Link></li>
            <li><Link href="/services" className="hover:text-green-400">Services</Link></li>
            <li><Link href="/academy" className="hover:text-green-400">Academy</Link></li>
            <li><Link href="/contact" className="hover:text-green-400">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-green-500 text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/starttechnology.inc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://www.instagram.com/dstaritetechnologies/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://ng.linkedin.com/in/starttechnology" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-800 pt-6">
        &copy; 2025 D-Starite Technologies. All rights reserved.
      </div>
    </footer>
  );
}
