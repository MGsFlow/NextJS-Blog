'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  Save,
  Preview,
  Add,
  Close,
  ArrowBack,
  Delete,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactMarkdown from 'react-markdown';
import { useBlogStore } from '../../../store/blogStore';
import Link from 'next/link';
import { LoadingPage } from '../../../components/LoadingPage';

const postSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  excerpt: z.string().min(1, '요약을 입력해주세요'),
  tags: z.array(z.string()).optional().default([]),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { currentPost, fetchPost, updatePost, deletePost, loading, error, success } = useBlogStore();
  const [newTag, setNewTag] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  useEffect(() => {
    if (id) {
      fetchPost(id as string);
    }
  }, [id, fetchPost]);

  // 로딩 중일 때 로딩 페이지 표시
  if (loading && !currentPost) {
    return <LoadingPage message="방명록을 불러오는 중..." />;
  }

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      tags: [],
      published: false,
    },
  });

  // 현재 포스트가 로드되면 폼에 데이터 설정
  useEffect(() => {
    if (currentPost) {
      reset({
        title: currentPost.title,
        content: currentPost.content,
        excerpt: currentPost.excerpt,
        tags: currentPost.tags,
        published: currentPost.published,
      });
    }
  }, [currentPost, reset]);

  const watchedTags = watch('tags');
  const content = watch('content');

  const handleAddTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue('tags', [...watchedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      await updatePost(id as string, data);
      // 성공 메시지가 표시된 후 홈으로 이동
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('방명록 수정 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (!deletePassword.trim()) {
      alert('관리자 비밀번호를 입력해주세요.');
      return;
    }

    const success = await deletePost(id as string, deletePassword);
    if (success) {
      setDeleteDialogOpen(false);
      setDeletePassword('');
      // 성공 메시지가 표시된 후 홈으로 이동
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  if (!currentPost) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          방명록을 찾을 수 없습니다.
        </Alert>
        <Link href="/" passHref>
          <Button startIcon={<ArrowBack />}>
            홈으로 돌아가기
          </Button>
        </Link>
      </Container>
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
              방명록 편집
            </Typography>
            <Link href="/" passHref>
              <Button startIcon={<ArrowBack />}>
                홈으로 돌아가기
              </Button>
            </Link>
          </Box>

          {/* 성공/에러 메시지 */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {/* 편집 폼 */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, height: 'fit-content' }}>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    방명록 정보
                  </Typography>

                  <Stack spacing={3}>
                    {/* 제목 */}
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="제목"
                          fullWidth
                          error={!!errors.title}
                          helperText={errors.title?.message}
                        />
                      )}
                    />

                    {/* 요약 */}
                    <Controller
                      name="excerpt"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="요약"
                          fullWidth
                          multiline
                          rows={3}
                          error={!!errors.excerpt}
                          helperText={errors.excerpt?.message}
                        />
                      )}
                    />

                    {/* 태그 */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        태그
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {watchedTags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleRemoveTag(tag)}
                            sx={{
                              backgroundColor: 'rgba(255,179,186,0.2)',
                              '&:hover': {
                                backgroundColor: 'rgba(255,179,186,0.3)',
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="새 태그"
                          size="small"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                        />
                        <Button
                          onClick={handleAddTag}
                          variant="outlined"
                          size="small"
                          disabled={!newTag.trim()}
                        >
                          추가
                        </Button>
                      </Box>
                      {errors.tags && (
                        <Typography color="error" variant="caption">
                          {errors.tags.message}
                        </Typography>
                      )}
                    </Box>

                    {/* 발행 상태 */}
                    <Controller
                      name="published"
                      control={control}
                      render={({ field }) => (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          }
                          label="발행"
                        />
                      )}
                    />

                    {/* 액션 버튼들 */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<Save />}
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(45deg, #FFB3BA, #FF8A95)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #FF8A95, #FF6B7A)',
                          },
                        }}
                      >
                        저장
                      </Button>
                      <Button
                        onClick={() => setPreviewMode(!previewMode)}
                        variant="outlined"
                        startIcon={<Preview />}
                      >
                        미리보기
                      </Button>
                      <Button
                        onClick={() => setDeleteDialogOpen(true)}
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                      >
                        삭제
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              {/* 내용 편집/미리보기 */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, height: '600px', overflow: 'auto' }}>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    {previewMode ? '미리보기' : '내용'}
                  </Typography>

                  {previewMode ? (
                    <Box
                      sx={{
                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                          color: 'text.primary',
                          fontWeight: 600,
                          mb: 2,
                          mt: 4,
                        },
                        '& h1': { fontSize: '2rem' },
                        '& h2': { fontSize: '1.75rem' },
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
                        },
                        '& code': {
                          backgroundColor: 'rgba(179,217,255,0.2)',
                          padding: '2px 6px',
                          borderRadius: 1,
                          fontSize: '0.9em',
                          fontFamily: 'monospace',
                        },
                        '& pre': {
                          backgroundColor: '#f8f9fa',
                          padding: 2,
                          borderRadius: 1,
                          overflow: 'auto',
                          mb: 2,
                        },
                      }}
                    >
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </Box>
                  ) : (
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="마크다운으로 내용을 작성하세요"
                          fullWidth
                          multiline
                          rows={20}
                          error={!!errors.content}
                          helperText={errors.content?.message}
                          sx={{
                            '& .MuiInputBase-root': {
                              fontFamily: 'monospace',
                              fontSize: '0.9rem',
                            },
                          }}
                        />
                      )}
                    />
                  )}
                </Paper>
              </Grid>
            </Grid>
          </form>

          {/* 삭제 확인 다이얼로그 */}
          <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
            <DialogTitle>방명록 삭제 확인</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                이 방명록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </DialogContentText>
              <TextField
                type="password"
                label="관리자 비밀번호"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                fullWidth
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
