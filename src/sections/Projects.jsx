import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, Filter } from 'lucide-react';
import { PROJECTS } from '@/data/constants';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/utils/animations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import AnimatedGrid from '@/components/ui/AnimatedGrid';
import { SOCIAL_LINKS } from '../data/constants';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Get all unique technologies for filter
  const allTechnologies = [...new Set(PROJECTS.flatMap(project => project.technologies))];
  
  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      );

  const featuredProjects = PROJECTS.filter(project => project.featured);

  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group h-full"
    >
      <Card hover className="h-full overflow-hidden">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="primary" className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-current" />
                <span>Featured</span>
              </Badge>
            </div>
          )}
          
          {/* Overlay with Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 transition-opacity duration-300"
          >
            <Button
              variant="secondary"
              size="sm"
              icon={<ExternalLink />}
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              Live Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Github />}
              onClick={() => window.open(project.githubUrl, '_blank')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Code
            </Button>
          </motion.div>
        </div>

        <Card.Content className="p-6">
          <Card.Title className="mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </Card.Title>
          
          <Card.Description className="mb-4 line-clamp-3">
            {project.description}
          </Card.Description>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                size="sm"
                className="hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 cursor-pointer transition-colors"
                onClick={() => setFilter(tech.toLowerCase())}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Card.Content>

        {/* Card Footer */}
        <Card.Footer className="p-6 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
              </motion.a>
            </div>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );

  return (
    <section id="projects" className="relative section-padding bg-gradient-to-r from-neutral-50 via-white to-primary-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/30 overflow-hidden">
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
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A showcase of my recent work. Each project represents a unique challenge and demonstrates 
              different aspects of my technical expertise.
            </p>
          </motion.div>

          {/* Featured Projects Highlight */}
          <motion.div variants={staggerItem} className="mb-12">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
              Featured Work
            </h3>
            <AnimatedGrid columns={{ sm: 1, md: 2, lg: 2 }} gap={8}>
              {featuredProjects.slice(0, 2).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatedGrid>
          </motion.div>

          {/* Filter Controls */}
          <motion.div variants={staggerItem} className="mb-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                icon={<Filter />}
              >
                All Projects
              </Button>
              {allTechnologies.slice(0, 6).map((tech) => (
                <Button
                  key={tech}
                  variant={filter === tech.toLowerCase() ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(tech.toLowerCase())}
                >
                  {tech}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="mb-12"
            >
              <AnimatedGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={8}>
                {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatedGrid>
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          {visibleProjects < filteredProjects.length && (
            <motion.div
              variants={fadeInUp}
              className="text-center"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="px-8"
              >
                Load More Projects
              </Button>
            </motion.div>
          )}

          {/* GitHub CTA */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 text-center bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-700 rounded-2xl p-8 text-white"
          >
            <div className="max-w-2xl mx-auto">
              <Github className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-semibold mb-4">
                Explore More on GitHub
              </h3>
              <p className="text-neutral-300 mb-6">
                Want to see more of my work? Check out my GitHub profile for additional projects, 
                contributions, and code snippets.
              </p>
              <Button
                variant="secondary"
                size="lg"
                icon={<Github />}
                onClick={() => window.open(SOCIAL_LINKS.github, '_blank')}
              >
                Visit GitHub Profile
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
