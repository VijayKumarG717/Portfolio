import React from 'react';
import PortfolioWrapper from '../components/PortfolioWrapper';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import { AnimateOnScroll } from '../components/animations/ScrollAnimationProvider';
import { AnimatedButton, AnimatedLink } from '../components/ui/InteractiveElements';
import { motion } from 'framer-motion';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form Card */}
          <AnimateOnScroll
            variant="fadeIn"
            direction="left"
            delay={0.2}
            className="h-full"
          >
            <motion.div 
              className="rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-700 h-full relative"
              whileHover="hover"
              initial="initial"
              variants={{
                initial: { boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)' },
                hover: { boxShadow: '0 20px 40px -20px rgba(99, 102, 241, 0.4)' }
              }}
            >
              {/* Blinking border effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none" 
                variants={{
                  initial: { 
                    boxShadow: '0 0 0 0 rgba(99, 102, 241, 0)' 
                  },
                  hover: { 
                    boxShadow: ['0 0 0 2px rgba(99, 102, 241, 0.3)', 
                                '0 0 0 4px rgba(99, 102, 241, 0.2)', 
                                '0 0 0 2px rgba(99, 102, 241, 0.3)'],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
              />

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Send a Message</h3>
                <form className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-800 dark:text-gray-200">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-800 dark:text-gray-200">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-gray-800 dark:text-gray-200">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              </div>
            </motion.div>
          </AnimateOnScroll>

          {/* Contact Information Card */}
          <AnimateOnScroll
            variant="fadeIn"
            direction="right"
            delay={0.4}
            className="h-full"
          >
            <motion.div 
              className="rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white h-full relative"
              whileHover="hover"
              initial="initial"
              variants={{
                initial: { boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)' },
                hover: { boxShadow: '0 20px 40px -20px rgba(99, 102, 241, 0.6)' }
              }}
            >
              {/* Blinking border effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none" 
                variants={{
                  initial: { 
                    boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' 
                  },
                  hover: { 
                    boxShadow: ['0 0 0 2px rgba(255, 255, 255, 0.3)', 
                                '0 0 0 4px rgba(255, 255, 255, 0.2)', 
                                '0 0 0 2px rgba(255, 255, 255, 0.3)'],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
              />

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Email</h4>
                      <a href="mailto:example@domain.com" className="hover:underline">example@domain.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Phone</h4>
                      <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Location</h4>
                      <p>San Francisco, CA</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Connect</h4>
                  <div className="flex space-x-4">
                    <motion.a 
                      href="#" 
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimateOnScroll>
        </div>
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