import React from "react";
import { motion } from "framer-motion";

// Football SVG icon
const Football = ({ style, className }) => (
  <svg viewBox="0 0 64 32" width="48" height="24" fill="none" style={style} className={className}>
    <ellipse cx="32" cy="16" rx="30" ry="12" fill="#7c4f1d" stroke="#fff" strokeWidth="2" />
    <rect x="28" y="14" width="8" height="4" rx="2" fill="#fff" />
    <rect x="30" y="15" width="4" height="2" rx="1" fill="#7c4f1d" />
  </svg>
);

export default function Touchdown() {
  // Generate 12 footballs with random animation
  const footballs = Array.from({ length: 12 }).map((_, i) => {
    const delay = Math.random() * 2;
    const x = Math.random() * 90 + "%";
    const rotate = Math.random() * 360;
    return (
      <motion.div
        key={i}
        initial={{ y: -100, rotate }}
        animate={{ y: "100vh", rotate: rotate + 360 }}
        transition={{ duration: 3.5 + Math.random() * 1.5, delay, repeat: Infinity, repeatType: "loop" }}
        style={{ position: "absolute", left: x, top: 0 }}
      >
        <Football />
      </motion.div>
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400/80 to-orange-600/80">
      <motion.h1
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 8 }}
        className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-lg mb-8"
        style={{ letterSpacing: 2 }}
      >
        TOUCHDOWN!!!
      </motion.h1>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>{footballs}</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-2xl text-white font-bold mt-12 drop-shadow"
      >
  Thank you for playing Footballe! (and for your service!)
      </motion.div>
    </div>
  );
}
