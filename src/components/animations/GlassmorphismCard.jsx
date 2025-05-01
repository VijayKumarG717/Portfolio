import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassmorphismCard - A modern card component with glassmorphism effects
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.blur - Backdrop blur amount (px)
 * @param {number} props.opacity - Background opacity (0-100)
 * @param {string} props.borderColor - Border color (supports Tailwind classes)
 * @param {string} props.glowColor - Glow effect color
 * @param {boolean} props.hoverable - Enable hover animations
 */
const GlassmorphismCard = ({
  children,
  className = '',
  blur = 10,
  opacity = 10,
  borderColor = 'border-white/10',
  glowColor = 'from-indigo-500/10 to-purple-500/10',
  hoverable = true,
  ...props
}) => {
  return (
    <motion.div
      className={`relative border rounded-2xl overflow-hidden isolate ${borderColor} ${className}`}
      initial={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={hoverable ? { 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      } : {}}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      }}
      {...props}
    >
      {/* Glass background */}
      <div 
        className={`absolute inset-0 bg-white/5 dark:bg-black/5 backdrop-blur-[${blur}px] -z-10`}
        style={{ 
          backdropFilter: `blur(${blur}px)`,
          backgroundColor: `rgba(255, 255, 255, ${opacity / 100})`,
        }}
      />
      
      {/* Background gradient/glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${glowColor} opacity-30 -z-10`} />
      
      {/* Card content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Edge highlight */}
      <motion.div 
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        initial={{ opacity: 0.3 }}
        whileHover={{ opacity: 0.5 }}
      />
      
      {/* Interactive hover glow effect */}
      {hoverable && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-tr ${glowColor} opacity-0 -z-5`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default GlassmorphismCard; 