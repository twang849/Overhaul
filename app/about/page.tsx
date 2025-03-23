'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      description: "Passionate about making shopping accessible for everyone through AI innovation.",
      emoji: "👨‍💼"
    },
    {
      name: "Sarah Johnson",
      role: "Head of AI Development",
      description: "Leading our AI initiatives to create smarter, more intuitive shopping experiences.",
      emoji: "👩‍💻"
    },
    {
      name: "Michael Lee",
      role: "UX Director",
      description: "Ensuring our technology is user-friendly and accessible to all shoppers.",
      emoji: "👨‍🎨"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      description: "Streamlining our processes to deliver seamless shopping experiences.",
      emoji: "👩‍🔧"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6ee7b7] via-[#3b82f6] to-[#9333ea] relative overflow-hidden py-16 px-4">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-white space-y-12"
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-center mb-8"
            variants={itemVariants}
          >
            About SmartCart 🛒
          </motion.h1>

          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold">Our Story 📖</h2>
            <p className="text-lg leading-relaxed">
              Founded in 2024, SmartCart emerged from a simple yet powerful idea: what if we could make shopping 
              easier for everyone? Our journey began when our founder experienced firsthand the challenges that 
              many people face while shopping, from long checkout lines to accessibility issues.
            </p>
            <p className="text-lg leading-relaxed">
              Today, we're at the forefront of retail innovation, combining cutting-edge AI technology with a 
              deep understanding of customer needs to create the future of shopping.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold">Our Team 👥</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-3"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{member.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-xl">{member.name}</h3>
                      <p className="text-white/80">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-white/90">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold">Our Values 🎯</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Innovation 💡</h3>
                <p>We constantly push boundaries to create better shopping experiences through technology.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Accessibility 🌟</h3>
                <p>We believe shopping should be easy and enjoyable for everyone, regardless of their abilities.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Security 🔒</h3>
                <p>We prioritize the privacy and security of our customers in everything we do.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Community 🤝</h3>
                <p>We're building more than technology - we're building a community of happy shoppers.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            variants={itemVariants}
          >
            <p className="text-lg">
              Join us in revolutionizing the future of shopping! 🚀
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
