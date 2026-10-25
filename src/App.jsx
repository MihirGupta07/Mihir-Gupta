import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Research from '@/sections/Research';
import Contact from '@/sections/Contact';
import { pageVariants, pageTransition } from '@/utils/animations';

// The 3D world is the default experience; the original sections remain as the classic site,
// served when WebGL is missing, on ?classic, or when the visitor switches.
const WorldApp = lazy(() => import('@/world/WorldApp'));
const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

function App() {
  const [mode, setMode] = useState(() =>
    new URLSearchParams(window.location.search).has('classic') || !hasWebGL() ? 'classic' : 'world'
  );
  const toClassic = () => {
    window.history.replaceState(null, '', '?classic' + window.location.hash);
    setMode('classic');
  };
  const toWorld = () => {
    window.history.replaceState(null, '', window.location.pathname);
    setMode('world');
  };
  useEffect(() => {
    // Initialize Google Analytics (if you have a tracking ID)
    const trackingId = 'GA_TRACKING_ID'; // Replace with your actual GA tracking ID
    
    if (trackingId && trackingId !== 'GA_TRACKING_ID') {
      // Load Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', trackingId, {
          page_title: document.title,
          page_location: window.location.href,
        });
        
        // Make gtag available globally
        window.gtag = gtag;
      };
    }

    // Set up performance monitoring
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'load',
            value: loadTime,
          });
        }
      });
    }

    // Set up error tracking
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      
      // Track to analytics if available
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: false,
        });
      }
    });

    // Set up unhandled promise rejection tracking
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Track to analytics if available
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: event.reason?.message || 'Unhandled promise rejection',
          fatal: false,
        });
      }
    });

    // PWA install prompt handling
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      // Track to analytics if available
      if (window.gtag) {
        window.gtag('event', 'app_installed', {
          event_category: 'PWA',
        });
      }
    });

    // Cleanup function
    return () => {
      // Remove event listeners if needed
    };
  }, []);

  if (mode === 'world') {
    return (
      <Suspense fallback={<div style={{ position: 'fixed', inset: 0, background: '#07081a' }} />}>
        <WorldApp onClassic={toClassic} />
      </Suspense>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    {hasWebGL() && (
      <button
        onClick={toWorld}
        className="fixed bottom-5 left-5 z-50 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/90 dark:bg-[oklch(0.172_0.006_155/0.9)] px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 shadow-sm hover:text-primary-600"
      >
        Explore the 3D world →
      </button>
    )}
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio-app"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="min-h-screen relative"
      >
        <Layout>
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Experience Section */}
          <Experience />
          
          {/* Research Section */}
          <Research />
          
          {/* Contact Section */}
          <Contact />
        </Layout>
      </motion.div>
    </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
