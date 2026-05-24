// Portfolio Data Constants
// Replace this dummy data with your actual information
import { 
  mihirPhoto, 
  backgroundImage, 
  cashiraImage, 
  vocaprepImage, 
  amiokayImage,
  resumePdf, 
  kairosImage,
  qestraImage,
  wrapshareImage
} from '@/assets/images';

export const PERSONAL_INFO = {
  name: "Mihir Gupta",
  title: "Full Stack Development Studio",
  tagline: "Fast, polished web products. From idea to production.",
  description:
    "We're a boutique full-stack studio with 3+ years of experience building products for startups and founders. We operate lean. One clear point of contact, trusted collaborators brought in when the scope demands it. Specialising in React.js, Next.js, Golang, and Node.js, with founding-engineer experience at two startups and published research in AI and machine learning.",
  email: "mihirgupta0712@gmail.com",
  phone: "", // optional – add if you want it public
  location: "Bengaluru, India",
  avatar: mihirPhoto,
  about_image: backgroundImage,
  resume: resumePdf,
};

export const SOCIAL_LINKS = {
  github: "https://github.com/MihirGupta07", // replace with your actual GitHub
  linkedin: "https://www.linkedin.com/in/mihirgupta7",
  twitter: "",
  email: "mailto:mihirgupta0712@gmail.com",
  instagram: "https://www.instagram.com/snapsbymihir/",
  medium: "https://medium.com/@mihirgupta0712",
  dev: "",
};

