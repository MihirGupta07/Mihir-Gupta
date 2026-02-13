import React, { useEffect, useState } from 'react';
import Particles from './Particles';

const ThemeParticles = ({ count, speed, size, opacity, className }) => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Function to get CSS variable value
    const getCSSVariable = (variable) => {
      return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    // Get theme colors from CSS variables
    const updateColors = () => {
      const themeColors = [
        getCSSVariable('--particle-color-1'),
        getCSSVariable('--particle-color-2'),
        getCSSVariable('--particle-color-3'),
        getCSSVariable('--particle-color-4'),
        getCSSVariable('--particle-color-5'),
      ].filter(color => color); // Filter out empty values

      setColors(themeColors);
    };

    // Initial update
    updateColors();

    // Watch for theme changes (dark mode toggle)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateColors();
        }
      });
    });

    // Observe the html element for class changes (dark mode toggle)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Don't render until colors are loaded
  if (colors.length === 0) return null;

  return (
    <Particles
      count={count}
      colors={colors}
      speed={speed}
      size={size}
      opacity={opacity}
      className={className}
    />
  );
};

export default ThemeParticles;
