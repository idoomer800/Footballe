import React from 'react';
import { motion } from 'framer-motion';

export default function ConfettiEffect() {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: `${piece.x}vw`, 
            y: '-10vh',
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: '110vh',
            rotate: piece.rotation * 4,
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
          }}
          className="rounded-sm"
        />
      ))}
    </div>
  );
}