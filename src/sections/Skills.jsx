import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Wrench } from 'lucide-react';
import { SKILLS } from '@/data/constants';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/utils/animations';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      skills: SKILLS.frontend,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      title: 'Backend',
      icon: Database,
      skills: SKILLS.backend,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      title: 'Tools & Others',
      icon: Wrench,
      skills: SKILLS.tools,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
  ];

  const SkillBar = ({ skill }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {skill.name}
          </span>
        </div>
        <Badge variant="outline" size="sm">
          {skill.level}%
        </Badge>
      </div>
      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
        />
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="relative section-padding bg-gradient-to-r from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/30 overflow-hidden">
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
              <span className="gradient-text">Skills & Expertise</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and the tools I use to bring ideas to life.
            </p>
          </motion.div>

          {/* Skills Categories */}
          <motion.div variants={staggerItem} className="mb-16">
            <AnimatedGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={8}>
              {skillCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    variants={scaleIn}
                    transition={{ delay: categoryIndex * 0.2 }}
                    className="h-full"
                  >
                    <Card 
                      className={`h-full ${category.bgColor} ${category.borderColor}`}
                      hover={true}
                    >
                      <Card.Header>
                        <div className="flex items-center space-x-3 mb-4">
                          <motion.div 
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <div>
                            <Card.Title className="text-xl">
                              {category.title}
                            </Card.Title>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {category.skills.length} technologies
                            </p>
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Content>
                        <div className="space-y-4">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                              viewport={{ once: true }}
                            >
                              <SkillBar skill={skill} />
                            </motion.div>
                          ))}
                        </div>
                      </Card.Content>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatedGrid>
          </motion.div>

          {/* All Skills Overview */}
          <motion.div variants={fadeInUp} className="text-center">
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-8">
              Technologies I Work With
            </h3>
            
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-3"
            >
              {Object.values(SKILLS).flat().map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={staggerItem}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer group-hover:border-primary-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 transition-all duration-200"
                  >
                    <span className="mr-2 text-sm">{skill.icon}</span>
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Learning & Growth */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                🚀 Always Learning
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and best practices 
                to stay at the forefront of web development. Currently diving deep into AI/ML integration in web applications 
                and exploring the latest React patterns.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Next.js 14', 'Tailwind v4', 'React Server Components', 'AI/ML APIs', 'Web3'].map((tech) => (
                  <Badge key={tech} variant="primary" className="animate-pulse">
                    🌟 {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
