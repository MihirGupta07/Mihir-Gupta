import React from 'react';
import { cn } from '@/utils/helpers';

const Textarea = React.forwardRef(({
  className,
  label,
  error,
  helper,
  rows = 4,
  ...props
}, ref) => {
  const textareaClasses = cn(
    'flex min-h-[80px] w-full rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none',
    error && 'border-red-500 focus:ring-red-500',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={textareaClasses}
        rows={rows}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {helper}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
