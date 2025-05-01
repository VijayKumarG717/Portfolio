import React, { useState, useEffect, useCallback } from 'react';
import Particles from "tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";

// Check for user preference for reduced motion
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * AmbientParticles - Creates an elegant, ambient background with particles
 * that resemble subtle butterflies or floating elements.
 */
const AmbientParticles = ({ className = "" }) => {
  // State to control animation visibility
  const [isVisible, setIsVisible] = useState(!prefersReducedMotion);
  
  // Initialize particles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Handle preference change for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => {
      setIsVisible(!e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Ambient particles options
  const options = {
    fullScreen: {
      enable: false,
      zIndex: -1,
    },
    particles: {
      number: {
        value: 15,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ["#4f46e5", "#8b5cf6", "#ec4899", "#0ea5e9"], // Indigo, purple, pink, blue
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#8b5cf6", // Purple
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 2,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  return (
    <>
      {/* Particles container only rendered when visible */}
      {isVisible && (
        <div 
          className={`fixed inset-0 -z-10 w-full h-full pointer-events-none ${className}`}
        >
          <Particles
            id="ambient-particles"
            className="absolute inset-0"
            init={particlesInit}
            options={options}
          />
        </div>
      )}
      
      {/* Toggle button */}
      <motion.button
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isVisible ? "Disable ambient particles" : "Enable ambient particles"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isVisible ? (
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 12v.01 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
          ) : (
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z M12 9v.01 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z M3 3l18 18" />
          )}
        </svg>
      </motion.button>
    </>
  );
};

export default AmbientParticles; 