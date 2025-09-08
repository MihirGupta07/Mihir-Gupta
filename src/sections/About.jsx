import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Coffee, Code2 } from 'lucide-react';
import { PERSONAL_INFO, FUN_FACTS, STATS } from '@/data/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/ui/Card';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const About = () => {
  return (
    <section id="about" className="relative section-padding bg-gradient-to-r from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
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
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Get to know the person behind the code. I'm passionate about creating digital experiences that make a difference.
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
                  Crafting Digital Solutions
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {PERSONAL_INFO.description}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing my knowledge through blog posts and mentoring. I believe in continuous learning and 
                  staying up-to-date with the latest industry trends.
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
                        My Journey
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Started my development journey in 2020, quickly fell in love with React and the JS/TS ecosystem. 
                        Since then, I've worked on diverse projects ranging from e-commerce platforms to real-time applications.
                      </p>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Fun Facts */}
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Fun Facts About Me
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
                        Always on the hunt for new ideas and projects
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
