import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
}

interface Education {
    school: string;
    degree: string;
    period: string;
    grade: string;
    logo?: string;
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
    certifications: string[];
} = {
    name: "Mahesh Shinde",
    title: "Full Stack Software Engineer",
    subtitle: "MERN • MEAN • Cloud • DevOps",
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
            period: "2022 – 2025",
            grade: "CGPA: 8.8",
            logo: "/tgpcet.jpg"
        },
        {
            school: "Yeshwant Mahavidyalaya, Nanded",
            degree: "12th (Physics, Chemistry, Mathematics)",
            period: "2020 – 2021",
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
            period: "Dec 2024 – Mar 2025",
            location: "Nagpur, Maharashtra",
            logo: "https://tnpportal.harittech.in/static/media/harit.feeaf3f71a001be729ef.png",
            description: [
                "Built and deployed TNP Portal with Role-Based Access Control (RBAC), job posting workflows and admin dashboards using React, Node, Express, MongoDB.",
                "Delivered 3 full-stack client projects focusing on performance, security, and responsive UI.",
                "Enhanced AaramSe app (React Native) with real-time queue updates and partner management."
            ]
        },
        {
            company: "Arohi Software",
            role: "Full Stack Developer Intern",
            period: "Mar 2024 – Aug 2024",
            location: "Shrigonda, Maharashtra",
            logo: "https://avatars.githubusercontent.com/u/169677699?v=4",
            description: [
                "Developed SEO-optimized website using Next.js, Node.js, MongoDB, and Tailwind CSS.",
                "Built REST APIs with Express and integrated middleware with JWT Authentication."
            ]
        },
        {
            company: "EduSkills Foundation",
            role: "AI/ML Virtual Intern",
            period: "Jan 2024 – Mar 2024",
            location: "Remote",
            logo: "https://eduskillsfoundation.org/wp-content/uploads/2022/09/LOGO_EduSkills.png",
            description: [
                "Worked on TensorFlow models including preprocessing, training, evaluation and deployment strategies.",
                "Used Python with NumPy, Pandas, and Matplotlib for data engineering pipelines."
            ]
        },
        {
            company: "Slash Mark",
            role: "Frontend Intern",
            period: "Dec 2023 – Mar 2024",
            location: "Hyderabad, Telangana",
            logo: "https://slashmark.in/partnerimages/slashmarkmainlogo.png",
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
        "Google – Prompt Design in Vertex AI",
        "Google – Introduction to Large Language Models",
        "Google – Introduction to Generative AI",
        "TechSaksham – Foundation Course on Generative AI",
        "Coursera – Full Stack Web Development (React + Node)"
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
        { name: 'About', href: '#background' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Skills', href: '#skills' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-card py-4 shadow-xl' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold tracking-tight">
                    <span className="text-gradient">MS</span>
                </motion.div>
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-primary-400 transition-colors uppercase tracking-widest">{link.name}</a>
                    ))}
                    <a href="#contact" className="px-5 py-2 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary-900/20">Hire Me</a>
                </div>
                <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-card border-t border-white/5">
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg text-slate-300 uppercase tracking-widest font-bold">{link.name}</a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
    <div className="mb-12">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-400 max-w-2xl text-lg font-medium leading-relaxed">
                {subtitle}
            </motion.p>
        )}
        <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} viewport={{ once: true }} className="h-1.5 bg-primary-500 mt-4 rounded-full shadow-[0_0_10px_#0ea5e9]" />
    </div>
);

