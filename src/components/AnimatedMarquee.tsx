import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583847268964-b28ce8f89f13?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800",
];

export const AnimatedMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden py-12 mt-12">
      {/* Gradient masks for smooth fade out at edges - using brand-dark from Tailwind config if applicable, or black */}
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
      >
        {/* We need enough items to scroll smoothly. Let's triple the array just to be safe if screen is very wide */}
        {[...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES].map((src, idx) => {
          // Add some vertical staggering and slight tilt to make it look organic and premium like the screenshot
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`relative w-[240px] sm:w-[280px] h-[320px] sm:h-[400px] shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-700 hover:scale-105 ${
                isEven ? 'translate-y-6 rotate-[-2deg]' : '-translate-y-6 rotate-[2deg]'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 z-10"></div>
              <img src={src} alt="Decor Inspiration" className="w-full h-full object-cover" />
              
              {/* Optional slight glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent z-20"></div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
