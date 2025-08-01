import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="vibe-gradient text-white py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover the <span className="text-yellow-300">Real Vibe</span> of Any Place
          </h2>
          <p className="text-xl mb-8">
            AI-powered city explorer that helps you find authentic local experiences based on real reviews from Google Maps and Reddit.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#demo" 
              className="bg-white text-indigo-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-full text-center transition duration-300"
            >
              Try It Now <FaArrowRight className="inline ml-2" />
            </a>
            <a 
              href="#how-it-works" 
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-700 font-bold py-3 px-6 rounded-full text-center transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md">
            <div className="bg-gray-100 p-4 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-gray-700 font-medium">Vibe Navigator</div>
            </div>
            <div className="p-4 h-64 overflow-y-auto bg-white">
              <div className="chat-bubble-ai bg-indigo-100 text-gray-800 p-3 mb-3 max-w-xs">
                <p>Hi there! Where would you like to explore today?</p>
              </div>
              <div className="chat-bubble-user bg-indigo-600 text-white p-3 mb-3 ml-auto max-w-xs">
                <p>Show me cozy cafés in Brooklyn</p>
              </div>
              <div className="chat-bubble-ai bg-indigo-100 text-gray-800 p-3 mb-3 max-w-xs">
                <p>Here are some charming cafés in Brooklyn with great vibes:</p>
                <div className="mt-2">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded mr-1 mb-1">☕ Cozy</span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">📚 Bookish</span>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">🌿 Plant-filled</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about any place..." 
                  className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;