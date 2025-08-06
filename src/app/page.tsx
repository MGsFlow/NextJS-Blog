'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Favorite,
  Share,
  Bookmark,
  GitHub,
  LinkedIn,
  Twitter,
  Email,
} from '@mui/icons-material';
import { useBlogStore } from '../store/blogStore';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingPage } from '../components/LoadingPage';

export default function Home() {
  const { posts, fetchPosts, loading } = useBlogStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 로딩 중일 때 로딩 페이지 표시
  if (loading && posts.length === 0) {
    return <LoadingPage message="방명록을 불러오는 중..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/MGsFlow' },
    // { icon: <LinkedIn />, url: 'https://linkedin.com' },
    // { icon: <Twitter />, url: 'https://twitter.com' },
    { icon: <Email />, url: 'mailto:alsrb7538@gmail.com' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                textAlign: 'center',
                mb: 8,
                py: 8,
                background: 'linear-gradient(135deg, rgba(255,179,186,0.1) 0%, rgba(179,217,255,0.1) 100%)',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    mx: 'auto',
                    mb: 3,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid rgba(255,179,186,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  }}
                >
                  <Image
                    src="/mgflow.png"
                    alt="Profile"
                    width={180}
                    height={180}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </motion.div>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, #FFB3BA, #B3D9FF, #B8E6B8)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 3s ease infinite',
                  '@keyframes gradientShift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                  },
                }}
              >
                안녕하세요! 👋
              </Typography>

              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontWeight: 300,
                }}
              >
                프론트엔드 개발자 포트폴리오
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                React, TypeScript, Next.js를 활용한 웹 개발과 사용자 경험을 중시하는 
                프론트엔드 개발자입니다. 아름다운 UI/UX를 만드는 것을 좋아합니다.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
                <Link href="/portfolio" passHref>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      background: 'linear-gradient(45deg, #FFB3BA, #FF8A95)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF8A95, #FF6B7A)',
                      },
                    }}
                  >
                    포트폴리오 보기
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/MGsFlow_이력서.pdf';
                    link.download = 'MGsFlow_이력서.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  sx={{
                    borderColor: '#B3D9FF',
                    color: '#4A4A4A',
                    '&:hover': {
                      borderColor: '#8AC7FF',
                      backgroundColor: 'rgba(179,217,255,0.1)',
                    },
                  }}
                >
                  이력서 다운로드
                </Button>
              </Box>

              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      onClick={() => handleSocialClick(social.url)}
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Latest Guestbook Section */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 4,
              textAlign: 'center',
              background: 'linear-gradient(45deg, #FFB3BA, #B3D9FF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            최신 방명록 📝
          </Typography>

          {posts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                아직 방명록이 없습니다.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                첫 번째 방명록을 작성해보세요!
              </Typography>
              <Link href="/write" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(45deg, #FFB3BA, #FF8A95)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8A95, #FF6B7A)',
                    },
                  }}
                >
                  첫 방명록 작성하기
                </Button>
              </Link>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {posts.filter(post => post.published).slice(0, 3).map((post) => (
                <Grid item xs={12} md={6} lg={4} key={post.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/blog/${post.id}`} passHref style={{ textDecoration: 'none' }}>
                      <Card
                        sx={{
                          height: 350,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          '&:hover': {
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                          },
                        }}
                      >
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            p: 3,
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              mb: 2,
                              fontWeight: 600,
                              color: 'text.primary',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.3,
                              minHeight: '2.6em',
                            }}
                          >
                            {post.title}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 3,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.6,
                              flexGrow: 1,
                              minHeight: '4.8em',
                            }}
                          >
                            {post.excerpt}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(255,179,186,0.2)',
                                  color: 'text.primary',
                                  fontSize: '0.75rem',
                                }}
                              />
                            ))}
                          </Box>

                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mt: 'auto'
                          }}>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(post.created_at).toLocaleDateString('ko-KR')}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              <IconButton size="small">
                                <Favorite sx={{ fontSize: 16 }} />
                              </IconButton>
                              <IconButton size="small">
                                <Share sx={{ fontSize: 16 }} />
                              </IconButton>
                              <IconButton size="small">
                                <Bookmark sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              href="/guestbook"
              sx={{
                borderColor: '#FFB3BA',
                color: '#4A4A4A',
                '&:hover': {
                  borderColor: '#FF8A95',
                  backgroundColor: 'rgba(255,179,186,0.1)',
                },
              }}
            >
              모든 방명록 보기
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
