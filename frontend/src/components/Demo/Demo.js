import React, { useState } from 'react';
import { FaCompass, FaSyncAlt, FaCog, FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';

const Demo = () => {
  const [messages, setMessages] = useState([]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: `Here are some great options for "${userMessage.content}":`,
        recommendations: [
          {
            name: "Local Favorite Spot",
            tags: ["🌟 Highly Rated", "💖 Great Atmosphere", "📍 Perfect Location"],
            review: "Amazing vibe and exactly what you're looking for! Perfect for your needs.",
            citations: 4
          }
        ]
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section id="demo" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🚀 Try Vibe Navigator</h2>
        
        <div className="bg-gray-50 rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Chat Header */}
          <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaCompass />
              <span className="font-bold">Vibe Navigator</span>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full hover:bg-indigo-500 transition">
                <FaSyncAlt />
              </button>
              <button className="p-1 rounded-full hover:bg-indigo-500 transition">
                <FaCog />
              </button>
            </div>
          </div>
          
          {/* Chat Container */}
          <div className="h-96 overflow-y-auto p-4 bg-white">
            {/* Welcome Message */}
            <div className="mb-4 fade-in">
              <div className="chat-bubble-ai bg-indigo-100 text-gray-800 p-4 max-w-3xl">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                    <FaRobot className="text-indigo-600" />
                  </div>
                  <span className="font-bold">Vibe Navigator</span>
                </div>
                <p className="mb-2">Hi there! 👋 I'm your Vibe Navigator assistant. I can help you discover the real vibe of any place - cafés, restaurants, bars, and more!</p>
                <p className="mb-2">Just tell me what you're looking for, like:</p>
                <ul className="list-disc pl-5 mb-2">
                  <li>"Cozy coffee shops in Portland"</li>
                  <li>"Best rooftop bars in Miami with ocean views"</li>
                  <li>"Quiet bookstores in Chicago"</li>
                </ul>
                <p>Where would you like to explore today?</p>
              </div>
            </div>
            
            {/* Sample Conversation */}
            <div className="mb-4 fade-in">
              <div className="chat-bubble-user bg-indigo-600 text-white p-4 max-w-3xl ml-auto">
                <div className="flex items-center mb-2 justify-end">
                  <span className="font-bold mr-2">You</span>
                  <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                </div>
                <p>Show me romantic restaurants in Paris with great views</p>
              </div>
            </div>
            
            <div className="mb-4 fade-in">
              <div className="chat-bubble-ai bg-indigo-100 text-gray-800 p-4 max-w-3xl">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                    <FaRobot className="text-indigo-600" />
                  </div>
                  <span className="font-bold">Vibe Navigator</span>
                </div>
                <p className="mb-2">Here are some wonderfully romantic restaurants in Paris with breathtaking views:</p>
                
                <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-200">
                  <h4 className="font-bold mb-1">Le Jules Verne</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">💖 Romantic</span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">🗼 Eiffel Tower Views</span>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">🍽️ Fine Dining</span>
                  </div>
                  <p className="text-sm mb-2">"The view from the Eiffel Tower is magical at night, and the food is exquisite. Perfect for special occasions." - Google Maps review</p>
                  <button className="text-indigo-600 text-xs font-medium hover:underline">View 3 citations</button>
                </div>
                
                <div className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-gray-200">
                  <h4 className="font-bold mb-1">Les Ombres</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">💖 Romantic</span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">🏛️ Museum Terrace</span>
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">🌇 Sunset Views</span>
                  </div>
                  <p className="text-sm mb-2">"The terrace has an incredible panorama of Paris. Came for our anniversary and it was unforgettable." - Reddit user</p>
                  <button className="text-indigo-600 text-xs font-medium hover:underline">View 5 citations</button>
                </div>
                
                <p className="mt-2">Would you like more options or details about any of these?</p>
              </div>
            </div>

            {messages.map((message, index) => (
              <div key={index} className="mb-4 fade-in">
                {message.type === 'user' ? (
                  <div className="chat-bubble-user bg-indigo-600 text-white p-4 max-w-3xl ml-auto">
                    <div className="flex items-center mb-2 justify-end">
                      <span className="font-bold mr-2">You</span>
                      <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                    </div>
                    <p>{message.content}</p>
                  </div>
                ) : (
                  <div className="chat-bubble-ai bg-indigo-100 text-gray-800 p-4 max-w-3xl">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                        <FaRobot className="text-indigo-600" />
                      </div>
                      <span className="font-bold">Vibe Navigator</span>
                    </div>
                    <p className="mb-2">{message.content}</p>
                    
                    {message.recommendations && message.recommendations.map((rec, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-200">
                        <h4 className="font-bold mb-1">{rec.name}</h4>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {rec.tags.map((tag, j) => (
                            <span key={j} className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm mb-2">"{rec.review}" - Verified review</p>
                        <button className="text-indigo-600 text-xs font-medium hover:underline">
                          View {rec.citations} citations
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="mb-4">
                <div className="chat-bubble-ai bg-indigo-100 text-gray-800 p-4 max-w-xs">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 pulse-animation"></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 pulse-animation" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-indigo-400 pulse-animation" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about any place..." 
                className="flex-1 border border-gray-300 rounded-l-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-indigo-600 text-white px-6 rounded-r-full hover:bg-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
              >
                <FaPaperPlane />
              </button>
            </form>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>Powered by Groq/Llama3 & ChromaDB</span>
              <span>Vibe Navigator v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;