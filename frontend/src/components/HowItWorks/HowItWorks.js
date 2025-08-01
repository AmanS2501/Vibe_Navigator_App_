import React from 'react';
import { FaDatabase, FaSearch, FaRobot } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🔧 How It Works</h2>
        
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">1. Data Collection</h3>
              <p className="text-gray-700 mb-4">Vibe Navigator scrapes real-time reviews from Google Maps and Reddit, processing and cleaning the text for analysis.</p>
              <div className="flex space-x-2">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Google Maps</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Reddit</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-indigo-100 p-6 rounded-xl">
              <FaDatabase className="text-5xl text-indigo-600 mb-4" />
              <p className="text-gray-700">Data is stored in a structured format for efficient processing.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row-reverse items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">2. Semantic Processing</h3>
              <p className="text-gray-700 mb-4">Reviews are embedded using ChromaDB vector database, enabling semantic search across content with context and relevance scoring.</p>
              <div className="flex space-x-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">ChromaDB</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Vector Search</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-indigo-100 p-6 rounded-xl">
              <FaSearch className="text-5xl text-indigo-600 mb-4" />
              <p className="text-gray-700">Understands context and nuance in reviews for better recommendations.</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-600">3. AI Generation</h3>
              <p className="text-gray-700 mb-4">Uses Groq's Llama3 model for natural language generation with a RAG pipeline for grounded, mood-based summaries with emotional context.</p>
              <div className="flex space-x-2">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Groq/Llama3</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">RAG</span>
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">LangChain</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-indigo-100 p-6 rounded-xl">
              <FaRobot className="text-5xl text-indigo-600 mb-4" />
              <p className="text-gray-700">Generates natural, conversational responses with mood tags and emojis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;