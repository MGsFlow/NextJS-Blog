# 파스텔톤 포트폴리오 방명록 ✨

## 🎨 특징

- **파스텔톤 디자인**: 부드럽고 아기자기한 색상 팔레트
- **ReactBits.dev 효과**: Floating Hearts, Glowing Cursor, Parallax Background
- **MUI 컴포넌트**: Material-UI를 활용한 일관된 디자인
- **Zustand 상태관리**: 가벼운 상태 관리
- **Supabase 연동**: 실시간 데이터베이스 연동
- **Framer Motion**: 부드러운 애니메이션
- **반응형 디자인**: 모든 디바이스에서 최적화
- **방명록 시스템**: 발행/미발행 상태 관리

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
-- posts 테이블 (방명록)
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

## 📁 프로젝트 구조

```
blog/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # 메인 레이아웃
│   │   ├── page.tsx        # 홈페이지
│   │   ├── write/          # 방명록 작성 페이지
│   │   ├── edit/           # 방명록 편집 페이지
│   │   ├── guestbook/      # 방명록 목록/상세 페이지
│   │   ├── admin/          # 관리자 페이지
│   │   ├── portfolio/      # 포트폴리오 페이지
│   │   └── globals.css     # 글로벌 스타일
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Navigation.tsx  # 네비게이션
│   │   ├── LoadingPage.tsx # 로딩 페이지
│   │   ├── SuccessAlert.tsx # 성공 알림
│   │   └── animations/     # 애니메이션 컴포넌트
│   ├── store/             # Zustand 스토어
│   │   └── blogStore.ts   # 방명록 상태 관리
│   └── theme/             # MUI 테마
│       └── pastelTheme.ts # 파스텔톤 테마
├── public/                # 정적 파일
│   ├── MGsFlow_이력서.pdf # 이력서 파일
│   └── mgflow.png        # 프로필 이미지
```

## 🎯 주요 기능

### 홈페이지
- 애니메이션이 있는 히어로 섹션
- 최신 방명록 그리드 뷰
- 소셜 미디어 링크
- 파스텔톤 그라데이션 효과
- 이력서 다운로드 기능

### 방명록 시스템
- **작성**: 마크다운 에디터로 방명록 작성
- **편집**: 기존 방명록 수정
- **발행 관리**: 발행/미발행 상태 관리
- **관리자 페이지**: 미발행 방명록 관리
- **실시간 미리보기**: 작성 중 실시간 미리보기

### 포트폴리오 페이지
- 경력 정보 및 프로젝트 소개
- 기술 스택 시각화
- 핵심 역량 및 개발 철학
- 애니메이션 효과

### 애니메이션 효과
- **Floating Hearts**: 떠다니는 하트 애니메이션
- **Glowing Cursor**: 마우스 커서 글로우 효과
- **Parallax Background**: 스크롤 기반 파라랙스 배경
- **Framer Motion**: 부드러운 페이지 전환

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
- **Markdown**: React Markdown

## 📝 사용법

### 방명록 관리
1. **방명록 작성**: `/write` 페이지에서 새 방명록을 작성하세요
2. **방명록 보기**: 홈페이지에서 최신 방명록을 확인하세요
3. **방명록 목록**: `/guestbook` 페이지에서 모든 방명록을 확인하세요
4. **관리자 기능**: `/admin` 페이지에서 미발행 방명록을 관리하세요

### 포트폴리오
1. **포트폴리오 보기**: `/portfolio` 페이지에서 경력과 프로젝트를 확인하세요
2. **이력서 다운로드**: 홈페이지에서 이력서를 다운로드하세요

### 네비게이션
- 상단 네비게이션을 통해 다른 페이지로 이동하세요
- 반응형 디자인으로 모바일에서도 편리하게 사용할 수 있습니다



## 🔐 관리자 기능

### 관리자 로그인
- URL: `/admin`
- 비밀번호: `admin123`
- 미발행 방명록 관리
- 방명록 삭제 기능

### 발행 상태 관리
- **발행된 방명록**: 홈페이지와 방명록 목록에 표시
- **미발행 방명록**: 관리자 페이지에서만 확인 가능
- **시각적 구분**: 미발행 방명록은 흐리게 표시



## 🙏 감사의 말

- [ReactBits.dev](https://reactbits.dev/) - 멋진 애니메이션 효과 영감
- [Material-UI](https://mui.com/) - 훌륭한 UI 컴포넌트
- [Framer Motion](https://www.framer.com/motion/) - 부드러운 애니메이션
- [Supabase](https://supabase.com/) - 실시간 데이터베이스

---
