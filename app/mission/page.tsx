'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MissionPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setIsLoaded(true);
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c] relative overflow-hidden">
      {/* Floating particles */}
      {isLoaded && Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          animate={{
            y: [-20, windowHeight],
            x: Math.random() * 100 - 50,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-white space-y-8"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            variants={itemVariants}
          >
            Our Mission 🛒✨
          </motion.h1>

          <motion.p 
            className="text-xl leading-relaxed"
            variants={itemVariants}
          >
            At SmartCart, we're on a mission to revolutionize the grocery shopping experience through innovative AI technology and a deep commitment to accessibility. Our vision is simple yet transformative: to make shopping effortless, enjoyable, and inclusive for everyone. 🌟
          </motion.p>
          
          <motion.p 
            className="text-xl leading-relaxed"
            variants={itemVariants}
          >
            We believe that waiting in checkout lines should be a thing of the past. Through our cutting-edge AI-powered system, we're streamlining the entire shopping process, allowing customers to simply pick up items and go. No more waiting, no more frustration – just a smooth, delightful experience. ⚡
          </motion.p>

          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold">
              Our Commitments 💫
            </h2>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>Making shopping accessible for everyone, including individuals with disabilities, seniors, and parents with young children 👨‍👩‍👧‍👦</li>
              <li>Reducing wait times and eliminating checkout friction through smart AI technology 🤖</li>
              <li>Creating an intuitive, user-friendly experience that works for both tech-savvy and traditional shoppers 🎯</li>
              <li>Ensuring privacy and security while maintaining convenience 🔒</li>
              <li>Continuously innovating to improve the shopping experience 🚀</li>
            </ul>
          </motion.div>

          <motion.p 
            className="text-xl leading-relaxed"
            variants={itemVariants}
          >
            Join us in building the future of retail, where technology and accessibility come together to create a shopping experience that's truly for everyone. Together, we're not just changing how people shop – we're transforming what's possible. 🌈
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default MissionPage;
