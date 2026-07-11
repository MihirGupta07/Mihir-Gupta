import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { EXPERIENCE, EDUCATION } from '@/data/constants';
import { staggerContainer, staggerItem } from '@/utils/animations';
import Badge from '@/components/ui/Badge';

const TimelineEntry = ({ item, isEducation = false }) => {
  const Icon = isEducation ? GraduationCap : Briefcase;

  return (
    <motion.div
      variants={staggerItem}
      className="grid grid-cols-[auto_1fr] gap-6 group"
    >
      {/* Icon column */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
        </div>
        <div className="w-px flex-1 bg-neutral-200 dark:bg-neutral-800 group-last:hidden" />
      </div>

      {/* Content */}
      <div className="pb-12 group-last:pb-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {isEducation ? item.degree : item.title}
          </h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {isEducation ? item.school : item.company}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm text-neutral-500 dark:text-neutral-400">
          <span>{item.period}</span>
          {item.location && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {item.location}
              </span>
            </>
          )}
          {item.gpa && (
            <>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3" />
                GPA {item.gpa}
              </span>
            </>
          )}
        </div>

        {item.description && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
            {item.description}
          </p>
        )}

        {item.achievements && item.achievements.length > 0 && (
          <ul className="space-y-1.5">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="text-sm text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                <span className="text-neutral-400 mt-0.5 shrink-0">–</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative section-padding bg-white dark:bg-neutral-950">
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
              Experience
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
            {/* Work Experience */}
            <div>
              <motion.h3
                variants={staggerItem}
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-10"
              >
                Work
              </motion.h3>
              <div>
                {EXPERIENCE.map((exp) => (
                  <TimelineEntry key={exp.id} item={exp} isEducation={false} />
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mt-16 lg:mt-0">
              <motion.h3
                variants={staggerItem}
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-10"
              >
                Education
              </motion.h3>
              <div>
                {EDUCATION.map((edu) => (
                  <TimelineEntry key={edu.id} item={edu} isEducation={true} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
