import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Import logo directly from the assets directory
import loadingLogo from "@/assets/loadingLogo.png";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // 2.5s duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white pointer-events-none"
        >
          <div className="flex flex-col items-center">
            {/* Logo loading animation */}
            <motion.img
              src={loadingLogo}
              alt="St. Genevieve Foundation Loading"
              className="w-36 md:w-44 h-auto object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0.45, 1, 0.45],
                scale: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}