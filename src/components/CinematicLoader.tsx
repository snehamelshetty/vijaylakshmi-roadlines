import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import truckImage from "@/assets/truck-side.png";

const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "hsl(220 20% 8%)" }}
      >
        {/* Animated road lines */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] rounded-full"
              style={{
                top: `${15 + i * 14}%`,
                width: "100px",
                background: "linear-gradient(90deg, transparent, hsl(47 90% 70% / 0.3), transparent)",
              }}
              animate={{
                x: ["-100px", "calc(100vw + 100px)"],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Background glow */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(207 70% 53% / 0.08) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Truck driving animation */}
        <motion.div className="relative z-10 mb-10">
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, -1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.img
              src={truckImage}
              alt="Loading truck"
              className="w-28 h-auto drop-shadow-2xl"
              style={{ transform: "scaleX(-1)", filter: "drop-shadow(0 0 20px hsl(47 90% 70% / 0.3))" }}
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            />
            {/* Headlight glow */}
            <motion.div
              className="absolute top-[40%] -left-4 w-8 h-4 rounded-full"
              style={{ background: "radial-gradient(ellipse, hsl(47 90% 80% / 0.6), transparent)" }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {/* Exhaust */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-[55%] right-0 rounded-full"
                style={{
                  width: `${8 + i * 3}px`,
                  height: `${8 + i * 3}px`,
                  background: "hsl(0 0% 50% / 0.2)",
                }}
                animate={{
                  x: [5, 40 + i * 12],
                  y: [0, -8 - i * 4],
                  opacity: [0.3, 0],
                  scale: [1, 2],
                }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* Road under truck */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-[3px] rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 40% / 0.4), transparent)" }}
          />
        </motion.div>

        {/* Company name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "hsl(47 90% 70%)" }}>
            Vijayalakshmi
          </h1>
          <motion.p
            className="text-sm md:text-base tracking-[0.4em] uppercase mt-1"
            style={{ color: "hsl(207 70% 60%)" }}
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Roadlines
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <div className="relative z-10 w-64 md:w-80">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(220 15% 18%)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(207 70% 53%), hsl(47 90% 70%))" }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <motion.p
              className="text-xs tracking-wider"
              style={{ color: "hsl(0 0% 45%)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {progress < 25
                ? "Starting engines..."
                : progress < 50
                ? "Loading fleet..."
                : progress < 75
                ? "Mapping routes..."
                : progress < 100
                ? "Almost there..."
                : "Ready to roll!"}
            </motion.p>
            <span className="text-xs font-mono" style={{ color: "hsl(47 90% 70%)" }}>
              {progress}%
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicLoader;
