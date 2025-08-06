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
  Button,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  Lock,
} from '@mui/icons-material';
import { useBlogStore } from '../../store/blogStore';
import Link from 'next/link';
import { LoadingPage } from '../../components/LoadingPage';

export default function AdminPage() {
  const { posts, fetchPosts, loading, error, deletePost } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // 로딩 중일 때 로딩 페이지 표시
  if (loading && posts.length === 0) {
    return <LoadingPage message="포스트를 불러오는 중..." />;
  }

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('관리자 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleDelete = async () => {
    if (!deletePassword.trim()) {
      alert('관리자 비밀번호를 입력해주세요.');
      return;
    }

    const success = await deletePost(deletePostId, deletePassword);
    if (success) {
      setDeleteDialogOpen(false);
      setDeletePassword('');
      setDeletePostId('');
    }
  };

  const openDeleteDialog = (postId: string) => {
    setDeletePostId(postId);
    setDeleteDialogOpen(true);
  };

  // 미발행 포스트만 필터링
  const unpublishedPosts = posts.filter(post => !post.published);
  const filteredPosts = unpublishedPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', py: 8 }}>
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h3" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
              관리자 로그인 🔐
            </Typography>
            
            <Card sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                미발행 포스트 관리
              </Typography>
              
              <TextField
                fullWidth
                type="password"
                label="관리자 비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
                sx={{ mb: 3 }}
              />
              
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{
                  background: 'linear-gradient(45deg, #FFB3BA, #FF8A95)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8A95, #FF6B7A)',
                  },
                }}
              >
                로그인
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 헤더 */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
              미발행 포스트 관리 📝
            </Typography>
            <Link href="/" passHref>
              <Button variant="outlined">
                홈으로 돌아가기
              </Button>
            </Link>
          </Box>

          {/* 검색 */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="미발행 포스트 검색..."
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
          </Box>

          {/* 미발행 포스트 목록 */}
          {filteredPosts.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              미발행 포스트가 없습니다.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {filteredPosts.map((post) => (
                <Grid item xs={12} md={6} lg={4} key={post.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      sx={{
                        height: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: 0.8,
                        filter: 'grayscale(0.3)',
                        position: 'relative',
                        '&:hover': {
                          opacity: 1,
                          filter: 'none',
                        },
                      }}
                    >
                      {/* 미발행 라벨 */}
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
                            <IconButton 
                              size="small" 
                              component={Link}
                              href={`/edit/${post.id}`}
                              sx={{ color: '#4CAF50' }}
                            >
                              <Edit sx={{ fontSize: 16 }} />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => openDeleteDialog(post.id)}
                              sx={{ color: '#F44336' }}
                            >
                              <Delete sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          {/* 삭제 확인 다이얼로그 */}
          <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>포스트 삭제 확인</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                이 포스트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </DialogContentText>
              <TextField
                type="password"
                label="관리자 비밀번호"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                fullWidth
                placeholder="admin123"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                삭제
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Container>
    </Box>
  );
} 