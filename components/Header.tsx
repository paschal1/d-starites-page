// components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/academy", label: "Academy" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-green-400 text-xl font-bold whitespace-nowrap">
          D-Starite IT Solutions
        </h1>

        {/* Hamburger Icon (mobile only) */}
        <button
          className="sm:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-green-300">
              {label}
            </Link>
          ))}
          <a
            href="mailto:dstarite@gmail.com"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
          >
            Get Started
          </a>
        </nav>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="sm:hidden bg-black px-4 pt-4 pb-6 space-y-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-white hover:text-green-300"
              onClick={() => setIsOpen(false)} // Close on click
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:dstarite@gmail.com"
            className="block mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
            onClick={() => setIsOpen(false)} // Close on click
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
}
