import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { hoverLift } from '@/utils/animations';

const Card = ({
  children,
  className,
  hover = true,
  glass = false,
  padding = 'default',
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-all duration-300';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };
  
  const cardClasses = cn(
    baseClasses,
    glass && 'glass-effect',
    paddingClasses[padding],
    hover && 'hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50',
    className
  );
  
  const CardComponent = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: hoverLift,
    transition: { duration: 0.2 }
  } : {};
  
  return (
    <CardComponent
      className={cardClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={cn('text-xl font-semibold text-neutral-900 dark:text-neutral-100', className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className, ...props }) => (
  <p className={cn('text-neutral-600 dark:text-neutral-400', className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700', className)} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
