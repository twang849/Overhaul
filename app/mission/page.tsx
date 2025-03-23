'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function MissionPage() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Smooth spring animation for parallax
  const springConfig = { stiffness: 100, damping: 30, mass: 0.2 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  // Parallax effects
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.005,
        y: (e.clientY - window.innerHeight / 2) * 0.005
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c] overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
            y: backgroundY,
            x: mousePosition.x,
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Content Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="relative max-w-4xl mx-auto"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Hero Section with floating animation */}
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            {...floatAnimation}
          >
            <motion.h1 
              className="text-6xl font-bold text-white mb-6 drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Our Mission ✨
            </motion.h1>
            <motion.p 
              className="text-2xl text-white/90 mb-12"
              whileHover={{ scale: 1.02 }}
            >
              Transforming the future of shopping, one checkout at a time 🛒
            </motion.p>
          </motion.div>

          {/* Main Mission Statement */}
          <motion.div 
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 relative overflow-hidden group"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <motion.span 
                className="text-3xl mr-2"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                💫
              </motion.span>
              Revolutionizing Retail
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At SmartCart, we're on a mission to fundamentally transform the grocery shopping experience for millions of people worldwide.
              By harnessing the power of cutting-edge AI and computer vision technology, we're not just eliminating long checkout lines –
              we're reimagining the entire shopping journey. Our innovative system learns and adapts to each shopper's preferences,
              making shopping more intuitive, efficient, and enjoyable than ever before. We believe that technology should serve humanity,
              making everyday tasks not just easier, but truly delightful.
            </p>
          </motion.div>

          {/* Key Pillars Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={stagger}
          >
            {[
              {
                icon: "⚡",
                title: "Speed & Efficiency",
                description: "Say goodbye to long checkout lines and frustrating shopping experiences. Our AI-powered system instantly recognizes your items as you shop, making the entire process seamless and efficient. SmartCart's advanced algorithms work in real-time to track your selections, provide personalized recommendations, and handle payment processing automatically. This revolutionary approach saves our customers an average of 15 minutes per shopping trip, adding up to hours of saved time each month."
              },
              {
                icon: "🌈",
                title: "Inclusivity",
                description: "We believe shopping should be accessible to everyone, regardless of their physical abilities or technological expertise. From busy parents juggling children to seniors seeking independence, and individuals with disabilities requiring additional support – SmartCart empowers all shoppers. Our system features voice commands, adjustable height displays, and intuitive interfaces that adapt to each user's needs. We've partnered with accessibility experts and diverse community groups to ensure our solution truly serves everyone."
              }
            ].map((pillar, index) => (
              <motion.div 
                key={index}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-3 flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="text-2xl mr-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: index === 0 ? [0, 360] : undefined
                    }}
                    transition={{ 
                      duration: index === 0 ? 3 : 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {pillar.icon}
                  </motion.span>
                  {pillar.title}
                </motion.h3>
                <p className="text-gray-700 relative z-10">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
          >
            {[
              { 
                icon: "✨", 
                title: "Innovation", 
                description: "We're constantly pushing the boundaries of what's possible in retail technology. Our AI systems are continuously learning and evolving, incorporating the latest advances in computer vision, machine learning, and user experience design. We invest heavily in R&D to stay ahead of the curve and bring revolutionary solutions to market."
              },
              { 
                icon: "💪", 
                title: "Empowerment", 
                description: "We believe in giving people back their time and independence. Our technology empowers shoppers to take control of their shopping experience, making informed decisions with real-time product information, dietary filters, and budget tracking. We're creating tools that adapt to each person's unique needs and preferences."
              },
              { 
                icon: "🤝", 
                title: "Community", 
                description: "Building a more inclusive shopping experience isn't just our goal – it's our responsibility to the community. We actively collaborate with local businesses, disability advocacy groups, and consumer organizations to ensure our solution serves everyone. Together, we're creating a future where shopping is truly accessible to all."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 group relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ 
                  y: -5,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.h3 
                  className="text-lg font-semibold text-gray-900 mb-2 flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="text-xl mr-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: index * 120
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {value.icon}
                  </motion.span>
                  {value.title}
                </motion.h3>
                <p className="text-gray-700 relative z-10">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action with glow effect */}
          <motion.div 
            className="mt-16 text-center"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
          >
            <motion.p 
              className="text-xl text-white leading-relaxed"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 10px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Join us in creating a future where shopping is fast, accessible, and 
              delightful for everyone. Together, we're not just changing how people 
              shop—we're transforming lives. ✨
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
