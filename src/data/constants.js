// Portfolio Data Constants
// Replace this dummy data with your actual information
import { 
  mihirPhoto, 
  backgroundImage, 
  cashiraImage, 
  vocaprepImage, 
  amiokayImage,
  resumePdf
} from '@/assets/images';

export const PERSONAL_INFO = {
  name: "Mihir Gupta",
  title: "Software Engineer",
  tagline: "Building scalable solutions with React.js & Next.js",
  description:
    "I'm a passionate software engineer and founding engineer at multiple startups, with experience in building scalable, impactful web applications from the ground up. Skilled in React.js, Next.js, Golang, Node.js, and cloud pipelines, I thrive at the intersection of product vision and technical execution. I've also published research in AI-driven encryption and healthcare risk prediction.",
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
    id: 3,
    title: "AmIOkay - Self Diagnosis App using Machine Learning",
    description:
      "An online disease predictor can also suggest medicines and nearby hospitals based on the three symptoms.",
    image: amiokayImage,
    technologies: ["HTML", "Tailwind CSS", "Flask", "Machine Learning"],
    liveUrl: "https://devpost.com/software/amiok", 
    githubUrl: "https://github.com/suhaasbadada/amiokay",
    featured: true,
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


export const CONTACT_INFO = {
  email: "contact@mihirgupta.dev",
  phone: "",
  location: "Bengaluru, India",
  availability: "Open to exciting opportunities",
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
