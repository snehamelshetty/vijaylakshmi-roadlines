import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import truckImage from "@/assets/truck-side.png";

const ScrollingTruck = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-15%", "110%"]);
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
        {/* Road surface */}
        <div
          className="absolute bottom-0 right-full w-screen h-[3px] rounded-full"
          style={{ background: "linear-gradient(to left, hsl(var(--muted-foreground) / 0.15), transparent)" }}
        />
        {/* Truck image with bounce */}
        <motion.div
          animate={{ y: [0, -4, 0], rotate: [0, -0.5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <img
            src={truckImage}
            alt="Delivery truck"
            className="w-32 h-auto drop-shadow-lg"
          />
          {/* Exhaust smoke */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-[60%] right-[85%] rounded-full"
              style={{
                width: `${6 + i * 2}px`,
                height: `${6 + i * 2}px`,
                background: "hsl(var(--muted-foreground) / 0.15)",
              }}
              animate={{
                x: [0, -(30 + i * 10)],
                y: [0, -10 - i * 5],
                opacity: [0.4, 0],
                scale: [1, 2.5],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScrollingTruck;
