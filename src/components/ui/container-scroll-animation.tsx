import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-16 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full"
    >
      {/* === iPad Pro Frame === */}
      <div
        className="relative w-full h-full"
        style={{
          /* Multi-layer radial to fake the brushed aluminum reflections */
          background: 'linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 40%, #2a2a2c 60%, #111113 100%)',
          borderRadius: '2.8rem',
          padding: '10px',
          boxShadow:
            /* Outer specular highlight (top-left edge) */
            'inset 0 1px 0 0 rgba(255,255,255,0.18),' +
            /* Outer dark edge (bottom-right) */
            'inset 0 -1px 0 0 rgba(0,0,0,0.6),' +
            /* Depth/drop shadow */
            '0 60px 120px -30px rgba(0,0,0,0.7), 0 30px 60px -20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Side button (right) */}
        <div className="absolute -right-[3px] top-[18%] w-[3px] h-12 bg-[#3a3a3c] rounded-r-sm shadow-sm" />
        {/* Volume up (left) */}
        <div className="absolute -left-[3px] top-[22%] w-[3px] h-8 bg-[#3a3a3c] rounded-l-sm" />
        {/* Volume down (left) */}
        <div className="absolute -left-[3px] top-[33%] w-[3px] h-8 bg-[#3a3a3c] rounded-l-sm" />

        {/* Inner bezel */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: '2.2rem',
            background: '#000',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Front camera + speaker bar at top */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center z-20 pointer-events-none gap-3">
            {/* Microphone dot */}
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            {/* Camera */}
            <div className="w-2 h-2 rounded-full bg-zinc-700 border border-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] flex items-center justify-center">
              <div className="w-0.5 h-0.5 rounded-full bg-zinc-500" />
            </div>
            {/* Speaker grille lines */}
            <div className="flex gap-[2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-px h-2 bg-zinc-800 rounded-full" />
              ))}
            </div>
          </div>

          {/* Screen content */}
          <div className="absolute inset-0 pt-6">
            {children}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-5 flex items-end justify-center pb-1.5 z-20 pointer-events-none">
            <div className="w-24 h-1 rounded-full bg-white/20" />
          </div>

          {/* Screen glare / reflection */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              borderRadius: '2.2rem',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

