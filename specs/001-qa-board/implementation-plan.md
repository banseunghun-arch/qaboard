# QANOW 구현 계획

**프로젝트**: QANOW 질의응답 게시판  
**기술 스택**: React + Vite + TypeScript + Supabase  
**상태**: 구현 계획 수립  
**작성일**: 2025-08-29

---

## 1. 전체 디렉터리 구조

```
qaboard/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx          # 모든 화면에서 동일
│   │   │   ├── Footer.tsx          # 모든 화면에서 동일
│   │   │   ├── Button.tsx          # Primary / Secondary / Danger
│   │   │   ├── Input.tsx           # Text input + validation
│   │   │   ├── Textarea.tsx        # Content textarea
│   │   │   ├── Badge.tsx           # Status badge (pending/completed/closed)
│   │   │   ├── QuestionCard.tsx    # 리스트/상세에서 재사용
│   │   │   ├── LoadingState.tsx    # 스피너 + "로딩 중..."
│   │   │   ├── EmptyState.tsx      # 파란 배경 메시지 + CTA
│   │   │   ├── ErrorState.tsx      # 빨강 배경 에러 메시지
│   │   │   ├── UnauthorizedState.tsx # 403 화면
│   │   │   └── PageBreadcrumb.tsx  # 상세 페이지용
│   │   │
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx     # Aurora Gradient + Grid + Floating Cards
│   │   │   ├── AuroraGradient.tsx  # linear-gradient 로직
│   │   │   ├── GridPattern.tsx     # SVG 패턴
│   │   │   └── FloatingCard.tsx    # Q&A 카드 (데스크톱만)
│   │   │
│   │   └── layout/
│   │       ├── MainLayout.tsx      # Header + Content + Footer
│   │       └── DetailLayout.tsx    # Header + Breadcrumb + Content + Footer
│   │
│   ├── pages/
│   │   ├── MainPage.tsx            # Hero + Process + Values + Footer
│   │   ├── QuestionListPage.tsx    # (회원) 자신의 질문 목록
│   │   ├── QuestionDetailPage.tsx  # 질문 상세 + 답변 영역
│   │   │
│   │   └── admin/
│   │       ├── AdminListPage.tsx   # (관리자) 모든 질문 목록 + 필터
│   │       └── AdminDetailPage.tsx # (관리자) 질문 상세 + 답변 폼
│   │       (참고: 동일 URL, 역할에 따라 다른 컴포넌트 렌더링)
│   │
│   ├── hooks/
│   │   ├── useAuth.ts              # 인증 상태 (Context)
│   │   ├── useQuestions.ts         # 질문 목록 조회 (Mock → Supabase)
│   │   ├── useQuestion.ts          # 질문 상세 조회
│   │   ├── useAnswers.ts           # 답변 관리
│   │   ├── useValidation.ts        # 입력 검증
│   │   └── useResponsive.ts        # 미디어 쿼리 훅
│   │
│   ├── context/
│   │   └── AuthContext.tsx         # 로그인 상태 + 사용자 정보 + 역할
│   │
│   ├── db/
│   │   ├── supabase.ts             # Supabase 클라이언트 초기화
│   │   ├── queries.ts              # SELECT/INSERT/UPDATE 쿼리 함수
│   │   ├── subscriptions.ts        # 실시간 업데이트 (향후)
│   │   └── rls.md                  # RLS 정책 문서
│   │
│   ├── types/
│   │   ├── database.ts             # Supabase 스키마 타입
│   │   ├── models.ts               # User, Question, Answer 인터페이스
│   │   └── api.ts                  # API 응답 타입
│   │
│   ├── styles/
│   │   ├── variables.css           # CSS 변수 (색상, 타이포, 간격, breakpoint)
│   │   ├── base.css                # 초기화, 기본 스타일
│   │   ├── responsive.css          # 미디어 쿼리
│   │   └── motion.css              # prefers-reduced-motion
│   │
│   ├── utils/
│   │   ├── validation.ts           # 텍스트 길이, XSS 방지 등
│   │   ├── formatting.ts           # 날짜 형식, 텍스트 트림 등
│   │   ├── errors.ts               # 에러 코드/메시지
│   │   └── mock-data.ts            # Mock 데이터 (UI 검증용)
│   │
│   ├── App.tsx                     # 라우터 + AuthContext 제공자
│   ├── main.tsx                    # Vite 진입점
│   └── index.css                   # 전역 스타일 임포트
│
├── public/
│   └── index.html
│
├── .env.local                      # Supabase URL, Anon Key (로컬)
├── vite.config.ts
├── tsconfig.json
├── package.json
├── index.html
└── README.md
```

---

## 2. 페이지와 공통 컴포넌트 구조

### 페이지 계층도

