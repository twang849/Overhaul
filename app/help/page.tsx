'use client';
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface HelpSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  articles: {
    id: string;
    title: string;
    content: string;
  }[];
}

const helpSections: HelpSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '🚀',
    description: 'Learn the basics of using SmartCart',
    articles: [
      {
        id: 'what-is-smartcart',
        title: 'What is SmartCart?',
        content: `SmartCart is an innovative AI-powered shopping system that revolutionizes the retail experience. 
        Using advanced computer vision and AI technology, SmartCart automatically detects items as you shop,
        eliminating the need for manual scanning and long checkout lines.`
      },
      {
        id: 'how-to-start',
        title: 'How to Start Using SmartCart',
        content: `1. Download the SmartCart app from your device's app store
        2. Create an account and add your payment method
        3. Visit any SmartCart-enabled store
        4. Start shopping - items will be automatically detected and added to your cart
        5. Complete your purchase through the app when finished`
      }
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility Features',
    icon: '♿',
    description: 'Making shopping accessible for everyone',
    articles: [
      {
        id: 'voice-commands',
        title: 'Voice Commands and Screen Reader Support',
        content: `SmartCart features comprehensive voice control and screen reader compatibility.
        Use voice commands to:
        • Check your cart contents
        • Get product information
        • Complete your purchase
        • Request assistance
        All interface elements are properly labeled for screen readers.`
      },
      {
        id: 'mobility-support',
        title: 'Mobility Assistance Features',
        content: `SmartCart is designed to be fully accessible for users with mobility challenges:
        • Automatic item detection requires no physical scanning
        • Checkout can be completed from any location in the store
        • Mobile app supports various input methods
        • Integration with mobility assistance devices`
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: '🔧',
    description: 'Common issues and their solutions',
    articles: [
      {
        id: 'item-detection',
        title: 'Item Detection Issues',
        content: `If items aren't being detected properly:
        1. Ensure adequate lighting in your shopping area
        2. Hold items within the camera's view for 1-2 seconds
        3. Keep items separated when showing them to the camera
        4. Check if your app is updated to the latest version
        
        If issues persist, try restarting the app or ask for staff assistance.`
      },
      {
        id: 'payment-issues',
        title: 'Payment and Checkout Problems',
        content: `Common payment issues and solutions:
        • Payment not processing: Verify your internet connection and payment method
        • Incorrect total: Review your cart and refresh the app
        • Checkout error: Clear app cache or try alternative payment method
        
        Contact support if problems continue.`
      }
    ]
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security',
    icon: '🔒',
    description: 'How we protect your data',
    articles: [
      {
        id: 'data-protection',
        title: 'Data Protection Measures',
        content: `SmartCart takes your privacy seriously:
        • All personal data is encrypted
        • Payment information is securely processed
        • Shopping history is stored privately
        • Camera feeds are processed in real-time and not stored
        • Option to delete account and data at any time`
      }
    ]
  }
];

export default function HelpPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for parallax
  const springConfig = { stiffness: 100, damping: 30, mass: 0.2 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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

      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          {/* Animated Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-6xl font-bold text-white mb-6 drop-shadow-lg"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              How can we help? 🤝
            </motion.h1>
            <motion.p 
              className="text-2xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Find answers to common questions and learn how to make the most of SmartCart
            </motion.p>
          </motion.div>

          {/* Main content with enhanced animations */}
          <div className="grid md:grid-cols-12 gap-8">
            {/* Animated sidebar */}
            <motion.div 
              className="md:col-span-4 space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {helpSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className={`bg-white/90 backdrop-blur-md rounded-xl p-4 cursor-pointer transition-all duration-300 
                    hover:bg-white/95 hover:shadow-lg group relative overflow-hidden
                    ${selectedSection === section.id ? 'ring-2 ring-purple-400 shadow-lg' : ''}`}
                  onClick={() => {
                    setSelectedSection(section.id);
                    setSelectedArticle(null);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex items-center space-x-3 relative z-10">
                    <motion.span 
                      className="text-2xl"
                      animate={{ 
                        rotate: selectedSection === section.id ? [0, 360] : 0,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: selectedSection === section.id ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                    >
                      {section.icon}
                    </motion.span>
                    <div>
                      <h2 className="font-semibold text-gray-900">{section.title}</h2>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Animated content area */}
            <motion.div 
              className="md:col-span-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedSection || 'empty'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {selectedSection ? (
                    <div className="space-y-8">
                      {helpSections
                        .find((s) => s.id === selectedSection)
                        ?.articles.map((article, index) => (
                          <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="space-y-4"
                          >
                            <motion.h3 
                              className={`text-xl font-semibold cursor-pointer transition-all duration-300
                                ${selectedArticle === article.id 
                                  ? 'text-purple-600' 
                                  : 'text-gray-900 hover:text-purple-600'
                                }`}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => setSelectedArticle(article.id)}
                            >
                              {article.title}
                            </motion.h3>
                            <AnimatePresence>
                              {selectedArticle === article.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="prose prose-purple max-w-none"
                                >
                                  {article.content.split('\n').map((paragraph, idx) => (
                                    <motion.p 
                                      key={idx}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="text-gray-700 whitespace-pre-wrap"
                                    >
                                      {paragraph}
                                    </motion.p>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                    </div>
                  ) : (
                    <motion.div 
                      className="text-center text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.p 
                        className="text-xl"
                        animate={{ 
                          y: [0, -5, 0],
                          transition: { 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        Select a topic from the left to view help articles
                      </motion.p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Animated footer */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.p 
              className="text-xl text-white/90"
              whileHover={{ scale: 1.05 }}
            >
              Need more help? Contact our support team 24/7 at{' '}
              <motion.a 
                href="mailto:support@smartcart.com" 
                className="underline hover:text-white inline-block"
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 8px rgba(255,255,255,0.5)"
                }}
              >
                support@smartcart.com
              </motion.a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
