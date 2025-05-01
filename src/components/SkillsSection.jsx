import React from 'react';
import { motion } from 'framer-motion';
import { AnimateOnScroll } from './animations/ScrollAnimationProvider';
import { AnimatedCard } from './ui/InteractiveElements';

// Skill category data
const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'GraphQL', level: 65 }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Others',
    icon: '🔧',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'AWS', level: 70 },
      { name: 'Jest', level: 80 },
      { name: 'CI/CD', level: 75 }
    ]
  }
];

// Individual Skill Item with Progress Bar
const SkillItem = ({ name, level, index }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1, 
            delay: index * 0.1 + 0.3,
            ease: [0.34, 1.56, 0.64, 1] // easeOutBack
          }}
        />
      </div>
    </div>
  );
};

// Skill Category Card
const SkillCategory = ({ category, delay }) => {
  return (
    <AnimateOnScroll
      variant="zoomIn"
      delay={delay}
      className="h-full"
    >
      <AnimatedCard 
        hoverEffect="tilt3D" 
        className="h-full"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">{category.icon}</span>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {category.title}
            </h3>
          </div>
          
          <div className="flex-grow">
            {category.skills.map((skill, idx) => (
              <SkillItem 
                key={skill.name} 
                name={skill.name} 
                level={skill.level} 
                index={idx}
              />
            ))}
          </div>
        </div>
      </AnimatedCard>
    </AnimateOnScroll>
  );
};

// Interactive Skill Bubble for Floating Animation
const SkillBubble = ({ skill, index }) => {
  // Random positions and animations
  const xPosition = Math.random() * 100;
  const size = Math.random() * 20 + 40;
  const delay = Math.random() * 2;
  
  return (
    <motion.div
      className="absolute rounded-full bg-indigo-100 dark:bg-indigo-900/30 
                 flex items-center justify-center text-indigo-800 dark:text-indigo-200
                 font-medium px-3 py-1 text-sm backdrop-blur-sm"
      style={{ 
        left: `${xPosition}%`,
        width: size,
        height: size
      }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: [100, -100],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        y: { 
          duration: 10 + Math.random() * 5,
          repeat: Infinity,
          ease: "linear",
          delay
        },
        opacity: {
          duration: 3,
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          delay
        }
      }}
    >
      {skill}
    </motion.div>
  );
};

// Main Skills Section Component
const SkillsSection = () => {
  // List of skill names for the floating animation
  const floatingSkills = [
    'React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
    'Tailwind', 'MongoDB', 'Express', 'Git', 'AWS', 'Docker'
  ];
  
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingSkills.map((skill, index) => (
          <SkillBubble key={index} skill={skill} index={index} />
        ))}
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        {/* Section Header */}
        <AnimateOnScroll
          variant="fadeIn"
          direction="up"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            My Skills
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are the technologies and tools I specialize in
          </p>
        </AnimateOnScroll>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory 
              key={category.id} 
              category={category} 
              delay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 