```
App (라우터)
│
├─ MainPage
│  └─ MainLayout
│     ├─ Header
│     ├─ HeroSection (Aurora + Grid + FloatingCard)
│     ├─ ProcessSection (3단계)
│     ├─ ValuesSection (3개 가치)
│     └─ Footer
│
├─ QuestionListPage (회원)
│  └─ MainLayout
│     ├─ Header
│     ├─ PageHeader ("질문 목록" + CTA)
│     ├─ QuestionCardList
│     │  └─ QuestionCard[] (상태별 좌측 border)
│     ├─ "더보기" 버튼
│     ├─ EmptyState (조건부)
│     └─ Footer
│
├─ AdminListPage (관리자) - 동일 URL, useAuth().role으로 분기
│  └─ MainLayout
│     ├─ Header
│     ├─ FilterBar (상태 필터: 전체/대기중/완료/닫힘)
│     ├─ QuestionCardList (작성자 표시)
│     ├─ "더보기" 버튼
│     ├─ EmptyState
│     └─ Footer
│
├─ QuestionDetailPage (회원)
│  └─ DetailLayout
│     ├─ Header
│     ├─ Breadcrumb
│     ├─ QuestionCard (읽기 전용)
│     │  └─ 수정/삭제 버튼 (미답변만)
│     ├─ AnswerSection
│     │  └─ EmptyState ("아직 답변이 없습니다")
│     └─ Footer
│
└─ AdminDetailPage (관리자) - 동일 URL, useAuth().role으로 분기
   └─ DetailLayout
      ├─ Header
      ├─ Breadcrumb
      ├─ QuestionCard
      │  └─ 삭제 버튼 (항상)
      ├─ AnswerSection
      │  ├─ 미답변: AnswerForm (textarea + 저장/취소)
      │  └─ 답변 완료: 답변 내용 + 수정/삭제 버튼
      └─ Footer
```

### 공통 컴포넌트 (재사용)

| 컴포넌트 | Props | 상태 | 역할 |
|---------|-------|------|------|
| **Button** | variant (primary/secondary/danger), disabled, loading, children, onClick | hover, active, disabled, loading | CTA 및 액션 |
| **Input** | label, type, value, onChange, error, maxLength, placeholder | focus, error, filled | 텍스트 입력 |
| **Textarea** | label, value, onChange, error, maxLength, rows, placeholder | focus, error | 긴 텍스트 입력 |
| **Badge** | status (pending/completed/closed) | (상태별 색상) | 상태 표시 |
| **QuestionCard** | question, onClick, showAuthor?, actions? | (기본) | 질문 표시 |
| **LoadingState** | message? | (스피너 회전) | 로딩 표시 |
| **EmptyState** | title, description, action? | (파란 배경) | 빈 상태 |
| **ErrorState** | message, onRetry? | (빨강 배경) | 에러 표시 |
| **UnauthorizedState** | onNavigate | (경고 아이콘) | 403 상태 |

---

## 3. 디자인 토큰을 CSS 변수로 구현

### `src/styles/variables.css`

```css
:root {
  /* 색상 - Primary */
  --color-primary-navy: #0d47a1;
  --color-primary-violet: #7c4dff;
  --color-primary-blue: #0277bd;

  /* 색상 - Status */
  --color-status-pending: #ff9800;
  --color-status-completed: #4caf50;
  --color-status-closed: #9ca3af;
  --color-status-error: #ef4444;
  --color-status-info: #2196f3;

  /* 색상 - Neutral */
  --color-text-primary: #1f2937;
  --color-text-body: #4b5563;
  --color-text-secondary: #616161;
  --color-text-disabled: #9ca3af;
  
  --color-bg-page: #f8fafc;
  --color-bg-card: #ffffff;
  --color-border: #e5e7eb;

  /* 타이포그래피 */
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-hero-title: 48px;   /* 데스크톱 */
  --font-size-page-title: 28px;
  --font-size-card-title: 24px;
  --font-size-section-title: 18px;
  --font-size-body: 14px;
  --font-size-label: 13px;
  --font-size-caption: 12px;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-title: 1.2;
  --line-height-body: 1.6;
  --line-height-relaxed: 1.8;

  /* 간격 (Spacing Scale) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  --spacing-3xl: 48px;

  /* 컴포넌트 */
  --button-height: 44px;
  --button-padding: 12px 28px;
  --input-height: 44px;
  --input-padding: 12px;
  --border-radius-sm: 4px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;

  /* 그림자 */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);

  /* 반응형 Breakpoints */
  --breakpoint-mobile: 375px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --max-content-width: 1200px;
  --max-detail-width: 800px;

  /* 패딩 (반응형) */
  --padding-mobile: 16px;
  --padding-tablet: 32px;
  --padding-desktop: 48px;
}

/* 모바일 (375px) */
@media (max-width: 767px) {
  :root {
    --font-size-hero-title: 32px;
    --font-size-page-title: 24px;
    --padding-h: var(--padding-mobile);
  }
}

/* 태블릿 (768px) */
@media (min-width: 768px) and (max-width: 1023px) {
  :root {
    --font-size-hero-title: 40px;
    --padding-h: var(--padding-tablet);
  }
}

/* 데스크톱 (1024px+) */
@media (min-width: 1024px) {
  :root {
    --padding-h: var(--padding-desktop);
  }
}
```

### 사용 예시

