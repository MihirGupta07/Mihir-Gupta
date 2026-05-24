import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Coffee, Code2 } from 'lucide-react';
import { PERSONAL_INFO, FUN_FACTS, STATS } from '@/data/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/ui/Card';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const About = () => {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
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
             <span className="gradient-text"> About Us</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Boutique studio attention with the output of a full team. Here's who you're working with.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image & Stats */}
            <motion.div variants={fadeInLeft} className="space-y-8">
              
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary-400 to-secondary-400 p-1"
                >
                  <img
                    src={PERSONAL_INFO.about_image}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-80 object-cover rounded-xl bg-white dark:bg-neutral-800"
                  />
                </motion.div>
                
                {/* Floating Info Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -left-4 bg-white dark:bg-neutral-800 rounded-lg p-3 shadow-lg border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      3+ Years
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -bottom-4 -right-4 bg-white dark:bg-neutral-800 rounded-lg p-3 shadow-lg border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Statistics */}
              <motion.div
                variants={staggerContainer}
              >
                <AnimatedGrid columns={{ sm: 2, md: 2, lg: 2 }} gap={4} className="">
                  {STATS.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      variants={staggerItem}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white dark:bg-neutral-800 rounded-lg p-4 text-center border border-neutral-200 dark:border-neutral-700"
                    >
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </AnimatedGrid>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div variants={fadeInRight} className="space-y-6">
              {/* Main Description */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Your Engineering Partner
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {PERSONAL_INFO.description}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  We operate as a lean studio, One clear point of contact, with trusted collaborators brought in when the scope demands it. No traditional agency overhead. From a quick audit to a full product build, the process stays tight and the quality stays high.
                </p>
              </div>

              {/* Experience Highlights */}
              <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border-primary-200 dark:border-primary-800">
                <Card.Content>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        Founded-Engineer Background
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Twice a founding engineer. We've built products from zero to production and know what it takes to ship fast without cutting corners. That startup mindset shapes every client engagement.
                      </p>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Fun Facts */}
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Why Work With Us
                </h4>
                <AnimatedGrid columns={{ sm: 1, md: 2, lg: 2 }} gap={3}>
                  {FUN_FACTS.map((fact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-white dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      {fact}
                    </motion.div>
                  ))}
                </AnimatedGrid>
              </div>

              {/* Current Status */}
              <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <Card.Content>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        Currently taking on new projects. Let's talk
                      </span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
