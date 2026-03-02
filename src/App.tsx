import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CursorAnimation from './components/CursorAnimation';
import CyberFooter from './components/CyberFooter';
import {
    Github,
    Linkedin,
    Mail,
    ExternalLink,
    Code2,
    Layers,
    Database,
    Cloud,
    Cpu,
    GraduationCap,
    Terminal,
    Award,
    ChevronRight,
    Menu,
    X,
    FileText
} from 'lucide-react';

// --- Types ---
interface Project {
    title: string;
    description: string;
    link: string;
    tech: string[];
    year: string;
    image?: string;
}

interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    logo?: string;
    certificateUrl?: string; // Strict view only
}

interface Education {
    school: string;
    degree: string;
    period: string;
    grade: string;
    logo?: string;
}

interface Certification {
    title: string;
    issuer: string;
    url: string;
}

// --- Data ---
const DATA: {
    name: string;
    title: string;
    subtitle: string;
    profileImage: string;
    contact: {
        phone: string;
        email: string;
        github: string;
        linkedin: string;
    };
    education: Education[];
    experience: Experience[];
    projects: Project[];
    skills: {
        languages: { name: string, logo: string }[];
        frontend: { name: string, logo: string }[];
        backend: { name: string, logo: string }[];
        databases: { name: string, logo: string }[];
        tools: { name: string, logo: string }[];
        ai: { name: string, logo: string }[];
    };
    certifications: Certification[];
} = {
    name: "Mahesh Shinde",
    title: "Full Stack Software Engineer",
    subtitle: "MERN | MEAN | Cloud | DevOps",
    profileImage: "/profile.png",
    contact: {
        phone: "+91-7057115093",
        email: "ermahesh140@gmail.com",
        github: "https://github.com/maheshshinde140",
        linkedin: "https://linkedin.com/in/mahesh-shinde-299289231"
    },
    education: [
        {
            school: "Tulsiramji Gaikwad Patil College of Engineering and Technology, Nagpur",
            degree: "B.Tech in Computer Science and Engineering",
            period: "2022 - 2025",
            grade: "CGPA: 8.8",
            logo: "/tgpcet.jpg"
        },
        {
            school: "Yeshwant Mahavidyalaya, Nanded",
            degree: "12th (Physics, Chemistry, Mathematics)",
            period: "2020 - 2021",
            grade: "92.5%",
            logo: "/yeshwant.jpg"
        },
        {
            school: "RSCS Sainiki School, Nanded",
            degree: "10th",
            period: "2019",
            grade: "88%",
            logo: "https://sainikischoolsagroli.in/wp-content/uploads/2025/07/Sainiki_LOGO-removebg-preview.png"
        }
    ],
    experience: [
        {
            company: "DigitalHut Automations Pvt.Ltd (HarIT Tech Solution)",
            role: "Full Stack Developer Intern",
            period: "Dec 2024 - Mar 2025",
            location: "Nagpur, Maharashtra",
            logo: "https://tnpportal.harittech.in/static/media/harit.feeaf3f71a001be729ef.png",
            certificateUrl: "/certs/digitalhut.pdf",
            description: [
                "Built and deployed TNP Portal with Role-Based Access Control (RBAC), job posting workflows and admin dashboards using React, Node, Express, MongoDB.",
                "Delivered 3 full-stack client projects focusing on performance, security, and responsive UI.",
                "Enhanced AaramSe app (React Native) with real-time queue updates and partner management."
            ]
        },
        {
            company: "Arohi Software",
            role: "Full Stack Developer Intern",
            period: "Mar 2024 - Aug 2024",
            location: "Shrigonda, Maharashtra",
            logo: "https://avatars.githubusercontent.com/u/169677699?v=4",
            certificateUrl: "/certs/arohi.pdf",
            description: [
                "Developed SEO-optimized website using Next.js, Node.js, MongoDB, and Tailwind CSS.",
                "Built REST APIs with Express and integrated middleware with JWT Authentication."
            ]
        },
        {
            company: "EduSkills Foundation",
            role: "Intelligent Automation Virtual Intern (BluePrism)",
            period: "Apr 2024 - Jun 2024",
            location: "Remote",
            logo: "https://eduskillsfoundation.org/wp-content/uploads/2022/09/LOGO_EduSkills.png",
            certificateUrl: "/certs/intelligent_automation.pdf",
            description: [
                "Mastered Robotic Process Automation (RPA) design principles and BluePrism architecture.",
                "Developed automated workflows for data entry and business process optimization."
            ]
        },
        {
            company: "EduSkills Foundation",
            role: "AI/ML Virtual Intern",
            period: "Jan 2024 - Mar 2024",
            location: "Remote",
            logo: "https://eduskillsfoundation.org/wp-content/uploads/2022/09/LOGO_EduSkills.png",
            certificateUrl: "/certs/ai_ml_internship.pdf",
            description: [
                "Worked on TensorFlow models including preprocessing, training, evaluation and deployment strategies.",
                "Used Python with NumPy, Pandas, and Matplotlib for data engineering pipelines."
            ]
        },
        {
            company: "Clustor Computing",
            role: "Full Stack Web Development Intern",
            period: "Jan 2024 - Feb 2024",
            location: "Nagpur, Maharashtra",
            logo: "/clustor.jpg",
            certificateUrl: "/certs/clustor.pdf",
            description: [
                "Built full-stack web applications using WordPress and MERN stack (MongoDB, Express.js, React, Node.js).",
                "Designed database schemas and RESTful APIs to support frontend features."
            ]
        },
        {
            company: "Slash Mark",
            role: "Frontend Intern",
            period: "Dec 2023 - Mar 2024",
            location: "Hyderabad, Telangana",
            logo: "https://slashmark.in/partnerimages/slashmarkmainlogo.png",
            certificateUrl: "/certs/slashmark.pdf",
            description: [
                "Built responsive React components, integrated REST and GraphQL APIs.",
                "Worked with Redux Toolkit for global state management."
            ]
        }
    ],
    projects: [
        {
            title: "TNP Portal",
            description: "Comprehensive Training & Placement System with role-based access, automated workflows, and real-time dashboards for students and admins.",
            link: "https://tnpportal.harittech.in",
            tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
            year: "2024",
            image: "/projects/tnp.png"
        },
        {
            title: "UPSCBeacon",
            description: "UPSC exam preparation portal featuring mock tests, study materials, and an advanced admin panel for content management and user analytics.",
            link: "https://upscbeacon.vercel.app",
            tech: ["MERN", "Tailwind CSS", "Redux", "JWT"],
            year: "2024",
            image: "/projects/upsc.png"
        },
        {
            title: "AaramSe App",
            description: "A cross-platform mobile application for real-time appointment tracking and queue management.",
            link: "#",
            tech: ["React Native", "Expo", "React Navigation", "Node.js"],
            year: "2024"
        },
        {
            title: "RooMoo",
            description: "A visually rich rental room booking platform with advanced search filtering and intuitive booking logic.",
            link: "https://roomooo.onrender.com",
            tech: ["React", "Tailwind CSS", "Framer Motion"],
            year: "2023",
            image: "/projects/roomoo.png"
        },
        {
            title: "Aapla Bajar",
            description: "Modern E-commerce marketplace prototype with product listings and integrated shopping cart.",
            link: "https://aaplabaazar.vercel.app",
            tech: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
            year: "2024",
            image: "/projects/aaplabaazar.png"
        }
    ],
    skills: {
        languages: [
            { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
        ],
        frontend: [
            { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
            { name: "Redux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
        ],
        backend: [
            { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
            { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" }
        ],
        databases: [
            { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
        ],
        tools: [
            { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "AWS", logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" },
            { name: "GitHub Actions", logo: "https://www.vectorlogo.zone/logos/github/github-icon.svg" }
        ],
        ai: [
            { name: "TensorFlow", logo: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" },
            { name: "PyTorch", logo: "https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg" }
        ]
    },
    certifications: [
        {
            title: "Prompt Design in Vertex AI",
            issuer: "Google",
            url: "https://www.credly.com/badges/71f815f1-a3b8-44f0-a7fe-47b23c2c8fab/linked_in_profile"
        },
        {
            title: "Introduction to Large Language Models",
            issuer: "Google",
            url: "https://www.cloudskillsboost.google/public_profiles/63f1dd5a-f664-4803-8059-a043f7b6da78/badges/9039945?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
        },
        {
            title: "Introduction to Generative AI",
            issuer: "Google",
            url: "https://www.cloudskillsboost.google/public_profiles/63f1dd5a-f664-4803-8059-a043f7b6da78/badges/9039660?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share"
        },
        {
            title: "Foundation Course on Generative AI",
            issuer: "TechSaksham",
            url: "/certs/techsaksham.pdf"
        },
        {
            title: "Full Stack Web Development",
            issuer: "Coursera",
            url: "#"
        }
    ]
};

// --- Components ---

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-card py-4 shadow-xl' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold tracking-tight">
                    <span className="text-gradient">MS</span>
                </motion.div>
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-primary-400 transition-colors uppercase tracking-widest">{link.name}</a>
                    ))}
                    <a href="#contact" className="px-5 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary-900/20">Hire Me</a>
                </div>
                <button
                    className="md:hidden text-slate-300"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 md:hidden bg-[#020617]/95 backdrop-blur-2xl"
                        id="mobile-menu"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-10">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl font-black text-slate-100 uppercase tracking-[0.2em] italic hover:text-primary-400 transition-colors"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="px-10 py-4 rounded-full bg-primary-600 text-white text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary-900/40"
                            >
                                Hire Me
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="mb-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-tighter italic">
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
                {subtitle}
            </motion.p>
        )}
        <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} className="h-2 bg-primary-500 mt-4 rounded-full shadow-[0_0_15px_#0ea5e9]" />
    </div>
);

const ContactForm = () => {
    const [result, setResult] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("loading");
        setResult("Sending...");
        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "a849a92b-8d67-44d9-b6ac-ed0fcb8b90fe");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setStatus("success");
                setResult("Message sent successfully!");
                event.currentTarget.reset();
                setTimeout(() => {
                    setResult("");
                    setStatus("idle");
                }, 5000);
            } else {
                setStatus("error");
                setResult(data.message || "Something went wrong.");
            }
        } catch (error) {
            setStatus("error");
            setResult("Failed to send message.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-12 rounded-[2rem] max-w-3xl mx-auto border-white/5 hover:border-primary-500/20 transition-all shadow-2xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/10 transition-all" />

            <form onSubmit={onSubmit} className="space-y-8 text-left relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-1">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            autoComplete="name"
                            placeholder="Your Name"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            autoComplete="email"
                            placeholder="hello@example.com"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project or just say hi..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all resize-none font-medium"
                    ></textarea>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full md:w-auto md:px-12 py-5 bg-primary-600 hover:bg-primary-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 shadow-2xl shadow-primary-900/40 transition-all group/btn"
                    >
                        {status === "loading" ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Processing
                            </span>
                        ) : (
                            <>
                                Send Message <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                role="status"
                                aria-live="polite"
                                className={`flex items-center gap-2 px-6 py-3 rounded-full border ${status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                    } text-xs font-bold uppercase tracking-widest`}
                            >
                                <div className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                {result}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </form>
        </motion.div>
    );
};

const PDFViewerModal = ({ url, isOpen, onClose }: { url: string; isOpen: boolean; onClose: () => void }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            if ((e.ctrlKey && (e.key === 'p' || e.key === 's')) || e.key === 'F12') {
                e.preventDefault();
                alert("Downloading and printing is disabled for security reasons.");
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020617]/90 backdrop-blur-xl"
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="relative w-full max-w-5xl h-[90vh] glass-card rounded-[2rem] overflow-hidden border-white/10 flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h3 className="text-xl font-black uppercase italic tracking-widest text-primary-500">Document Viewer</h3>
                    <button
                        onClick={onClose}
                        aria-label="Close document viewer"
                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 relative bg-slate-900/50">
                    <iframe
                        src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full border-none"
                        title="PDF Viewer"
                    />
                    {/* Security Overlay to block right click and selection on iframe content */}
                    <div className="absolute inset-0 z-10 pointer-events-none" />
                </div>

                <div className="p-4 bg-primary-600/10 text-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary-400">Secure Viewing Mode Active | Download Disabled</p>
                </div>
            </div>
        </motion.div>
    );
};

