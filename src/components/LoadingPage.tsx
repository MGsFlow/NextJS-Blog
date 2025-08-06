'use client';

import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

interface LoadingPageProps {
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ message = "로딩 중..." }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(255,179,186,0.1) 0%, rgba(179,217,255,0.1) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 배경 애니메이션 */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 80%, rgba(255,179,186,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(179,217,255,0.1) 0%, transparent 50%)',
          animation: 'pulse 3s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5 },
            '50%': { opacity: 1 },
          },
        }}
      />

      {/* 로딩 컨테이너 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {/* 로딩 스피너 */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: '#FFB3BA',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
          </motion.div>

          {/* 로딩 메시지 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                background: 'linear-gradient(45deg, #FFB3BA, #B3D9FF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                mb: 1,
              }}
            >
              {message}
            </Typography>
          </motion.div>

          {/* 부가 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              잠시만 기다려주세요...
            </Typography>
          </motion.div>

          {/* 점 애니메이션 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#FFB3BA',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}; 