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

// Detect if reduced motion is preferred
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
