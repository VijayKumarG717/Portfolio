import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeIn, zoomIn, textVariant, shouldReduceMotion } from './animationUtils';

// Utility function to adapt variants for reduced motion
const getReducedMotionVariants = (variants) => {
  if (shouldReduceMotion()) {
    return {
      hidden: { opacity: 0 },
      show: { 
        opacity: 1,
        transition: { duration: 0.5 }
      }
    };
  }
  return variants;
};

// Create context for animations
const ScrollAnimationContext = createContext({
  inViewThreshold: 0.1,
  animationDelay: 0.2
});

// Provider component
export const ScrollAnimationProvider = ({ 
  children, 
  inViewThreshold = 0.1, 
  animationDelay = 0.2 
}) => {
  return (
    <ScrollAnimationContext.Provider value={{ inViewThreshold, animationDelay }}>
      {children}
    </ScrollAnimationContext.Provider>
  );
};

// Hook to use the scroll animation context
export const useScrollAnimation = () => useContext(ScrollAnimationContext);

// Animated component that animates when scrolled into view
export const AnimateOnScroll = ({
  children,
  variant = 'fadeIn',
  direction = 'up',
  delay = null,
  duration = 0.5,
  className = '',
  ...props
}) => {
  const controls = useAnimation();
  const { inViewThreshold, animationDelay } = useScrollAnimation();
  const [ref, inView] = useInView({ 
    threshold: inViewThreshold,
    triggerOnce: true 
  });
  
  // Use the provided delay or the context delay
  const actualDelay = delay !== null ? delay : animationDelay;
  
  // Get animation variants based on type
  const getVariants = () => {
    switch (variant) {
      case 'fadeIn':
        return getReducedMotionVariants(fadeIn(direction, actualDelay, duration));
      case 'zoomIn':
        return getReducedMotionVariants(zoomIn(actualDelay, duration));
      case 'textVariant':
        return getReducedMotionVariants(textVariant(actualDelay));
      default:
        return getReducedMotionVariants(fadeIn(direction, actualDelay, duration));
    }
  };
  
  useEffect(() => {
    if (inView) {
      controls.start('show');
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Export a specialized text animation component
export const AnimatedText = ({ 
  children, 
  className = '', 
  delay = 0.2, 
  staggerChildren = 0.02,
  type = 'words',
  ...props 
}) => {
  if (type === 'characters') {
    return (
      <motion.p
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: staggerChildren,
              delayChildren: delay
            }
          }
        }}
        {...props}
      >
        {Array.from(children).map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  damping: 12
                }
              }
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.p>
    );
  }
  
  // Split text into words
  const words = children.split(' ');
  
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren * 3,
            delayChildren: delay
          }
        }
      }}
      {...props}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  damping: 12
                }
              }
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {index !== words.length - 1 && '\u00A0'}
        </React.Fragment>
      ))}
    </motion.p>
  );
}; 