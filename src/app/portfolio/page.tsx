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
  Work,
  School,
  Star,
  TrendingUp,
  Psychology,
  Brush,
  Rocket,
  Build,
  Visibility,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import Image from 'next/image';

const skills = [
  { name: 'TypeScript', level: 90, color: '#3178C6', icon: <Code /> },
  { name: 'React', level: 88, color: '#61DAFB', icon: <Code /> },
  { name: 'Next.js', level: 85, color: '#000000', icon: <Code /> },
  { name: 'Vue.js', level: 80, color: '#4FC08D', icon: <Code /> },
  { name: 'Node.js', level: 75, color: '#339933', icon: <Storage /> },
  { name: 'Zustand', level: 85, color: '#764ABC', icon: <Storage /> },
];

const projects = [
  {
    title: 'SingleOne Platform',
    description: 'Qoo10 외부 미디어 플랫폼으로 Next/React, TypeScript, Zustand 기반 웹 구축. Material React Table 등 라이브러리 기반 고성능 UI 구현 및 고급 인터랙션 구현.',
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'MUI v5', 'Zustand', 'TanStack Query'],
    image: '🛒',
    github: 'https://github.com/MGflow',
    live: 'https://www.singleone.jp',
    achievements: ['회사 매출의 메인을 담당하는 플랫폼으로 성장', '고성능 데이터 그리드 구현', '다양한 데이터 시각화', 'Excel, PDF 파일 처리 기능'],
  },
  {
    title: 'MyNavi SingleOne',
    description: '일본 대형 기업용 B2B 서비스로 Next.js 14 기반의 모던 웹 애플리케이션 구축. Google Maps API 및 Leaflet 활용한 지도 기능 구현.',
    technologies: ['Next.js 14', 'TypeScript', 'Material-UI', 'Zustand', 'Google Maps API'],
    image: '🗺️',
    github: 'https://github.com/MGflow',
    live: 'https://mynavi.singleone.jp',
    achievements: ['일본 대형 기업용 B2B 서비스 구축', '반응형 디자인 구현', 'Google Maps 기반 지도 시스템', '지속적인 업데이트 및 릴리즈 관리'],
  },
];

const experiences = [
  {
    title: '프론트엔드 팀장',
    company: '(주)에이원퍼포먼스팩토리',
    period: '2024.01 - 현재',
    duration: '재직 중 (1년 8개월)',
    description: '프론트엔드 팀장으로서 다양한 프로젝트를 리딩하며 기술적 성장과 팀 관리 경험을 쌓고 있습니다.',
    achievements: [
      'Qoo10 외부 미디어 플랫폼 "Qoo10 SingleOne" 프론트엔드 단독 제작',
      'Next/React, TypeScript, Zustand 기반 웹 구축',
      'Material React Table 등 라이브러리 기반 고성능 UI 구현',
      '고급 인터랙션 구현 및 성능 최적화',
      '테스트 자동화(Jest, Playwright) 구현',
      '지속적인 업데이트 및 릴리즈 관리',
      '일본 구인구직 광고 플랫폼 "Mynavi SingleOne" 제작',
      '반응형 디자인, Google Maps 기반 지도 시스템 구현',
    ],
  },
  {
    title: '프론트엔드 팀장',
    company: '주식회사씨큐프라임',
    period: '2021.10 - 2023.11',
    duration: '2년 2개월',
    description: '다양한 프로젝트에서 프론트엔드 개발 및 팀 리딩을 담당했습니다.',
    achievements: [
      'CRM 솔루션 "하남fnb" 유지보수',
      'BMW ladies championship 골프 대회 웹 기반 "폰 오더" 개발',
      'Node.js 활용 "선불 냉장고 UI" 개발',
      'Vue.js 기반 테이블 오더 "이모탭" 개발',
      'Vue.js 기반 폰 오더 "이모더" 개발',
      '상품 등록 및 관리 웹 오피스 시스템 "이모더 어드민" 개발',
    ],
  },
];

