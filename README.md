# 🚀 Modern Portfolio Website

A beautiful, modern, and responsive portfolio website built with React, Vite, TailwindCSS, and Framer Motion. Features dark/light mode, smooth animations, PWA support, and a working contact form.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes with localStorage persistence
- **Smooth Animations**: Beautiful animations powered by Framer Motion
- **PWA Support**: Installable as a Progressive Web App
- **Contact Form**: Working contact form with EmailJS integration
- **SEO Optimized**: Meta tags, OpenGraph, and semantic HTML
- **Performance**: Optimized for speed and Core Web Vitals
- **Accessibility**: ARIA labels and keyboard navigation support

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: EmailJS
- **Notifications**: React Hot Toast
- **PWA**: Service Worker + Web App Manifest

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Footer, Layout)
│   └── ui/             # UI components (Button, Card, Input, etc.)
├── sections/           # Main portfolio sections
│   ├── Hero.jsx        # Landing/Hero section
│   ├── About.jsx       # About me section
│   ├── Skills.jsx      # Skills and technologies
│   ├── Projects.jsx    # Projects showcase
│   ├── Experience.jsx  # Work experience & education
│   └── Contact.jsx     # Contact form and info
├── hooks/              # Custom React hooks
│   ├── useTheme.js     # Theme management
│   └── useScrollSpy.js # Active section detection
├── utils/              # Utility functions
│   ├── animations.js   # Framer Motion variants
│   └── helpers.js      # General helper functions
├── data/               # Static data
│   └── constants.js    # Portfolio data and configuration
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles and Tailwind imports
```

## 🎨 Customization

### 1. Personal Information

Edit `src/data/constants.js` to update your personal information:

```javascript
export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Your Job Title",
  email: "your.email@example.com",
  // ... other details
};
```

### 2. Projects

Add your projects to the `PROJECTS` array in `src/data/constants.js`:

```javascript
export const PROJECTS = [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    image: "/path/to/image.jpg",
    technologies: ["React", "Node.js"],
    liveUrl: "https://your-project.com",
    githubUrl: "https://github.com/username/project",
    featured: true,
  },
  // ... more projects
];
```

### 3. Skills

Update the `SKILLS` object to reflect your technical skills:

```javascript
export const SKILLS = {
  frontend: [
    { name: "React", level: 90, icon: "⚛️" },
    // ... more skills
  ],
  // ... other categories
};
```

### 4. Theme Colors

Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      secondary: {
        // Your secondary color palette
      },
    },
  },
},
```

### 5. Contact Form Setup

To enable the contact form, set up EmailJS:

1. Create an account at [EmailJS](https://emailjs.com)
2. Create an email service and template
3. Update `EMAIL_CONFIG` in `src/data/constants.js`:

```javascript
export const EMAIL_CONFIG = {
  serviceId: "your_service_id",
  templateId: "your_template_id",
  publicKey: "your_public_key",
};
```

### 6. Google Analytics

Add your Google Analytics tracking ID in `src/App.jsx`:

```javascript
const trackingId = 'GA_TRACKING_ID'; // Replace with your GA4 tracking ID
```

## 📱 PWA Configuration

The portfolio is configured as a Progressive Web App:

- **Manifest**: `public/manifest.json`
- **Service Worker**: `public/sw.js`
- **Icons**: Add your app icons to `public/icons/`

### Adding App Icons

1. Generate icons in various sizes (72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512)
2. Place them in `public/icons/`
3. Update the manifest.json icon paths

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with default settings

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to [Netlify](https://netlify.com)

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Build and deploy: `npm run build && npm run deploy`

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [EmailJS](https://emailjs.com/) - Email service

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to:

- Open an issue on GitHub
- Contact me via email
- Check the documentation

---

**Made with ❤️ and lots of ☕**