const ContactForm = () => {
    const [result, setResult] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setStatus("loading");
        setResult("Sending....");
        const formData = new FormData(event.target);
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
                event.target.reset();
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
            className="glass-card p-8 md:p-12 rounded-[2rem] max-w-3xl mx-auto border-white/5 hover:border-primary-500/20 transition-all shadow-2xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/10 transition-all" />

            <form onSubmit={onSubmit} className="space-y-8 text-left relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your Name"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="hello@example.com"
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 ml-1">Message</label>
                    <textarea
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

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-primary-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" />

                <div className="container mx-auto px-6 z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-center lg:text-left">
                            <h4 className="text-primary-400 font-mono mb-4 flex items-center justify-center lg:justify-start gap-2 text-lg uppercase tracking-widest">
                                <Terminal size={20} /> Developer Portfolio
                            </h4>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[1.0] uppercase italic">
                                {DATA.name.split(' ')[0]} <br className="hidden lg:block" /><span className="text-gradient underline decoration-primary-500/30">{DATA.name.split(' ')[1]}</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                                {DATA.title} specializing in <span className="text-white font-bold">{DATA.subtitle}</span>.
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
                                    {[{ icon: <Github size={24} />, href: DATA.contact.github }, { icon: <Linkedin size={24} />, href: DATA.contact.linkedin }].map((s, i) => (
                                        <motion.a key={i} href={s.href} target="_blank" whileHover={{ y: -5, scale: 1.1 }} className="w-14 h-14 glass-card rounded-xl flex items-center justify-center text-slate-300 hover:text-primary-400 border-white/10 hover:border-primary-500/50 transition-all">{s.icon}</motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex-1">
                            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] mx-auto">
                                <div className="absolute inset-0 border-2 border-primary-500/20 rounded-3xl rotate-12 animate-pulse" />
                                <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-3xl -rotate-12 animate-pulse" />
                                <div className="absolute inset-4 rounded-2xl overflow-hidden border-4 border-white/10 shadow-3xl group">
                                    <img src={DATA.profileImage} alt={DATA.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className="py-24 bg-[#03081c]">
                <div className="container mx-auto px-6">
                    <SectionHeading subtitle="My professional journey in the tech industry.">Historical Path</SectionHeading>
                    <div className="space-y-6 max-w-5xl">
                        {DATA.experience.map((exp, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="glass-card p-8 rounded-3xl flex flex-col md:flex-row gap-8 hover:border-primary-500/30 transition-all group">
                                <div className="md:w-1/4 flex flex-col gap-4">
                                    {exp.logo && (
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 p-2 border border-white/10 flex items-center justify-center overflow-hidden">
                                            <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-primary-400 font-black text-sm uppercase tracking-widest block mb-2">{exp.period}</span>
                                        <p className="text-slate-500 font-mono text-xs uppercase">{exp.location}</p>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1 group-hover:text-primary-400 transition-colors italic">{exp.role}</h3>
                                    <p className="text-slate-300 font-bold mb-6 uppercase tracking-wider">{exp.company}</p>
                                    <ul className="space-y-3">
                                        {exp.description.map((d, j) => (
                                            <li key={j} className="text-slate-400 flex gap-4 text-base leading-relaxed">
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
                <div className="container mx-auto px-6">
                    <SectionHeading subtitle="Digital architectures and full-stack solutions.">Selected Works</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {DATA.projects.map((p, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass-card rounded-3xl overflow-hidden flex flex-col group border-white/5">
                                <div className="h-64 bg-slate-900 overflow-hidden relative">
                                    {p.image ? <img src={p.image} className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-all duration-700" />
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
                                    <a href={p.link} target="_blank" className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:text-primary-400 transition-all">View Project <ExternalLink size={14} /></a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="py-24 bg-[#03081c]">
                <div className="container mx-auto px-6">
                    <SectionHeading subtitle="Technological weapons of choice.">The Stack</SectionHeading>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(DATA.skills).map(([title, skills], i) => (
                            <motion.div key={i} className="glass-card p-8 rounded-3xl border-white/5 hover:border-primary-500/20 transition-all">
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
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <SectionHeading>Credentials</SectionHeading>
                        <div className="space-y-4">
                            {DATA.certifications.map((c, i) => (
                                <div key={i} className="flex items-center gap-4 p-5 glass-card rounded-2xl border-white/5 hover:border-primary-500/20 transition-all cursor-default group">
                                    <Award className="text-primary-500 group-hover:scale-110 transition-transform" size={24} />
                                    <span className="text-slate-300 font-bold uppercase tracking-tight text-sm">{c}</span>
                                </div>
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
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">Initiate <span className="text-gradient underline decoration-primary-500/20">Contact</span></h2>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-16 uppercase tracking-widest font-light">Nagpur-based Engineering • Full Stack Solutions • Global Outreach</p>

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

            <footer className="py-20 border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <span className="text-3xl font-black text-gradient italic tracking-tighter">MAHESH SHINDE</span>
                    <p className="text-slate-600 text-[10px] uppercase tracking-[0.3em] mt-4 font-bold">Build • Deploy • Scale • Repeat</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
