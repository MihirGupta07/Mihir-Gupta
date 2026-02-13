import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Award, Calendar, Users } from 'lucide-react';
import { RESEARCH } from '@/data/constants';
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const Research = () => {
  const ResearchCard = ({ research, index }) => (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group h-full"
    >
      <Card hover className="h-full overflow-hidden ">
        <Card.Content className="p-6">
          {/* Research Paper Icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
                onClick={() => window.open(research.url, '_blank')}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                View Paper
              </Button>
            </motion.div>
          </div>

          {/* Title */}
          <Card.Title className="mb-4 leading-relaxed group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {research.title}
          </Card.Title>

          {/* Publication Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="font-medium">{research.publication}</span>
            </div>
          </div>

          {/* Abstract or Description */}
          <Card.Description className="mb-6 leading-relaxed">
            {research.abstract || research.description || "Click to read the full research paper for detailed findings and methodology."}
          </Card.Description>

          {/* Research Tags/Keywords */}
          {research.keywords && (
            <div className="flex flex-wrap gap-2 mb-4">
              {research.keywords.map((keyword, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          )}
        </Card.Content>

        {/* Card Footer */}
        <Card.Footer className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <Award className="w-4 h-4 mr-1" />
              <span>Published Research</span>
            </div>
            <motion.a
              href={research.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              whileHover={{ x: 2 }}
            >
              Read Full Paper
              <ExternalLink className="w-3 h-3 ml-1" />
            </motion.a>
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );

  const ResearchStats = () => (
    <motion.div
      variants={staggerItem}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
    >
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          {RESEARCH.length}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Research Papers
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          2+
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Publications
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          2
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Research Areas
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
          2022+
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Since
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="research" className="relative section-padding bg-white dark:bg-neutral-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
              <span className="gradient-text">Research & Publications</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              My contribution to academic research in AI, machine learning, and healthcare technology. 
              These publications represent my commitment to advancing knowledge in emerging technologies.
            </p>
          </motion.div>

          {/* Research Statistics */}
          <ResearchStats />

          {/* Research Areas */}
          <motion.div variants={staggerItem} className="mb-12">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
              Research Areas
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {["Artificial Intelligence", "Encryption & Security", "Machine Learning", "Healthcare Technology", "Risk Prediction", "Neural Networks"].map((area, index) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="px-4 py-2 text-sm hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 transition-colors"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Research Papers Grid */}
          <motion.div variants={staggerItem} className="mb-12">
            <AnimatedGrid columns={{ sm: 1, lg: 2 }} gap={8}>
              {RESEARCH.map((research, index) => (
                <ResearchCard key={research.id} research={research} index={index} />
              ))}
            </AnimatedGrid>
          </motion.div>

          {/* Research Impact & Collaboration CTA */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
          >
            <div className="max-w-2xl mx-auto">
              <Users className="w-12 h-12 mx-auto mb-4  text-neutral-900 dark:text-neutral-100" />
              <h3 className="text-2xl font-semibold mb-4">
                Research Collaboration
              </h3>
              <p className=" text-neutral-600 dark:text-neutral-400 mb-4 mb-6 leading-relaxed">
                Interested in collaborating on research projects? I'm always open to working on 
                innovative projects that bridge technology and real-world applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<FileText />}
                  onClick={() => window.open('mailto:mihirgupta0712@gmail.com?subject=Research Collaboration', '_blank')}
                >
                  Discuss Research
                </Button>
                
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
