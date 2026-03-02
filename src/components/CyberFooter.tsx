import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Zap, Code2 } from "lucide-react";

// --- Glitch Text Component ---
const GlitchText = ({ text = "MAHESH HARIKANT SHINDE" }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?";
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<any>(null);

    const scramble = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(() =>
                text
                    .split("")
                    .map((_, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <span
            onMouseEnter={scramble}
            className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 cursor-default select-none transition-all hover:scale-[1.02] inline-block tracking-tighter italic"
        >
            {displayText}
        </span>
    );
};

// --- Marquee Infinite Scroll ---
const TechMarquee = ({ direction = "left", items }: { direction?: "left" | "right", items: string[] }) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap mask-gradient w-full py-4 opacity-30 select-none pointer-events-none">
            <motion.div
                className="flex gap-16 items-center"
                animate={{ x: direction === "left" ? "-50%" : "0%" }}
                initial={{ x: direction === "left" ? "0%" : "-50%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
                {[...items, ...items, ...items, ...items].map((item, idx) => ( // Quadruple needed for smooth loop on wide screens
                    <span key={idx} className="text-xl md:text-2xl font-black text-slate-700 uppercase tracking-[0.2em] font-mono flex items-center gap-4">
                        <Zap size={16} className={idx % 2 === 0 ? "text-cyan-500" : "text-purple-500"} /> {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};


// --- Interactive Command Line ---
const CommandLine = () => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<string[]>(["Welcome to DevTerminal v2.0", "Type 'help' for commands..."]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = command.trim().toLowerCase();
        let response = `> ${cmd}: command not found`;

        if (cmd === "help") response = "Available commands: clear, echo, date, whoami, skills, contact";
        if (cmd === "clear") { setOutput([]); setCommand(""); return; }
        if (cmd.startsWith("echo ")) response = cmd.substring(5);
        if (cmd === "date") response = new Date().toString();
        if (cmd === "whoami") response = "Mahesh Harikant Shinde - Full Stack Engineer";
        if (cmd === "skills") response = "React, Node, Mongo, Express, Next.js, Python, AWS...";
        if (cmd === "contact") response = "Email: ermahesh140@gmail.com | Phone: +91-7057115093";

        setOutput(prev => [...prev.slice(-4), `> ${cmd}`, response]); // Keep last 5 lines
        setCommand("");
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 font-mono text-sm shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
            <div className="space-y-1 mb-2 text-slate-400 min-h-[100px]">
                {output.map((line, i) => (
                    <div key={i} className={line.startsWith(">") ? "text-cyan-400" : "text-slate-300"}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleCommand} className="flex gap-2 text-green-400 items-center">
                <span className="font-bold flex-shrink-0">user@mahesh:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-green-400 placeholder-green-800/50"
                    placeholder="try 'help'..."
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
            </form>
        </div>
    );
};

const CyberFooter = () => {
    const techStack1 = ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Redux", "Gatsby", "Vite"];
    const techStack2 = ["AWS", "Docker", "Kubernetes", "GraphQL", "Python", "TailwindCSS", "Next.js", "Jest"];

    return (
        <footer className="relative bg-[#020617] text-white pt-20 pb-10 overflow-hidden border-t border-white/5">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-[1px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020617] to-[#020617] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center gap-12">

                {/* 1. The Glitch Title */}
                <div className="text-center space-y-4">
                    <GlitchText />
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center justify-center gap-3 text-cyan-400 font-mono text-sm tracking-widest uppercase"
                    >
                        <Terminal size={16} />
                        <span>System Online</span>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse box-shadow-[0_0_8px_#22c55e]" />
                    </motion.div>
                </div>

                {/* 2. Interactive Terminal */}
                <CommandLine />

                {/* 3. Tech Marquees */}
                <div className="w-screen relative left-[50%] -translate-x-[50%] py-4 space-y-2 select-none pointer-events-none opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <TechMarquee items={techStack1} direction="left" />
                    <TechMarquee items={techStack2} direction="right" />
                </div>

                {/* 4. Bottom Row */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 uppercase tracking-[0.2em] font-bold border-t border-white/5 pt-8 mt-4 gap-4">
                    <p>(c) {new Date().getFullYear()} Mahesh Shinde. All Systems Operational.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-2"><Cpu size={14} /> Engineered in India</span>
                        <span className="hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2"><Code2 size={14} /> React + Framer Motion</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default CyberFooter;

