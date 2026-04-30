import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils"; // Adjusted from "@/lib/utils"
import { ButtonColorful } from "./button-colorful";

// Props interface for the component
interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
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
  description,
  ctaText,
  images,
  className,
  onCtaClick,
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full h-screen overflow-hidden bg-brand-dark flex flex-col items-center justify-start pt-32 md:pt-40 text-center px-4",
        className
      )}
    >
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
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-bold text-white leading-[0.9] tracking-tighter"
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

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-3xl text-xl text-zinc-400 font-light"
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
      <div className="absolute z-0 bottom-[-15%] md:bottom-[-10%] left-0 w-full h-[50%] md:h-[55%] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          className="flex gap-4"
          animate={{
            x: ["-100%", "0%"],
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
                rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
              }}
            >
              <div className="absolute inset-0 bg-black/20 z-10 rounded-2xl"></div>
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-md border border-white/10"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
