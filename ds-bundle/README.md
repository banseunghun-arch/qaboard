# QANOW Design System

Q&A 플랫폼 QANOW의 디자인 시스템입니다. 회원과 관리자 역할을 지원하는 구성 요소들을 포함합니다.

## 🎨 Design Principles

- **Aurora Gradient**: 주요 브랜드 색상 (Navy #0d47a1, Violet #5e35b1, Blue #0277bd)
- **CSS Token System**: 모든 색상, 타이포, 간격은 CSS 변수로 관리
- **Role-Based UI**: Member와 Admin 역할에 따른 다른 UI 제공
- **Accessible**: ARIA labels, keyboard navigation, focus states

## 📦 Components

### Common Components
- **Button** - Primary, secondary, danger variants with loading state
- **Input** - Text input with label, error, character counter
- **Textarea** - Multi-line input with validation support
- **Badge** - Status badges (pending, completed, closed)
- **Header** - Sticky navigation with logo and user menu
- **Footer** - Simple footer with copyright
- **PageLayout** - Reusable page wrapper with Header/Footer

### State Components
- **EmptyState** - Informational empty state with optional action
- **ErrorState** - Error display with retry button
- **UnauthorizedState** - Access denied state
- **LoadingState** - Loading spinner with animation support

### Domain Components
- **QuestionCard** - Question display with status badge and metadata
- **Badge** - Status indicators (pending, completed, closed)

## 🎯 Core Pages

1. **MainPage** - Hero section, process steps, values
2. **QuestionListPage** - Questions filtered by user role
3. **QuestionDetailPage** - Single question with answers

## 🎨 Color System

| Token | Value | Usage |
|-------|-------|-------|
| --color-primary-navy | #0d47a1 | Primary buttons, headers |
| --color-primary-violet | #5e35b1 | Gradient accent |
| --color-primary-blue | #0277bd | Gradient accent |
| --color-status-pending | #ff9800 | Pending status |
| --color-status-completed | #4caf50 | Completed status |
| --color-status-closed | #9ca3af | Closed status |

## 📏 Typography

- **Hero Title**: 48px (mobile: 32px)
- **Page Title**: 28px (mobile: 24px)
- **Card Title**: 24px
- **Section Title**: 18px
- **Body**: 14px
- **Label**: 13px
- **Caption**: 12px

## 🎛️ Spacing

All spacing uses a 4px base unit:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

## 🔌 Implementation Notes

- React 18 + TypeScript
- Vite build system
- CSS-in-JS for component styling (inline styles with CSS variables)
- Mock data for UI validation
- Role-based access control via AuthContext

## 📱 Responsive Design

- **Mobile**: < 768px (padding: 16px)
- **Tablet**: 768px - 1023px (padding: 32px)
- **Desktop**: >= 1024px (padding: 48px)

Max content width: 1200px
Max detail width: 800px

---

**Status**: Phase 1-3 implementation complete  
**Last Updated**: 2026-08-29
