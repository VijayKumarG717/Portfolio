import React from 'react';
import { motion } from 'framer-motion';
import { buttonHoverVariants, cardHoverVariants } from '../animations/animationUtils';

// Interactive button with animations
export const AnimatedButton = ({
  children,
  variant = 'primary',
  hoverEffect = 'scaleWithShadow',
  className = '',
  ...props
}) => {
  // Base button styles
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50";
  
  // Variant specific styles
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400",
    outline: "bg-transparent border-2 border-indigo-500 text-indigo-500 hover:text-white hover:bg-indigo-500 focus:ring-indigo-400",
    ghost: "bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-400"
  };
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={buttonHoverVariants[hoverEffect]}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Interactive card with animations
export const AnimatedCard = ({
  children,
  hoverEffect = 'subtle',
  className = '',
  ...props
}) => {
  // Base card styles
  const baseStyles = "bg-white dark:bg-slate-800 rounded-xl p-6 transition-all duration-300";
  
  // Add glassmorphism effect if desired
  const glassmorphismClass = props.glassmorphism 
    ? "bg-opacity-70 dark:bg-opacity-70 backdrop-blur-lg" 
    : "";
  
  // Remove glassmorphism from props so it doesn't get passed to the DOM
  const { glassmorphism, ...restProps } = props;
  
  return (
    <motion.div
      className={`${baseStyles} ${glassmorphismClass} ${className}`}
      whileHover={cardHoverVariants[hoverEffect]}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

// Animated link with underline effect
export const AnimatedLink = ({
  children,
  href,
  className = '',
  underlineColor = 'indigo', 
  ...props
}) => {
  // Base link styles
  const baseStyles = "relative inline-block font-medium";
  
  // Color options for the underline
  const colorMap = {
    indigo: "bg-indigo-500",
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    slate: "bg-slate-500"
  };
  
  const underlineColorClass = colorMap[underlineColor] || colorMap.indigo;
  
  return (
    <motion.a
      href={href}
      className={`${baseStyles} ${className}`}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
      <motion.span
        className={`absolute left-0 bottom-0 h-0.5 w-0 ${underlineColorClass}`}
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

// Project card with image hover effect
export const ProjectCard = ({
  title,
  description,
  imageUrl,
  tags = [],
  liveUrl,
  githubUrl,
  className = '',
  ...props
}) => {
  return (
    <AnimatedCard
      hoverEffect="medium"
      className={`overflow-hidden ${className}`}
      {...props}
    >
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-video">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4 mt-auto">
        {liveUrl && (
          <AnimatedLink href={liveUrl} underlineColor="indigo">
            Live Demo
          </AnimatedLink>
        )}
        {githubUrl && (
          <AnimatedLink href={githubUrl} underlineColor="slate">
            View Code
          </AnimatedLink>
        )}
      </div>
    </AnimatedCard>
  );
};

// Navigation link with hover animation
export const NavLink = ({
  children,
  href,
  active = false,
  className = '',
  ...props
}) => {
  // Base nav link styles
  const baseStyles = "px-4 py-2 relative";
  const activeStyles = active 
    ? "font-semibold text-indigo-600 dark:text-indigo-400" 
    : "text-slate-700 dark:text-slate-200";
  
  return (
    <motion.a
      href={href}
      className={`${baseStyles} ${activeStyles} ${className}`}
      whileHover={{ scale: 1.05 }}
      {...props}
    >
      {children}
      {active && (
        <motion.span 
          className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 dark:bg-indigo-400"
          layoutId="navIndicator"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
        />
      )}
    </motion.a>
  );
}; 