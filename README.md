# 파스텔톤 포트폴리오 블로그 ✨

ReactBits.dev에서 영감을 받은 멋진 효과들과 파스텔톤의 아기자기한 디자인이 적용된 포트폴리오 블로그입니다.

## 🎨 특징

- **파스텔톤 디자인**: 부드럽고 아기자기한 색상 팔레트
- **ReactBits.dev 효과**: Floating Hearts, Glowing Cursor, Parallax Background
- **MUI 컴포넌트**: Material-UI를 활용한 일관된 디자인
- **Zustand 상태관리**: 가벼운 상태 관리
- **Supabase 연동**: 실시간 데이터베이스 연동
- **Framer Motion**: 부드러운 애니메이션
- **반응형 디자인**: 모든 디바이스에서 최적화

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Supabase 데이터베이스 설정

Supabase에서 다음 테이블을 생성하세요:

```sql
-- posts 테이블
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
  featured_image TEXT
);

-- RLS 정책 설정 (선택사항)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 설정
CREATE POLICY "Allow public read access" ON posts
  FOR SELECT USING (published = true);

-- 인증된 사용자만 작성할 수 있도록 설정
CREATE POLICY "Allow authenticated insert" ON posts
  FOR INSERT WITH AUTH (role() = 'authenticated');
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
blog/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # 메인 레이아웃
│   │   ├── page.tsx        # 홈페이지
│   │   ├── write/          # 포스트 작성 페이지
│   │   └── globals.css     # 글로벌 스타일
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Navigation.tsx  # 네비게이션
│   │   └── animations/     # 애니메이션 컴포넌트
│   ├── store/             # Zustand 스토어
│   │   └── blogStore.ts   # 블로그 상태 관리
│   └── theme/             # MUI 테마
│       └── pastelTheme.ts # 파스텔톤 테마
```

## 🎯 주요 기능

### 홈페이지
- 애니메이션이 있는 히어로 섹션
- 최신 포스트 그리드 뷰
- 소셜 미디어 링크
- 파스텔톤 그라데이션 효과

### 포스트 작성
- 마크다운 에디터
- 실시간 미리보기
- 태그 관리
- 이미지 업로드 (준비 중)

### 애니메이션 효과
- **Floating Hearts**: 떠다니는 하트 애니메이션
- **Glowing Cursor**: 마우스 커서 글로우 효과
- **Parallax Background**: 스크롤 기반 파라랙스 배경

## 🎨 색상 팔레트

- **Primary**: #FFB3BA (파스텔 핑크)
- **Secondary**: #B3D9FF (파스텔 블루)
- **Success**: #B8E6B8 (파스텔 그린)
- **Warning**: #FFE5B3 (파스텔 오렌지)
- **Error**: #FFB3B3 (파스텔 레드)
- **Background**: #FFF8F8 (매우 연한 파스텔 핑크)

## 🔧 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Database**: Supabase
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Styling**: Emotion (MUI 기본)

## 📝 사용법

1. **포스트 작성**: `/write` 페이지에서 새 포스트를 작성하세요
2. **포스트 보기**: 홈페이지에서 최신 포스트를 확인하세요
3. **네비게이션**: 상단 네비게이션을 통해 다른 페이지로 이동하세요

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub에 코드를 푸시하세요
2. Vercel에서 프로젝트를 연결하세요
3. 환경 변수를 설정하세요
4. 배포하세요!

### 다른 플랫폼

```bash
npm run build
npm start
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🙏 감사의 말

- [ReactBits.dev](https://reactbits.dev/) - 멋진 애니메이션 효과 영감
- [Material-UI](https://mui.com/) - 훌륭한 UI 컴포넌트
- [Framer Motion](https://www.framer.com/motion/) - 부드러운 애니메이션
- [Supabase](https://supabase.com/) - 실시간 데이터베이스

---

💖 파스텔톤의 아기자기한 블로그를 즐겨보세요!
