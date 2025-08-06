'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Button,
  Stack,
  Paper,
  Divider,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Language,
  Code,
  Storage,
  Security,
  Speed,
} from '@mui/icons-material';
import Image from 'next/image';

const skills = [
  { name: 'React', level: 90, color: '#61DAFB' },
  { name: 'TypeScript', level: 85, color: '#3178C6' },
  { name: 'Next.js', level: 88, color: '#000000' },
  { name: 'Node.js', level: 80, color: '#339933' },
  { name: 'Python', level: 75, color: '#3776AB' },
  { name: 'PostgreSQL', level: 70, color: '#336791' },
];

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'React와 Node.js를 활용한 풀스택 이커머스 플랫폼',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: '🛒',
    github: '#',
    live: '#',
  },
  {
    title: 'Task Management App',
    description: '팀 협업을 위한 실시간 태스크 관리 애플리케이션',
    technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
    image: '📋',
    github: '#',
    live: '#',
  },
  {
    title: 'Portfolio Website',
    description: '개인 포트폴리오 웹사이트 (현재 사이트)',
    technologies: ['Next.js', 'TypeScript', 'MUI', 'Framer Motion'],
    image: '💼',
    github: '#',
    live: '#',
  },
];

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    period: '2022 - 현재',
    description: 'React와 TypeScript를 활용한 대규모 웹 애플리케이션 개발',
  },
  {
    title: 'Frontend Developer',
    company: 'Startup',
    period: '2020 - 2022',
    description: '다양한 프로젝트에서 프론트엔드 개발 및 UI/UX 개선',
  },
  {
    title: 'Junior Developer',
    company: 'Agency',
    period: '2019 - 2020',
    description: '웹사이트 및 모바일 앱 개발',
  },
];

export default function PortfolioPage() {
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

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                textAlign: 'center',
                mb: 8,
                py: 6,
                background: 'linear-gradient(135deg, rgba(255,179,186,0.1) 0%, rgba(179,217,255,0.1) 100%)',
                borderRadius: 4,
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 200,
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
                  width={200}
                  height={200}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              <Typography
                variant="h2"
                component="h1"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, #FFB3BA, #B3D9FF, #B8E6B8)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                프론트엔드 개발자
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontWeight: 300,
                }}
              >
                사용자 경험을 중시하는 웹 개발자
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
                React, TypeScript, Next.js를 활용하여 아름답고 사용하기 쉬운 웹 애플리케이션을 만드는 것을 좋아합니다. 
                사용자 중심의 디자인과 최신 기술 트렌드를 반영한 개발을 지향합니다.
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                {[
                  { icon: <GitHub />, label: 'GitHub' },
                  { icon: <LinkedIn />, label: 'LinkedIn' },
                  { icon: <Twitter />, label: 'Twitter' },
                  { icon: <Email />, label: 'Email' },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={social.icon}
                      sx={{
                        borderColor: '#FFB3BA',
                        color: '#4A4A4A',
                        '&:hover': {
                          borderColor: '#FF8A95',
                          backgroundColor: 'rgba(255,179,186,0.1)',
                        },
                      }}
                    >
                      {social.label}
                    </Button>
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 4,
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              기술 스택 💻
            </Typography>

            <Grid container spacing={3} sx={{ mb: 8 }}>
              {skills.map((skill, index) => (
                <Grid item xs={12} md={6} key={skill.name}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" component="h3">
                          {skill.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {skill.level}%
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: '100%',
                          height: 8,
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          borderRadius: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          style={{
                            height: '100%',
                            backgroundColor: skill.color,
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Projects Section */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 4,
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              프로젝트 🚀
            </Typography>

            <Grid container spacing={3} sx={{ mb: 8 }}>
              {projects.map((project, index) => (
                <Grid item xs={12} md={4} key={project.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h4"
                          sx={{ mb: 2, textAlign: 'center' }}
                        >
                          {project.image}
                        </Typography>
                        
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            mb: 2,
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {project.title}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                          }}
                        >
                          {project.description}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                          {project.technologies.map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              label={tech}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255,179,186,0.2)',
                                color: 'text.primary',
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Box>

                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<GitHub />}
                            sx={{
                              borderColor: '#B3D9FF',
                              color: '#4A4A4A',
                              '&:hover': {
                                borderColor: '#8AC7FF',
                                backgroundColor: 'rgba(179,217,255,0.1)',
                              },
                            }}
                          >
                            GitHub
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Language />}
                            sx={{
                              borderColor: '#B8E6B8',
                              color: '#4A4A4A',
                              '&:hover': {
                                borderColor: '#9ED99E',
                                backgroundColor: 'rgba(184,230,184,0.1)',
                              },
                            }}
                          >
                            Live Demo
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 4,
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              경력 💼
            </Typography>

            <Box sx={{ maxWidth: 800, mx: 'auto' }}>
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      mb: 3,
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {experience.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 500,
                          }}
                        >
                          {experience.company}
                        </Typography>
                      </Box>
                      <Chip
                        label={experience.period}
                        sx={{
                          backgroundColor: 'rgba(255,179,186,0.2)',
                          color: 'text.primary',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {experience.description}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
} 