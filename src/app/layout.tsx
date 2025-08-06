import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { pastelTheme } from '../theme/pastelTheme';
import { FloatingHearts } from '../components/animations/FloatingHearts';
import { GlowingCursor } from '../components/animations/GlowingCursor';
import { ParallaxBackground } from '../components/animations/ParallaxBackground';
import { Navigation } from '../components/Navigation';
import { SuccessAlert } from '../components/SuccessAlert';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Portfolio Blog',
  description: '파스텔톤의 아기자기한 포트폴리오 블로그',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider theme={pastelTheme}>
          <CssBaseline />
          <Navigation />
          <ParallaxBackground />
          <FloatingHearts />
          <GlowingCursor />
          <SuccessAlert />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
