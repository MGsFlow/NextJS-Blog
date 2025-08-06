'use client';

import { create } from 'zustand';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
const supabaseUrl = 'https://qmmiatalttuejbfdeqaw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbWlhdGFsdHR1ZWpiZmRlcWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NDc4NTMsImV4cCI6MjA3MDAyMzg1M30.woPn_DqPh7Jg5DcJBN9gPcta-XPFHisR8Cq0z0VRvaQ';
export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
  featured_image?: string;
}

interface BlogStore {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  showSuccess: (message: string) => void;
  clearSuccess: () => void;
  fetchPosts: () => Promise<void>;
  fetchPost: (id: string) => Promise<void>;
  createPost: (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updatePost: (id: string, post: Partial<Post>) => Promise<void>;
  deletePost: (id: string, password: string) => Promise<boolean>;
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  success: null,

  showSuccess: (message: string) => {
    set({ success: message });
    setTimeout(() => set({ success: null }), 3000);
  },

  clearSuccess: () => {
    set({ success: null });
  },

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        set({ error: '포스트를 불러오는 중 오류가 발생했습니다.', loading: false });
        return;
      }

      set({ posts: data || [], loading: false });
    } catch (error) {
      console.error('Fetch posts error:', error);
      set({ error: '포스트를 불러오는 중 오류가 발생했습니다.', loading: false });
    }
  },

  fetchPost: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        set({ error: '포스트를 찾을 수 없습니다.', loading: false });
        return;
      }

      if (data) {
        set({ currentPost: data, loading: false });
      } else {
        set({ error: '포스트를 찾을 수 없습니다.', loading: false });
      }
    } catch (error) {
      console.error('Fetch post error:', error);
      set({ error: '포스트를 불러오는 중 오류가 발생했습니다.', loading: false });
    }
  },

  createPost: async (post) => {
    set({ loading: true, error: null });
    try {
      const newPost = {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Supabase에 저장 시도
      const { data, error } = await supabase
        .from('posts')
        .insert([newPost])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        // RLS 오류인 경우 로컬에만 저장
        if (error.code === '42501') {
          const localPost = {
            ...newPost,
            id: Date.now().toString(),
          };
          set(state => ({
            posts: [localPost, ...state.posts],
            loading: false
          }));
          set({ success: '포스트가 생성되었습니다! (로컬 저장 - RLS 정책으로 인해 서버 저장 실패)' });
          return;
        }
        set({ error: '포스트 생성 중 오류가 발생했습니다.', loading: false });
        return;
      }

      if (data) {
        set(state => ({
          posts: [data, ...state.posts],
          loading: false
        }));
        set({ success: '포스트가 성공적으로 생성되었습니다!' });
      }
    } catch (error) {
      console.error('Create post error:', error);
      set({ error: '포스트 생성 중 오류가 발생했습니다.', loading: false });
    }
  },

  updatePost: async (id: string, post) => {
    set({ loading: true, error: null });
    try {
      const updatedPost = {
        ...post,
        updated_at: new Date().toISOString(),
      };

      // Supabase에 업데이트 시도
      const { data, error } = await supabase
        .from('posts')
        .update(updatedPost)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        // RLS 오류인 경우 로컬에서만 업데이트
        if (error.code === '42501') {
          set(state => ({
            posts: state.posts.map(p => 
              p.id === id ? { ...p, ...updatedPost } : p
            ),
            currentPost: state.currentPost?.id === id 
              ? { ...state.currentPost, ...updatedPost }
              : state.currentPost,
            loading: false
          }));
          set({ success: '포스트가 수정되었습니다! (로컬 저장 - RLS 정책으로 인해 서버 저장 실패)' });
          return;
        }
        set({ error: '포스트 수정 중 오류가 발생했습니다.', loading: false });
        return;
      }

      if (data) {
        set(state => ({
          posts: state.posts.map(p => p.id === id ? data : p),
          currentPost: state.currentPost?.id === id ? data : state.currentPost,
          loading: false
        }));
        set({ success: '포스트가 성공적으로 수정되었습니다!' });
      }
    } catch (error) {
      console.error('Update post error:', error);
      set({ error: '포스트 수정 중 오류가 발생했습니다.', loading: false });
    }
  },

  deletePost: async (id: string, password: string) => {
    // 관리자 비밀번호 확인 (실제로는 환경변수나 더 안전한 방법 사용)
    const adminPassword = 'admin123'; // 실제로는 환경변수에서 가져와야 함
    
    if (password !== adminPassword) {
      set({ error: '관리자 비밀번호가 올바르지 않습니다.' });
      return false;
    }

    set({ loading: true, error: null });
    try {
      // Supabase에서 삭제 시도
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        // RLS 오류인 경우 로컬에서만 삭제
        if (error.code === '42501') {
          set(state => ({
            posts: state.posts.filter(p => p.id !== id),
            currentPost: state.currentPost?.id === id ? null : state.currentPost,
            loading: false
          }));
          set({ success: '포스트가 삭제되었습니다! (로컬 저장 - RLS 정책으로 인해 서버 저장 실패)' });
          return true;
        }
        set({ error: '포스트 삭제 중 오류가 발생했습니다.', loading: false });
        return false;
      }

      set(state => ({
        posts: state.posts.filter(p => p.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
        loading: false
      }));
      set({ success: '포스트가 성공적으로 삭제되었습니다!' });
      return true;
    } catch (error) {
      console.error('Delete post error:', error);
      set({ error: '포스트 삭제 중 오류가 발생했습니다.', loading: false });
      return false;
    }
  },
})); 