import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-16 vibe-gradient text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Discover Authentic Local Vibes?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of explorers using Vibe Navigator to find the perfect spots based on real experiences.
        </p>
        <a 
          href="#demo" 
          className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full inline-block transition duration-300"
        >
          Start Exploring Now <FaArrowRight className="inline ml-2" />
        </a>
      </div>
    </section>
  );
};

export default CTA;