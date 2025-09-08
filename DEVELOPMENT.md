# 🛠️ Development Guide

This guide will help you understand the codebase structure and how to extend and customize the portfolio website.

## 🏗️ Architecture Overview

The portfolio is built using a modern React architecture with the following principles:

- **Component-based**: Reusable UI components in `/components`
- **Section-based**: Main portfolio sections in `/sections`
- **Hook-based**: Custom hooks for state management in `/hooks`
- **Utility-first**: Helper functions and animations in `/utils`
- **Data-driven**: All content managed through constants in `/data`

## 📦 Key Dependencies

| Package | Purpose | Documentation |
|---------|---------|---------------|
| React | UI library | [React Docs](https://react.dev) |
| Vite | Build tool | [Vite Docs](https://vitejs.dev) |
| TailwindCSS | CSS framework | [Tailwind Docs](https://tailwindcss.com) |
| Framer Motion | Animations | [Framer Motion Docs](https://framer.com/motion) |
| Lucide React | Icons | [Lucide Docs](https://lucide.dev) |
| EmailJS | Contact form | [EmailJS Docs](https://emailjs.com) |

## 🎨 Design System

### Color Palette

The portfolio uses a consistent color system defined in `tailwind.config.js`:

- **Primary**: Blue shades (branding, CTAs, links)
- **Secondary**: Purple/Pink shades (accents, gradients)
- **Neutral**: Gray shades (text, backgrounds, borders)

### Typography

- **Sans**: Inter (headings, body text)
- **Mono**: JetBrains Mono (code snippets, technical content)

### Spacing

Following Tailwind's 4px base unit system for consistent spacing.

## 🧩 Component Architecture

### UI Components (`/components/ui`)

Reusable, generic components that can be used throughout the application:

- `Button.jsx` - Customizable button with variants and states
- `Card.jsx` - Flexible card component with header/content/footer
- `Input.jsx` - Form input with label, error, and helper text
- `Textarea.jsx` - Multi-line text input
- `Badge.jsx` - Small labels and tags
- `ThemeToggle.jsx` - Dark/light mode switcher

### Layout Components (`/components/layout`)

Application-level layout components:

- `Layout.jsx` - Main app wrapper with global providers
- `Navbar.jsx` - Sticky navigation with scroll detection
- `Footer.jsx` - Site footer with links and info

### Section Components (`/sections`)

Main content sections of the portfolio:

- `Hero.jsx` - Landing section with CTA
- `About.jsx` - Personal introduction and stats
- `Skills.jsx` - Technical skills showcase
- `Projects.jsx` - Project portfolio with filtering
- `Experience.jsx` - Work history and education timeline
- `Contact.jsx` - Contact form and information

## 🪝 Custom Hooks

### `useTheme.js`

Manages dark/light mode state with localStorage persistence:

```javascript
const { theme, toggleTheme } = useTheme();
```

### `useScrollSpy.js`

Tracks which section is currently in view for navigation highlighting:

```javascript
const activeSection = useScrollSpy(['home', 'about', 'skills']);
```

## 🎭 Animation System

Animations are powered by Framer Motion with predefined variants in `/utils/animations.js`:

### Basic Animations
- `fadeInUp` - Fade in from bottom
- `fadeInDown` - Fade in from top
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale up fade in

### Interactive Animations
- `hoverScale` - Scale on hover
- `hoverLift` - Lift on hover
- `tapScale` - Scale down on tap

### Container Animations
- `staggerContainer` - Container for staggered children
- `staggerItem` - Individual staggered item

### Usage Example

```javascript
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## 📊 Data Management

All portfolio content is managed through constants in `/data/constants.js`:

### Key Data Objects

- `PERSONAL_INFO` - Basic personal information
- `SOCIAL_LINKS` - Social media profiles
- `NAVIGATION` - Site navigation items
- `SKILLS` - Technical skills with levels
- `PROJECTS` - Project portfolio
- `EXPERIENCE` - Work history
- `EDUCATION` - Educational background
- `TESTIMONIALS` - Client testimonials
- `CONTACT_INFO` - Contact details

### Adding New Content

1. Update the relevant constant in `constants.js`
2. The component will automatically render the new content
3. No component changes needed for basic additions

## 🎯 Performance Optimizations

### Code Splitting

The app uses dynamic imports for large dependencies:

```javascript
// Lazy load heavy components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Image Optimization

- Use WebP format for better compression
- Implement lazy loading for images
- Provide appropriate alt text for accessibility

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## 🌍 Internationalization (Future)

To add multi-language support:

1. Install `react-i18next`
2. Create translation files in `/public/locales`
3. Wrap text content with `t()` function
4. Add language switcher to navbar

## 🧪 Testing Strategy

### Unit Testing (Recommended)

```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

### E2E Testing (Optional)

```bash
# Install Playwright
npm install -D @playwright/test
```

## 🔒 Security Considerations

### Content Security Policy

Add CSP headers for production:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com;">
```

### Environment Variables

Store sensitive data in environment variables:

```bash
# .env.local
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_GA_TRACKING_ID=your_tracking_id
```

## 📱 PWA Features

### Service Worker

The service worker (`/public/sw.js`) provides:

- Offline functionality
- Cache management
- Background sync for forms
- Push notifications (ready for future use)

### App Installation

Users can install the portfolio as an app:

1. Chrome: "Install App" button in address bar
2. iOS Safari: "Add to Home Screen"
3. Android: "Add to Home Screen"

## 🚀 Deployment Optimizations

### Build Optimizations

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
});
```

### CDN and Caching

- Use CDN for static assets
- Implement proper cache headers
- Enable gzip compression

## 🐛 Debugging Tips

### Common Issues

1. **Dark mode not working**: Check if `dark` class is on `<html>` element
2. **Animations not triggering**: Verify `whileInView` viewport settings
3. **Contact form not sending**: Check EmailJS configuration
4. **Images not loading**: Verify paths and file extensions

### Development Tools

```javascript
// Enable debug mode for Framer Motion
import { domAnimation, LazyMotion } from 'framer-motion';

// Wrap app with LazyMotion for better performance
<LazyMotion features={domAnimation}>
  <App />
</LazyMotion>
```

## 🔄 Version Updates

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest
```

### Breaking Changes

Always check changelogs before updating:

- React: Component API changes
- Framer Motion: Animation API updates
- TailwindCSS: Class name changes

## 🤝 Contributing Guidelines

### Code Style

- Use ESLint configuration provided
- Follow React best practices
- Use semantic commit messages
- Write descriptive component names

### Pull Request Process

1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation if needed
4. Submit PR with clear description

## 📚 Additional Resources

### Learning Materials

- [React Beta Docs](https://react.dev)
- [TailwindCSS Playground](https://play.tailwindcss.com)
- [Framer Motion Examples](https://framer.com/motion/examples)

### Design Inspiration

- [Dribbble Portfolio Designs](https://dribbble.com/search/portfolio)
- [Awwwards Portfolio Sites](https://awwwards.com/websites/portfolio)
- [Behance Web Design](https://behance.net/search/projects?search=web%20design)

---

Happy coding! 🚀
