import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends HTMLMotionProps<"button"> {
    label?: string;
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative h-14 px-12 rounded-full overflow-hidden",
                "bg-brand-dark dark:bg-white",
                "transition-all duration-200",
                "group shadow-[0_0_40px_rgba(197,160,89,0.4)] hover:shadow-[0_0_60px_rgba(197,160,89,0.7)]",
                className
            )}
            {...props}
        >
            {/* Gradient background effect - Casa Linda Palette */}
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-amber-600 via-brand-gold to-yellow-400",
                    "opacity-90 group-hover:opacity-100",
                    "transition-opacity duration-500"
                )}
            />
            
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"></div>

            {/* Content */}
            <div className="relative flex items-center justify-center gap-3">
                <span className="text-black font-extrabold uppercase tracking-[0.2em] text-sm drop-shadow-sm">{label}</span>
                <ArrowUpRight className="w-5 h-5 text-black drop-shadow-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
        </motion.button>
    );
}

export { ButtonColorful }