// Portfolio Data Constants
// Replace this dummy data with your actual information
import {
  mihirPhoto,
  backgroundImage,
  kairosImage,
  qestraImage,
  geohideImage,
  caloImage,
  gitwizzImage,
  wrapshareImage,
  resumePdf
} from '@/assets/images';

export const PERSONAL_INFO = {
  name: "Mihir Gupta",
  title: "Software Engineer",
  tagline: "Senior full-stack engineer. Building AI-integrated systems, 0 → production → scale.",
  description:
    "Founding engineer at two Bengaluru startups — architected 5 production platforms and a self-updating AI/RAG tool at Ivory, and built a B2B digital trade platform end-to-end at Almond. Full-stack in React, Next.js, and Node, with hands-on LLM and RAG systems work. Published research in AI encryption and cardiovascular disease prediction.",
  email: "contact@mihirgupta.dev",
  phone: "", // optional – add if you want it public
  location: "Bengaluru, India",
  avatar: mihirPhoto, // Replace with your actual photo
  about_image: backgroundImage, // Replace with your actual photo
  resume: resumePdf, // Replace with your resume file path
};

export const SOCIAL_LINKS = {
  github: "https://github.com/MihirGupta07", // replace with your actual GitHub
  linkedin: "https://www.linkedin.com/in/mihirgupta7",
  twitter: "",
  email: "mailto:contact@mihirgupta.dev",
  instagram: "https://www.instagram.com/snapsbymihir/",
  medium: "https://medium.com/@mihirgupta0712",
  dev: "",
};

export const NAVIGATION = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

