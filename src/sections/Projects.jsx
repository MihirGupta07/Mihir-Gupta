import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS, SOCIAL_LINKS } from '@/data/constants';
import { staggerContainer, staggerItem } from '@/utils/animations';
import Badge from '@/components/ui/Badge';

const ProjectCard = ({ project, index }) => (
  <motion.div
    variants={staggerItem}
    className="group border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors duration-200"
  >
    {/* Project Image */}
    <div className="relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="p-6">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        {project.title}
      </h3>

      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="outline" size="sm">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ExternalLink size={14} />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <Github size={14} />
          Code
        </a>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  return (
    <section id="projects" className="relative section-padding bg-neutral-50 dark:bg-neutral-900">
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
              Projects
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Selected personal projects. Work from my startup roles is proprietary.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div variants={staggerItem} className="border-t border-neutral-200 dark:border-neutral-700 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                More on GitHub
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Additional projects, open-source contributions, and experiments.
              </p>
            </div>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
            >
              <Github size={16} />
              View GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
