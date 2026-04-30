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
                "bg-brand-gold text-white",
                "transition-all duration-300",
                "group shadow-[0_10px_40px_rgba(197,160,89,0.3)] hover:shadow-[0_15px_50px_rgba(197,160,89,0.5)] border border-brand-gold/50 hover:border-white/50",
                className
            )}
            {...props}
        >
            {/* Elegant Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>

            {/* Content */}
            <div className="relative flex items-center justify-center gap-3">
                <span className="font-bold uppercase tracking-[0.2em] text-sm drop-shadow-md">{label}</span>
                <ArrowUpRight className="w-5 h-5 drop-shadow-md group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
        </motion.button>
    );
}
