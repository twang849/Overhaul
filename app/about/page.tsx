'use client';
import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c] overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-70 backdrop-blur-[2px]" />
        </div>
        
        <motion.div 
          className="relative max-w-4xl mx-auto"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg animate-gradient">
              About SmartCart ✨
            </h1>
            <p className="text-xl text-white/90 mb-12 hover:scale-105 transition-transform duration-300">
              Revolutionizing shopping through the power of AI 🛒
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 hover:shadow-2xl transition-all duration-300 hover:bg-white/95"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-3xl mr-2 animate-bounce">🎯</span> Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We envision a world where shopping is effortless, intuitive, and accessible to everyone.
              Through cutting-edge AI technology, SmartCart transforms the way you shop by instantly
              recognizing your items and streamlining your checkout experience.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={stagger}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:bg-white/95 hover:-translate-y-1"
              variants={fadeInUp}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2 animate-spin-slow">✨</span> Innovation
              </h3>
              <p className="text-gray-700">
                Using state-of-the-art AI technology to make shopping as simple as
                picking up what you need. No more waiting in lines or complicated
                scanning processes.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:bg-white/95 hover:-translate-y-1"
              variants={fadeInUp}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <span className="text-2xl mr-2 animate-pulse">🌈</span> Inclusivity
              </h3>
              <p className="text-gray-700">
                Designed for everyone - from busy parents to people with mobility
                challenges. Shopping should be enjoyable and accessible for all.
              </p>
            </motion.div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/95 border border-purple-200/50"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900">
              <span className="text-3xl mr-2 animate-pulse">💫</span> Our Promise
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We're more than just a shopping solution – we're a commitment to
              transforming everyday experiences. By combining innovation with
              accessibility, we're creating a future where shopping is truly
              effortless for all.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
