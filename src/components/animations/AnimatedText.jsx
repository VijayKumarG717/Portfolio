import React from 'react';
import { motion } from 'framer-motion';
import { textContainer, textCharacter, shouldReduceMotion } from './animationUtils';

/**
 * AnimatedText - Component for creating animated text effects
 * 
 * @param {Object} props
 * @param {string} props.text - Text to animate
 * @param {string} props.type - Animation type: 'chars' or 'words' or 'heading'
 * @param {string} props.className - Additional CSS classes
 */
const AnimatedText = ({ 
  text,
  type = 'heading',
  className = 'text-4xl font-bold',
  ...props
}) => {
  // Check if user prefers reduced motion
  const reducedMotion = shouldReduceMotion();
  
  // For simple fade-in without character-by-character animation
  if (reducedMotion || type === 'heading') {
    return (
      <motion.h2
        className={`${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          ease: 'easeOut'
        }}
        {...props}
      >
        {text}
      </motion.h2>
    );
  }
  
  // For word-by-word animation
  if (type === 'words') {
    const words = text.split(' ');
    
    return (
      <motion.p
        className={`${className} inline-block`}
        variants={textContainer}
        initial="hidden"
        animate="show"
        {...props}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block mr-1"
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: {
                  type: 'spring',
                  damping: 12,
                  stiffness: 100,
                  delay: index * 0.1
                }
              }
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.p>
    );
  }
  
  // Default: Character-by-character animation
  return (
    <motion.p
      className={`${className} inline-block`}
      variants={textContainer}
      initial="hidden"
      animate="show"
      {...props}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          variants={textCharacter}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default AnimatedText; 