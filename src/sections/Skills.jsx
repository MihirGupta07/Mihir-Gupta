import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '@/data/constants';
import { staggerContainer, staggerItem } from '@/utils/animations';
import Badge from '@/components/ui/Badge';

const skillCategories = [
  { title: 'Frontend', skills: SKILLS.frontend },
  { title: 'Backend', skills: SKILLS.backend },
  { title: 'Tools', skills: SKILLS.tools },
];

const Skills = () => {
  return (
    <section id="skills" className="relative section-padding bg-white dark:bg-neutral-950">
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
              Skills
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              I reach for React and Go on most projects.
            </p>
          </motion.div>

          {/* Skill Groups */}
          <div className="space-y-12">
            {skillCategories.map((category) => (
              <motion.div key={category.title} variants={staggerItem}>
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill.name} variant="outline">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
