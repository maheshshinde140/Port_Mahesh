import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const CursorAnimation = () => {
    // --- State & Motion Values ---
    const [cursorVariant, setCursorVariant] = useState<'default' | 'text' | 'button'>('default');
    const [isClicking, setIsClicking] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for the "follower"
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // --- Event Listeners ---
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Check what we are hovering over
            const target = e.target as HTMLElement;
            // Check if hovering selectable text
            const computedStyle = window.getComputedStyle(target);

            if (['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.closest('button') || target.closest('a') || computedStyle.cursor === 'pointer') {
                setCursorVariant('button');
            } else if (['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(target.tagName) || computedStyle.cursor === 'text') {
                setCursorVariant('text');
            } else {
                setCursorVariant('default');
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // --- Touch Device Check ---
    const isTouchDevice = () => {
        if (typeof window === 'undefined') return false;
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };

    if (isTouchDevice()) return null;

    // --- Variants ---
    // The main dot (precise pointer)
    const dotVariants = {
        default: { scale: 1, backgroundColor: "#38bdf8" }, // Primary Blue
        button: { scale: 0.5, backgroundColor: "#c084fc" }, // Purple
        text: { height: 16, width: 2, borderRadius: 0, backgroundColor: "#38bdf8", scale: 1 }, // I-beam shape
    };

    // The follower ring
    const ringVariants = {
        default: {
            height: 32,
            width: 32,
            x: -16,
            y: -16,
            backgroundColor: "transparent",
            borderWidth: "1px",
            borderColor: "rgba(56, 189, 248, 0.5)",
            mixBlendMode: "normal" as const
        },
        button: {
            height: 64,
            width: 64,
            x: -32,
            y: -32,
            backgroundColor: "rgba(192, 132, 252, 0.1)", // Subtle purple fill
            borderWidth: "2px",
            borderColor: "rgba(192, 132, 252, 0.8)",
            mixBlendMode: "screen" as const // Cool blending effect
        },
        text: {
            height: 32,
            width: 32,
            x: -16,
            y: -16,
            backgroundColor: "transparent",
            borderWidth: "1px",
            borderColor: "rgba(56, 189, 248, 0.3)",
            scale: 0.8
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* TRAILING RING (Follower) */}
            <motion.div
                className="absolute top-0 left-0 rounded-full border border-primary-500/50 box-border"
                style={{
                    left: springX,
                    top: springY,
                }}
                variants={ringVariants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.5
                }}
            />

            {/* MAIN DOT (Pointer) */}
            <motion.div
                className="absolute top-0 left-0 rounded-full bg-primary-400 shadow-[0_0_10px_#38bdf8]"
                style={{
                    x: "-50%",
                    y: "-50%",
                    left: mouseX,
                    top: mouseY,
                }}
                animate={{
                    ...dotVariants[cursorVariant],
                    scale: isClicking ? 0.3 : (dotVariants[cursorVariant].scale || 1)
                }}
                transition={{
                    type: "spring",
                    stiffness: 1000,
                    damping: 50,
                    duration: 0.1
                }}
            />

            {/* CLICK RIPPLE (Optional, strictly visual flair) */}
            <AnimatePresence>
                {isClicking && (
                    <motion.div
                        className="absolute top-0 left-0 rounded-full border border-white/50"
                        style={{
                            left: mouseX,
                            top: mouseY,
                            x: "-50%",
                            y: "-50%"
                        }}
                        initial={{ width: 0, height: 0, opacity: 1 }}
                        animate={{ width: 80, height: 80, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CursorAnimation;
