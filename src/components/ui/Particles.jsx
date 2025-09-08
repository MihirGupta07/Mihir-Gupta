import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Particles = ({ 
  count = 50, 
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4'], 
  speed = 0.5,
  size = { min: 1, max: 3 },
  opacity = { min: 0.1, max: 0.6 },
  className = '' 
}) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Reduce particle count on smaller screens for better performance
    const screenWidth = dimensions.width;
    const adjustedCount = screenWidth < 768 ? Math.floor(count * 0.6) : count;

    const newParticles = Array.from({ length: adjustedCount }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * (size.max - size.min) + size.min,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * (opacity.max - opacity.min) + opacity.min,
    }));

    setParticles(newParticles);
  }, [count, colors, speed, size, opacity, dimensions]);

  // Animation loop with RAF for better performance
  useEffect(() => {
    if (particles.length === 0) return;

    let animationId;
    let lastUpdate = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdate;
      
      // Only update if enough time has passed (30fps target for better performance)
      if (deltaTime >= 33) {
        setParticles(prevParticles =>
          prevParticles.map(particle => {
            let newX = particle.x + particle.vx;
            let newY = particle.y + particle.vy;

            // Bounce off edges
            if (newX <= 0 || newX >= dimensions.width) {
              particle.vx *= -1;
              newX = Math.max(0, Math.min(dimensions.width, newX));
            }
            if (newY <= 0 || newY >= dimensions.height) {
              particle.vy *= -1;
              newY = Math.max(0, Math.min(dimensions.height, newY));
            }

            return {
              ...particle,
              x: newX,
              y: newY,
            };
          })
        );
        lastUpdate = now;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particles.length, dimensions]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
      >
        {particles.map(particle => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: particle.id * 0.01,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default Particles;
