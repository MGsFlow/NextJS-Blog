'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Chip,
  Paper,
  Divider,
  IconButton,
  Avatar,
  Stack,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  Favorite,
  Share,
  Bookmark,
  ArrowBack,
  CalendarToday,
  Person,
  Edit,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBlogStore } from '../../../store/blogStore';
import Link from 'next/link';
import { LoadingPage } from '../../../components/LoadingPage';

export default function BlogPostPage() {
  const params = useParams();
  const { id } = params;
  const { currentPost, fetchPost, loading, error } = useBlogStore();

  useEffect(() => {
    if (id) {
      fetchPost(id as string);
    }
  }, [id, fetchPost]);

  // 로딩 중일 때 로딩 페이지 표시
  if (loading) {
    return <LoadingPage message="방명록을 불러오는 중..." />;
  }

  if (error || !currentPost) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          방명록을 찾을 수 없습니다.
        </Alert>
        <Link href="/" passHref>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              sx={{
                backgroundColor: 'rgba(255,179,186,0.2)',
                '&:hover': {
                  backgroundColor: 'rgba(255,179,186,0.3)',
                },
              }}
            >
              <ArrowBack />
            </IconButton>
          </motion.div>
        </Link>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 뒤로가기 버튼 */}
          <Box sx={{ mb: 4 }}>
            <Link href="/" passHref>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255,179,186,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,179,186,0.3)',
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </motion.div>
            </Link>
          </Box>

                      {/* 방명록 헤더 */}
          <Paper
            sx={{
              p: 4,
              mb: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.3,
              }}
            >
              {currentPost.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: 'text.secondary',
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              {currentPost.excerpt}
            </Typography>

            {/* 메타 정보 */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(currentPost.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  개발자
                </Typography>
              </Stack>
            </Stack>

            {/* 태그 */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {currentPost.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255,179,186,0.2)',
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(255,179,186,0.3)',
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>

                      {/* 방명록 내용 */}
          <Paper
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: 'text.primary',
                  fontWeight: 600,
                  mb: 2,
                  mt: 4,
                  '&:first-of-type': {
                    mt: 0,
                  },
                },
                '& h1': { 
                  fontSize: '2rem',
                  borderBottom: '2px solid #FFB3BA',
                  pb: 1,
                },
                '& h2': { 
                  fontSize: '1.75rem',
                  borderBottom: '1px solid #B3D9FF',
                  pb: 0.5,
                },
                '& h3': { fontSize: '1.5rem' },
                '& p': {
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 2,
                  color: 'text.primary',
                },
                '& ul, & ol': {
                  pl: 3,
                  mb: 2,
                },
                '& li': {
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  mb: 1,
                },
                '& blockquote': {
                  borderLeft: '4px solid #FFB3BA',
                  pl: 3,
                  ml: 0,
                  my: 3,
                  fontStyle: 'italic',
                  backgroundColor: 'rgba(255,179,186,0.1)',
                  p: 2,
                  borderRadius: 1,
                  '& p': {
                    margin: 0,
                  },
                },
                '& code': {
                  backgroundColor: 'rgba(179,217,255,0.2)',
                  padding: '2px 6px',
                  borderRadius: 1,
                  fontSize: '0.9em',
                  fontFamily: 'monospace',
                  color: '#3178C6',
                },
                '& pre': {
                  backgroundColor: '#f8f9fa',
                  padding: 3,
                  borderRadius: 2,
                  overflow: 'auto',
                  mb: 3,
                  border: '1px solid rgba(0,0,0,0.1)',
                  '& code': {
                    backgroundColor: 'transparent',
                    padding: 0,
                    color: 'inherit',
                  },
                },
                '& a': {
                  color: '#FFB3BA',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#FF8A95',
                  },
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  my: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
                '& table': {
                  width: '100%',
                  borderCollapse: 'collapse',
                  mb: 3,
                  '& th, & td': {
                    border: '1px solid rgba(0,0,0,0.1)',
                    padding: 2,
                    textAlign: 'left',
                  },
                  '& th': {
                    backgroundColor: 'rgba(255,179,186,0.1)',
                    fontWeight: 600,
                  },
                },
                '& hr': {
                  border: 'none',
                  borderTop: '2px solid #FFB3BA',
                  margin: '2rem 0',
                },
              }}
            >
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match;
                    
                    return !isInline ? (
                      <SyntaxHighlighter
                        style={tomorrow as any}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {currentPost.content}
              </ReactMarkdown>
            </Box>
          </Paper>

          {/* 액션 버튼들 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mt: 4,
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(255,179,186,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,179,186,0.3)',
                  },
                }}
              >
                <Favorite />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(179,217,255,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(179,217,255,0.3)',
                  },
                }}
              >
                <Share />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                sx={{
                  backgroundColor: 'rgba(184,230,184,0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(184,230,184,0.3)',
                  },
                }}
              >
                <Bookmark />
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={`/edit/${currentPost.id}`} passHref>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255,230,184,0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,230,184,0.3)',
                    },
                  }}
                >
                  <Edit />
                </IconButton>
              </Link>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
} 