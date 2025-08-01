import React from 'react';
import { FaReact, FaPython, FaGoogle, FaServer, FaDatabase, FaBrain, FaLink, FaProjectDiagram, FaMobileAlt, FaNetworkWired } from 'react-icons/fa';
import { SiTailwindcss, SiReddit, SiFastapi } from 'react-icons/si';

const TechStack = () => {
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        { name: "React", icon: <FaReact className="text-blue-500" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-blue-400" /> },
        { name: "Responsive Design", icon: <FaMobileAlt className="text-purple-500" /> }
      ]
    },
    {
      title: "Backend", 
      technologies: [
        { name: "FastAPI", icon: <SiFastapi className="text-blue-600" /> },
        { name: "Render.com", icon: <FaServer className="text-green-500" /> },
        { name: "Async Architecture", icon: <FaNetworkWired className="text-gray-500" /> }
      ]
    },
    {
      title: "Data",
      technologies: [
        { name: "Google Maps API", icon: <FaGoogle className="text-red-500" /> },
        { name: "Reddit API", icon: <SiReddit className="text-orange-500" /> },
        { name: "ChromaDB", icon: <FaDatabase className="text-indigo-500" /> }
      ]
    },
    {
      title: "AI & ML",
      technologies: [
        { name: "Groq (Llama3)", icon: <FaBrain className="text-yellow-500" /> },
        { name: "LangChain", icon: <FaLink className="text-green-600" /> },
        { name: "RAG Pipeline", icon: <FaProjectDiagram className="text-purple-600" /> }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🛠️ Tech Stack</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-600 border-b pb-2">{category.title}</h3>
              <ul className="space-y-2">
                {category.technologies.map((tech, techIndex) => (
                  <li key={techIndex} className="flex items-center">
                    {tech.icon}
                    <span className="ml-2">{tech.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;