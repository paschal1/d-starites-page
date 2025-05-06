import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Company name */}
        <h1 className="text-green-400 text-xl sm:text-2xl font-bold truncate">
          D-Starite IT Solutions
        </h1>

        {/* Hamburger Icon for small screens (FontAwesome) */}
        <div className="block sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Navigation links */}
        <nav className={`flex items-center space-x-6 ${isMenuOpen ? "block sm:flex" : "hidden sm:flex"}`}>
          <ul className="flex space-x-4 text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:text-green-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-green-300">
                Services
              </Link>
            </li>
            <li>
              <Link href="/academy" className="hover:text-green-300">
                Academy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-300">
                Contact
              </Link>
            </li>
          </ul>

          {/* Get Started button */}
          <a
            href="mailto:dstarite@gmail.com"
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base"
          >
            Get Started
          </a>
        </nav>
      </div>

      {/* Mobile menu (only visible when menu is open) */}
      {isMenuOpen && (
        <div className="sm:hidden bg-black text-white py-4 px-4">
          <ul className="space-y-4">
            <li>
              <Link href="/" className="hover:text-green-300 block">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-300 block">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-green-300 block">
                Services
              </Link>
            </li>
            <li>
              <Link href="/academy" className="hover:text-green-300 block">
                Academy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-300 block">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="mailto:dstarite@gmail.com"
                className="block mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                Get Started
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
