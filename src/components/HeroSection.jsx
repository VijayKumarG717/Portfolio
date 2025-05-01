import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from './animations/ScrollAnimationProvider';
import { AnimatedButton } from './ui/InteractiveElements';
import BackgroundAnimation from './animations/BackgroundAnimation';
import { shouldReduceMotion } from './animations/animationUtils';

const HeroSection = ({ 
  title = "Hi, I'm [Your Name]", 
  subtitle = "Full Stack Developer",
  description = "I build modern, responsive web applications with React, Node.js, and more.",
  ctaText = "View My Work",
  ctaLink = "#projects",
  secondaryCtaText = "Contact Me",
  secondaryCtaLink = "#contact",
  enableParticles = true 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const reducedMotion = shouldReduceMotion();
  
  // Mount animation for SSR compatibility
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) return null;
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      {enableParticles && <BackgroundAnimation 
        type="particles" 
        color="indigo" 
        density={50} 
        showButterflies={true} 
        enabled={!reducedMotion}
      />}
      
      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <AnimatedText 
                type="characters" 
                staggerChildren={0.02} 
                className="text-gray-800 dark:text-white"
              >
                {title}
              </AnimatedText>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-medium mb-6 text-indigo-600 dark:text-indigo-400">
              <AnimatedText 
                type="words" 
                delay={0.4} 
                staggerChildren={0.03}
              >
                {subtitle}
              </AnimatedText>
            </h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {description}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <AnimatedButton 
                variant="primary" 
                hoverEffect="scaleWithShadow"
                onClick={() => document.querySelector(ctaLink).scrollIntoView({ behavior: 'smooth' })}
              >
                {ctaText}
              </AnimatedButton>
              
              <AnimatedButton 
                variant="outline" 
                hoverEffect="scale"
                onClick={() => document.querySelector(secondaryCtaLink).scrollIntoView({ behavior: 'smooth' })}
              >
                {secondaryCtaText}
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-indigo-500 rounded-full flex justify-center p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            repeatType: "loop", 
            ease: "easeInOut" 
          }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-indigo-500 rounded-full" 
            animate={{ y: [0, 20, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              repeatType: "loop", 
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-500 rounded-full filter blur-[100px] opacity-20" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-500 rounded-full filter blur-[120px] opacity-20" />
    </section>
  );
};

export default HeroSection; 