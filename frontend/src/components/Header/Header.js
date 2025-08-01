// src/components/Header/Header.js
import React from 'react';
import { FaCompass } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaCompass className="text-indigo-600 text-2xl" />
          <span className="text-xl font-bold text-gray-900">Vibe Navigator</span>
        </div>
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          <li>
            <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Home</a>
          </li>
          <li>
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
          </li>
          <li>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">How It Works</a>
          </li>
          <li>
            <a href="#demo" className="text-gray-700 hover:text-indigo-600 transition">Demo</a>
          </li>
        </ul>
        {/* Optional: Add a Contact or CTA button */}
        <div className="hidden md:block">
          <a
            href="#demo"
            className="bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
          >
            Try Now
          </a>
        </div>
        {/* Mobile menu placeholder (you can add a burger menu if needed) */}
      </nav>
    </header>
  );
};

export default Header;
