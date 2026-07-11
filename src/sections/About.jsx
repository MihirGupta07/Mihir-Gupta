import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, STATS } from '@/data/constants';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/animations';

const About = () => {
  return (
    <section id="about" className="relative section-padding bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="mb-16">
            <h2 className="text-section font-semibold text-neutral-900 dark:text-neutral-100 mb-4" style={{ textWrap: 'balance' }}>
              About
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Image */}
            <motion.div variants={fadeInLeft}>
              <img
                src={PERSONAL_INFO.about_image}
                alt={PERSONAL_INFO.name}
                className="w-full h-80 object-cover rounded-lg bg-neutral-200 dark:bg-neutral-800"
              />

              {/* Stats — minimal */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div variants={fadeInRight} className="space-y-6">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg" style={{ textWrap: 'pretty' }}>
                {PERSONAL_INFO.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  Available for full-time roles · {PERSONAL_INFO.location}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
