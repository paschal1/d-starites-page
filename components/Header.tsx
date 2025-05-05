// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-green-400 text-xl font-bold">D-Starite IT Solutions</h1>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-4">
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
          {/* Removed Link for Get Started */}
          <a
            href="mailto:dstarite@gmail.com"
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
