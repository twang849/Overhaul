'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted:', formData);
    // TODO: Implement actual login logic
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c8c2f0] via-[#8a82c5] to-[#5c5a7c]">
      {/* Fixed background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Content container with pointer-events-auto */}
      <div className="relative min-h-screen flex items-center justify-center p-4 pointer-events-auto">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Login Card */}
          <motion.div 
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 relative"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.h1 
                className="text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back 👋
              </motion.h1>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Sign in to continue shopping smarter
              </motion.p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 
                    outline-none transition-all duration-200"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 
                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 
                    outline-none transition-all duration-200"
                  placeholder="Enter your password"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between text-sm"
              >
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-purple-600 
                      focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <button 
                  type="button"
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Forgot password?
                </button>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold
                  hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                  focus:ring-opacity-50 transition-all duration-200 relative overflow-hidden
                  disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block"
                  >
                    ⭐
                  </motion.span>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <motion.div 
              className="mt-8 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Don't have an account?{' '}
              <button 
                type="button"
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                Sign up
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