const App: React.FC = () => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [activeDoc, setActiveDoc] = useState("");

    const openViewer = (url: string) => {
        setActiveDoc(url);
        setViewerOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-primary-500/30">
            <CursorAnimation />
            <Navbar />

            <AnimatePresence>
                {viewerOpen && (
                    <PDFViewerModal
                        url={activeDoc}
                        isOpen={viewerOpen}
                        onClose={() => setViewerOpen(false)}
                    />
                )}
            </AnimatePresence>

            <main>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" />

                <div className="container mx-auto px-4 md:px-6 z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-center lg:text-left">
                            <h4 className="text-primary-400 font-mono mb-4 flex items-center justify-center lg:justify-start gap-2 text-lg uppercase tracking-widest">
                                <Terminal size={20} /> Developer Portfolio
                            </h4>
                            <h1 className="text-4xl md:text-7xl lg:text-9xl font-black mb-6 tracking-tight leading-[0.9] uppercase italic">
                                {DATA.name.split(' ')[0]} <br /><span className="text-gradient underline decoration-primary-500/30">{DATA.name.split(' ')[1]}</span>
                            </h1>
                            <p className="text-lg md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                                {DATA.title} specializing in <span className="text-primary-400 font-bold">{DATA.subtitle}</span>.
                            </p>

                            <div className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start">
                                <motion.a
                                    href="/Mahesh_Shinde_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-black uppercase tracking-widest flex items-center gap-2 shadow-2xl shadow-primary-900/40 transition-all cursor-pointer"
                                >
                                    View Resume <FileText size={20} />
                                </motion.a>
                                <div className="flex gap-4">
                                    {[{ icon: <Github size={24} />, href: DATA.contact.github, label: "GitHub" }, { icon: <Linkedin size={24} />, href: DATA.contact.linkedin, label: "LinkedIn" }].map((s, i) => (
                                        <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} whileHover={{ y: -5, scale: 1.1 }} className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-slate-300 hover:text-primary-400 border-white/10 hover:border-primary-500/50 transition-all">{s.icon}</motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex-1 w-full flex justify-center">
                            <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[550px] lg:h-[550px]">
                                <div className="absolute inset-0 border-2 border-primary-500/30 rounded-[2.5rem] rotate-6 animate-pulse" />
                                <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-[2.5rem] -rotate-6 animate-pulse" />
                                <div className="absolute inset-3 rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-3xl group">
                                    <img src={DATA.profileImage} alt={DATA.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-24 bg-[#03081c]">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeading subtitle="Engineer focused on building production-ready products with measurable outcomes.">About Me</SectionHeading>
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-[2rem] p-8 md:p-10 xl:col-span-3 border-white/5"
                        >
                            <p className="text-primary-400 text-xs font-black uppercase tracking-[0.25em] mb-4">Profile</p>
                            <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tight mb-6 leading-tight">
                                Full Stack Engineer Building High-Trust, High-Performance Products
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-base md:text-lg mb-8">
                                I design and deliver end-to-end web applications using React, Node.js, and modern cloud workflows.
                                My focus is practical engineering: secure APIs, scalable architecture, fast interfaces, and smooth deployment pipelines.
                                I care about product outcomes, not just shipping code.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { icon: <Layers size={18} />, title: "Frontend Systems", detail: "Responsive UI with strong interaction quality and accessibility." },
                                    { icon: <Database size={18} />, title: "Backend Architecture", detail: "Clean APIs, robust auth flows, and production-grade data modeling." },
                                    { icon: <Cloud size={18} />, title: "Delivery & Cloud", detail: "Deployment-ready workflows with performance and reliability focus." }
                                ].map((item) => (
                                    <div key={item.title} className="rounded-2xl bg-slate-900/40 border border-white/5 p-4">
                                        <div className="w-9 h-9 rounded-xl bg-primary-500/15 text-primary-400 flex items-center justify-center mb-3">
                                            {item.icon}
                                        </div>
                                        <p className="text-sm font-black uppercase tracking-wide text-white mb-2">{item.title}</p>
                                        <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.article>

                        <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 }}
                                className="glass-card rounded-[2rem] p-8 border-white/5"
                            >
                                <h3 className="text-sm uppercase tracking-[0.2em] text-primary-400 font-black mb-4">Impact Snapshot</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { value: "6+", label: "Internships" },
                                        { value: "5+", label: "Major Projects" },
                                        { value: "8.8", label: "CGPA" },
                                        { value: "100%", label: "Responsive UI" }
                                    ].map((fact) => (
                                        <div key={fact.label} className="rounded-xl border border-white/5 bg-slate-900/30 p-4 text-center">
                                            <p className="text-2xl font-black text-white">{fact.value}</p>
                                            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mt-1">{fact.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="glass-card rounded-[2rem] p-8 border-white/5"
                            >
                                <h3 className="text-sm uppercase tracking-[0.2em] text-primary-400 font-black mb-4">What Next</h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Looking for frontend-heavy, full stack, or product engineering roles where I can contribute quickly and scale systems responsibly.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a href="#projects" className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-black uppercase tracking-wider transition-all">
                                        View Work
                                    </a>
                                    <a href="#contact" className="px-4 py-2 rounded-xl border border-white/10 hover:border-primary-500/40 text-slate-300 hover:text-white text-xs font-black uppercase tracking-wider transition-all">
                                        Contact Me
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeading subtitle="My professional journey in the tech industry.">Historical Path</SectionHeading>
                    <div className="space-y-6 max-w-5xl">
                        {DATA.experience.map((exp, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-10 rounded-[2rem] flex flex-col md:flex-row gap-6 md:gap-10 hover:border-primary-500/30 transition-all group">
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:w-1/4">
                                    {exp.logo && (
                                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white/5 p-2 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                            <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <span className="text-primary-400 font-black text-xs md:text-sm uppercase tracking-[0.2em] block mb-1">{exp.period}</span>
                                        <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-wider">{exp.location}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                                        <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-primary-400 transition-colors italic leading-tight">{exp.role}</h3>
                                        {exp.certificateUrl && (
                                            <button
                                                onClick={() => openViewer(exp.certificateUrl!)}
                                                className="self-start sm:self-center px-4 py-2 rounded-lg bg-primary-600/10 hover:bg-primary-600 text-primary-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-primary-500/20"
                                            >
                                                Verify <Award size={14} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-slate-300 font-bold mb-6 uppercase tracking-widest text-sm md:text-base">{exp.company}</p>
                                    <ul className="space-y-4">
                                        {exp.description.map((d, j) => (
                                            <li key={j} className="text-slate-400 flex gap-3 text-sm md:text-base leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0 shadow-[0_0_8px_#0ea5e9]" /> {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects */}
            <section id="projects" className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeading subtitle="Digital architectures and full-stack solutions.">Selected Works</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {DATA.projects.map((p, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass-card rounded-[2rem] overflow-hidden flex flex-col group border-white/5">
                                <div className="h-48 md:h-64 bg-slate-900 overflow-hidden relative">
                                    {p.image ? <img src={p.image} alt={`${p.title} preview`} loading="lazy" className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-all duration-700" />
                                        : <div className="w-full h-full flex items-center justify-center bg-primary-950/20"><Code2 size={48} className="text-primary-800" /></div>}
                                    <div className="absolute bottom-4 left-4 flex gap-2">
                                        {p.tech.slice(0, 3).map(t => <span key={t} className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] uppercase font-bold text-primary-400 tracking-tighter">{t}</span>)}
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-black uppercase italic tracking-tight">{p.title}</h3>
                                        <span className="text-xs font-mono text-slate-600">{p.year}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">{p.description}</p>
                                    {p.link !== "#" ? (
                                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:text-primary-400 transition-all">View Project <ExternalLink size={14} /></a>
                                    ) : (
                                        <span className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">Private Project</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="py-24 bg-[#03081c]">
                <div className="container mx-auto px-4 md:px-6">
                    <SectionHeading subtitle="Technological weapons of choice.">The Stack</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(DATA.skills).map(([title, skills], i) => (
                            <motion.div key={i} className="glass-card p-6 md:p-8 rounded-[2rem] border-white/5 hover:border-primary-500/20 transition-all">
                                <h3 className="text-lg font-black uppercase tracking-widest mb-8 text-primary-500 flex items-center gap-3">
                                    {title === 'frontend' && <Layers size={20} />}
                                    {title === 'backend' && <Database size={20} />}
                                    {title === 'languages' && <Terminal size={20} />}
                                    {title === 'databases' && <Database size={20} />}
                                    {title === 'tools' && <Cloud size={20} />}
                                    {title === 'ai' && <Cpu size={20} />}
                                    {title}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {(skills as { name: string, logo: string }[]).map((s, j) => (
                                        <div key={j} className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/30 border border-white/5 group hover:border-primary-500/30 transition-all">
                                            <img src={s.logo} className="w-6 h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all" alt={s.name} />
                                            <span className="text-xs font-bold uppercase tracking-tighter text-slate-400 group-hover:text-white">{s.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certs & Edu */}
            <section className="py-24 bg-[#020617]">
                <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <SectionHeading>Credentials</SectionHeading>
                        <div className="space-y-4">
                            {DATA.certifications.map((c, i) => (
                                <button
                                    key={i}
                                    onClick={() => c.url !== "#" && (c.url.startsWith('http') ? window.open(c.url, '_blank', 'noopener,noreferrer') : openViewer(c.url))}
                                    type="button"
                                    disabled={c.url === "#"}
                                    className={`w-full text-left flex items-center justify-between p-5 glass-card rounded-2xl border-white/5 hover:border-primary-500/20 transition-all group ${c.url !== "#" ? 'cursor-pointer' : 'cursor-default opacity-60'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Award className="text-primary-500 group-hover:scale-110 transition-transform" size={24} />
                                        <div>
                                            <span className="text-slate-300 font-bold uppercase tracking-tight text-sm block">{c.title}</span>
                                            <span className="text-slate-500 text-[10px] uppercase font-mono">{c.issuer}</span>
                                        </div>
                                    </div>
                                    {c.url !== "#" && <ExternalLink size={14} className="text-slate-600 group-hover:text-primary-400 transition-colors" />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div id="background">
                        <SectionHeading>Academic History</SectionHeading>
                        <div className="space-y-8">
                            {DATA.education.map((e, i) => (
                                <div key={i} className="flex gap-6 items-start">
                                    <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-primary-500 shrink-0 border-white/10 p-2 overflow-hidden bg-white/5">
                                        {e.logo ? (
                                            <img src={e.logo} alt={e.school} className="w-full h-full object-contain" />
                                        ) : (
                                            <GraduationCap size={28} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black uppercase italic tracking-tight mb-1">{e.school}</h4>
                                        <p className="text-primary-400 text-sm font-bold uppercase mb-2">{e.degree}</p>
                                        <div className="flex gap-4 text-xs font-mono text-slate-500 uppercase"><span>{e.period}</span><span>|</span><span className="text-primary-400">{e.grade}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">Initiate <span className="text-gradient underline decoration-primary-500/20">Contact</span></h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16 uppercase tracking-widest font-light">Nagpur-based engineering | Full stack solutions | Global outreach</p>

                    <div className="grid grid-cols-1 gap-16 items-start">
                        <ContactForm />

                        <div className="flex flex-col md:flex-row justify-center gap-12 items-center mt-8">
                            <a href={`mailto:${DATA.contact.email}`} className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white hover:text-primary-400 transition-all flex items-center gap-4 group">
                                <Mail size={32} className="text-primary-500 group-hover:scale-110 transition-transform" /> {DATA.contact.email}
                            </a>
                            <span className="hidden md:block text-slate-800 text-3xl font-black">/</span>
                            <a href={`tel:${DATA.contact.phone}`} className="text-xl font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all italic">{DATA.contact.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
            </main>

            <CyberFooter />
        </div>
    );
};

export default App;

