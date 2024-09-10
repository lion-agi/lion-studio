import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from "@/common/components/ui/button";
import { useSupabaseAuth } from '@/integrations/supabase';
import MainWebsiteHeader from '@/common/components/header/MainWebsiteHeader';
import { Zap, Cog, Rocket } from 'lucide-react';

const TypewriterEffect = ({ words }) => {
  const [displayText, setDisplayText] = useState(['', '', '']);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (wordIndex < words.length) {
      const word = words[wordIndex];
      if (charIndex < word.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => {
            const newText = [...prev];
            newText[wordIndex] = word.substring(0, charIndex + 1);
            return newText;
          });
          setCharIndex(charIndex + 1);
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        setWordIndex(wordIndex + 1);
        setCharIndex(0);
      }
    }
  }, [wordIndex, charIndex, words]);

  return (
    <div className="flex flex-col items-center">
      {displayText.map((text, index) => (
        <div key={index} className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-2 md:mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            {text}
          </span>
        </div>
      ))}
    </div>
  );
};

const FloatingElement = ({ icon: Icon, top, left, delay }) => (
  <motion.div
    className="absolute text-purple-400"
    style={{ top, left }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
  >
    <Icon size={24} />
  </motion.div>
);

const SubheadingItem = ({ icon: Icon, text, delay }) => (
  <motion.div 
    className="flex items-center space-x-2 text-gray-300"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 1 }}
  >
    <Icon size={20} className="text-purple-400" />
    <span>{text}</span>
  </motion.div>
);

const Home = () => {
  const { session } = useSupabaseAuth();
  const words = ['Intelligent', 'Workflow', 'Automation'];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <MainWebsiteHeader />
      
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 space-y-16 mt-16 md:mt-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <TypewriterEffect words={words} />
        </motion.div>
        
        <div className="space-y-4">
          <SubheadingItem icon={Zap} text="Streamline processes" delay={0.2} />
          <SubheadingItem icon={Cog} text="AI-powered solutions" delay={0.4} />
          <SubheadingItem icon={Rocket} text="Boost productivity" delay={0.6} />
        </div>
        
        <motion.div
          className="relative w-full max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
            <img src="/demo1.jpg" alt="Demo" className="w-full h-auto rounded" />
          </div>
        </motion.div>
        
      </main>
      
      <footer className="bg-gray-800 text-white py-12 px-4 mt-16 md:mt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Interested in Our Alpha?</h2>
          <p className="mb-6">We're currently in alpha stage. Reach out to learn more about Lion Studio.</p>
          <p className="mb-6">Contact us: info@lionagi.ai</p>
          <p className="text-sm text-gray-400">Lion Intelligence LLC</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;