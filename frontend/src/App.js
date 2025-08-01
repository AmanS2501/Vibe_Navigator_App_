import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Demo from './components/Demo/Demo';
import TechStack from './components/TechStack/TechStack';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Demo />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;