export const SKILLS = {
  frontend: [
    { name: "React.js", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 90, icon: "⚡" },
    { name: "TypeScript", level: 85, icon: "🔷" },
    { name: "JavaScript (ES6+)", level: 95, icon: "🟨" },
    { name: "Redux", level: 80, icon: "🔁" },
    { name: "Zustand", level: 80, icon: "🐻" },
    { name: "React Native", level: 75, icon: "📱" },
    { name: "Tailwind CSS", level: 90, icon: "💨" },
    { name: "HTML5", level: 95, icon: "🟠" },
    { name: "CSS3", level: 90, icon: "🎨" },
  ],
  backend: [
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "tRPC", level: 75, icon: "🔗" },
    { name: "Socket.io", level: 80, icon: "🔌" },
    { name: "PostgreSQL", level: 75, icon: "🐘" },
    { name: "Drizzle ORM", level: 75, icon: "🗄️" },
    { name: "MongoDB / Mongoose", level: 80, icon: "🍃" },
    { name: "SQL", level: 80, icon: "🗃️" },
    { name: "Firebase", level: 75, icon: "🔥" },
    { name: "REST / API Design", level: 90, icon: "🔌" },
  ],
  ai_systems: [
    { name: "LLM Integration (OpenAI, Gemini, Groq)", level: 85, icon: "🤖" },
    { name: "RAG Pipelines", level: 80, icon: "🧠" },
    { name: "Knowledge Graphs", level: 75, icon: "🕸️" },
    { name: "MCP", level: 70, icon: "🔗" },
  ],
  tools: [
    { name: "Git", level: 90, icon: "🌿" },
    { name: "AWS", level: 75, icon: "☁️" },
    { name: "Docker", level: 75, icon: "🐳" },
    { name: "VS Code", level: 95, icon: "💙" },
    { name: "Figma", level: 80, icon: "🎨" },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "GeoHide",
    description:
      "Real-time multiplayer hide-and-seek played inside Google Street View. Server-authoritative Socket.io game engine with anti-cheat design, shipped across web and native iOS/Android.",
    image: geohideImage,
    technologies: ["Next.js", "Socket.io", "MongoDB", "React Native", "Docker"],
    liveUrl: "https://geohide.in",
    // githubUrl: "https://github.com/MihirGupta07/geohide",
    featured: true,
  },
  {
    id: 2,
    title: "calo",
    description:
      "AI-powered calorie and macro tracker built for the Indian market. Multi-provider LLM pipeline (Gemini/Groq) with confidence-scored nutrition estimates and an offline-first PWA.",
    image: caloImage,
    technologies: ["Next.js","LLM APIs", "Gemini", "Groq", "MongoDB", "PWA"],
    liveUrl: "https://calo.mihirgupta.dev",
    // githubUrl: "https://github.com/MihirGupta07/calo",
    featured: true,
  },
  {
    id: 3,
    title: "Kairos",
    description:
      "Multi-tenant AI sales platform that extracts objections from call transcripts, drafts rebuttal playbooks, and plans geo-optimized field visit routes.",
    image: kairosImage,
    technologies: ["Next.js", "MongoDB", "LLM APIs", "Google Routes API", "RazorPay"],
    liveUrl: "https://kairos.mihirgupta.dev",
    // githubUrl: "https://github.com/MihirGupta07/specktr",
    featured: true,
  },
  {
    id: 4,
    title: "GitWizz",
    description:
      "Interactive Git-learning platform with a custom D3.js commit-graph engine and a guardrailed AI tutor for hands-on lessons on rebase, cherry-pick, and more.",
    image: gitwizzImage,
    technologies: ["Next.js", "D3.js", "Groq", "MongoDB"],
    liveUrl: "https://git-wizz.vercel.app/",
    // githubUrl: "https://github.com/MihirGupta07/learn-git",
    featured: true,
  },
  {
    id: 5,
    title: "Wrapshare",
    description:
      "Spotify Wrapped, on demand — generates shareable story-format recaps with Razorpay-powered payments and serverless image rendering.",
    image: wrapshareImage,
    technologies: ["Next.js", "Supabase", "Razorpay", "Puppeteer"],
    liveUrl: "",
    githubUrl: "https://github.com/MihirGupta07/wrapshare",
    featured: false,
  },
  {
    id: 6,
    title: "Qestra",
    description:
      "Governed multi-agent AI orchestrator — approval-gated execution, encrypted BYOK credentials, and full audit trails for enterprise AI agents.",
    image: qestraImage,
    technologies: ["Fastify", "Next.js", "MongoDB", "Redis", "Docker"],
    liveUrl: "",
    githubUrl: "https://github.com/MihirGupta07/Qestra",
    featured: false,
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    title: "Founding Software Engineer",
    company: "Ivory",
    period: "Jan 2024 – Present",
    location: "Bengaluru, India",
    description:
      "Owned architecture and delivery for 5 full-stack healthcare products from 0 → production — D2C, B2B SaaS, CRM, internal tools, and clinical research systems — while leading performance and reliability work through rapid user growth.",
    achievements: [
      "Architected and shipped 5 production platforms end-to-end, spanning D2C, B2B SaaS, CRM, internal tools, and clinical research systems",
      "Scaled a D2C cognitive wellness platform to 60K+ users and a B2B SaaS platform to 200+ healthcare partners",
      "Led backend and infra performance work during rapid growth — cut API/DB latency via query optimization and caching, eliminated downtime",
      "Built a self-updating AI Slack assistant: a RAG pipeline over a code knowledge graph across 20+ company repos that re-indexes on every commit for company-wide code Q&A",
      "Partnered directly with founders and domain experts to translate ambiguous product direction into scalable technical architecture",
    ],
  },
  {
    id: 2,
    title: "Founding Software Engineer",
    company: "Almond",
    period: "Aug 2024 – Jan 2025",
    location: "Bengaluru, India",
    description:
      "Sole engineering owner for a B2B digital trade platform built from scratch — system design and full-stack delivery on Next.js, PostgreSQL, Drizzle ORM, and tRPC.",
    achievements: [
      "Designed backend systems and APIs to support high-concurrency business workflows",
      "Translated ambiguous founder vision into scalable technical architecture as sole engineering owner",
      "Shipped an all-in-one trade platform that cut operational time and cost for business customers",
    ],
  },
  {
    id: 3,
    title: "Member of Technical Staff 1",
    company: "BYJU’S",
    period: "Jan 2023 – Jan 2024",
    location: "Hyderabad, India",
    description:
      "Shipped APIs and frontend features across WhitehatJr, Aakash, and Byju’s Neo InClass products.",
    achievements: [
      "Delivered high-impact features and platform improvements across three product teams, building high-performance Node.js APIs",
      "Reduced user drop-offs by 45% through React.js UX improvements",
      "Independently owned end-to-end delivery of 10+ PRDs from design through production rollout",
    ],
  },
  {
    id: 4,
    title: "Web Development Intern",
    company: "TapTalent.ai",
    period: "Jun – Aug 2022",
    location: "Bengaluru, India",
    description: "Developed and enhanced 2 products with ReactJS.",
  },
  {
    id: 5,
    title: "Frontend Developer Intern",
    company: "Appskill Technologies",
    period: "Apr – Jun 2022",
    location: "Gurugram, India",
  },
  {
    id: 6,
    title: "Frontend Web Developer",
    company: "The Happy Turtle",
    period: "Feb – Apr 2022",
    location: "Delhi, India",
  },
];

