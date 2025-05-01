import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * ScrollAnimation - Wrapper component that adds scroll-based animations to children
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to animate
 * @param {string} props.animation - Animation type: 'fade', 'slide-up', 'slide-right', 'slide-left', 'zoom', 'rotate'
 * @param {number} props.duration - Animation duration in seconds
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.threshold - Threshold for triggering the animation (0-1)
 * @param {string} props.className - Additional CSS classes
 */
const ScrollAnimation = ({
  children,
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  className = '',
  ...props
}) => {
  // Use react-intersection-observer to detect when element is in view
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  // Define animation variants based on the type
  const getAnimationVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide-up':
        return {
          hidden: { y: 50, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'slide-right':
        return {
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'slide-left':
        return {
          hidden: { x: 50, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'zoom':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 }
        };
      case 'rotate':
        return {
          hidden: { rotate: -10, opacity: 0 },
          visible: { rotate: 0, opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getAnimationVariants()}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut' 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 