```tsx
// Button.tsx
export const Button = ({ variant = 'primary', ...props }) => (
  <button
    style={{
      backgroundColor:
        variant === 'primary' ? 'var(--color-primary-navy)' :
        variant === 'danger' ? 'var(--color-status-error)' :
        'transparent',
      color: variant === 'primary' ? 'white' : 'var(--color-text-body)',
      height: 'var(--button-height)',
      padding: 'var(--button-padding)',
      borderRadius: 'var(--border-radius-md)',
      fontSize: 'var(--font-size-label)',
      fontWeight: 'var(--font-weight-semibold)',
    }}
    {...props}
  />
);

// QuestionCard.tsx
export const QuestionCard = ({ question, status }) => (
  <div
    style={{
      backgroundColor: 'var(--color-bg-card)',
      padding: 'var(--spacing-xl)',
      borderRadius: 'var(--border-radius-lg)',
      borderLeft: `4px solid ${
        status === 'pending' ? 'var(--color-status-pending)' :
        status === 'completed' ? 'var(--color-status-completed)' :
        'var(--color-status-closed)'
      }`,
      boxShadow: 'var(--shadow-sm)',
    }}
  >
    <h3 style={{
      fontSize: 'var(--font-size-card-title)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-primary-navy)',
    }}>
      {question.title}
    </h3>
  </div>
);
```

---

## 4. Header, Button, Input, Textarea, Badge, QuestionCard 구조

### Header.tsx (모든 페이지에서 동일)

```tsx
export const Header: React.FC = () => {
  const { user, role, logout } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--spacing-lg) var(--padding-h)',
      background: 'var(--color-bg-card)',
      borderBottom: `1px solid var(--color-border)`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <Logo />
        <span style={{
          fontWeight: 'var(--font-weight-bold)',
          fontSize: '20px',
          color: 'var(--color-primary-navy)',
        }}>QANOW</span>
      </div>

      <nav style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
        {!user ? (
          <>
            <a href="/login">로그인</a>
            <Button variant="primary">회원가입</Button>
          </>
        ) : (
          <>
            <a href={role === 'admin' ? '/admin/questions' : '/my-questions'}>
              {role === 'admin' ? '질문 목록' : '내 질문'}
            </a>
            <Button variant="secondary" onClick={logout}>로그아웃</Button>
          </>
        )}
      </nav>
    </header>
  );
};
```

### Button.tsx

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {
  const getBackgroundColor = () => {
    if (disabled) return 'var(--color-text-disabled)';
    return {
      primary: 'var(--color-primary-navy)',
      secondary: 'transparent',
      danger: 'transparent',
    }[variant];
  };

  const getBorderColor = () => {
    return {
      primary: 'none',
      secondary: `1px solid var(--color-border)`,
      danger: `1px solid var(--color-status-error)`,
    }[variant];
  };

  const getTextColor = () => {
    return {
      primary: 'white',
      secondary: 'var(--color-text-body)',
      danger: 'var(--color-status-error)',
    }[variant];
  };

  return (
    <button
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        border: getBorderColor(),
        height: 'var(--button-height)',
        padding: 'var(--button-padding)',
        borderRadius: 'var(--border-radius-md)',
        fontSize: 'var(--font-size-label)',
        fontWeight: 'var(--font-weight-semibold)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
      }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '저장 중...' : children}
    </button>
  );
};
```

### Input.tsx

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  maxLength,
  value,
  ...props
}) => {
  const charCount = String(value || '').length;

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 'var(--font-size-label)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-primary-navy)',
          marginBottom: 'var(--spacing-sm)',
        }}>
          {label}
        </label>
      )}
      
      <input
        style={{
          width: '100%',
          height: 'var(--input-height)',
          padding: 'var(--input-padding)',
          border: error 
            ? `1px solid var(--color-status-error)`
            : `1px solid var(--color-border)`,
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-body)',
          fontFamily: 'var(--font-family)',
          boxSizing: 'border-box',
        }}
        maxLength={maxLength}
        value={value}
        {...props}
      />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 'var(--spacing-sm)',
        fontSize: 'var(--font-size-caption)',
      }}>
        {error && <span style={{ color: 'var(--color-status-error)' }}>{error}</span>}
        {maxLength && <span style={{ color: 'var(--color-text-secondary)' }}>
          {charCount} / {maxLength}
        </span>}
      </div>
    </div>
  );
};
```

### Textarea.tsx

```tsx
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  maxLength,
  value,
  ...props
}) => {
  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 'var(--font-size-label)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-primary-navy)',
          marginBottom: 'var(--spacing-sm)',
        }}>
          {label}
        </label>
      )}
      
      <textarea
        style={{
          width: '100%',
          minHeight: '150px',
          padding: 'var(--input-padding)',
          border: error 
            ? `1px solid var(--color-status-error)`
            : `1px solid var(--color-border)`,
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-body)',
          fontFamily: 'var(--font-family)',
          resize: 'vertical',
          lineHeight: 'var(--line-height-relaxed)',
          boxSizing: 'border-box',
        }}
        maxLength={maxLength}
        value={value}
        {...props}
      />

      {error && (
        <span style={{
          fontSize: 'var(--font-size-caption)',
          color: 'var(--color-status-error)',
          marginTop: 'var(--spacing-sm)',
          display: 'block',
        }}>
          {error}
        </span>
      )}
    </div>
  );
};
```

