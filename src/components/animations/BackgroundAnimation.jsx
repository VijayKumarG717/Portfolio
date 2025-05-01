import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { shouldReduceMotion } from './animationUtils';

const BackgroundAnimation = ({ 
  type = 'particles', 
  color = 'indigo', 
  density = 50,
  showButterflies = false,
  enabled = true
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  const reducedMotion = shouldReduceMotion();

  // Don't render animation if disabled or if user prefers reduced motion
  if (!enabled || reducedMotion) {
    return null;
  }

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    // Initial dimension setup
    updateDimensions();

    // Update dimensions on resize
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Configure particles based on type
    let particles = [];
    let colorOptions;
    
    switch(color) {
      case 'blue':
        colorOptions = ['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.2)', 'rgba(30, 64, 175, 0.15)'];
        break;
      case 'violet':
        colorOptions = ['rgba(139, 92, 246, 0.2)', 'rgba(124, 58, 237, 0.2)', 'rgba(109, 40, 217, 0.15)'];
        break;
      case 'indigo':
      default:
        colorOptions = ['rgba(99, 102, 241, 0.2)', 'rgba(79, 70, 229, 0.2)', 'rgba(67, 56, 202, 0.15)'];
        break;
    }
    
    // Create particles
    for (let i = 0; i < density; i++) {
      const size = Math.random() * 5 + 1;
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: size,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
    
    // Create butterflies if enabled
    const butterflies = showButterflies ? createButterflies(5) : [];
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around canvas
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.y > dimensions.height) particle.y = 0;
        if (particle.y < 0) particle.y = dimensions.height;
      });
      
      // Draw and update butterflies if enabled
      if (showButterflies) {
        drawButterflies(ctx, butterflies);
        updateButterflies(butterflies, dimensions);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, color, density, showButterflies]);
  
  // Create butterfly objects
  function createButterflies(count) {
    const butterflies = [];
    const butterflyColors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#C084FC', // Lavender
      '#4F46E5'  // Indigo
    ];
    
    for (let i = 0; i < count; i++) {
      butterflies.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 20 + 10,
        color: butterflyColors[Math.floor(Math.random() * butterflyColors.length)],
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        wingAngle: 0,
        wingDirection: 1,
        wanderAngle: Math.random() * Math.PI * 2
      });
    }
    return butterflies;
  }
  
  // Update butterfly positions
  function updateButterflies(butterflies, dimensions) {
    butterflies.forEach(butterfly => {
      // Wing flapping
      butterfly.wingAngle += 0.1 * butterfly.wingDirection;
      if (butterfly.wingAngle > 0.5 || butterfly.wingAngle < -0.5) {
        butterfly.wingDirection *= -1;
      }
      
      // Random wandering
      butterfly.wanderAngle += (Math.random() * 0.2 - 0.1);
      butterfly.angle += Math.sin(butterfly.wanderAngle) * 0.05;
      
      // Move forward
      butterfly.x += Math.cos(butterfly.angle) * butterfly.speed;
      butterfly.y += Math.sin(butterfly.angle) * butterfly.speed;
      
      // Keep within bounds
      if (butterfly.x > dimensions.width + 50) butterfly.x = -50;
      if (butterfly.x < -50) butterfly.x = dimensions.width + 50;
      if (butterfly.y > dimensions.height + 50) butterfly.y = -50;
      if (butterfly.y < -50) butterfly.y = dimensions.height + 50;
    });
  }
  
  // Draw butterflies
  function drawButterflies(ctx, butterflies) {
    butterflies.forEach(butterfly => {
      ctx.save();
      ctx.translate(butterfly.x, butterfly.y);
      ctx.rotate(butterfly.angle);
      
      // Draw butterfly body
      ctx.beginPath();
      ctx.ellipse(0, 0, butterfly.size / 8, butterfly.size / 2, 0, 0, Math.PI * 2);
      ctx.fillStyle = butterfly.color;
      ctx.fill();
      
      // Draw wings
      const wingSpread = Math.sin(butterfly.wingAngle) * (butterfly.size * 0.8);
      
      // Left wing
      ctx.beginPath();
      ctx.ellipse(-wingSpread, 0, butterfly.size / 2, butterfly.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = butterfly.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      
      // Right wing
      ctx.beginPath();
      ctx.ellipse(wingSpread, 0, butterfly.size / 2, butterfly.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = butterfly.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      
      ctx.restore();
    });
  }
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default BackgroundAnimation; 