import React from 'react';
import { motion } from 'framer-motion';
import { AnimateOnScroll } from './animations/ScrollAnimationProvider';
import { ProjectCard } from './ui/InteractiveElements';
import { staggerContainer } from './animations/animationUtils';

const ProjectsSection = ({
  title = "Featured Projects",
  subtitle = "Check out some of my recent work",
  projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include product search, filtering, user authentication, and payment processing.",
      imageUrl: "https://example.com/project1.jpg",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project1"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A responsive task management application with drag-and-drop functionality, user roles, and real-time updates using WebSockets.",
      imageUrl: "https://example.com/project2.jpg",
      tags: ["React", "Firebase", "Tailwind CSS", "Socket.io"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project2"
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "A web application that uses OpenAI's GPT to generate various types of content based on user prompts.",
      imageUrl: "https://example.com/project3.jpg",
      tags: ["React", "Node.js", "OpenAI API", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/project3"
    }
  ]
}) => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <AnimateOnScroll
          variant="fadeIn"
          direction="up"
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            {title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </AnimateOnScroll>
        
        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <AnimateOnScroll
              key={project.id}
              variant="fadeIn"
              direction="up"
              delay={index * 0.1}
              className="h-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl || `https://via.placeholder.com/600x400?text=${encodeURIComponent(project.title)}`}
                tags={project.tags}
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                className="h-full"
              />
            </AnimateOnScroll>
          ))}
        </motion.div>
        
        {/* View More Button */}
        <AnimateOnScroll
          variant="fadeIn"
          direction="up"
          delay={0.3}
          className="text-center mt-12"
        >
          <motion.a
            href="/projects"
            className="inline-block bg-transparent border-2 border-indigo-500 text-indigo-500 px-6 py-3 rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
          </motion.a>
        </AnimateOnScroll>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
      </div>
    </section>
  );
};

export default ProjectsSection; 