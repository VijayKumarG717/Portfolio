import React, { useState, useEffect } from 'react';
import { ScrollAnimationProvider } from './animations/ScrollAnimationProvider';
import { motion, AnimatePresence } from 'framer-motion';

// Animation toggle button component
const AnimationToggle = ({ enabled, setEnabled }) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg
                flex items-center justify-center hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setEnabled(!enabled)}
      aria-label={enabled ? "Disable animations" : "Enable animations"}
    >
      {enabled ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 0 0 16 0 3 3 0 010-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )}
    </motion.button>
  );
};

// Theme toggle button component
const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg
                flex items-center justify-center hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </motion.button>
  );
};

// Smooth page transitions
const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const PortfolioWrapper = ({ children }) => {
  // State for dark mode and animation toggle
  const [darkMode, setDarkMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Check system preferences for dark mode on mount (client-side only)
  useEffect(() => {
    setMounted(true);
    
    // Check for dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Check for saved preference in localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }
    
    // Check for animation preference
    const savedAnimationPref = localStorage.getItem('animationsEnabled');
    if (savedAnimationPref !== null) {
      setAnimationsEnabled(savedAnimationPref === 'true');
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimationsEnabled(false);
    }
  }, []);
  
  // Update theme class on body and save preference
  useEffect(() => {
    if (!mounted) return;
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode, mounted]);
  
  // Save animation preference
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('animationsEnabled', animationsEnabled.toString());
  }, [animationsEnabled, mounted]);
  
  // Don't render anything during SSR to avoid hydration mismatch
  if (!mounted) return null;
  
  return (
    <ScrollAnimationProvider 
      inViewThreshold={0.1} 
      animationDelay={animationsEnabled ? 0.2 : 0}
    >
      <div className={`antialiased bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <AnimatePresence mode="wait">
          <motion.main
            key="page"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        
        {/* UI Controls */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <AnimationToggle enabled={animationsEnabled} setEnabled={setAnimationsEnabled} />
      </div>
    </ScrollAnimationProvider>
  );
};

export default PortfolioWrapper; 