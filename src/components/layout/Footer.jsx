import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS, NAVIGATION } from '@/data/constants';
import { smoothScrollTo } from '@/utils/helpers';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    email: Mail,
  };

  const handleNavClick = (href) => {
    const sectionId = href.replace('#', '');
    smoothScrollTo(sectionId);
  };

  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
              {PERSONAL_INFO.description}
            </p>
            <div className="flex items-center space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                if (!Icon) return null;
                
                return (
                  <motion.a
                    key={platform}
                    href={platform === 'email' ? `mailto:${PERSONAL_INFO.email}` : url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              >
                <Mail size={16} />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
                <span className="w-4 h-4 text-center">📍</span>
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span>© {currentYear} {PERSONAL_INFO.name}. Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>and lots of ☕</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
            <button 
              onClick={() => smoothScrollTo('home')}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Back to Top ↑
            </button>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
