/**
 * Animation utility functions and presets for consistent animations across the portfolio
 */

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

// Zoom animation variant
export const zoomIn = (delay = 0, duration = 0.5) => ({
  hidden: {
    scale: 0.9,
    opacity: 0
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      duration,
      ease: 'easeOut',
      stiffness: 100,
      damping: 14
    }
  }
});

// Text animation variants - letters or words
export const textVariant = (delay = 0) => ({
  hidden: {
    y: 20,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      delay,
      stiffness: 100
    }
  }
});

// Staggered text animation for characters
export const textContainer = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const textCharacter = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100
    }
  }
};

// Card hover animations
export const cardHoverVariants = {
  subtle: {
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  medium: {
    scale: 1.05,
    y: -5,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  rotate: {
    scale: 1.02,
    rotate: 2,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  },
  tilt3D: {
    scale: 1.02,
    rotateX: 5,
    rotateY: 5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { type: 'spring', stiffness: 300, damping: 15 }
  }
};

// Button hover animations
export const buttonHoverVariants = {
  scale: {
    scale: 1.05,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },
  scaleWithShadow: {
    scale: 1.05,
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },
  bounce: {
    y: -5,
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  },
  glow: {
    scale: 1.03,
    textShadow: '0 0 8px rgb(255,255,255,0.5)',
    boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)',
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }
};

// Detect if reduced motion is preferred
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get reduced variants for users who prefer reduced motion
export const getReducedMotionVariants = (regularVariants) => {
  if (shouldReduceMotion()) {
    // Return simplified animations for users who prefer reduced motion
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.5 } }
    };
  }
  
  return regularVariants;
}; 