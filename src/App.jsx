import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Contact from '@/sections/Contact';
import Services from '@/sections/Services';
import InfiniteGrid from '@/components/ui/InfiniteGrid';
import { pageVariants, pageTransition } from '@/utils/animations';

function App() {
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
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track to analytics if available
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
      console.log('PWA install prompt available');
      e.preventDefault();
      deferredPrompt = e;
      
      // You can show a custom install button here
      // For now, we'll just log it
      console.log('Install prompt deferred');
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      
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

  return (
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
        {/* Global Infinite Grid Background */}
        <InfiniteGrid />
        
        <Layout>
          {/* Hero Section */}
          <Hero />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Services Section */}
          <Services />

          {/* About Section */}
          <About />

      
          
          {/* Experience Section */}
          {/* <Experience /> */}

          {/* Contact Section */}
          <Contact />
        </Layout>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
