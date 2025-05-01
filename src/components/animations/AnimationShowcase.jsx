import React from 'react';
import { motion } from 'framer-motion';
import ScrollAnimation from './ScrollAnimation';
import HoverCard from './HoverCard';
import GlassmorphismCard from './GlassmorphismCard';
import AmbientParticles from './AmbientParticles';
import AnimatedText from './AnimatedText';
import { buttonHoverVariants, cardHoverVariants } from './animationUtils';

/**
 * AnimationShowcase - Demonstrates the various animation components available
 * in the portfolio website.
 */
const AnimationShowcase = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background particles */}
      <AmbientParticles />
      
      <div className="container mx-auto px-4">
        <ScrollAnimation 
          animation="slide-up" 
          className="mb-16 text-center"
        >
          <AnimatedText 
            text="Interactive Elements" 
            type="heading"
            className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
          />
          <AnimatedText
            text="Modern animations enhance user experience while maintaining accessibility and performance."
            type="words"
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          />
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Scroll Animation Examples */}
          <div className="space-y-8">
            <ScrollAnimation animation="fade" delay={0.1}>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Scroll Animations
              </h3>
              
              <div className="space-y-4">
                <ScrollAnimation animation="slide-up" delay={0.2}>
                  <div className="bg-indigo-500 text-white p-4 rounded-lg">
                    Slide Up Animation
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="slide-left" delay={0.3}>
                  <div className="bg-purple-500 text-white p-4 rounded-lg">
                    Slide Left Animation
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="slide-right" delay={0.4}>
                  <div className="bg-pink-500 text-white p-4 rounded-lg">
                    Slide Right Animation
                  </div>
                </ScrollAnimation>
                
                <ScrollAnimation animation="zoom" delay={0.5}>
                  <div className="bg-blue-500 text-white p-4 rounded-lg">
                    Zoom Animation
                  </div>
                </ScrollAnimation>
              </div>
            </ScrollAnimation>
          </div>
          
          {/* Hover Card Examples */}
          <ScrollAnimation animation="slide-up" delay={0.2}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Hover Cards
            </h3>
            
            <div className="space-y-6">
              <HoverCard 
                className="shadow-lg border"
                backgroundColor="bg-gradient-to-br from-indigo-500 to-purple-600"
                textColor="text-white"
                borderColor="border-indigo-400"
                hoverEffect={cardHoverVariants.tilt3D}
              >
                <h4 className="text-xl font-bold mb-2">3D Hover Effect</h4>
                <p>Hover over this card to see the interactive 3D effect.</p>
              </HoverCard>
              
              <HoverCard 
                className="shadow-lg"
                active3D={false}
                backgroundColor="bg-gradient-to-br from-green-500 to-emerald-600"
                textColor="text-white"
                borderColor="border-green-400"
                hoverEffect={cardHoverVariants.rotate}
              >
                <h4 className="text-xl font-bold mb-2">Custom Hover</h4>
                <p>This card has a custom hover animation applied.</p>
              </HoverCard>
            </div>
          </ScrollAnimation>
          
          {/* Glassmorphism & Text Animation Examples */}
          <ScrollAnimation animation="slide-up" delay={0.3}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Glassmorphism & Text
            </h3>
            
            <div className="space-y-6">
              <GlassmorphismCard
                blur={8}
                opacity={8}
                glowColor="from-blue-500/20 to-purple-500/20"
                className="shadow-lg border"
              >
                <h4 className="text-xl font-bold mb-2 text-white">Glass Card</h4>
                <p className="text-white/80">Modern glassmorphism effect with subtle hover animation.</p>
              </GlassmorphismCard>
              
              <GlassmorphismCard
                blur={12}
                opacity={5}
                glowColor="from-pink-500/20 to-orange-500/20"
                className="shadow-lg"
              >
                <AnimatedText
                  text="Animated Character Text"
                  type="chars"
                  className="text-xl font-bold mb-2 text-white"
                />
                <p className="text-white/80">Text with character-by-character animation.</p>
              </GlassmorphismCard>
            </div>
          </ScrollAnimation>
        </div>
        
        {/* Interactive Demo Button */}
        <div className="mt-16 text-center">
          <ScrollAnimation animation="zoom" delay={0.4}>
            <motion.button
              className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg"
              whileHover={buttonHoverVariants.glow}
              whileTap={{ scale: 0.98 }}
            >
              Explore More Animations
            </motion.button>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default AnimationShowcase; 