import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <main className="relative">
        {children}
      </main>
      <Footer />
      
      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      {/* CSS Variables for Toast Theming */}
      <style jsx global>{`
        :root {
          --toast-bg: #ffffff;
          --toast-color: #171717;
          --toast-border: #e5e5e5;
        }
        
        .dark {
          --toast-bg: #262626;
          --toast-color: #fafafa;
          --toast-border: #404040;
        }
      `}</style>
    </div>
  );
};

export default Layout;