### Badge.tsx

```tsx
interface BadgeProps {
  status: 'pending' | 'completed' | 'closed';
  children?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const colors = {
    pending: { bg: '#fff3e0', text: '#ff9800', border: '#ffb74d' },
    completed: { bg: '#e8f5e9', text: '#4caf50', border: '#81c784' },
    closed: { bg: '#f5f5f5', text: '#9ca3af', border: '#d1d5db' },
  };

  const labels = {
    pending: '답변 대기 중',
    completed: '답변 완료',
    closed: '닫힘',
  };

  const color = colors[status];

  return (
    <span style={{
      display: 'inline-block',
      backgroundColor: color.bg,
      color: color.text,
      padding: '4px 12px',
      borderRadius: 'var(--border-radius-sm)',
      fontSize: 'var(--font-size-caption)',
      fontWeight: 'var(--font-weight-semibold)',
      textTransform: 'uppercase',
      border: `1px solid ${color.border}`,
    }}>
      {children || labels[status]}
    </span>
  );
};
```

### QuestionCard.tsx

```tsx
interface Question {
  id: string;
  title: string;
  preview?: string;
  status: 'pending' | 'completed' | 'closed';
  createdAt: Date;
  author?: string;
  viewCount?: number;
}

interface QuestionCardProps {
  question: Question;
  onClick?: () => void;
  showAuthor?: boolean;
  actions?: React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onClick,
  showAuthor,
  actions,
}) => {
  const borderColor = {
    pending: 'var(--color-status-pending)',
    completed: 'var(--color-status-completed)',
    closed: 'var(--color-status-closed)',
  }[question.status];

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        padding: 'var(--spacing-xl)',
        borderRadius: 'var(--border-radius-lg)',
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : 'default',
        marginBottom: 'var(--spacing-md)',
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        if (onClick) e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'var(--spacing-md)',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: 'var(--font-size-label)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-primary-navy)',
            margin: 0,
          }}>
            {question.title}
          </h3>

          <p style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-secondary)',
            margin: 'var(--spacing-sm) 0 0 0',
          }}>
            {new Date(question.createdAt).toLocaleDateString('ko-KR')}
            {showAuthor && ` · ${question.author}`}
            {question.viewCount !== undefined && ` · 조회 ${question.viewCount}`}
          </p>
        </div>

        <Badge status={question.status} />
      </div>

      {question.preview && (
        <p style={{
          fontSize: 'var(--font-size-body)',
          color: 'var(--color-text-body)',
          lineHeight: 'var(--line-height-body)',
          margin: '0 0 var(--spacing-md) 0',
        }}>
          {question.preview}
        </p>
      )}

      {actions && (
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-md)',
        }}>
          {actions}
        </div>
      )}
    </div>
  );
};
```

---

## 5. 메인 Hero 구현: Aurora Gradient, Grid Pattern, Floating Card

### HeroSection.tsx

```tsx
export const HeroSection: React.FC = () => {
  const isMobile = useResponsive('max-width: 767px');

  return (
    <section style={{
      padding: 'var(--spacing-3xl) var(--padding-h)',
      background: 'linear-gradient(135deg, #0d47a1 0%, #5e35b1 50%, #0277bd 100%)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: isMobile ? '500px' : '600px',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* Grid Pattern Background */}
      <GridPattern />

      {/* Hero Content (왼쪽) */}
      <div style={{
        maxWidth: '700px',
        position: 'relative',
        zIndex: 2,
        color: 'white',
      }}>
        <h1 style={{
          fontSize: 'var(--font-size-hero-title)',
          fontWeight: 'var(--font-weight-bold)',
          margin: '0 0 var(--spacing-md) 0',
          lineHeight: 'var(--line-height-title)',
        }}>
          질문은 빠르게, 답변은 명확하게.
        </h1>

        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: 'rgba(255, 255, 255, 0.9)',
          margin: '0 0 var(--spacing-2xl) 0',
          lineHeight: 'var(--line-height-body)',
        }}>
          궁금한 점을 남기면 관리자가 확인하고 답변해드립니다.
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <Button variant="primary" onClick={() => navigateTo('/ask')}>
            질문 작성하기
          </Button>
          <Button 
            variant="secondary"
            style={{ borderColor: 'white', color: 'white' }}
            onClick={() => navigateTo('/my-questions')}
          >
            내 질문 확인하기
          </Button>
        </div>
      </div>

      {/* Floating Cards (오른쪽, 데스크톱만) */}
      {!isMobile && <FloatingCards />}
    </section>
  );
};
```

### GridPattern.tsx

```tsx
export const GridPattern: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0.08,
    }}
  >
    <defs>
      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);
```

### FloatingCards.tsx

