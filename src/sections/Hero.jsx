import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink, Github } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/data/constants';
import { smoothScrollTo } from '@/utils/helpers';
import { staggerContainer, staggerItem, fadeInUp } from '@/utils/animations';
import Button from '@/components/ui/Button';

const platformLabels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  medium: 'Medium',
};

const Hero = () => {
  const prefersReduced = useReducedMotion();
  const handleScrollDown = () => smoothScrollTo('about');
  const handleDownloadResume = () => window.open(PERSONAL_INFO.resume, '_blank');
  const handleViewProjects = () => smoothScrollTo('projects');

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="text-hero font-bold text-neutral-900 dark:text-neutral-100 mb-6"
            style={{ textWrap: 'balance' }}
          >
            {PERSONAL_INFO.name}
          </motion.h1>

          {/* Evidence statement */}
          <motion.p
            variants={staggerItem}
            className="text-lead font-medium text-neutral-600 dark:text-neutral-400 mb-4"
          >
            Building product at Ivory. Three years across startups and engineering teams.
          </motion.p>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="text-base text-neutral-600 dark:text-neutral-400 max-w-xl mb-10"
            style={{ textWrap: 'pretty' }}
          >
            {PERSONAL_INFO.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button size="lg" onClick={handleViewProjects} icon={<ExternalLink />}>
              View My Work
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownloadResume} icon={<Download />}>
              Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={staggerItem} className="flex items-center gap-5">
            {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
              if (!url) return null;

              const icons = {
                github: <Github className="w-5 h-5" />,
                linkedin: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
                instagram: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ),
                medium: (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                  </svg>
                ),
              };

              const icon = icons[platform];
              if (!icon) return null;

              return (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={platformLabels[platform] || platform}
                >
                  {icon}
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.button
            onClick={handleScrollDown}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors focus:outline-none focus-visible:[box-shadow:var(--focus-ring)] rounded"
            animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
            transition={prefersReduced ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            aria-label="Scroll down"
          >
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
