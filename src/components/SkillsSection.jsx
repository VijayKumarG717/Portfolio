import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = () => {
  const languages = [
    "Python",
    "C", 
    "Java (OOP)", 
    "HTML",
    "CSS", 
    "JavaScript"
  ];

  const toolsFrameworks = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "MongoDB",
    "Stripe Integration",
    "Visual Studio Code",
    "Git & GitHub",
    "Prompt Engineering for GPT"
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Languages Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Languages</h3>
              </div>
              
              <motion.ul 
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {languages.map((skill, index) => (
                  <motion.li 
                    key={index}
                    variants={item}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{skill}</span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
          
          {/* Tools & Frameworks Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Tools & Frameworks</h3>
              </div>
              
              <motion.ul 
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {toolsFrameworks.map((skill, index) => (
                  <motion.li 
                    key={index}
                    variants={item}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{skill}</span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 