import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '@/data/constants';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import { smoothScrollTo } from '@/utils/helpers';

const Services = () => {
  return (
    <section id="services" className="relative section-padding overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              <span className="gradient-text">What We Do</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              End-to-end development services for startups and founders who need a reliable engineering partner.
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-4xl mb-4">{service.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Hover accent */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA strip */}
          <motion.div
            variants={fadeInUp}
            className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
          >
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Not sure which fits your project?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Let's talk through your goals and find the right engagement model together.
            </p>
            <motion.button
              onClick={() => smoothScrollTo('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold shadow hover:shadow-lg transition-shadow duration-200"
            >
              Get in Touch
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
