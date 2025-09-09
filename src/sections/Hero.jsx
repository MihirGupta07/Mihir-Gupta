import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink, Github } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/constants';
import { smoothScrollTo } from '@/utils/helpers';
import { fadeInUp, fadeInDown, staggerContainer, staggerItem, bounceIn } from '@/utils/animations';
import Button from '@/components/ui/Button';

const Hero = () => {
  const handleScrollDown = () => {
    smoothScrollTo('about');
  };

  const handleDownloadResume = () => {
    window.open(PERSONAL_INFO.resume, '_blank');
  };

  const handleViewProjects = () => {
    smoothScrollTo('projects');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/30">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-xl opacity-20 z-5"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 right-20 w-32 h-32 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full blur-xl opacity-20 z-5"
      />

      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
        

          {/* Greeting */}
          <motion.div variants={staggerItem} className="mb-6 mt-[15vh]">
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
            >
              <span className="animate-pulse">🚀</span>
              Welcome to my digital space
            </motion.span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">{PERSONAL_INFO.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={staggerItem}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-neutral-600 dark:text-neutral-300 mb-6"
          >
            {PERSONAL_INFO.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8"
          >
            {PERSONAL_INFO.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={handleViewProjects}
              icon={<ExternalLink />}
              className="w-full sm:w-auto"
            >
              View My Work
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={handleDownloadResume}
              icon={<Download />}
              className="w-full sm:w-auto"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center space-x-6 mb-16"
          >
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              const icons = {
                github: Github,
                linkedin: () => (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                twitter: () => (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                ),
              };
              
              const Icon = icons[platform];
              if (!Icon) return null;

              return (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
              Scroll to explore
            </span>
            <motion.button
              onClick={handleScrollDown}
              className="p-2 rounded-full text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDown size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
