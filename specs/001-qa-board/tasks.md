# QANOW 구현 Task 분해

**프로젝트**: QANOW 질의응답 게시판  
**총 Task 수**: 48개  
**예상 기간**: 8주 (Phase 1-2: 2주, Phase 3: 2주, Phase 4: 1주, Phase 5-8: 3주)  
**작성일**: 2025-08-29

---

## Phase 1: 프로젝트 설정 (3 Task)

### Task 1-1: React + Vite + TypeScript 초기 설정

**ID**: `P1-T1`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 2시간

**요구사항**:
- spec.md: §기술 스택 (React, Vite, TypeScript)
- implementation-plan.md §1: 디렉터리 구조

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. Vite 프로젝트 생성: npm create vite@latest
2. React + TypeScript 템플릿 선택
3. 의존성 설치: npm install
4. 디렉터리 구조 생성
   src/
   ├── components/
   │   ├── common/
   │   ├── hero/
   │   └── layout/
   ├── pages/
   ├── hooks/
   ├── context/
   ├── db/
   ├── types/
   ├── styles/
   ├── utils/
   └── App.tsx
5. vite.config.ts 설정 (port 5173, hot reload)
```

**생성 파일**:
- `vite.config.ts`
- `tsconfig.json`
- `src/App.tsx`
- `src/main.tsx`
- `src/index.css`
- `.gitignore`

**검증 방법**:
```bash
npm run dev
# 브라우저에서 http://localhost:5173 열림
# "Vite + React" 기본 화면 표시
```

**의존성**: 없음 (시작 task)

---

### Task 1-2: ESLint, Prettier, TypeScript 검사 설정

**ID**: `P1-T2`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- implementation-plan.md §17: 개발 워크플로우

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. 패키지 설치:
   npm install --save-dev eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin

2. ESLint 설정 (.eslintrc.json):
   - React + TypeScript 규칙
   - 줄 길이 100px
   - semicolon 필수

3. Prettier 설정 (.prettierrc):
   - 4칸 indent
   - Single quotes
   - Trailing comma: "es5"

4. package.json 스크립트 추가:
   "lint": "eslint src --ext ts,tsx"
   "format": "prettier --write src"
   "type-check": "tsc --noEmit"
```

**생성 파일**:
- `.eslintrc.json`
- `.prettierrc`
- `.prettierignore`

**검증 방법**:
```bash
npm run type-check  # 에러 없음
npm run lint        # 에러 없음
npm run format      # 자동 포맷팅
```

**의존성**: P1-T1 완료

---

### Task 1-3: Vitest 및 테스트 설정

**ID**: `P1-T3`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- implementation-plan.md §14: 테스트 전략

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. 패키지 설치:
   npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom

2. vitest.config.ts 생성:
   - jsdom environment
   - globals: true (describe, it 직접 사용)

3. setup.ts 생성:
   - @testing-library/jest-dom 임포트

4. package.json 스크립트:
   "test": "vitest"
   "test:ui": "vitest --ui"
   "test:coverage": "vitest --coverage"
```

**생성 파일**:
- `vitest.config.ts`
- `src/setupTests.ts`

**검증 방법**:
```bash
npm test -- --run
# "no test files found" 에러 OK (아직 테스트 파일 없음)
```

**의존성**: P1-T1 완료

---

## Phase 2: 디자인 시스템 기반 (12 Task)

### Task 2-1: CSS 디자인 토큰 (variables.css)

**ID**: `P2-T1`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- spec.md: §성공 기준
- design.md: §15 (디자인 토큰), §20 (반응형)

**Design 연결**:
- design.md §15: Color Tokens (Primary, Status, Neutral)
- design.md §16: Typography
- design.md §18: Spacing Scale & Responsive

**작업 내용**:
```
1. src/styles/variables.css 생성
2. 색상 변수 정의 (Primary, Status, Neutral)
3. 타이포그래피 변수 (크기, weight, line-height)
4. 간격 변수 (4px~48px scale)
5. 반응형 breakpoint (375px, 768px, 1024px)
6. 컴포넌트 변수 (button height, border-radius 등)
```

**생성 파일**:
- `src/styles/variables.css` (~200줄)

**수정 파일**:
- `src/index.css`: @import variables.css

**검증 방법**:
```bash
grep --color "^  --" src/styles/variables.css | wc -l
# 50개 이상의 변수
```

**의존성**: P1-T1 완료

---

### Task 2-2: 전역 스타일 및 Base 스타일

**ID**: `P2-T2`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- design.md: §23 (금지 패턴 - 과도한 효과 없음)

**Design 연결**:
- design.md §19: 컴포넌트 규칙
- design.md §22: prefers-reduced-motion

**작업 내용**:
```
1. src/styles/base.css 생성
2. Reset: * { margin: 0; padding: 0; }
3. Body: font-family, background, color
4. a: text-decoration, color
5. input, button: inherit 스타일
6. :focus-visible: 2px outline
7. @media (prefers-reduced-motion: reduce): animation none
```

**생성 파일**:
- `src/styles/base.css` (~80줄)

**수정 파일**:
- `src/index.css`: @import base.css

**검증 방법**:
```bash
npm run dev
# 개발자 도구 → Styles: body에 var(--color-*) 적용됨
```

**의존성**: P2-T1 완료

---

### Task 2-3: 타이포그래피 CSS 클래스

**ID**: `P2-T3`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- design.md §16: Typography Scale

**Design 연결**:
- design.md §16: 타이포그래피 계층 (Hero/Page/Card/Body 등)

**작업 내용**:
```
1. src/styles/typography.css 생성
2. CSS 클래스 정의:
   .text-hero-title { font-size: var(--font-size-hero-title); ... }
   .text-page-title { font-size: var(--font-size-page-title); ... }
   .text-body { font-size: var(--font-size-body); ... }
   .text-caption { font-size: var(--font-size-caption); ... }
3. 반응형: @media (max-width: 767px) {...}
```

**생성 파일**:
- `src/styles/typography.css` (~100줄)

**수정 파일**:
- `src/index.css`: @import typography.css

**검증 방법**:
```bash
grep "\.text-" src/styles/typography.css | wc -l
# 6개 이상의 클래스
```

**의존성**: P2-T1 완료

---

### Task 2-4: Header 컴포넌트

**ID**: `P2-T4`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Screen 1-3: Header 구조
- design.md §7: Header 규칙

**Design 연결**:
- design.md §7: Header & Navigation (sticky, z-index 100, padding)
- design.md §19: Button 규칙

**작업 내용**:
```
1. src/components/common/Header.tsx 생성
2. 구조:
   <header>
     <div>Logo + QANOW</div>
     <nav>
       <a>로그인</a>
       <Button>회원가입</Button>
     </nav>
   </header>
