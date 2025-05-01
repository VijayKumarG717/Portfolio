/**
 * Theme configuration for the portfolio
 * Includes color palettes, spacing, typography, and other design tokens
 */

// Main color palette
export const colors = {
  // Primary colors
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Indigo 500 - Main primary color
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },
  
  // Secondary colors
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6', // Violet 500
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065',
  },
  
  // Accent colors
  accent: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Blue 500
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b', // Slate 500
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Muted peach for subtle accents
  peach: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Orange 500
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  }
};

// Gradients
export const gradients = {
  primary: 'linear-gradient(90deg, #4f46e5 0%, #6366f1 100%)',
  secondary: 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 100%)',
  accent: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
  peach: 'linear-gradient(90deg, #ea580c 0%, #f97316 100%)',
  
  // Multi-color gradients
  indigo: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
  violet: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
  sunset: 'linear-gradient(135deg, #7c3aed 0%, #f97316 100%)',
  ocean: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
  
  // Glassmorphism gradient background
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Colored shadows
  'primary-glow': '0 0 15px rgba(99, 102, 241, 0.5)',
  'secondary-glow': '0 0 15px rgba(139, 92, 246, 0.5)',
  
  // Inner shadows
  'inner-sm': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  'inner-md': 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // Full rounded (circle for square elements)
};

// Animation durations
export const durations = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Animation easings
export const easings = {
  easeOut: [0.16, 1, 0.3, 1],  // A nice, smooth ease out
  easeOutBack: [0.34, 1.56, 0.64, 1],  // Eases out with a slight overshoot
  easeInOut: [0.65, 0, 0.35, 1],  // Smooth ease in and out
  easeIn: [0.67, 0, 0.34, 1],  // Smooth ease in only
};

// Font weights
export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Layout
export const layout = {
  maxWidth: '1200px',
  contentPadding: '1.5rem',
  sectionSpacing: '5rem',
  elementSpacing: '1.5rem',
}; 