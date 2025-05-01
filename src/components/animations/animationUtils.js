// Motion variants for staggered animations
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Common animation variants
export const fadeIn = (direction = 'up', delay = 0, duration = 0.5) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: { x: 0, y: 0 }
  };

  return {
    hidden: {
      ...directions[direction],
      opacity: 0
    },
    show: {
      ...directions.none,
      opacity: 1,
      transition: {
        type: 'spring',
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Zoom in animation variant
export const zoomIn = (delay = 0, duration = 0.5) => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut'
      }
    }
  };
};

// Text animation variant
export const textVariant = (delay = 0.2) => {
  return {
    hidden: {
      y: 20,
      opacity: 0
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        delay
      }
    }
  };
};

// Detect if reduced motion is preferred
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Button hover animation variants
export const buttonHoverVariants = {
  scale: { scale: 1.05 },
  scaleWithShadow: { 
    scale: 1.05, 
    boxShadow: '0 10px 20px -10px rgba(99, 102, 241, 0.5)' 
  },
  glow: { 
    boxShadow: '0 0 10px 2px rgba(99, 102, 241, 0.5)' 
  },
  underline: { 
    textDecoration: 'underline',
    textDecorationColor: 'rgb(99, 102, 241)' 
  }
};

// Card hover animation variants
export const cardHoverVariants = {
  raise: { 
    y: -10,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  glow: { 
    boxShadow: '0 0 20px 1px rgba(99, 102, 241, 0.3)' 
  },
  border: { 
    borderColor: 'rgb(99, 102, 241)' 
  }
};