3. CSS: sticky, padding responsive, logo 36×36px
4. Props: 로그인 상태에 따라 nav 콘텐츠 변경
```

**생성 파일**:
- `src/components/common/Header.tsx` (~100줄)
- `src/components/common/Header.module.css` (선택)

**수정 파일**:
- `src/App.tsx`: <Header /> 추가

**검증 방법**:
```bash
npm run dev
# 상단에 sticky header 표시
# 로그인/회원가입 버튼 표시
```

**의존성**: P2-T1, P2-T2 완료 (Task 2-5 Button 전에 완료하지 않아도 됨)

---

### Task 2-5: Button 컴포넌트

**ID**: `P2-T5`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- design.md §19: Button 규칙 (Primary/Secondary/Danger, 높이 44px)

**Design 연결**:
- design.md §19: 버튼 스타일 (배경색, 테두리, 호버)

**작업 내용**:
```
1. src/components/common/Button.tsx 생성
2. Props: variant, disabled, loading, fullWidth, children
3. 3가지 variant:
   - primary: navy bg, white text
   - secondary: transparent bg, border
   - danger: transparent bg, red border
4. 높이: 44px
5. 상태: hover (색상 변경), disabled (회색), loading ("저장 중...")
```

**생성 파일**:
- `src/components/common/Button.tsx` (~80줄)

**검증 방법**:
```bash
npm run dev
# Header에서 버튼 4가지 시각 확인
# Hover 상태 확인
# disabled 상태 확인
```

**의존성**: P2-T1 완료

---

### Task 2-6: Input, Textarea 컴포넌트

**ID**: `P2-T6`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- design.md §19: Input/Textarea 규칙
- spec.md §Input Validation: 길이, 빈 값

**Design 연결**:
- design.md §19: 높이 44px, padding 12px, focus 시 border 색 변경

**작업 내용**:
```
1. src/components/common/Input.tsx 생성
   - Props: label, type, value, onChange, error, maxLength, placeholder
   - 글자 수 표시 (maxLength일 때)
   - Error 시 빨강 border + 메시지

2. src/components/common/Textarea.tsx 생성
   - Props: label, value, onChange, error, maxLength, rows
   - 최소 높이 150px
   - resize: vertical만 가능
```

**생성 파일**:
- `src/components/common/Input.tsx` (~80줄)
- `src/components/common/Textarea.tsx` (~80줄)

**검증 방법**:
```bash
npm run dev
# Input에 maxLength 입력
# 글자 수 카운터 표시 확인
# 최대값 도달 시 입력 불가 확인
```

**의존성**: P2-T1, P2-T2 완료

---

### Task 2-7: Badge 컴포넌트

**ID**: `P2-T7`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- design.md §19: Badge 규칙
- spec.md §State Management: pending/answered/closed

**Design 연결**:
- design.md §19: 상태별 배경색 (pending #fff3e0, completed #e8f5e9)

**작업 내용**:
```
1. src/components/common/Badge.tsx 생성
2. Props: status ('pending' | 'completed' | 'closed'), children
3. 상태별 색상:
   - pending: #ff9800 text + #fff3e0 bg
   - completed: #4caf50 text + #e8f5e9 bg
   - closed: #9ca3af text + #f5f5f5 bg
4. 높이 24-28px, padding 4px 12px
```

**생성 파일**:
- `src/components/common/Badge.tsx` (~50줄)

**검증 방법**:
```bash
npm run dev
# 3가지 상태 배지 시각 확인
```

**의존성**: P2-T1 완료

---

### Task 2-8: Loading, Empty, Error, Unauthorized 상태 컴포넌트

**ID**: `P2-T8`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2.5시간

**요구사항**:
- design.md §14: 상태 화면
- spec.md §State Management: Loading/Empty/Error/Unauthorized

**Design 연결**:
- design.md §14: 각 상태의 배경색, 아이콘, 메시지

**작업 내용**:
```
1. src/components/common/LoadingState.tsx
   - 스피너 (회전) + "로딩 중..." 텍스트
   - prefers-reduced-motion: 회전 없음

