import React from 'react';
import { motion } from 'framer-motion';

/**
 * HoverCard - An interactive card component with fluid hover animations
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.hoverEffect - Optional custom hover effect
 * @param {boolean} props.active3D - Enable 3D perspective effect
 * @param {string} props.backgroundColor - Background color (supports Tailwind classes)
 * @param {string} props.textColor - Text color (supports Tailwind classes)
 * @param {string} props.borderColor - Border color (supports Tailwind classes)
 * @param {function} props.onClick - Optional click handler
 */
const HoverCard = ({ 
  children, 
  className = '',
  hoverEffect = {},
  active3D = true,
  backgroundColor = 'bg-white dark:bg-gray-800',
  textColor = 'text-gray-800 dark:text-white',
  borderColor = 'border-gray-100 dark:border-gray-700',
  onClick = () => {},
  ...props 
}) => {
  // Default hover effects
  const defaultHoverEffect = {
    scale: 1.02,
    rotateX: active3D ? 5 : 0,
    rotateY: active3D ? 5 : 0,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  };

  // Combine default hover effects with custom ones
  const combinedHoverEffect = { ...defaultHoverEffect, ...hoverEffect };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border transition-all ${backgroundColor} ${textColor} ${borderColor} ${className}`}
      initial={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
      whileHover={combinedHoverEffect}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      }}
      onClick={onClick}
      style={{ perspective: active3D ? '1000px' : 'none' }}
      {...props}
    >
      {/* Optional 3D perspective container */}
      {active3D ? (
        <motion.div 
          className="relative z-10 p-6"
          whileHover={{ z: 10 }}
        >
          {children}
        </motion.div>
      ) : (
        <div className="relative z-10 p-6">
          {children}
        </div>
      )}
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-white dark:via-indigo-500/10 dark:to-purple-500/10 opacity-0 rounded-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default HoverCard; 