# Modern Developer Portfolio with React & Tailwind CSS

A portfolio website featuring elegant animations that enhance user engagement without overwhelming the content. Built with React, Tailwind CSS, and Framer Motion.

## Features

- **Ambient Background Animation** - Particles and optional butterflies
- **Scroll-Based Animations** - Elements animate into view when scrolled
- **Interactive UI Elements** - Buttons, cards, and links with hover animations
- **Accessibility** - All animations respect `prefers-reduced-motion`
- **Dark/Light Theme** - Automatic theme switching

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Technology Stack

- React 
- Tailwind CSS
- Framer Motion
- React Intersection Observer

## 🚀 Live Demo

[https://yourusername.github.io/Portfolio/](https://yourusername.github.io/Portfolio/)

## 📋 Features

- **Responsive Design:** Works seamlessly on devices of all sizes
- **Animated UI Elements:** Smooth transitions and effects for better user experience
- **Interactive Sections:** Projects, skills, and experience presented in an engaging way
- **Contact Form:** Easy way for visitors to get in touch
- **Modern Tech Stack:** Built with HTML5, CSS3, and JavaScript (no frameworks)
- **Scroll-Based Animations** - Elements gracefully animate into view as you scroll down the page
- **Interactive UI Elements** - Buttons, cards, and links with sophisticated hover animations
- **Accessibility-Focused** - All animations respect user preferences with `prefers-reduced-motion` support
- **Dark/Light Theme** - Seamless theme switching with smooth transitions
- **Mobile Responsive** - Optimized for all device sizes
- **Performance Optimized** - Animations are carefully implemented to maintain excellent performance

## 💻 Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts
- AOS (Animate On Scroll) library
- Typed.js for text animations
- **React** - Component-based UI structure
- **Tailwind CSS** - Utility-first styling approach
- **Framer Motion** - Animation library for smooth transitions
- **React Intersection Observer** - For scroll-based animations

## 🛠️ Setup & Deployment

### Local Development

1. Clone this repository:
   ```
   git clone https://github.com/your-username/Portfolio.git
   ```

2. Navigate to the project directory:
   ```
   cd Portfolio
   ```

3. Open the `index.html` file in your browser or use a local development server like Live Server in VSCode.

### GitHub Pages Deployment

1. Create a GitHub repository named `Portfolio`
2. Push your code to the repository:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/Portfolio.git
   git push -u origin main
   ```

3. Go to repository Settings > Pages
4. Under "Source", select the "main" branch
5. Click "Save"
6. Your site will be published at `https://your-username.github.io/Portfolio/`

### Troubleshooting GitHub Pages

If your site doesn't load properly on GitHub Pages:

1. **Check the CSS/JS paths**: Ensure all paths in your HTML file use relative paths with `./` prefix (like `./css/main.css` instead of `/css/main.css`)
2. **Verify .nojekyll file**: Make sure the `.nojekyll` file exists in your repository root to disable Jekyll processing
3. **Check browser console**: Open your site, press F12 to open DevTools, and check the Console tab for errors
4. **Clear cache**: Try clearing your browser cache or open in Incognito/Private mode
5. **Wait for deployment**: GitHub Pages can take a few minutes to update after pushing changes

## 📱 Responsive Design

The portfolio is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## ✨ Customization

Feel free to customize the portfolio to match your preferences:

- **Colors:** Edit the CSS variables in the `:root` selector in `css/main.css`
- **Content:** Update your information in the `index.html` file
- **Images:** Replace the placeholder with your actual profile image
- **Projects:** Add or modify project cards in the Projects section
- **Social Links:** Update the links in the Contact section and footer

## 📄 License

[MIT License](LICENSE.md)

## 👤 Author

- Vijay Kumar G
- LinkedIn: [Vijay Kumar](https://www.linkedin.com/in/vijay-kumar-3423a020b)
- Email: viaykumar160902@gmail.com

---

## ⭐ Acknowledgments

- Font Awesome for the icons
- Google Fonts for the typography
- AOS library for scroll animations
- Typed.js for the typing effect
- Inspiration from modern portfolio designs

Feel free to star this repository if you find it useful!

## 🧩 Animation Components

The project includes several reusable animation components:

### Background Animation
- Canvas-based particle system with customizable colors and density
- Optional butterfly animation for a unique touch
- Toggle to enable/disable for users who prefer minimal motion

### Scroll Animations
- `<AnimateOnScroll>` - Wrapper component that animates children when scrolled into view
- `<AnimatedText>` - Text that animates by character or word for eye-catching headlines
- Uses Intersection Observer for performance

### Interactive UI Components
- `<AnimatedButton>` - Buttons with various hover effects (scale, glow, etc.)
- `<AnimatedCard>` - Cards with subtle hover animations (tilt, scale, etc.)
- `<AnimatedLink>` - Links with animated underline effects

## 🎨 Color Scheme

The portfolio uses a refined color palette:

- **Primary**: Indigo (`#6366f1`) - Clean, professional, and modern
- **Secondary**: Violet (`#8b5cf6`) - Adds creative flair
- **Accent**: Blue (`#3b82f6`) - For highlights and CTAs
- **Neutral**: Gray scale - For text and backgrounds
- **Peach**: (`#f97316`) - For subtle accents

## 🛠️ Tech Stack

- **React** - Component-based UI structure
- **Tailwind CSS** - Utility-first styling approach
- **Framer Motion** - Animation library for smooth transitions
- **React Intersection Observer** - For scroll-based animations

## 📱 Performance Considerations

All animations are designed with performance in mind:

- Canvas-based background animations offer better performance than DOM animations
- Animations are hardware-accelerated where possible (`transform`, `opacity`)
- Reduced motion option disables or simplifies animations for users who prefer it
- Lazy loading of heavier animation components

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Build for production:
   ```
   npm run build
   ```

## 📄 Component Documentation

### AnimateOnScroll

```jsx
<AnimateOnScroll
  variant="fadeIn" // Animation type: fadeIn, zoomIn, textVariant
  direction="up" // For fadeIn: up, down, left, right
  delay={0.2} // Delay before animation starts
  duration={0.5} // Animation duration
>
  <YourComponent />
</AnimateOnScroll>
```

### BackgroundAnimation

```jsx
<BackgroundAnimation
  type="particles" // Animation type
  color="indigo" // Color scheme
  density={50} // Particle density
  showButterflies={true} // Enable butterfly elements
  enabled={true} // Whether animation is active
/>
```

### AnimatedButton

```jsx
<AnimatedButton
  variant="primary" // Button style: primary, secondary, outline, ghost
  hoverEffect="scaleWithShadow" // Effect: scale, scaleWithShadow, bounce, glow
>
  Click Me
</AnimatedButton>
```

## 🌐 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Fallbacks for browsers that don't support advanced CSS features

## 📝 License

MIT License 