2. src/components/common/EmptyState.tsx
   - 파란 배경 (#f0f9ff), 파란 border
   - title, description, action CTA
   - 사용 예시: 질문이 없을 때

3. src/components/common/ErrorState.tsx
   - 빨강 배경 (#fef2f2), 빨강 border
   - ⚠️ 아이콘
   - message, onRetry 버튼

4. src/components/common/UnauthorizedState.tsx
   - ⚠️ 아이콘 (48px)
   - "이 질문에 접근할 수 없습니다"
   - "내 질문 목록으로" 링크
```

**생성 파일**:
- `src/components/common/LoadingState.tsx` (~60줄)
- `src/components/common/EmptyState.tsx` (~80줄)
- `src/components/common/ErrorState.tsx` (~80줄)
- `src/components/common/UnauthorizedState.tsx` (~70줄)

**검증 방법**:
```bash
npm run dev
# 각 상태 컴포넌트를 임시로 App에 렌더링
# 시각 확인
```

**의존성**: P2-T1, P2-T5 (Button)

---

### Task 2-9: Footer 컴포넌트

**ID**: `P2-T9`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 0.5시간

**요구사항**:
- spec.md §Main Page: Footer 포함
- design.md §4: Footer 구조

**Design 연결**:
- design.md §4: 모든 화면에 포함, "© 2025 QANOW"

**작업 내용**:
```
1. src/components/common/Footer.tsx 생성
2. 배경: navy (#0d47a1)
3. 텍스트: white
4. 센터 정렬
5. 텍스트: "© 2025 QANOW. 모든 권리 보유."
```

**생성 파일**:
- `src/components/common/Footer.tsx` (~30줄)

**검증 방법**:
```bash
npm run dev
# Footer 하단에 표시
```

**의존성**: P2-T1 완료

---

### Task 2-10: 반응형 hook (useResponsive)

**ID**: `P2-T10`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- design.md §20: 반응형 규칙 (375px/768px/1024px)
- implementation-plan.md §6: useResponsive 훅

**Design 연결**:
- design.md §20: breakpoint 정의

**작업 내용**:
```
1. src/hooks/useResponsive.ts 생성
2. window.matchMedia를 래핑하는 훅
3. Props: query (예: "(max-width: 767px)")
4. Return: boolean
5. 리스너 등록/해제 처리
6. 사용 예시:
   const isMobile = useResponsive('(max-width: 767px)');
   const isTablet = useResponsive('(min-width: 768px) and (max-width: 1023px)');
   const isDesktop = useResponsive('(min-width: 1024px)');
```

**생성 파일**:
- `src/hooks/useResponsive.ts` (~30줄)

**검증 방법**:
```bash
npm run dev
# 브라우저 DevTools에서 화면 크기 변경
# 상태 실시간 변경 확인
```

**의존성**: P1-T1 완료

---

### Task 2-11: 동기화: variables.css와 Button, Input 통합

**ID**: `P2-T11`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- design.md §15-19: 모든 토큰 사용

**Design 연결**:
- design.md §3: CSS 변수 사용

**작업 내용**:
```
1. 모든 컴포넌트에서 variables.css 변수 사용 확인
2. Button: background, padding, border-radius, height, font-size
3. Input: border-color, height, padding, border-radius
4. Textarea: padding, border-radius
5. Badge: padding, border-radius, font-size
6. 하드코딩된 색상/크기 없음 (모두 변수)
```

**수정 파일**:
- `src/components/common/Button.tsx`: 변수 사용
- `src/components/common/Input.tsx`: 변수 사용
- `src/components/common/Textarea.tsx`: 변수 사용
- `src/components/common/Badge.tsx`: 변수 사용

**검증 방법**:
```bash
grep -r "color:\s*#" src/components/common/*.tsx
# 결과: 0 (모두 var(...) 사용)
```

**의존성**: P2-T1, P2-T5, P2-T6, P2-T7

---

### Task 2-12: 접근성: prefers-reduced-motion 구현

**ID**: `P2-T12`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- design.md §22: prefers-reduced-motion
- constitution.md §VI: Motion Safety

**Design 연결**:
- design.md §22: CSS 규칙, LoadingState 스피너

**작업 내용**:
```
1. src/styles/motion.css 생성
2. @media (prefers-reduced-motion: reduce) { ... }
3. animation: none !important
4. transition: none !important
5. LoadingState: 스피너 회전 비활성화
6. 테스트: macOS: System Preferences → Accessibility → Display → Reduce motion
```

**생성 파일**:
- `src/styles/motion.css` (~20줄)

**수정 파일**:
- `src/index.css`: @import motion.css
- `src/components/common/LoadingState.tsx`: prefers-reduced-motion 확인

**검증 방법**:
```bash
# macOS: System Preferences → Accessibility → Display → Reduce motion ON
npm run dev
# LoadingState에서 스피너 회전 없음 확인
```

**의존성**: P2-T8

---

## Phase 3: 세 핵심 화면과 Mock Data (12 Task)

### Task 3-1: Mock Data 구조 정의

**ID**: `P3-T1`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Key Entities: User, Question, Answer
- implementation-plan.md §15: Mock Data

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. src/utils/mock-data.ts 생성
2. 타입 정의 (TypeScript):
   - User { id, email, name, role: 'member' | 'admin' }
   - Question { id, created_by, title, content, status, created_at }
   - Answer { id, question_id, created_by, content, created_at }

3. Mock 데이터:
   - 3명 사용자 (회원 2명, 관리자 1명)
   - 5개 질문 (상태: pending 3개, answered 2개)
   - 2개 답변
```

**생성 파일**:
- `src/utils/mock-data.ts` (~150줄)
- `src/types/models.ts` (인터페이스) (~80줄)

**검증 방법**:
```bash
npm run type-check
# 에러 없음
```

**의존성**: P2 완료

---

### Task 3-2: Mock Session 구현 (AuthContext)

**ID**: `P3-T2`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- spec.md §User Roles: 회원/관리자/비회원
- implementation-plan.md §9: AuthContext

**Design 연결**:
- design.md §6: 역할별 UI 분기

**작업 내용**:
```
1. src/context/AuthContext.tsx 생성
2. AuthContextType { user, role, login, logout, isAuthenticated }
3. Mock 구현:
   - useState: current user (null / member / admin)
   - logout: user = null
   - login: mock 사용자로 설정 (role 기반)

4. src/hooks/useAuth.ts 생성
   - Context 접근 훅
```

**생성 파일**:
- `src/context/AuthContext.tsx` (~150줄)
- `src/hooks/useAuth.ts` (~30줄)

**수정 파일**:
- `src/App.tsx`: <AuthProvider> 감싸기

**검증 방법**:
```bash
npm run dev
# React DevTools: AuthContext value 확인
```

**의존성**: P3-T1 완료

---

### Task 3-3: 메인 페이지 - Hero 섹션

**ID**: `P3-T3`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2.5시간

**요구사항**:
- spec.md §Screen 1: Main Page
- design.md §9-10: Hero, Aurora Gradient, Grid Pattern, Floating Cards

**Design 연결**:
- design.md §9: Hero 구조 (padding responsive)
- design.md §10: Aurora Gradient (135도), Grid Pattern (SVG), Floating Cards

**작업 내용**:
```
1. src/components/hero/AuroraGradient.tsx
   - linear-gradient(135deg, #0d47a1 0%, #5e35b1 50%, #0277bd 100%)

2. src/components/hero/GridPattern.tsx
   - SVG 패턴, opacity 0.08

3. src/components/hero/FloatingCards.tsx
   - Q/A 카드 예시
   - position: absolute, right 5%, top 50%
   - 모바일: display none

4. src/components/hero/HeroSection.tsx
   - 배경 + 그리드 + 텍스트 + CTA 버튼 2개
   - 반응형 텍스트 크기
```

**생성 파일**:
- `src/components/hero/HeroSection.tsx` (~150줄)
- `src/components/hero/AuroraGradient.tsx` (~50줄)
- `src/components/hero/GridPattern.tsx` (~40줄)
- `src/components/hero/FloatingCards.tsx` (~100줄)

**검증 방법**:
```bash
npm run dev
# Hero 섹션 표시
# 그라데이션 확인
# 데스크톱: 플로팅 카드 표시
# 모바일 (375px): 플로팅 카드 숨김
```

**의존성**: P2 완료

---

### Task 3-4: 메인 페이지 - Process & Values 섹션

**ID**: `P3-T4`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Screen 1: Main Page (Process Section, Value Propositions)
- design.md §4: 메인 페이지 레이아웃

**Design 연결**:
- design.md §4: 3단계 프로세스, 3개 가치

**작업 내용**:
```
1. src/pages/MainPage.tsx에 추가:
   - ProcessSection: 3단계 (아이콘 번호 + 제목 + 설명)
   - ValuesSection: 3개 가치 (아이콘 + 제목 + 설명)

2. 3단계: 질문작성 → 관리자확인 → 답변확인
3. 3개 가치: 빠른 답변, 신뢰성, 언제 어디서나
4. 그라데이션 배경 (각 단계별)
```

**생성 파일**:
- `src/pages/MainPage.tsx` (~300줄 총합)
  또는
- `src/pages/MainPage.tsx` (~150줄) + 섹션 컴포넌트 분리

**검증 방법**:
```bash
npm run dev
# 메인 페이지 전체 스크롤 확인
# 3단계 표시
# 3개 가치 표시
```

**의존성**: P3-T3 완료

---

### Task 3-5: 질문 리스트 페이지 - 레이아웃

**ID**: `P3-T5`  
**상태**: 미작업  
**담당**: 프론트연트  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Screen 2: Question List Page
- design.md §4, §11: 질문 리스트 레이아웃

**Design 연결**:
- design.md §11: QuestionCard 구조

**작업 내용**:
```
1. src/pages/QuestionListPage.tsx 생성
2. 구조:
   - Header
   - PageHeader (제목 + CTA)
   - FilterBar (관리자만) - Task 3-7에서
   - QuestionCard 리스트
   - "더보기" 버튼
   - EmptyState (조건부)
   - Footer

3. useAuth(): role에 따라 필터 표시 여부 결정
```

**생성 파일**:
- `src/pages/QuestionListPage.tsx` (~200줄)

**검증 방법**:
```bash
npm run dev
# /questions로 이동
# 질문 목록 표시
```

**의존성**: P3-T1, P3-T2 완료

---

### Task 3-6: QuestionCard 컴포넌트

**ID**: `P3-T6`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- design.md §11: QuestionCard 구조
- spec.md §Read Questions: 필드

**Design 연결**:
- design.md §11: 좌측 4px border (상태색), 제목, 날짜, 상태 배지

**작업 내용**:
```
1. src/components/common/QuestionCard.tsx 생성
2. Props:
   - question: Question
   - onClick?: () => void
   - showAuthor?: boolean (관리자용)
   - actions?: ReactNode (수정/삭제 버튼)

3. 표시 필드:
   - 제목 (16px bold navy)
   - 작성일 (회원), 작성자 (관리자)
   - 상태 배지
   - 미리보기 텍스트 (선택)

4. 호버: 그림자 강화
```

**생성 파일**:
- `src/components/common/QuestionCard.tsx` (~120줄)

**검증 방법**:
```bash
npm run dev
# 질문 리스트에서 카드 표시
# 호버 상태 확인
```

**의존성**: P2-T7 (Badge) 완료

---

### Task 3-7: 질문 리스트 페이지 - 필터 바 (관리자)

**ID**: `P3-T7`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Filter: "답변 필요", "답변 완료" (design에서는 4개: 전체/대기/완료/닫힘)
- design.md §11: FilterBar (관리자만)

**Design 연결**:
- design.md §11: 4개 필터 버튼 (전체/대기중/답변완료/닫힘)

**작업 내용**:
```
1. src/components/common/FilterBar.tsx 생성
2. Props:
   - status: 'all' | 'pending' | 'answered' | 'closed'
   - onStatusChange: (status) => void

3. 4개 버튼:
   - "전체" (선택시 navy bg)
   - "대기중" (주황 배경)
   - "답변완료" (초록 배경)
   - "닫힘" (회색 배경)

4. QuestionListPage에서:
   - useAuth().role === 'admin'이면 FilterBar 표시
   - 필터 상태로 Mock 질문 필터링
```

**생성 파일**:
- `src/components/common/FilterBar.tsx` (~80줄)

**수정 파일**:
- `src/pages/QuestionListPage.tsx`: FilterBar 추가, 필터링 로직

**검증 방법**:
```bash
npm run dev
# 관리자 로그인 상태
# FilterBar 표시 확인
# 각 필터 클릭 시 목록 변경
```

**의존성**: P3-T5, P3-T6 완료

---

### Task 3-8: 질문 상세 페이지 - 레이아웃

**ID**: `P3-T8`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Screen 3: Question Detail Page
- design.md §4, §13: 질문 상세 레이아웃

**Design 연결**:
- design.md §13: 질문 + 답변 섹션

**작업 내용**:
```
1. src/pages/QuestionDetailPage.tsx 생성
2. 구조:
   - Header
   - Breadcrumb (목록 / 질문 제목)
   - QuestionCard (읽기 전용)
   - AnswerSection (조건부)
   - Footer

3. 회원/관리자 다른 UI (Task 3-9, 3-10에서)
```

**생성 파일**:
- `src/pages/QuestionDetailPage.tsx` (~200줄)
- `src/components/common/PageBreadcrumb.tsx` (~50줄)

**검증 방법**:
```bash
npm run dev
# /questions/[id]로 이동
# 질문 상세 표시
```

**의존성**: P3-T6 완료

---

### Task 3-9: 질문 상세 페이지 - 회원 뷰

**ID**: `P3-T9`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Screen 3 §회원 시점: 수정/삭제 (미답변만), 답변 조회
- design.md §13 §회원 시점

**Design 연결**:
- design.md §13: 미답변 시 EmptyState, 답변 완료 시 답변 표시

**작업 내용**:
```
1. QuestionDetailPage에서 useAuth() 확인
2. role === 'member'일 때:
   - 수정/삭제 버튼 표시 (status === 'pending'만)
   - AnswerSection: EmptyState 표시 (답변 없을 때)
   - 답변 있으면 그 내용 표시 (읽기 전용)

3. 다른 회원 질문 접근: 403 처리 (Task 3-11에서)
```

**수정 파일**:
- `src/pages/QuestionDetailPage.tsx`: 회원 로직 추가

**검증 방법**:
```bash
npm run dev
# 회원 로그인 상태
# 자신의 질문 상세 보기
# 미답변: 수정/삭제 버튼 표시
# 답변 완료: 버튼 숨김
```

**의존성**: P3-T8 완료, P3-T2 (useAuth)

---

### Task 3-10: 질문 상세 페이지 - 관리자 뷰

**ID**: `P3-T10`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Screen 3 §관리자 시점: 답변 작성/수정, 질문 삭제
- design.md §13 §관리자 시점

**Design 연결**:
- design.md §13: 미답변 시 폼, 답변 완료 시 수정/삭제

**작업 내용**:
```
1. QuestionDetailPage에서 role === 'admin'일 때:
   - 답변 섹션: 미답변 → AnswerForm (textarea + 저장/취소)
   - 답변 있으면 → 답변 내용 + 수정/삭제 버튼
   - 질문 삭제 버튼 (항상)

2. AnswerForm 컴포넌트 (폼만, 저장은 나중)
```

**생성 파일**:
- `src/components/AnswerForm.tsx` (~100줄, 향후 Supabase 연결)

**수정 파일**:
- `src/pages/QuestionDetailPage.tsx`: 관리자 로직 추가

**검증 방법**:
```bash
npm run dev
# 관리자 로그인 상태
# 질문 상세 보기
# 미답변: 폼 표시
# 답변 완료: 수정/삭제 버튼 표시
```

**의존성**: P3-T8, P3-T2 (useAuth), P2-T6 (Textarea)

---

### Task 3-11: 권한 검증 - 미인증/미인가 상태

**ID**: `P3-T11`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Access Control: 401/403
- design.md §14: UnauthorizedState

**Design 연결**:
- design.md §14: 403 화면 설계

**작업 내용**:
```
1. 비회원 (null): 보호 페이지 → 로그인 페이지 리다이렉트
2. 회원이 타인 질문 접근 → 403 UnauthorizedState
3. ProtectedRoute 컴포넌트 (향후 Router에 통합):
   - isAuthenticated? <children> : <LoginPage />

4. 질문 상세: 다른 회원 질문 ID 접근 → UnauthorizedState
   - Mock: created_by !== current user.id → show 403
```

**생성 파일**:
- `src/components/layout/ProtectedRoute.tsx` (~30줄)

**수정 파일**:
- `src/pages/QuestionDetailPage.tsx`: 권한 검증 로직 추가

**검증 방법**:
```bash
npm run dev
# 비회원: /questions 접근 → 로그인 유도
# 회원 A: 회원 B의 질문 직접 접근 → 403
```

**의존성**: P3-T8, P3-T2 (useAuth)

---

### Task 3-12: 라우팅 구조 설정

**ID**: `P3-T12`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Screen 1-3: 3개 화면
- implementation-plan.md §2: 페이지 계층도

**Design 연결**:
- design.md §5: 화면 간 이동

**작업 내용**:
```
1. npm install react-router-dom
2. src/App.tsx에 Router 설정:
   / (MainPage)
   /questions (QuestionListPage)
   /questions/:id (QuestionDetailPage)
   /login (LoginPage - Mock)

3. Router는 아직 Client-side만 (Supabase는 Phase 5)
```

**수정 파일**:
- `src/App.tsx`: React Router 설정
- 페이지 임포트

**검증 방법**:
```bash
npm run dev
# URL 직접 접근으로 페이지 이동 확인
# 새로고침 후 현재 페이지 유지 확인
```

**의존성**: P3-T3, P3-T5, P3-T8 (페이지들)

---

## Phase 4: Claude Design 동기화와 UI 수정 (4 Task)

### Task 4-1: 구현 코드 구조 검사

**ID**: `P4-T1`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- implementation-plan.md §4-5: 컴포넌트 구조

**Design 연결**:
- design.md §2-3: 컴포넌트 목록

**작업 내용**:
```
1. Phase 3까지 생성된 컴포넌트 목록 작성:
   ✓ Header, Footer
   ✓ Button, Input, Textarea, Badge
   ✓ LoadingState, EmptyState, ErrorState, UnauthorizedState
   ✓ HeroSection, GridPattern, FloatingCards
   ✓ QuestionCard, FilterBar
   ✓ PageBreadcrumb, AnswerForm
   ✓ ProtectedRoute

2. 각 컴포넌트가 design.md의 규칙을 따르는지 검사:
   - 색상: 변수 사용 ✓
   - 크기: 변수 사용 ✓
   - 타이포: design.md §16 따름 ✓
   - 반응형: breakpoint 적용 ✓
   - 접근성: prefers-reduced-motion ✓
```

**검증 방법**:
```bash
# 수동 검사: 브라우저에서 각 상태 시각 확인
npm run dev
# 개발자 도구: 각 요소의 계산된 스타일이 변수를 사용하는지 확인
```

**의존성**: Phase 3 완료

---

### Task 4-2: 실제 컴포넌트와 디자인 토큰 동기화

**ID**: `P4-T2`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- design.md §15-19: 모든 토큰 정의

**Design 연결**:
- design.md §3: "각 섹션에서 가능하면 관련 spec 요구사항 ID를 연결"

**작업 내용**:
```
1. 색상 토큰 검증:
   - Primary Navy: #0d47a1 ✓
   - Status Pending: #ff9800 ✓
   - Status Completed: #4caf50 ✓
   - Text Body: #4b5563 ✓

2. 타이포그래피 검증:
   - Hero Title: 48px (D) / 32px (M) ✓
   - Page Title: 28px ✓
   - Card Title: 24px / 16px ✓
   - Body: 14px ✓

3. 간격 검증:
   - Padding: 16px (M) / 32px (T) / 48px (D) ✓
   - Button height: 44px ✓
   - Border radius: 6px (버튼), 8px (카드) ✓

4. 수정 사항이 있으면 variables.css와 컴포넌트 동기화
```

**수정 파일**:
- `src/styles/variables.css` (필요시)
- 컴포넌트들 (필요시)

**검증 방법**:
```bash
npm run dev
# Design.md와 브라우저 시각 1:1 비교
```

**의존성**: P4-T1 완료

---

### Task 4-3: 예상된 Claude Design과 구현 비교

**ID**: `P4-T3`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- design.md §24: 구현 후 시각 검증 항목

**Design 연결**:
- design.md 전체

**작업 내용**:
```
1. 브라우저에서 각 화면을 열기:
   - http://localhost:5173 (메인)
   - http://localhost:5173/questions (리스트)
   - http://localhost:5173/questions/1 (상세)

2. design.md §24 체크리스트 검증:
   - 색상 (Aurora Gradient, Status Colors, Text)
   - 타이포그래피 (크기, weight, line-height)
   - 레이아웃 (최대 너비, padding)
   - 상태 화면 (Loading, Empty, Error, Unauthorized)
   - 모바일 (375px 테스트)
   - 접근성 (포커스, prefers-reduced-motion)

3. CRITICAL 또는 HIGH 시각 문제 목록 작성
```

**검증 방법**:
```bash
npm run dev
# DevTools로 각 화면 스크린샷 저장
# design.md와 시각 1:1 비교
```

**의존성**: P4-T2 완료

---

### Task 4-4: 시각 문제 수정 및 회귀 검증

**ID**: `P4-T4`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- design.md §24: "구현 후 시각 검증"

**Design 연결**:
- design.md 전체

**작업 내용**:
```
1. P4-T3에서 식별된 문제 수정
2. 각 문제별로 파일 위치와 수정 내용 기록
3. 3가지 유형:
   - CRITICAL: 레이아웃 깨짐, 색상 오류
   - HIGH: 타이포 크기/weight 불일치
   - MEDIUM: 간격 미세 조정

4. 수정 후 전체 페이지 회귀 검증:
   - 모바일/태블릿/데스크톱
   - 라이트/다크 모드 (prefers-color-scheme)
   - prefers-reduced-motion
```

**수정 파일**:
- 식별된 모든 컴포넌트 및 스타일

**검증 방법**:
```bash
npm run dev
# 모든 화면 다시 검증
# 브라우저 자동화로 스크린샷 비교 (선택)
```

**의존성**: P4-T3 완료

---

## Phase 5: Supabase 기반 (6 Task)

### Task 5-1: Supabase 프로젝트 초기화 및 클라이언트 설정

**ID**: `P5-T1`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1시간

**요구사항**:
- spec.md §Data Entities: User, Question, Answer
- implementation-plan.md §10: Supabase 스키마

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. Supabase 프로젝트 생성 (supabase.com)
2. npm install @supabase/supabase-js
3. src/db/supabase.ts 생성:
   - createClient(URL, ANON_KEY)
   - .env.local에 저장

4. src/db/queries.ts 기본 구조:
   - export function fetchQuestions()
   - export function fetchQuestion(id)
   - export function createQuestion()
```

**생성 파일**:
- `src/db/supabase.ts` (~30줄)
- `src/db/queries.ts` (~200줄, 초기)
- `.env.local` (Supabase key)

**검증 방법**:
```bash
npm run type-check
# 에러 없음
```

**의존성**: Phase 4 완료

---

### Task 5-2: Supabase 데이터베이스 마이그레이션

**ID**: `P5-T2`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Data Entities
- implementation-plan.md §10: 스키마 SQL

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. Supabase Dashboard에서 SQL Editor 열기
2. 다음 스키마 생성:
   - profiles (id PK, email UK, name, role)
   - questions (id PK, created_by FK, title, content, status, created_at)
   - answers (id PK, question_id UK FK, created_by FK, content, created_at)

3. Index 생성:
   - questions(created_by, status)
   - answers(question_id)

4. 파일 위치: migration 스크립트 또는 SQL 문서화
```

**생성 파일**:
- `docs/migrations/001-initial-schema.sql`

**검증 방법**:
```bash
# Supabase Dashboard에서 테이블 확인
# psql -c "\\dt" (로컬 Supabase인 경우)
```

**의존성**: P5-T1 완료

---

### Task 5-3: RLS (Row-Level Security) 정책 적용

**ID**: `P5-T3`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Access Control: 회원/관리자 권한
- implementation-plan.md §12: RLS 정책 SQL

**Design 연결**:
- design.md §6: 역할별 접근 규칙

**작업 내용**:
```
1. Supabase RLS 활성화: ALTER TABLE ... ENABLE ROW LEVEL SECURITY
2. 각 테이블별 정책:
   - profiles: 자신 조회 + 관리자 모두 조회
   - questions: 자신 조회 + 관리자 모두 조회
   - answers: 누구나 조회 + 관리자만 쓰기

3. 정책 파일: docs/rls-policies.sql
```

**생성 파일**:
- `docs/rls-policies.sql` (SQL)

**검증 방법**:
```bash
# Supabase Dashboard: Authentication → Policies 확인
# 테스트: 비회원/회원/관리자 계정으로 쿼리
```

**의존성**: P5-T2 완료

---

### Task 5-4: Mock 데이터와 Supabase 쿼리 연결

**ID**: `P5-T4`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- implementation-plan.md §15: Mock Data → Supabase 전환

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. useQuestions() 훅 수정:
   - Mock: return MOCK_QUESTIONS
   - Supabase: return await queries.fetchQuestions()

2. 환경 변수: VITE_USE_MOCK_DATA (개발/프로덕션 전환)

3. 비동기 처리:
   - useState + useEffect
   - loading, error 상태 관리

4. 권한 검증:
   - useAuth().user.id로 필터링
```

**수정 파일**:
- `src/hooks/useQuestions.ts`: Supabase 쿼리 추가
- `src/db/queries.ts`: 실제 쿼리 함수

**검증 방법**:
```bash
npm run dev
# 목록 페이지에서 Supabase 데이터 표시 확인
# DevTools Network: SELECT 쿼리 확인
```

**의존성**: P5-T1, P5-T3 완료

---

### Task 5-5: Auth Context와 Supabase 세션 통합

**ID**: `P5-T5`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Login: 인증
- implementation-plan.md §9: AuthContext

**Design 연결**:
- design.md §7: Header (로그인/로그아웃)

**작업 내용**:
```
1. src/context/AuthContext.tsx 수정:
   - Mock: 현재 구현 유지
   - Supabase: await supabase.auth.getSession()

2. 로그인 흐름:
   - supabase.auth.signInWithPassword(email, password)
   - 세션 저장 → useAuth()에서 접근

3. 로그아웃:
   - supabase.auth.signOut()

4. 역할 판별:
   - profiles 테이블에서 role 조회
```

**수정 파일**:
- `src/context/AuthContext.tsx`
- `src/hooks/useAuth.ts` (필요시)

**검증 방법**:
```bash
npm run dev
# 로그인 후 Header에서 사용자 이름 표시
# 로그아웃 클릭 시 null로 초기화
```

**의존성**: P5-T1, P5-T4 완료

---

### Task 5-6: 오류 처리 및 권한 검증 완성

**ID**: `P5-T6`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Error Handling: 권한 오류 (403), 인증 오류 (401)
- design.md §14: 권한 없는 접근 화면

**Design 연결**:
- design.md §14: UnauthorizedState 컴포넌트

**작업 내용**:
```
1. 에러 처리:
   - Supabase 403 (RLS) → UnauthorizedState
   - Supabase 401 (토큰 만료) → 로그인 페이지
   - Network error → ErrorState

2. 권한 검증:
   - 질문 상세: question.created_by === user.id || role === 'admin'
   - 답변 작성: role === 'admin'

3. Try-catch + 에러 메시지 표시
```

**수정 파일**:
- `src/db/queries.ts`: 에러 타입
- 컴포넌트들: 에러 경계 추가

**검증 방법**:
```bash
npm run dev
# RLS 위반 시뮬레이션
# 다른 회원 질문 접근 → 403
```

**의존성**: P5-T4, P5-T5 완료

---

## Phase 6: 회원 기능 (6 Task)

### Task 6-1: 회원 CRUD - 질문 작성

**ID**: `P6-T1`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Create Question: 제목, 내용 (검증)
- spec.md §Input Validation: 공백 제거, 길이 제한

**Design 연결**:
- design.md §5: "질문 작성" CTA
- design.md §2: 미구현 화면 "질문 작성 폼" (향후 추가)

**작업 내용**:
```
1. QuestionCreatePage (새로운 페이지) 또는 Modal
2. 폼: 제목 (100자), 내용 (5000자)
3. 제출 시:
   - 검증: validateQuestion()
   - Supabase: INSERT into questions
   - 리다이렉트: /questions/:id

4. 로딩/에러 상태
```

**생성 파일**:
- `src/pages/QuestionCreatePage.tsx` (~150줄)
  또는
- `src/components/QuestionForm.tsx` (모달용)

**검증 방법**:
```bash
npm run dev
# 질문 작성 폼 제출
# Supabase: questions 테이블에 행 추가됨
```

**의존성**: P5-T4, P5-T5 완료

---

### Task 6-2: 회원 CRUD - 질문 수정/삭제

**ID**: `P6-T2`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Update/Delete Question: 미답변(pending)만 가능

**Design 연결**:
- design.md §13: 수정/삭제 버튼 (회원, 미답변만)

**작업 내용**:
```
1. QuestionDetailPage에서:
   - status === 'pending' && created_by === user.id일 때만 버튼 표시

2. 수정:
   - 기존 질문 로드
   - 폼에서 수정
   - UPDATE questions SET ...

3. 삭제:
   - 확인 대화
   - DELETE questions WHERE id = ...
   - 목록으로 리다이렉트
```

**수정 파일**:
- `src/pages/QuestionDetailPage.tsx`: 수정/삭제 로직
- `src/db/queries.ts`: updateQuestion, deleteQuestion

**검증 방법**:
```bash
npm run dev
# 미답변 질문: 수정/삭제 버튼 표시
# 답변 완료: 버튼 숨김
# 삭제 클릭 → 목록으로 이동
```

**의존성**: P6-T1 완료

---

### Task 6-3: 회원 목록 - 자신의 질문만 조회

**ID**: `P6-T3`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1시간

**요구사항**:
- spec.md §Read Questions: 회원은 자신의 질문만
- design.md §11: 회원 목록

**Design 연결**:
- design.md §6: 역할에 따른 다른 UI

**작업 내용**:
```
1. useQuestions() 수정:
   - role === 'member': WHERE created_by = user.id
   - role === 'admin': 모든 질문 (Task 6-4)

2. 이미 Mock에서 구현됨, Supabase 쿼리만 수정
```

**수정 파일**:
- `src/db/queries.ts`: fetchQuestions에 user.id 필터 추가

**검증 방법**:
```bash
npm run dev
# 회원 로그인 → 자신의 질문만 표시
# 관리자 로그인 → 모든 질문 표시
```

**의존성**: P5-T4 완료

---

### Task 6-4: 관리자 목록 - 모든 질문 + 필터링

**ID**: `P6-T4`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Filter: 답변 상태별 필터
- design.md §11: 관리자 필터 바

**Design 연결**:
- design.md §11: FilterBar (관리자용)

**작업 내용**:
```
1. FilterBar에서 상태 선택 시 즉시 필터링
2. 쿼리: WHERE status = 'pending' (또는 'answered' 등)
3. URL 파라미터: ?status=pending (선택)
```

**수정 파일**:
- `src/pages/QuestionListPage.tsx`: 필터 상태 관리
- `src/db/queries.ts`: WHERE 절 추가

**검증 방법**:
```bash
npm run dev
# 관리자 로그인
# FilterBar에서 필터 클릭 → 목록 즉시 변경
```

**의존성**: P6-T3 완료

---

### Task 6-5: 회원 기능 통합 테스트

**ID**: `P6-T5`  
**상태**: 미작업  
**담당**: QA  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Success Criteria: 기능 테스트

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. 사용자 여정 테스트 (회원):
   ✓ 로그인 → 내 질문 목록
   ✓ 질문 작성 → 목록에 표시
   ✓ 질문 수정 (미답변만)
   ✓ 질문 삭제
   ✓ 질문 상세 → 답변 확인

2. 에러 처리:
   ✓ 빈 목록 → EmptyState
   ✓ 로딩 중 → LoadingState
   ✓ 권한 없음 → 403
```

**검증 방법**:
```bash
npm run test
# 또는 수동 E2E 테스트 (Cypress)
```

**의존성**: Phase 6 완료

---

### Task 6-6: 회원 기능 - 답변 확인

**ID**: `P6-T6`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- spec.md §Read Answers: 회원은 자신의 질문에 대한 답변만

**Design 연결**:
- design.md §13: 회원 상세 뷰

**작업 내용**:
```
1. QuestionDetailPage (회원 뷰):
   - 미답변: EmptyState ("아직 답변이 없습니다")
   - 답변 완료: 답변 내용 표시 (읽기 전용)

2. 이미 UI 구현됨, Supabase 쿼리만 연결
```

**수정 파일**:
- `src/components/AnswerSection.tsx`: fetchAnswers 호출

**검증 방법**:
```bash
npm run dev
# 답변 있는 질문 → 답변 내용 표시
# 답변 없는 질문 → EmptyState
```

**의존성**: P5-T4 완료

---

## Phase 7: 관리자 기능 (5 Task)

### Task 7-1: 관리자 - 답변 작성

**ID**: `P7-T1`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Create Answer: 관리자만, 미답변 질문만
- spec.md §Input Validation: 내용 검증

**Design 연결**:
- design.md §13: 관리자 상세 뷰 (미답변 폼)

**작업 내용**:
```
1. QuestionDetailPage (관리자 뷰):
   - 미답변 (status='pending'): AnswerForm 표시
   - 답변 완료: 답변 내용 + 수정/삭제 버튼

2. AnswerForm 구현:
   - Textarea (5000자)
   - "저장" 버튼
   - INSERT into answers
   - questions status를 'answered'로 업데이트

3. 동시성 처리: 낙관적 업데이트 (선택)
```

**수정 파일**:
- `src/components/AnswerForm.tsx`: 실제 제출 로직
- `src/db/queries.ts`: createAnswer, updateQuestionStatus

**검증 방법**:
```bash
npm run dev
# 관리자 로그인
# 미답변 질문 → 폼 표시
# 답변 작성 → 즉시 표시
```

**의존성**: P5-T4, P5-T5 완료

---

### Task 7-2: 관리자 - 답변 수정/삭제

**ID**: `P7-T2`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Update/Delete Answer: 자신의 답변만

**Design 연결**:
- design.md §13: 관리자 상세 뷰 (수정/삭제)

**작업 내용**:
```
1. 답변 완료 상태:
   - 답변 내용 + 수정/삭제 버튼
   - created_by === user.id일 때만

2. 수정:
   - 모달 또는 인라인 폼
   - UPDATE answers

3. 삭제:
   - questions status를 'pending'으로 되돌림
   - DELETE answers
```

**수정 파일**:
- `src/pages/QuestionDetailPage.tsx`: 수정/삭제 UI
- `src/db/queries.ts`: updateAnswer, deleteAnswer

**검증 방법**:
```bash
npm run dev
# 관리자: 자신의 답변에 수정/삭제 버튼 표시
# 다른 관리자 답변: 버튼 없음
```

**의존성**: P7-T1 완료

---

### Task 7-3: 관리자 - 질문 삭제

**ID**: `P7-T3`  
**상태**: 미작업  
**담당**: 풀스택  
**예상 시간**: 1시간

**요구사항**:
- spec.md §Delete Question (Admin): 모든 상태의 질문 삭제 가능

**Design 연결**:
- design.md §13: 관리자 상세 뷰 (항상 삭제 버튼)

**작업 내용**:
```
1. QuestionDetailPage (관리자 뷰):
   - 항상 삭제 버튼 표시 (답변 여부 상관없음)

2. 삭제 시:
   - 확인 대화
   - 관련 답변도 자동 삭제 (ON DELETE CASCADE)
   - 목록으로 리다이렉트
```

**수정 파일**:
- `src/pages/QuestionDetailPage.tsx`: 관리자 삭제 버튼
- `src/db/queries.ts`: deleteQuestion (관리자용)

**검증 방법**:
```bash
npm run dev
# 관리자: 모든 질문에 삭제 버튼
# 삭제 → 목록으로 이동
```

**의존성**: P7-T1 완료

---

### Task 7-4: 관리자 기능 통합 테스트

**ID**: `P7-T4`  
**상태**: 미작업  
**담당**: QA  
**예상 시간**: 1.5시간

**요구사항**:
- spec.md §Success Criteria: 관리자 기능 테스트

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. 관리자 여정:
   ✓ 로그인 → 모든 질문 목록
   ✓ 필터: 대기/완료/닫힘
   ✓ 질문 상세 → 답변 작성
   ✓ 답변 수정/삭제
   ✓ 질문 삭제 (항상 가능)

2. 권한 검증:
   ✓ 회원이 답변 작성 시도 → 불가
   ✓ 비회원 접근 → 로그인
```

**검증 방법**:
```bash
npm run test
# 또는 수동 E2E 테스트
```

**의존성**: Phase 7 완료

---

### Task 7-5: 역할 전환 (Mock 사용자) 및 관리자 상태 검증

**ID**: `P7-T5`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- implementation-plan.md §2: useAuth().role

**Design 연결**:
- design.md §6: 역할별 UI

**작업 내용**:
```
1. 개발 중 역할 전환 기능 (DevTools에서 수동 설정)
2. 또는 쿼리 파라미터: ?user=admin / ?user=member
3. Supabase 연결 후에는 실제 auth로 전환

4. 모든 조건부 렌더링 검증:
   - Header 네비게이션
   - 질문 카드 (작성자 표시 여부)
   - 질문 상세 (버튼 표시/숨김)
```

**검증 방법**:
```bash
npm run dev
# React DevTools: AuthContext 값 변경
# 각 역할별 UI 확인
```

**의존성**: Phase 7 완료

---

## Phase 8: 테스트와 최종 검증 (2 Task)

### Task 8-1: 유닛 테스트 및 컴포넌트 테스트

**ID**: `P8-T1`  
**상태**: 미작업  
**담당**: QA  
**예상 시간**: 2시간

**요구사항**:
- implementation-plan.md §14: 테스트 전략

**Design 연결**:
- 해당 없음

**작업 내용**:
```
1. 유닛 테스트:
   - validateQuestion()
   - Badge 컴포넌트 (3가지 상태)
   - Button 컴포넌트 (variant, disabled)

2. 컴포넌트 테스트:
   - QuestionCard props 검증
   - FilterBar 상태 변경
   - Input error 표시

3. Hook 테스트:
   - useResponsive (matchMedia mock)
   - useAuth (Context mock)
```

**생성 파일**:
- `src/**/*.test.ts(x)` 파일들

**검증 방법**:
```bash
npm run test
# 커버리지 리포트 생성
```

**의존성**: Phase 7 완료

---

### Task 8-2: E2E 테스트 및 최종 회귀 검증

**ID**: `P8-T2`  
**상태**: 미작업  
**담당**: QA  
**예상 시간**: 2시간

**요구사항**:
- spec.md §Success Criteria: 전체 기능 검증

**Design 연결**:
- design.md §24: 시각 검증 체크리스트

**작업 내용**:
```
1. E2E 시나리오 (Cypress 또는 Playwright):
   ✓ 회원가입 → 로그인 → 질문 작성 → 목록 조회
   ✓ 관리자 로그인 → 답변 작성
   ✓ 회원: 타인 질문 접근 → 403

2. 성능 검증:
   - LCP < 2.5초
   - 모바일 성능

3. 접근성:
   - 키보드만 사용
   - 색상 대비
   - 스크린 리더

4. 브라우저 호환성:
   - Chrome 최신
   - Safari 최신
   - Firefox 최신
```

**생성 파일**:
- `e2e/scenarios.cy.ts` (Cypress)
  또는
- `e2e/scenarios.spec.ts` (Playwright)

**검증 방법**:
```bash
npm run build
npm run test:e2e
# 또는 npm run test:e2e:ui
```

**의존성**: Phase 8-1 완료

---

## 의존성 그래프

```
P1-T1 → P1-T2 → P1-T3
        ↓
P2-T1 → P2-T2 → P2-T3 → P2-T4 → P2-T5 → P2-T6 → P2-T7 → P2-T8 → P2-T9 → P2-T10 → P2-T11 → P2-T12
                                                                        ↓
        P3-T1 → P3-T2 → P3-T3 → P3-T4 → P3-T5 → P3-T6 → P3-T7 → P3-T8 → P3-T9 → P3-T10 → P3-T11 → P3-T12
                                                        ↓
        P4-T1 → P4-T2 → P4-T3 → P4-T4
                (Design Sync 검증)
                ↓
        P5-T1 → P5-T2 → P5-T3 → P5-T4 → P5-T5 → P5-T6
                                        ↓
        P6-T1 → P6-T2 → P6-T3 → P6-T4 → P6-T5 → P6-T6
                                        ↓
        P7-T1 → P7-T2 → P7-T3 → P7-T4 → P7-T5
                                        ↓
        P8-T1 → P8-T2
```

---

## 요약

| Phase | Task 수 | 기간 | 핵심 산출물 | 검증 포인트 |
|-------|--------|------|-----------|-----------|
| **1** | 3 | 2일 | 프로젝트 초기화 | npm start 성공 |
| **2** | 12 | 5일 | 디자인 시스템 + 컴포넌트 | CSS 변수 적용, 각 컴포넌트 렌더링 |
| **3** | 12 | 5일 | 세 화면 + Mock Data | 브라우저 UI 검증, 반응형 375-1024px |
| **4** | 4 | 3일 | /design-sync 검증 + 수정 | design.md 일관성, CRITICAL 문제 해결 |
| **5** | 6 | 3일 | Supabase 통합 | DB 쿼리 성공, RLS 적용 |
| **6** | 6 | 3일 | 회원 CRUD 기능 | 목록/상세/작성/수정/삭제 동작 |
| **7** | 5 | 2.5일 | 관리자 답변 기능 | 답변 작성/수정/삭제, 필터링 |
| **8** | 2 | 2일 | 테스트 + 최종 검증 | 유닛/E2E 테스트 통과 |
| **총계** | 48 | 8주 |  |  |

**작성일**: 2025-08-29  
**상태**: Task 분해 완료  
**다음 단계**: Phase 1 시작 (npm init)

---

## Phase 4: Claude Design 동기화와 UI 수정 (4 Task)

### Task 4-1: 구현 코드 구조 검사

**ID**: `P4-T1`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1시간

**요구사항**:
- implementation-plan.md §4-5: 컴포넌트 구조

**Design 연결**:
- design.md §2-3: 컴포넌트 목록

**작업 내용**:
```
1. Phase 3까지 생성된 컴포넌트 목록 작성:
   ✓ Header, Footer
   ✓ Button, Input, Textarea, Badge
   ✓ LoadingState, EmptyState, ErrorState, UnauthorizedState
   ✓ HeroSection, GridPattern, FloatingCards
   ✓ QuestionCard, FilterBar
   ✓ PageBreadcrumb, AnswerForm
   ✓ ProtectedRoute

2. 각 컴포넌트가 design.md의 규칙을 따르는지 검사:
   - 색상: 변수 사용 ✓
   - 크기: 변수 사용 ✓
   - 타이포: design.md §16 따름 ✓
   - 반응형: breakpoint 적용 ✓
   - 접근성: prefers-reduced-motion ✓
```

**검증 방법**:
```bash
# 수동 검사: 브라우저에서 각 상태 시각 확인
npm run dev
# 개발자 도구: 각 요소의 계산된 스타일이 변수를 사용하는지 확인
```

**의존성**: Phase 3 완료

---

### Task 4-2: 실제 컴포넌트와 디자인 토큰 동기화

**ID**: `P4-T2`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- design.md §15-19: 모든 토큰 정의

**Design 연결**:
- design.md §3: "각 섹션에서 가능하면 관련 spec 요구사항 ID를 연결"

**작업 내용**:
```
1. 색상 토큰 검증:
   - Primary Navy: #0d47a1 ✓
   - Status Pending: #ff9800 ✓
   - Status Completed: #4caf50 ✓
   - Text Body: #4b5563 ✓

2. 타이포그래피 검증:
   - Hero Title: 48px (D) / 32px (M) ✓
   - Page Title: 28px ✓
   - Card Title: 24px / 16px ✓
   - Body: 14px ✓

3. 간격 검증:
   - Padding: 16px (M) / 32px (T) / 48px (D) ✓
   - Button height: 44px ✓
   - Border radius: 6px (버튼), 8px (카드) ✓

4. 수정 사항이 있으면 variables.css와 컴포넌트 동기화
```

**수정 파일**:
- `src/styles/variables.css` (필요시)
- 컴포넌트들 (필요시)

**검증 방법**:
```bash
npm run dev
# Design.md와 브라우저 시각 1:1 비교
```

**의존성**: P4-T1 완료

---

### Task 4-3: 예상된 Claude Design과 구현 비교

**ID**: `P4-T3`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 1.5시간

**요구사항**:
- design.md §24: 구현 후 시각 검증 항목

**Design 연결**:
- design.md 전체

**작업 내용**:
```
1. 브라우저에서 각 화면을 열기:
   - http://localhost:5173 (메인)
   - http://localhost:5173/questions (리스트)
   - http://localhost:5173/questions/1 (상세)

2. design.md §24 체크리스트 검증:
   - 색상 (Aurora Gradient, Status Colors, Text)
   - 타이포그래피 (크기, weight, line-height)
   - 레이아웃 (최대 너비, padding)
   - 상태 화면 (Loading, Empty, Error, Unauthorized)
   - 모바일 (375px 테스트)
   - 접근성 (포커스, prefers-reduced-motion)

3. CRITICAL 또는 HIGH 시각 문제 목록 작성
```

**검증 방법**:
```bash
npm run dev
# DevTools로 각 화면 스크린샷 저장
# design.md와 시각 1:1 비교
```

**의존성**: P4-T2 완료

---

### Task 4-4: 시각 문제 수정 및 회귀 검증

**ID**: `P4-T4`  
**상태**: 미작업  
**담당**: 프론트엔드  
**예상 시간**: 2시간

**요구사항**:
- design.md §24: "구현 후 시각 검증"

**Design 연결**:
- design.md 전체

**작업 