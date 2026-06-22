import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Adjusted from "@/lib/utils"
import { ButtonColorful } from "./button-colorful";

// Props interface for the component
interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  subtitle?: string;
  description: string;
  ctaText: string;
  images: string[];
  className?: string;
  onCtaClick?: () => void;
}

// The main hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  subtitle,
  description,
  ctaText,
  images,
  className,
  onCtaClick,
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full bg-transparent flex flex-col items-center justify-start pt-32 md:pt-40 pb-6 md:pb-12 text-center px-4 overflow-hidden",
        className
      )}
    >
      {/* Background Grid & Mesh Orbs */}
      <div className="absolute inset-0 architectural-grid pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(197,160,89,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(197,160,89,0.04)_0%,transparent_70%)] blur-[80px] animate-orb-1" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(197,160,89,0.03)_0%,transparent_70%)] blur-[90px] animate-orb-2" />
        <div className="absolute -bottom-[10%] left-[20%] w-[55%] h-[55%] bg-[radial-gradient(circle,rgba(197,160,89,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.015)_0%,transparent_70%)] blur-[80px] animate-orb-3" />
      </div>



      <div className="z-20 flex flex-col items-center relative">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-bold shadow-[0_0_20px_rgba(197,160,89,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></span>
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-black text-zinc-900 dark:text-white leading-[0.95] tracking-tight"
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-3xl text-2xl md:text-3xl text-zinc-800 dark:text-zinc-200 font-display italic tracking-tight"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
        >
          <ButtonColorful onClick={onCtaClick} label={ctaText} className="mt-8" />
        </motion.div>
      </div>

      {/* Animated Image Marquee */}
      <div className="relative z-10 w-full mt-12 md:mt-16 pointer-events-none overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] py-6">
        <motion.div
          className="flex gap-4 w-max"
          animate={{
            x: ["-33.33%", "0%"],
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] h-56 md:h-80 flex-shrink-0"
              style={{
                rotate: `${(index % 2 === 0 ? -2 : 3)}deg`,
              }}
            >
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 z-10 rounded-2xl"></div>
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-lg border border-black/5 dark:border-white/10"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
