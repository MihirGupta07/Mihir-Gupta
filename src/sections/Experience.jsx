import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '@/data/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const Experience = () => {
  const TimelineItem = ({ item, index, isEducation = false }) => {
    const isEven = index % 2 === 0;
    const Icon = isEducation ? GraduationCap : Briefcase;
    
    return (
      <motion.div
        variants={isEven ? fadeInLeft : fadeInRight}
        className={`flex items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
      >
        {/* Content Card */}
        <div className={`flex-1 ${'md:text-left'}`}>
          <Card 
            hover 
            className="relative bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
          >
            {/* Timeline Connector */}
            <div className={`hidden md:block absolute top-6 ${ isEven ? '-right-14' :'-left-14'} w-20 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500`} />
            
            <Card.Content className="p-6">
              {/* Header */}
              <div className={`mb-4 ${'md:text-left'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className="w-5 h-5 text-primary-600" />
                  <Badge variant="primary" size="sm">
                    {item.period}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {isEducation ? item.degree : item.title}
                </h3>
                
                <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                  {isEducation ? item.school : item.company}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  {item.gpa && (
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>GPA: {item.gpa}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Achievements */}
              {item.achievements && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Key {isEducation ? 'Achievements' : 'Accomplishments'}:
                  </h4>
                  <ul className="space-y-1">
                    {item.achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        initial={{ opacity: 0, x:  -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: achievementIndex * 0.1 }}
                        className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start space-x-2"
                      >
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Content>
          </Card>
        </div>

        {/* Timeline Node */}
        <div className="flex-shrink-0 relative">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center border-1 border-white dark:border-neutral-950 shadow-lg z-10 relative"
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          
        </div>

        {/* Spacer for opposite side */}
        <div className="flex-1 hidden md:block" />
      </motion.div>
    );
  };

  return (
    <section id="experience" className="relative section-padding bg-gradient-to-r from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/30 overflow-hidden">
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
              Experience & <span className="gradient-text">Education</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              My professional journey and educational background that shaped my career in software development.
            </p>
          </motion.div>

          {/* Professional Experience */}
          <motion.div variants={staggerItem} className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center justify-center">
                <Briefcase className="w-6 h-6 mr-3 text-primary-600" />
                Professional Experience
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
            </div>

            <div className="space-y-16 relative">
              {/* Continuous Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-400 to-secondary-400 z-0" />
              
              {EXPERIENCE.map((experience, index) => (
                <TimelineItem
                  key={experience.id}
                  item={experience}
                  index={index}
                  isEducation={false}
                />
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={staggerItem}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 mr-3 text-primary-600" />
                Education
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
            </div>

            <div className="space-y-16 relative">
              {/* Continuous Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-400 to-secondary-400 z-0" />
              
              {EDUCATION.map((education, index) => (
                <TimelineItem
                  key={education.id}
                  item={education}
                  index={index}
                  isEducation={true}
                />
              ))}
            </div>
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            variants={fadeInUp}
            className="mt-20 text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                🎯 Core Competencies
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Throughout my journey, I've developed a strong foundation in full-stack development, 
                with expertise in modern frameworks and a passion for creating exceptional user experiences.
              </p>
              
              <AnimatedGrid columns={{ sm: 1, md: 3, lg: 3 }} gap={6}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 text-center"
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Frontend Excellence
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    React, TypeScript, and modern CSS frameworks
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 text-center"
                >
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Backend Proficiency
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Node.js, Python, and database design
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700 text-center"
                >
                  <div className="text-2xl mb-2">🎨</div>
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    Design Thinking
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    UI/UX principles and user-centered design
                  </p>
                </motion.div>
              </AnimatedGrid>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
