'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Box } from '@mui/material';

export const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -600]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {/* 첫 번째 파라랙스 레이어 */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,179,186,0.3) 0%, transparent 70%)',
          y: y1,
        }}
      />
      
      {/* 두 번째 파라랙스 레이어 */}
      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(179,217,255,0.3) 0%, transparent 70%)',
          y: y2,
        }}
      />
      
      {/* 세 번째 파라랙스 레이어 */}
      <motion.div
        style={{
          position: 'absolute',
          top: '30%',
          right: '40%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,230,184,0.3) 0%, transparent 70%)',
          y: y3,
        }}
      />
      
      {/* 네 번째 파라랙스 레이어 */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,229,179,0.3) 0%, transparent 70%)',
          y: y1,
        }}
      />
    </Box>
  );
}; 