```tsx
export const FloatingCards: React.FC = () => (
  <div style={{
    position: 'absolute',
    right: '5%',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '280px',
  }}>
    {/* Question Card */}
    <div style={{
      backgroundColor: 'white',
      padding: 'var(--spacing-lg)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-md)',
      marginBottom: 'var(--spacing-md)',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-status-pending)',
        marginBottom: 'var(--spacing-sm)',
        textTransform: 'uppercase',
      }}>
        Question
      </div>
      <p style={{
        margin: 0,
        fontSize: 'var(--font-size-body)',
        color: '#212121',
        lineHeight: 'var(--line-height-body)',
      }}>
        배송은 며칠 걸리나요?
      </p>
    </div>

    {/* Arrow */}
    <div style={{
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.4)',
      marginBottom: 'var(--spacing-md)',
    }}>
      ↓
    </div>

    {/* Answer Card */}
    <div style={{
      backgroundColor: 'white',
      padding: 'var(--spacing-lg)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: 'var(--shadow-md)',
      borderLeft: `4px solid var(--color-status-completed)`,
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 'var(--font-weight-semibold)',
        color: 'var(--color-status-completed)',
        marginBottom: 'var(--spacing-sm)',
        textTransform: 'uppercase',
      }}>
        Answer
      </div>
      <p style={{
        margin: 0,
        fontSize: 'var(--font-size-body)',
        color: '#212121',
        lineHeight: 'var(--line-height-body)',
      }}>
        평균 3-5일 내 배송되며, 추적 정보는 이메일로 안내됩니다.
      </p>
    </div>
  </div>
);
```

---

## 6. 데스크톱과 모바일 반응형

### `src/hooks/useResponsive.ts`

```tsx
export const useResponsive = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// 사용 예시
const isMobile = useResponsive('(max-width: 767px)');
const isTablet = useResponsive('(min-width: 768px) and (max-width: 1023px)');
const isDesktop = useResponsive('(min-width: 1024px)');
```

### 반응형 패턴

```tsx
// 조건부 렌더링
const QuestionList: React.FC = () => {
  const isMobile = useResponsive('(max-width: 767px)');

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 'var(--spacing-lg)',
    }}>
      {/* Cards */}
    </div>
  );
};

// CSS Grid 반응형
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // 데스크톱
  '@media (max-width: 1023px)': {
    gridTemplateColumns: 'repeat(2, 1fr)', // 태블릿
  },
  '@media (max-width: 767px)': {
    gridTemplateColumns: '1fr', // 모바일
  },
}}>
</div>
```

---

## 7. prefers-reduced-motion 처리

### `src/styles/motion.css`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }

  .loading-spinner {
    animation: none !important;
    border-top-color: var(--color-border);
  }

  .button:hover {
    background-color: var(--color-primary-navy);
    box-shadow: none;
  }
}
```

### LoadingState.tsx

```tsx
export const LoadingState: React.FC = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-3xl)',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid var(--color-border)',
        borderTop: '4px solid var(--color-primary-navy)',
        borderRadius: '50%',
        animation: prefersReducedMotion ? 'none' : 'spin 1s linear infinite',
      }} />
      <p style={{
        marginTop: 'var(--spacing-lg)',
        color: 'var(--color-text-secondary)',
      }}>
        로딩 중...
      </p>
    </div>
  );
};

// CSS에 animation 정의
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
```

---

## 8. Loading, Empty, Error, Unauthorized 상태

### LoadingState.tsx (위 참고)

### EmptyState.tsx

```tsx
interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
}) => (
  <div style={{
    backgroundColor: '#f0f9ff',
    border: '1px solid #2196f3',
    borderLeft: '4px solid #2196f3',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--border-radius-md)',
    textAlign: 'center',
  }}>
    <h3 style={{
      fontSize: 'var(--font-size-section-title)',
      fontWeight: 'var(--font-weight-bold)',
      color: '#0277bd',
      margin: '0 0 var(--spacing-sm) 0',
    }}>
      {title}
    </h3>
    <p style={{
      fontSize: 'var(--font-size-body)',
      color: 'var(--color-text-secondary)',
      margin: '0 0 var(--spacing-lg) 0',
    }}>
      {description}
    </p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);
