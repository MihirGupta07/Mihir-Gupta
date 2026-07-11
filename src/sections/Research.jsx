import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';
import { RESEARCH } from '@/data/constants';
import { staggerContainer, staggerItem } from '@/utils/animations';
import Badge from '@/components/ui/Badge';

const ResearchCard = ({ research }) => (
  <motion.div
    variants={staggerItem}
    className="group border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors duration-200"
  >
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-700">
        <FileText className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      </div>

      <a
        href={research.url}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="View paper"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        View
      </a>
    </div>

    <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2 leading-snug">
      {research.title}
    </h3>

    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
      {research.publication}
    </p>

    {(research.abstract || research.description) && (
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-3">
        {research.abstract || research.description}
      </p>
    )}

    {research.keywords && research.keywords.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {research.keywords.map((keyword) => (
          <Badge key={keyword} variant="outline" size="sm">
            {keyword}
          </Badge>
        ))}
      </div>
    )}
  </motion.div>
);

const Research = () => {
  return (
    <section id="research" className="relative section-padding bg-neutral-50 dark:bg-neutral-900">
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
              Research
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Published work in AI, machine learning, and healthcare technology.
            </p>
          </motion.div>

          {/* Research Papers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {RESEARCH.map((research) => (
              <ResearchCard key={research.id} research={research} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
