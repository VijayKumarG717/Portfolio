import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedLink } from './InteractiveElements';

const AnimatedProjectCard = ({
  title,
  description,
  imageUrl,
  tags = [],
  liveUrl,
  githubUrl,
  technologies = [],
  className = '',
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-700 bg-white dark:bg-gray-800 h-full ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      {...props}
    >
      {/* Project Image with Hover Effect */}
      <div className="relative w-full aspect-video overflow-hidden">
        <motion.div
          className="w-full h-full"
          animate={{
            scale: hovered ? 1.05 : 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          <img 
            src={imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(title)}`}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Hover Overlay with Links */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hovered ? 1 : 0,
              transition: { duration: 0.3 }
            }}
          >
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.a>
            )}
            
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Code
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title with animated underline */}
        <div className="relative inline-block mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: hovered ? '100%' : '30%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="text-gray-500 dark:text-gray-400"
                whileHover={{ scale: 1.1, color: '#6366f1' }}
              >
                {typeof tech === 'string' ? (
                  <span>{tech}</span>
                ) : (
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    title={tech.name} 
                    className="w-6 h-6"
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Card Border Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        initial={{ 
          boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' 
        }}
        animate={{ 
          boxShadow: hovered 
            ? '0 0 20px 2px rgba(99, 102, 241, 0.3)' 
            : '0 0 0 0 rgba(99, 102, 241, 0)' 
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default AnimatedProjectCard; 