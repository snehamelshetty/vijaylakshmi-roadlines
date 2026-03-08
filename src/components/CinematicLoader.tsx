import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck } from "lucide-react";

const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("reveal");
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "reveal" || progress < 100 ? null : null}
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "hsl(220 20% 10%)" }}
      >
        {/* Animated road lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-primary/20"
              style={{
                top: `${20 + i * 15}%`,
                width: "120px",
              }}
              animate={{
                x: ["-120px", "calc(100vw + 120px)"],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Cinematic light flares */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(47 90% 70%) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Truck animation */}
        <motion.div
          className="relative z-10 mb-8"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "var(--hero-gradient)" }}
          >
            <Truck className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          {/* Exhaust particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -left-2 w-2 h-2 rounded-full bg-muted-foreground/30"
              animate={{
                x: [-10, -40],
                opacity: [0.5, 0],
                scale: [1, 2],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>

        {/* Company name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: "hsl(47 90% 70%)" }}>
            Vijayalakshmi
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase" style={{ color: "hsl(0 0% 60%)" }}>
            Roadlines
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="relative z-10 w-64 md:w-80">
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "hsl(220 15% 20%)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--hero-gradient)" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            className="text-xs mt-3 text-center tracking-wider"
            style={{ color: "hsl(0 0% 50%)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress < 30
              ? "Starting engines..."
              : progress < 60
              ? "Loading fleet..."
              : progress < 90
              ? "Mapping routes..."
              : "Ready to roll!"}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicLoader;