```

### ErrorState.tsx

```tsx
interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
}) => (
  <div style={{
    backgroundColor: '#fef2f2',
    border: '1px solid #ef4444',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--border-radius-md)',
    display: 'flex',
    gap: 'var(--spacing-lg)',
    alignItems: 'center',
  }}>
    <span style={{ fontSize: '24px' }}>⚠️</span>
    <div style={{ flex: 1 }}>
      <p style={{
        margin: 0,
        fontSize: 'var(--font-size-body)',
        color: '#dc2626',
      }}>
        {message}
      </p>
    </div>
    {onRetry && (
      <Button variant="danger" onClick={onRetry}>
        재시도
      </Button>
    )}
  </div>
);
```

### UnauthorizedState.tsx

```tsx
export const UnauthorizedState: React.FC<{ onNavigate?: () => void }> = ({
  onNavigate,
}) => (
  <div style={{
    backgroundColor: 'var(--color-bg-card)',
    padding: 'var(--spacing-3xl)',
    borderRadius: 'var(--border-radius-lg)',
    textAlign: 'center',
    boxShadow: 'var(--shadow-sm)',
  }}>
    <div style={{
      fontSize: '48px',
      marginBottom: 'var(--spacing-lg)',
      color: '#f59e0b',
    }}>
      ⚠️
    </div>
    <h1 style={{
      fontSize: 'var(--font-size-card-title)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-status-error)',
      margin: '0 0 var(--spacing-md) 0',
    }}>
      이 질문에 접근할 수 없습니다
    </h1>
    <p style={{
      fontSize: 'var(--font-size-body)',
      color: 'var(--color-text-secondary)',
      margin: '0 0 var(--spacing-xl) 0',
    }}>
      접근 권한이 없거나 삭제된 질문입니다.
    </p>
    <Button variant="primary" onClick={onNavigate}>
      내 질문 목록으로
    </Button>
  </div>
);
```

---

## 9. 인증 상태 관리

### `src/types/models.ts`

```tsx
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'member' | 'admin';
  created_at: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
