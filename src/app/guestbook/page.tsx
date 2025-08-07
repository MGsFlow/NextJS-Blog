'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Pagination,
  Stack,
  Skeleton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import {
  Search,
  Favorite,
  Share,
  Bookmark,
  CalendarToday,
  Person,
} from '@mui/icons-material';
import { useBlogStore } from '../../store/blogStore';
import Link from 'next/link';
import { LoadingPage } from '../../components/LoadingPage';

export default function BlogListPage() {
  const { posts, fetchPosts, loading, error } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [page, setPage] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 로딩 중일 때 로딩 페이지 표시
  if (loading && posts.length === 0) {
    return <LoadingPage message="방명록을 불러오는 중..." />;
  }

  // 모든 태그 수집
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();

  // 필터링된 방명록 (발행된 방명록만 표시)
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const isPublished = post.published;
    return matchesSearch && matchesTag && isPublished;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 헤더 */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 2,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #FFB3BA, #B3D9FF)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              방명록 📝
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                textAlign: 'center',
                color: 'text.secondary',
                fontSize: '1.1rem',
              }}
            >
              다양한 방명록들을 확인해보세요
            </Typography>
          </motion.div>

          {/* 검색 및 필터 */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder="방명록 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#FFB3BA',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#FFB3BA',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>태그 필터</InputLabel>
                    <Select
                      value={selectedTag}
                      label="태그 필터"
                      onChange={(e) => setSelectedTag(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          '&:hover': {
                            borderColor: '#B3D9FF',
                          },
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#B3D9FF',
                        },
                      }}
                    >
                      <MenuItem value="all">모든 태그</MenuItem>
                      {allTags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </motion.div>

                            {/* 방명록 목록 */}
          {loading ? (
            <Grid container spacing={3}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ height: 400 }}>
                    <CardContent>
                      <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
                      <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                      <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
                      <Skeleton variant="text" height={20} sx={{ mb: 2 }} />
                      <Skeleton variant="rectangular" height={20} sx={{ mb: 2 }} />
                      <Skeleton variant="text" height={16} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              {filteredPosts.length === 0 ? (
                <motion.div variants={itemVariants}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    검색 결과가 없습니다.
                  </Alert>
                </motion.div>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {paginatedPosts.map((post, index) => (
                      <Grid item xs={12} md={6} lg={4} key={post.id}>
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link href={`/guestbook/${post.id}`} passHref style={{ textDecoration: 'none' }}>
                            <Card
                              sx={{
                                height: 400,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                flexDirection: 'column',
                                opacity: post.published ? 1 : 0.6,
                                filter: post.published ? 'none' : 'grayscale(0.3)',
                                position: 'relative',
                                '&:hover': {
                                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                  opacity: post.published ? 1 : 0.8,
                                },
                              }}
                            >
                              {/* 미발행 라벨 */}
                              {!post.published && (
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    backgroundColor: 'rgba(255, 193, 7, 0.9)',
                                    color: 'text.primary',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    zIndex: 1,
                                    backdropFilter: 'blur(4px)',
                                  }}
                                >
                                  미발행
                                </Box>
                              )}
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
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: 1.6,
                                    flexGrow: 1,
                                    minHeight: '6.4em',
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

                  {/* 페이지네이션 */}
                  {totalPages > 1 && (
                    <motion.div variants={itemVariants}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={(_, value) => setPage(value)}
                          color="primary"
                          sx={{
                            '& .MuiPaginationItem-root': {
                              '&.Mui-selected': {
                                backgroundColor: '#FFB3BA',
                                color: 'white',
                              },
                              '&:hover': {
                                backgroundColor: 'rgba(255,179,186,0.2)',
                              },
                            },
                          }}
                        />
                      </Box>
                    </motion.div>
                  )}
                </>
              )}
            </>
          )}
        </motion.div>
      </Container>
    </Box>
  );
} 
