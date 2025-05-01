import React, { useRef, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { shouldReduceMotion } from './animationUtils';

// Import ambient animations
import butterflyAnimation from '../../assets/animations/butterfly.json';
import particlesAnimation from '../../assets/animations/particles.json';
import geometricAnimation from '../../assets/animations/geometric.json';

const ANIMATION_TYPES = {
  BUTTERFLIES: 'butterflies',
  PARTICLES: 'particles',
  GEOMETRIC: 'geometric',
  CUSTOM: 'custom'
};

const AmbientBackground = ({
  type = ANIMATION_TYPES.PARTICLES,
  opacity = 0.2,
  speed = 1,
  customAnimation = null,
  className = '',
  zIndex = -1,
  enabled = true,
  color = 'indigo'
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const reducedMotion = shouldReduceMotion();
  
  // Don't render if animations should be disabled
  if (!enabled || reducedMotion) {
    return null;
  }
  
  // Get animation data based on type
  const getAnimationData = () => {
    switch (type) {
      case ANIMATION_TYPES.BUTTERFLIES:
        return butterflyAnimation;
      case ANIMATION_TYPES.GEOMETRIC:
        return geometricAnimation;
      case ANIMATION_TYPES.CUSTOM:
        return customAnimation;
      case ANIMATION_TYPES.PARTICLES:
      default:
        return particlesAnimation;
    }
  };
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    // Initial update
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Create floating elements if not using Lottie
  const [floatingElements, setFloatingElements] = useState([]);
  
  useEffect(() => {
    if (type === 'custom' && !customAnimation) {
      // Create random floating elements
      const elements = [];
      const count = Math.floor((dimensions.width * dimensions.height) / 40000);
      
      for (let i = 0; i < count; i++) {
        elements.push({
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          size: Math.random() * 20 + 10,
          duration: (Math.random() * 10 + 20) / speed,
          delay: Math.random() * 5
        });
      }
      
      setFloatingElements(elements);
    }
  }, [dimensions, type, customAnimation, speed]);
  
  // Generate color class based on the color prop
  const colorClass = `text-${color}-500`;
  
  // Get the right Lottie animation or render custom elements
  if (type === 'custom' && !customAnimation) {
    return (
      <div
        ref={containerRef}
        className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
        style={{ zIndex, opacity }}
      >
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute rounded-full ${colorClass} mix-blend-multiply filter blur-xl`}
            style={{
              left: element.x,
              top: element.y,
              width: element.size,
              height: element.size
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 25, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              repeat: Infinity,
              duration: element.duration,
              delay: element.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex, opacity }}
    >
      <Lottie
        animationData={getAnimationData()}
        loop={true}
        autoplay={true}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export { ANIMATION_TYPES };
export default AmbientBackground; 