export const NAVIGATION = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const SKILLS = {
  frontend: [
    { name: "React.js", level: 90, icon: "⚛️" },
    { name: "Next.js", level: 90, icon: "⚡" },
    { name: "JavaScript", level: 95, icon: "🟨" },
    { name: "TypeScript", level: 85, icon: "🔷" },
    { name: "HTML5", level: 95, icon: "🟠" },
    { name: "CSS3", level: 90, icon: "🎨" },
    { name: "Tailwind CSS", level: 90, icon: "💨" },
  ],
  backend: [
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Golang", level: 80, icon: "🐹" },
    { name: "MongoDB", level: 80, icon: "🍃" },
    { name: "PostgreSQL", level: 75, icon: "🐘" },
    { name: "Drizzle ORM", level: 75, icon: "🗄️" },
    { name: "tRPC", level: 75, icon: "🔗" },
    { name: "REST APIs", level: 90, icon: "🔌" },
  ],
  tools: [
    { name: "Git", level: 90, icon: "🌿" },
    { name: "AWS Code Pipelines", level: 75, icon: "☁️" },
    { name: "Docker", level: 70, icon: "🐳" },
    { name: "VS Code", level: 95, icon: "💙" },
    { name: "Figma", level: 80, icon: "🎨" },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "Cashira - Money Tracking PWA",
    description:
      "A modern progressive web app to track expenses with category grids, charts, and Firebase authentication.",
    image: cashiraImage,
    technologies: ["Next.js", "Firebase", "Firestore", "Tailwind CSS"],
    liveUrl: "https://cashira.vercel.app", 
    githubUrl: "https://github.com/MihirGupta07/cashira",
    featured: true,
  },
  {
    id: 2,
    title: "Kairos - AI Powered Sales Objection Tracker",
    description:
      "AI Powered Sales Objection Tracker that captures every objection across every meeting, Zoom calls, field visits, voice memos, clusters them with AI, and tells you exactly what to do about it.",
    image: kairosImage,
    technologies: ["Next.js","Framer Motion", "MongoDB", "Tailwind CSS", "OpenAI", "Anthropic"],
    liveUrl: "https://gokairos.vercel.app", 
    // githubUrl: "https://github.com/MihirGupta07/kairos",
    featured: true,
  },
  {
    id: 3,
    title: "Vocaprep - English Language Learning App",
    description:
      "A PWA for learning English language with flashcards, for competitive exams like GMAT, GRE, TOEFL, IELTS, etc.",
    image: vocaprepImage,
    technologies: ["React.js", "Framer Motion", "PWA", "Tailwind CSS"],
    liveUrl: "https://voca-prep.vercel.app/", 
    githubUrl: "https://github.com/MihirGupta07/VocaPrep",
    featured: true,
  },
  {
    id: 4,
    title: "AmIOkay - Self Diagnosis App using Machine Learning",
    description:
      "An online disease predictor can also suggest medicines and nearby hospitals based on the three symptoms.",
    image: amiokayImage,
    technologies: ["HTML", "Tailwind CSS", "Flask", "Machine Learning"],
    liveUrl: "https://devpost.com/software/amiok",
    githubUrl: "https://github.com/suhaasbadada/amiokay",
    featured: true,
  },
  {
    id: 5,
    title: "Qestra - AI Agent Runner",
    description:
      "Self-hostable agent runner that executes iterative LLM/tool loops with human approval gates for sensitive actions. Supports multiple LLM providers, sandboxed tool execution, per-agent budget caps, and a Next.js management dashboard.",
    image: qestraImage,
    emoji: "🤖",
    technologies: ["Next.js", "TypeScript", "OpenAI", "Anthropic" , "Open Source"],
    liveUrl: "https://qestra.vercel.app",
    githubUrl: "https://github.com/MihirGupta07/Qestra",
    featured: true,
  },
  {
    id: 6,
    title: "WrapShare - Spotify Stats Anytime",
    description:
      "Generate beautiful, shareable Spotify listening visualisations weekly or monthly — no waiting for annual Wrapped. Multiple themes, story-ready 9:16 formats, and Razorpay-powered subscriptions.",
    image: wrapshareImage,
    emoji: "🎵",
    technologies: ["Next.js", "Supabase", "Puppeteer", "Razorpay"],
    liveUrl: "",
    githubUrl: "https://github.com/MihirGupta07/wrapshare",
    featured: false,
  },
  {
    id: 7,
    title: "Skribbl.io Clone - Multiplayer Drawing Game",
    description:
      "Real-time multiplayer drawing and guessing game with room creation, live chat, guess detection, and a scoring system. Mobile-optimised and fully playable in the browser.",
    image: null,
    emoji: "🎨",
    technologies: ["Next.js", "TypeScript", "Socket.IO", "Firebase"],
    liveUrl: "",
    githubUrl: "https://github.com/MihirGupta07/skribblio-clone",
    featured: false,
  },
  {
    id: 8,
    title: "MindfulYouth - Mental Health Platform",
    description:
      "Full-stack mental wellness platform for young people, featuring resources and support tools built with Next.js, TypeScript, and PostgreSQL.",
    image: null,
    emoji: "🧠",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://mindfulyouth-olive.vercel.app",
    githubUrl: "https://github.com/MihirGupta07/MindfulYouth",
    featured: false,
  },
  {
    id: 9,
    title: "ScytheChat - Encrypted Group Chat",
    description:
      "Web-based group chat app with invite-code rooms and end-to-end encrypted messages stored in Cloud Firestore. Sign in with Google and chat securely.",
    image: null,
    emoji: "🔐",
    technologies: ["React.js", "Firebase", "Firestore", "Google Auth"],
    liveUrl: "https://scythechat-70f85.web.app/",
    githubUrl: "https://github.com/MihirGupta07/ScytheChat",
    featured: false,
  },
  {
    id: 10,
    title: "isMyFlightDelayed - Flight Status Checker",
    description:
      "Web app that lets travellers instantly check whether their flight is delayed, with a clean React frontend and live flight data API.",
    image: null,
    emoji: "✈️",
    technologies: ["React.js", "Vite", "REST APIs", "Tailwind CSS"],
    liveUrl: "https://ismyflightdelayed.vercel.app",
    githubUrl: "https://github.com/MihirGupta07/isMyFlightDelayed",
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
      "Leading core product development from scratch with React.js, Node.js, MongoDB, PWA, and AWS Code Pipelines.",
    achievements: [
      "Aligned technology strategy with company mission",
      "Developed solutions enhancing elderly cognitive wellness",
    ],
  },
  {
    id: 2,
    title: "Founding Software Engineer",
    company: "Almond",
    period: "Aug 2024 – Jan 2025",
    location: "Bengaluru, India",
    description:
      "Built a digital trade platform leveraging Next.js, PostgreSQL, Drizzle ORM, and tRPC.",
    achievements: [
      "Collaborated closely with founders to align product and tech",
      "Delivered scalable and innovative product features",
    ],
  },
  {
    id: 3,
    title: "Member of Technical Staff 1",
    company: "BYJU’S",
    period: "Jan 2023 – Jan 2024",
    location: "Hyderabad, India",
    description:
      "Developed optimized APIs and frontend features across WhitehatJr and Byju’s Neo InClass.",
    achievements: [
      "Built multiple Golang APIs improving performance",
      "Reduced user drop-offs by 45% with React.js enhancements",
      "Independently delivered 10+ PRDs from planning to release",
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


export const SERVICES = [
  {
    id: 1,
    icon: "🚀",
    title: "MVP Development",
    description: "Turn your idea into a working product. We move fast, ship quality, and help founders validate before scaling.",
    bullets: ["Full-stack build from zero", "Launch in weeks, not months", "Built to scale when you're ready"],
  },
  {
    id: 2,
    icon: "🔍",
    title: "Tech Consulting & Audits",
    description: "An expert set of eyes on your codebase, architecture, or product strategy before you make costly decisions.",
    bullets: ["Code & architecture reviews", "Performance audits", "Technology stack advice"],
  },
  {
    id: 3,
    icon: "🔄",
    title: "Ongoing Retainer",
    description: "Your on-call engineering partner. Monthly dev bandwidth for feature development, maintenance, and scaling.",
    bullets: ["Dedicated monthly hours", "Feature development", "Priority support & maintenance"],
  },
  {
    id: 4,
    icon: "🎨",
    title: "Design + Development",
    description: "UI/UX design paired with production-quality code. One partner handles it all, no coordination overhead.",
    bullets: ["UI/UX design in Figma", "Pixel-perfect implementation", "Responsive & accessible"],
  },
];

export const CONTACT_INFO = {
  email: "mihirgupta0712@gmail.com",
  phone: "",
  location: "Bengaluru, India",
  availability: "Taking on new projects",
  response_time: "Usually responds within 24 hours",
};

// EmailJS Configuration (Replace with your actual EmailJS details)
export const EMAIL_CONFIG = {
  serviceId: "service_vspqwk9",
  templateId: "template_zol1cqt",
  publicKey: "UE30mayPn_gb9geGg",
};

// Why Work With Me — shown in About section
export const FUN_FACTS = [
  "🚀 Shipped 20+ production products",
  "🤝 Direct, no-middleman communication",
  "⚡ Fast turnarounds without quality cuts",
  "🎵 Music producer on the side",
];

// Statistics for the About section
export const STATS = [
  { label: "Years of Experience", value: "3+" },
  { label: "Projects Delivered", value: "20+" },
  { label: "Startups Served", value: "5+" },
  { label: "Code Commits", value: "2000+" },
];
