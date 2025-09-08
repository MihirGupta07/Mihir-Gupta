import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { hoverScale, tapScale } from '@/utils/animations';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white border border-transparent focus:ring-primary-500',
    secondary: 'bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 focus:ring-primary-500 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200 dark:border-neutral-600',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border border-primary-600 focus:ring-primary-500 dark:hover:bg-primary-950',
    ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700 border border-transparent focus:ring-primary-500 dark:hover:bg-neutral-800 dark:text-neutral-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };
  
  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );
  
  const IconComponent = icon && (
    <span className={cn(
      iconSizes[size],
      children && iconPosition === 'left' && 'mr-2',
      children && iconPosition === 'right' && 'ml-2'
    )}>
      {icon}
    </span>
  );
  
  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? hoverScale : {}}
      whileTap={!disabled && !loading ? tapScale : {}}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </>
      ) : (
        <>
          {iconPosition === 'left' && IconComponent}
          {children}
          {iconPosition === 'right' && IconComponent}
        </>
      )}
    </motion.button>
  );
};

export default Button;
