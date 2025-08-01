import React from 'react';
import { FaCompass, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaCompass className="mr-2" /> Vibe Navigator
            </h3>
            <p className="text-gray-400">An AI-Powered City Explorer for Discovering Authentic Local Vibes.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-white transition">Demo</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/AmanS2501/Vibe_Navigator_App_" 
                  className="text-gray-400 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://lnkd.in/dfmrygUG" 
                  className="text-gray-400 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </li>
              <li>
                <a 
                  href="https://lnkd.in/dCgaCkJR" 
                  className="text-gray-400 hover:text-white transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <FaLinkedin />
              </a>
            </div>
            <p className="text-gray-400">
              Contact: <a href="mailto:contact@vibenavigator.com" className="hover:text-white transition">contact@vibenavigator.com</a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>Built with ❤️ during the AI Hackathon | Powered by AI, Grounded in Reality</p>
          <p className="mt-2">© 2023 Vibe Navigator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;