'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface StarProps {
  x: number;
  y: number;
  delay: number;
  color: string;
  size: number;
}

const Star: React.FC<StarProps> = ({ x, y, delay, color, size }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: size,
        color: color,
        zIndex: 1,
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -100, -200],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4,
        delay: delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      ⭐
    </motion.div>
  );
};

export const FloatingHearts: React.FC = () => {
  const [stars, setStars] = useState<Array<{ x: number; y: number; delay: number; color: string; size: number }>>([]);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const newStars = Array.from({ length: 15 }, (_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        delay: Math.random() * 4,
        color: ['#FFB3BA', '#B3D9FF', '#B8E6B8', '#FFE5B3'][Math.floor(Math.random() * 4)],
        size: Math.random() * 12 + 18, // 18-30px 크기
      }));
      setStars(newStars);
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </Box>
  );
}; 