export const EDUCATION = [
  {
    id: 1,
    degree: "B.Tech, Computer Science",
    school: "Vellore Institute of Technology",
    period: "2019 – 2023",
    location: "Vellore, India",
    achievements: [],
  },
];

export const RESEARCH = [
  {
    id: 1,
    title:
      "Symmetric Encryption using Artificial Neural Network, Binary Tree Traversal, and Interleaving Salting",
    publication: "IJEAT, Vol. 11, Issue 6, 2022",
    url: "https://www.ijeat.org/wp-content/uploads/papers/v11i6/F37220811622.pdf",
    abstract: "This research presents a novel approach to symmetric encryption by integrating artificial neural networks with binary tree traversal and interleaving salting techniques. The proposed method enhances data security through multiple layers of encryption and randomization.",
    keywords: ["Artificial Neural Network", "Encryption", "Binary Tree", "Data Security", "Salting"],
    description: "A comprehensive study on enhancing symmetric encryption methods using AI and advanced algorithmic approaches."
  },
  {
    id: 2,
    title:
      "Predicting Cardiovascular Disease (CVD) Risk Over Time Utilizing Multifaceted Health and Lifestyle Parameters",
    publication: "IJSR, 2023",
    url: "https://www.ijsr.net/getabstract.php?paperid=SR23911102627",
    abstract: "This study develops a predictive model for cardiovascular disease risk assessment using machine learning algorithms applied to comprehensive health and lifestyle datasets. The model demonstrates significant accuracy in early risk detection.",
    keywords: ["Machine Learning", "Healthcare", "Risk Prediction", "Cardiovascular Disease", "Data Analysis"],
    description: "Research focused on leveraging machine learning for healthcare applications, specifically in cardiovascular risk assessment."
  },
];


export const CONTACT_INFO = {
  email: "contact@mihirgupta.dev",
  phone: "",
  location: "Bengaluru, India",
  availability: "Available for full-time roles",
  response_time: "Usually responds within 24 hours",
};

// EmailJS Configuration (Replace with your actual EmailJS details)
export const EMAIL_CONFIG = {
  serviceId: "service_vspqwk9",
  templateId: "template_zol1cqt",
  publicKey: "UE30mayPn_gb9geGg",
};

// Fun facts for the About section
export const FUN_FACTS = [
  "☕ Powered by coffee and curiosity",
  "🎮 Gaming enthusiast in spare time",
  "📚 Always learning new technologies",
  "🎵 Music producer as a hobby",
];

// Statistics for the About section
export const STATS = [
  { label: "Years of Experience", value: "3+" },
  { label: "Projects Completed", value: "20+" },
  { label: "Research Papers Published", value: "2" },
  { label: "Code Commits", value: "2000+" },
];