const coreCompetencies = [
  {
    title: '애플리케이션 개발',
    icon: <Rocket />,
    items: ['SSR/CSR 하이브리드 렌더링 전략 구현', '모듈화된 컴포넌트 설계 및 개발'],
  },
  {
    title: 'UI/UX 최적화',
    icon: <Brush />,
    items: ['사용자 중심의 인터페이스 설계', '반응형/적응형 웹 디자인 구현', '웹 접근성 가이드라인 준수', '크로스 브라우저 호환성 보장'],
  },
  {
    title: '성능 최적화',
    icon: <SpeedIcon />,
    items: ['웹 라이트 하우스 분석 및 개선', '레이지 로딩 구현', '브라우저 캐싱 전략 수립', '이미지 최적화 및 관리'],
  },
  {
    title: '상태 관리',
    icon: <StorageIcon />,
    items: ['전역 상태 관리 아키텍처 설계', 'Zustand, Vuex 기반 상태 관리', '실시간 데이터 동기화 구현', '상태 지속성 관리 및 최적화'],
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
                🚀 창의적인 로직의 정점. 흥미로운 매력을 그리는 4년차 프론트엔드 개발자
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  fontWeight: 300,
                }}
              >
                "프로세스 구성을 통해 사용자에게 매력적인 가치를 전달하는 개발자"
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  maxWidth: 800,
                  mx: 'auto',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                대규모 엔터프라이즈 웹 애플리케이션 개발에 전문성을 가진 프론트엔드 개발자입니다.<br/>
                Next.js, React, TypeScript를 주력으로 사용하며, 최신 웹 기술 트렌드를 지속적으로 학습하고 프로젝트에 적용합니다.<br/>
                사용자 경험을 최우선으로 생각하며, 동작에 대한 끊임 없는 생각과 경우의 수 및 지속적인 QA를 통하여,<br/>
                성능 최적화와 접근성을 고려한 직관적인 인터페이스 구현에 특별한 관심을 기울입니다.
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                {[
                  { icon: <GitHub />, label: 'GitHub', href: 'https://github.com/MGsFlow' },
                  // { icon: <LinkedIn />, label: 'LinkedIn', href: '#' },
                  // { icon: <Twitter />, label: 'Twitter', href: '#' },
                  { icon: <Email />, label: 'Email', href: 'mailto:alsrb7538@gmail.com' },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={social.icon}
                      href={social.href}
                      target="_blank"
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

          {/* Core Competencies */}
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
              💡 핵심 역량
            </Typography>

            <Grid container spacing={3} sx={{ mb: 8 }}>
              {coreCompetencies.map((competency, index) => (
                <Grid item xs={12} md={6} key={competency.title}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 2, color: 'primary.main' }}>
                          {competency.icon}
                        </Box>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {competency.title}
                        </Typography>
                      </Box>
                      <Stack spacing={1}>
                        {competency.items.map((item, itemIndex) => (
                          <Typography
                            key={itemIndex}
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Star sx={{ fontSize: 16, mr: 1, color: '#FFB3BA' }} />
                            {item}
                          </Typography>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ mr: 2, color: skill.color }}>
                          {skill.icon}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3">
                            {skill.name}
                          </Typography>
                        </Box>
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
              🎯 주요 프로젝트
            </Typography>

            <Grid container spacing={4} sx={{ mb: 8 }}>
              {projects.map((project, index) => (
                <Grid item xs={12} key={project.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                          <Typography
                            variant="h2"
                            sx={{ mr: 3 }}
                          >
                            {project.image}
                          </Typography>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="h5"
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
                              variant="body1"
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

                            <Stack direction="row" spacing={2}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<GitHub />}
                                href={project.github}
                                target="_blank"
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
                                href={project.live}
                                target="_blank"
                                sx={{
                                  borderColor: '#B8E6B8',
                                  color: '#4A4A4A',
                                  '&:hover': {
                                    borderColor: '#9ED99E',
                                    backgroundColor: 'rgba(184,230,184,0.1)',
                                  },
                                }}
                              >
                                Live
                              </Button>
                            </Stack>
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                          주요 성과
                        </Typography>
                        <Grid container spacing={1}>
                          {project.achievements.map((achievement, achievementIndex) => (
                            <Grid item xs={12} md={6} key={achievementIndex}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                              >
                                <TrendingUp sx={{ fontSize: 16, mr: 1, color: '#FFB3BA' }} />
                                {achievement}
                              </Typography>
                            </Grid>
                          ))}
                        </Grid>
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

            <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      mb: 4,
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 1,
                          }}
                        >
                          {experience.title}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 500,
                            mb: 1,
                          }}
                        >
                          {experience.company}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {experience.description}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={experience.period}
                          sx={{
                            backgroundColor: 'rgba(255,179,186,0.2)',
                            color: 'text.primary',
                            mb: 1,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {experience.duration}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                      주요 성과
                    </Typography>
                    <Grid container spacing={2}>
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <Grid item xs={12} md={6} key={achievementIndex}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'flex-start',
                              mb: 1,
                              lineHeight: 1.6,
                            }}
                          >
                            <Star sx={{ fontSize: 16, mr: 1, mt: 0.5, color: '#FFB3BA', flexShrink: 0 }} />
                            {achievement}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* Development Philosophy */}
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
              🎯 개발 철학
            </Typography>

            <Grid container spacing={3} sx={{ mb: 8 }}>
              {[
                '모든 요소에는 가치가 존재한다.',
                '"사용자 중심" 설계로 실제 가치 전달',
                '확장 가능하고 유지보수가 용이한 코드 작성',
                '지속적인 학습과 기술 트렌드 연구',
                '팀 협업과 지식 공유를 통한 성장',
              ].map((philosophy, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Psychology sx={{ mr: 2, color: '#FFB3BA' }} />
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          개발 철학 {index + 1}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {philosophy}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
} 