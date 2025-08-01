import React from 'react';
import { FaCloudDownloadAlt, FaBrain, FaSmile, FaQuoteRight, FaRobot, FaMobileAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaCloudDownloadAlt />,
      title: "Real-time Review Scraping",
      description: "Automatically collects authentic reviews from Google Maps and Reddit to give you the most current insights."
    },
    {
      icon: <FaBrain />,
      title: "Semantic Search",
      description: "Powered by ChromaDB for intelligent review analysis that understands context and nuance."
    },
    {
      icon: <FaSmile />,
      title: "Mood-Based Recommendations",
      description: "AI-generated vibe summaries with mood tags and emojis to quickly understand the atmosphere."
    },
    {
      icon: <FaQuoteRight />,
      title: "Transparent Citations",
      description: "Every recommendation includes source review citations so you can see the original feedback."
    },
    {
      icon: <FaRobot />,
      title: "Conversational AI Agent",
      description: "Context-aware chat interface using LangChain for natural, flowing conversations about places."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile-Friendly",
      description: "Responsive design works perfectly on all devices, from desktop to smartphone."
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">✨ Key Features</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="text-indigo-600 text-4xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;