```

### `src/context/AuthContext.tsx`

```tsx
interface AuthContextType {
  user: User | null;
  role: 'member' | 'admin' | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Supabase 세션 복원
  React.useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // 사용자 프로필 로드
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: profile?.name || '',
            role: profile?.role || 'member',
            created_at: new Date(profile?.created_at || new Date()),
          });
        }
      } catch (err) {
        console.error('Session restore failed:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const value: AuthContextType = {
    user,
    role: user?.role || null,
    loading,
    isAuthenticated: !!user,
    login: async (email, password) => {
      // Supabase 로그인 구현
    },
    logout: async () => {
      await supabase.auth.signOut();
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

---

## 10. questions, answers, profiles 데이터 구조

### Supabase 스키마

```sql
-- Users & Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('member', 'admin')) DEFAULT 'member',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL (MIN 1, MAX 100),
  content TEXT NOT NULL (MIN 1, MAX 5000),
  status TEXT CHECK (status IN ('pending', 'answered', 'closed')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Answers
CREATE TABLE answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL (MIN 1, MAX 5000),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(question_id) -- 질문당 1개 답변만
);

-- Indexes
CREATE INDEX idx_questions_created_by ON questions(created_by);
CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_answers_question_id ON answers(question_id);
```

### TypeScript 타입

```tsx
export interface Question {
  id: string;
  created_by: string;
  title: string;
  content: string;
  status: 'pending' | 'answered' | 'closed';
  created_at: Date;
  updated_at: Date;
  author?: Profile; // JOIN 결과
}

export interface Answer {
  id: string;
  question_id: string;
  created_by: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author?: Profile; // JOIN 결과
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  role: 'member' | 'admin';
  created_at: Date;
}
```

---

## 11. 회원과 관리자 역할 모델

### 권한 매트릭스

| 액션 | 회원 (본인) | 회원 (타인) | 관리자 |
|------|-----------|----------|--------|
| 자신의 질문 조회 | ✓ | ✗ | ✓ |
| 모든 질문 조회 | ✗ | ✗ | ✓ |
| 자신의 질문 수정 (미답변) | ✓ | ✗ | ✗ |
| 자신의 질문 삭제 (미답변) | ✓ | ✗ | ✗ |
| 질문 삭제 (관리자) | ✗ | ✗ | ✓ |
| 답변 작성 | ✗ | ✗ | ✓ |
| 자신의 답변 수정 | ✗ | ✗ | ✓ |
| 자신의 답변 삭제 | ✗ | ✗ | ✓ |

### 역할별 UI

```tsx
// pages/QuestionListPage.tsx
export const QuestionListPage: React.FC = () => {
  const { user, role } = useAuth();
  const [questions, setQuestions] = React.useState<Question[]>([]);

  React.useEffect(() => {
    const loadQuestions = async () => {
      if (role === 'admin') {
        // 모든 질문 + 필터 UI
        const data = await fetchAllQuestions();
      } else {
        // 자신의 질문만
        const data = await fetchMyQuestions(user!.id);
      }
      setQuestions(data);
    };

    loadQuestions();
  }, [role, user]);

  return (
    <MainLayout>
      {role === 'admin' ? (
        <>
          <FilterBar /> {/* 상태 필터 */}
          {questions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              showAuthor={true}
              actions={<Button>답변하기</Button>}
            />
          ))}
        </>
      ) : (
        <>
          {questions.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              actions={
                q.status === 'pending' && (
                  <>
                    <Button variant="secondary">수정</Button>
                    <Button variant="danger">삭제</Button>
                  </>
                )
              }
            />
          ))}
        </>
      )}
    </MainLayout>
  );
};
```

---

## 12. RLS (Row-Level Security) 정책

### Supabase RLS 설정

```sql
-- 프로필 테이블
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 질문 테이블
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own questions" ON questions
  FOR SELECT USING (
    auth.uid() = created_by OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can create questions" ON questions
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own pending questions" ON questions
  FOR UPDATE USING (
    auth.uid() = created_by AND status = 'pending'
  );

CREATE POLICY "Users can delete own pending questions" ON questions
  FOR DELETE USING (
    auth.uid() = created_by AND status = 'pending'
  );

CREATE POLICY "Admins can delete any question" ON questions
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 답변 테이블
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read answers" ON answers
  FOR SELECT USING (true);

CREATE POLICY "Admins can create answers" ON answers
  FOR INSERT WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update own answers" ON answers
  FOR UPDATE USING (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete own answers" ON answers
  FOR DELETE USING (
    auth.uid() = created_by AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 13. 입력 검증

### `src/utils/validation.ts`

```tsx
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateQuestion = (title: string, content: string): ValidationResult => {
  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle) return { isValid: false, error: '제목은 필수입니다' };
  if (trimmedTitle.length > 100) return { isValid: false, error: '제목은 100자 이내여야 합니다' };
  if (!trimmedContent) return { isValid: false, error: '내용은 필수입니다' };
  if (trimmedContent.length > 5000) return { isValid: false, error: '내용은 5000자 이내여야 합니다' };

  // XSS 방지
  if (containsDangerousPatterns(trimmedTitle) || containsDangerousPatterns(trimmedContent)) {
    return { isValid: false, error: '포함될 수 없는 패턴이 있습니다' };
  }

  return { isValid: true };
};

const containsDangerousPatterns = (text: string): boolean => {
  const dangerous = ['<script', '</script>', 'onclick=', 'onerror=', 'onload='];
  return dangerous.some(pattern => text.toLowerCase().includes(pattern));
};

// 사용 예시
const result = validateQuestion(title, content);
if (!result.isValid) {
  setErrors({ ...errors, title: result.error });
}
```

---

## 14. 테스트 전략

### 계층별 테스트

1. **단위 테스트** (Component + Hook)
   - Button, Badge, Input 컴포넌트
   - useAuth, useValidation 훅
   - validation 함수들

2. **통합 테스트** (Mock 데이터)
   - QuestionListPage (회원/관리자)
   - QuestionDetailPage (Q&A 표시)
   - 권한 검증 (403)

3. **E2E 테스트** (Supabase 연결 후)
   - 질문 작성 → 목록 표시 → 상세 조회
   - 답변 작성 → 상태 변경 → 회원 조회
   - 권한 위반 (URL 직접 접근)

### 테스트 도구

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "vitest": "^0.34.0",
    "jsdom": "^22.1.0",
    "cypress": "^13.0.0"
  }
}
```

---

## 15. Mock Data 기반 UI 우선 구현

### 구현 순서

**Phase 1: UI Component (Mock Data)**
1. ✓ CSS 변수 정의
2. ✓ Button, Input, Textarea, Badge 컴포넌트
3. ✓ QuestionCard, Header, Footer
4. ✓ HeroSection (Aurora, Grid, FloatingCard)
5. ✓ LoadingState, EmptyState, ErrorState, UnauthorizedState
6. ✓ MainPage, QuestionListPage, QuestionDetailPage (Mock 데이터로)
7. ✓ 반응형 확인 (375px, 768px, 1024px)
8. ✓ 접근성 확인 (키보드, prefers-reduced-motion)

**Phase 2: Design Sync**
9. → `/design-sync` 실행 (UI가 design.md와 일치하는지 확인)

**Phase 3: Supabase 연결**
10. Supabase 스키마 생성
11. RLS 정책 적용
12. Auth Context 완성
13. useQuestions, useAnswers 훅 구현
14. API 쿼리 함수 작성
15. 권한 검증 추가

### Mock Data 예시

```tsx
// src/utils/mock-data.ts
export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    created_by: 'user-123',
    title: '배송은 며칠 걸리나요?',
    content: '일반 배송으로 주문했는데 언제쯤 받을 수 있을까요?',
    status: 'pending',
    created_at: new Date('2025-08-29'),
    updated_at: new Date('2025-08-29'),
    author: { id: 'user-123', email: 'user@example.com', name: '김회원', role: 'member', created_at: new Date() },
  },
  {
    id: '2',
    created_by: 'user-456',
    title: '환불 정책은 어떻게 되나요?',
    content: '마음에 안 들면 환불 가능한가요?',
    status: 'answered',
    created_at: new Date('2025-08-27'),
    updated_at: new Date('2025-08-28'),
    author: { id: 'user-456', email: 'user2@example.com', name: '이회원', role: 'member', created_at: new Date() },
  },
];

export const MOCK_ANSWERS: Answer[] = [
  {
    id: 'answer-1',
    question_id: '2',
    created_by: 'admin-1',
    content: '평균 3-5일 내 배송됩니다.',
    created_at: new Date('2025-08-28'),
    updated_at: new Date('2025-08-28'),
    author: { id: 'admin-1', email: 'admin@example.com', name: '관리자', role: 'admin', created_at: new Date() },
  },
];

// 사용
const { questions } = useQuestions(); // Mock 환경에서는 MOCK_QUESTIONS 반환
```

---

## 16. /design-sync 시점과 범위

### 시점

**UI 구현 완료 후, Supabase 연결 전**

```
Week 1: 디렉터리 + CSS 변수
Week 2: 공통 컴포넌트 (Button, Input, Badge 등)
Week 3: Hero + 상태 화면 (Loading, Empty, Error)
Week 4: 세 핵심 페이지 (MainPage, ListPage, DetailPage)
        ↓
Week 5: /design-sync 실행
        ↓
Week 6-7: Supabase 연결 + 데이터 기능
```

### /design-sync 범위

**확인 항목** (design.md와 비교):
1. ✓ 색상 (Aurora Gradient, Status Colors, Neutral)
2. ✓ 타이포그래피 (크기, Weight, Line-height)
3. ✓ 간격 (Spacing Scale, Padding)
4. ✓ 컴포넌트 (Button, Input, Card, Badge 스타일)
5. ✓ 상태 화면 (Loading, Empty, Error, 403)
6. ✓ Hero 구조 (배경, 제목, CTA, 플로팅 카드)
7. ✓ 반응형 (375px, 768px, 1024px)
8. ✓ 접근성 (포커스, 색상 대비, prefers-reduced-motion)
9. ✓ 네비게이션 (Header 링크, Breadcrumb)

**수정 사항** (발견시):
- 색상 미스매치: CSS 변수 값 수정
- 타이포 미스매치: font-size, weight 조정
- 컴포넌트 스타일: 패딩, 경계선, 모서리 보정
- 반응형 버그: breakpoint 조정

---

## 17. 로컬 실행 방법

### 프로젝트 초기 설정

```bash
# 1. 저장소 클론 (이미 존재한다고 가정)
cd qaboard

# 2. 패키지 설치
npm install

# 3. .env.local 생성 (Supabase 키는 나중에)
cat > .env.local << EOF
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=placeholder_local
EOF

# 4. 개발 서버 실행
npm run dev

# 5. 브라우저에서 열기
# http://localhost:5173
```

### 개발 워크플로우

```bash
# 소스 파일 변경시 자동 reload (Vite Hot Module Replacement)
npm run dev

# Type 체크
npm run type-check

# 테스트 실행
npm run test

# 빌드
npm run build

# Preview
npm run preview
```

### package.json 스크립트

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

### Vite 설정 (vite.config.ts)

```tsx
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // 자동 브라우저 열기
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
```

### TypeScript 설정 (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 로컬 Supabase (선택)

Supabase 연결 전 로컬에서 테스트하려면:

```bash
# Supabase CLI 설치
npm install -g supabase

# 로컬 Supabase 시작
supabase start

# 마이그레이션 적용
supabase db reset

# 로컬 URL/Key 출력됨 → .env.local에 입력
```

---

## 구현 단계별 체크리스트

### 1단계: 프로젝트 구조 (1일)
- [ ] Vite + React + TypeScript 초기 설정
- [ ] 디렉터리 구조 생성
- [ ] CSS 변수 정의 (variables.css)

### 2단계: 공통 컴포넌트 (3일)
- [ ] Button (Primary/Secondary/Danger)
- [ ] Input + Textarea
- [ ] Badge
- [ ] Header + Footer
- [ ] 상태 화면 (Loading, Empty, Error, Unauthorized)

### 3단계: Hero & 특수 컴포넌트 (2일)
- [ ] Aurora Gradient 배경
- [ ] Grid Pattern SVG
- [ ] Floating Cards
- [ ] HeroSection 조합

### 4단계: 페이지 (3일)
- [ ] MainPage (Mock 데이터)
- [ ] QuestionListPage (회원 + 관리자)
- [ ] QuestionDetailPage (Q&A 영역)

### 5단계: 반응형 & 접근성 (2일)
- [ ] 375px, 768px, 1024px 테스트
- [ ] 키보드 포커스
- [ ] 색상 대비 확인
- [ ] prefers-reduced-motion 확인

### 6단계: Design Sync (1일)
- [ ] /design-sync 실행
- [ ] design.md와 비교
- [ ] 필요시 수정

### 7단계: Supabase 연결 (4일)
- [ ] 스키마 생성 + 마이그레이션
- [ ] RLS 정책 적용
- [ ] Auth Context 완성
- [ ] 쿼리 함수 구현

### 8단계: 통합 테스트 (2일)
- [ ] 권한 검증
- [ ] CRUD 기능
- [ ] 에러 처리

---

## 관련 문서 링크

- **spec.md**: 기능 요구사항 및 상태 정의
- **design-brief.md**: 디자인 목표 및 색상/타이포그래피
- **design.md**: 최종 확정된 디자인 규칙 (24섹션)
- **constitution.md**: 개발 원칙 (권한 분리, 입력 검증, UI 일관성 등)

---

**작성일**: 2025-08-29  
**상태**: 구현 계획 수립 완료  
**다음 단계**: Phase 1 시작 (UI Component 구현)
