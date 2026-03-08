import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck } from "lucide-react";

const ScrollingTruck = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-4 z-40 pointer-events-none"
      style={{ x, left: 0 }}
    >
      <div className="relative">
        {/* Road line behind truck */}
        <div
          className="absolute top-1/2 right-full w-screen h-[2px] -translate-y-1/2"
          style={{ background: "linear-gradient(to left, hsl(var(--primary) / 0.3), transparent)" }}
        />
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: "var(--hero-gradient)" }}
        >
          <Truck className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        {/* Dust particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -left-1 w-1.5 h-1.5 rounded-full"
            style={{ background: "hsl(var(--muted-foreground) / 0.2)" }}
            animate={{
              x: [-5, -25],
              opacity: [0.4, 0],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ScrollingTruck;
