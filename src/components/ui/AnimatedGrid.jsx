import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGrid = ({ 
  children, 
  className = '',
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  animation = 'stagger',
  ...props 
}) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animation === 'stagger' ? 0.1 : 0,
        delayChildren: 0.1,
      }
    }
  };

  const staggerItem = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const gridClasses = `
    grid 
    gap-${gap} 
    grid-cols-${columns.sm} 
    md:grid-cols-${columns.md} 
    lg:grid-cols-${columns.lg}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <motion.div
      className={gridClasses}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
          className="animated-grid-item"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedGrid;
