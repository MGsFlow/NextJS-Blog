'use client';

import { createTheme } from '@mui/material/styles';

export const pastelTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFB3BA', // 파스텔 핑크
      light: '#FFD1D5',
      dark: '#FF8A95',
      contrastText: '#4A4A4A',
    },
    secondary: {
      main: '#B3D9FF', // 파스텔 블루
      light: '#D1E7FF',
      dark: '#8AC7FF',
      contrastText: '#4A4A4A',
    },
    background: {
      default: '#FFF8F8', // 매우 연한 파스텔 핑크
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A4A4A',
      secondary: '#6B6B6B',
    },
    success: {
      main: '#B8E6B8', // 파스텔 그린
    },
    warning: {
      main: '#FFE5B3', // 파스텔 오렌지
    },
    error: {
      main: '#FFB3B3', // 파스텔 레드
    },
  },
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#4A4A4A',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#4A4A4A',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#4A4A4A',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#4A4A4A',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#4A4A4A',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#6B6B6B',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
          padding: '8px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(255,255,255,0.8)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
}); 