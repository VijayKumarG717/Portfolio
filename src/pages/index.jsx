import React from 'react';
import PortfolioWrapper from '../components/PortfolioWrapper';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import { AnimateOnScroll } from '../components/animations/ScrollAnimationProvider';
import { AnimatedButton, AnimatedLink } from '../components/ui/InteractiveElements';

// Example contact section with animation
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll
          variant="fadeIn"
          direction="up"
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </AnimateOnScroll>
        
        <AnimateOnScroll
          variant="zoomIn"
          delay={0.2}
          className="max-w-md mx-auto"
        >
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-800 dark:text-gray-200">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-800 dark:text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-gray-800 dark:text-gray-200">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <AnimatedButton
              variant="primary"
              hoverEffect="glow"
              type="submit"
              className="w-full"
            >
              Send Message
            </AnimatedButton>
          </form>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

// Example header with animated navigation
const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex justify-between items-center h-16 md:h-20">
          <AnimateOnScroll
            variant="fadeIn"
            direction="left"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            Portfolio
          </AnimateOnScroll>
          
          <ul className="flex space-x-1 md:space-x-6">
            {['Home', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <li key={item}>
                <AnimatedLink
                  href={`#${item.toLowerCase()}`}
                  className="px-3 py-2 text-gray-700 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                  underlineColor="indigo"
                >
                  {item}
                </AnimatedLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Example footer with animation
const Footer = () => {
  return (
    <footer className="py-10 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <AnimateOnScroll
          variant="fadeIn"
          direction="up"
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((item) => (
              <AnimatedLink
                key={item}
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                underlineColor="indigo"
              >
                {item}
              </AnimatedLink>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  );
};

// Main page component
const Home = () => {
  return (
    <PortfolioWrapper>
      <Header />
      
      <main>
        <HeroSection 
          title="Hi, I'm Your Name"
          subtitle="Full Stack Developer"
          description="I build modern, responsive web applications with React, Node.js, and more."
          enableParticles={true}
        />
        
        <ProjectsSection />
        
        <SkillsSection />
        
        <ContactSection />
      </main>
      
      <Footer />
    </PortfolioWrapper>
  );
};

export default Home; 