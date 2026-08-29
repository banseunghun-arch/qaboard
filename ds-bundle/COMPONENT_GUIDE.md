# QANOW Component Guide

Complete component reference for QANOW Design System.

## Common Components (`src/components/common/`)

### Form Components

#### **Button**
Versatile button with primary/secondary/danger variants
- **Variants**: primary, secondary, danger
- **States**: normal, loading, disabled, focus
- **Props**: variant, loading, fullWidth, and standard button HTML attributes
- **File**: `Button.tsx`

#### **Input**
Text input with integrated label, error, and character counter
- **Props**: label, error, maxLength, and standard input attributes
- **Accessibility**: aria-invalid, aria-describedby, connected error messages
- **File**: `Input.tsx`

#### **Textarea**
Multi-line text input with same pattern as Input
- **Props**: label, error, maxLength, rows
- **Default rows**: 5
- **Min height**: 150px
- **File**: `Textarea.tsx`

### Display Components

#### **Badge**
Status indicator showing pending/completed/closed states
- **Statuses**: pending (orange), completed (green), closed (gray)
- **Styling**: Background + text color based on status
- **File**: `Badge.tsx`

#### **QuestionCard**
Card displaying a question with metadata
- **Props**: question, onClick, showAuthor, actions
- **Features**: Status-colored left border, author display, date formatting
- **Keyboard**: Enter/Space support for keyboard navigation
- **File**: `QuestionCard.tsx`

### Layout Components

#### **Header**
Sticky navigation header with logo and user menu
- **Features**: Logo link, user info, logout button
- **Z-index**: 100 (sticky)
- **Responsive**: Padding adjusts by breakpoint
- **File**: `Header.tsx`

#### **Footer**
Simple footer with copyright information
- **Background**: Navy (#0d47a1)
- **Text**: White
- **File**: `Footer.tsx`

#### **PageLayout**
Wrapper for full-page layouts with Header and Footer
- **Props**: children
- **Structure**: Header → main → Footer with flex layout
- **File**: `PageLayout.tsx`

### State Components

#### **EmptyState**
Informational state for empty content
- **Background**: Info blue (#f0f9ff)
- **Props**: title, description, action
- **Use case**: No questions, no answers, need to guide user

#### **ErrorState**
Error display with retry option
- **Background**: Error red (#fef2f2)
- **Props**: message, onRetry
- **Accessibility**: role="alert", aria-hidden for emoji
- **Use case**: Network errors, validation failures

#### **UnauthorizedState**
Access denied state
- **Props**: onNavigate
- **Use case**: Member accessing other user's question
- **Accessibility**: role="alert"

#### **LoadingState**
Loading indicator with animation
- **Features**: Spinner with prefers-reduced-motion support
- **File**: `LoadingState.tsx`

## Pages (`src/pages/`)

### MainPage
Landing page with hero section and feature overview
- **Sections**: Hero (Aurora gradient), Process (3 steps), Values (3 cards)
- **Hero Gradient**: linear-gradient(135deg, navy, violet, blue)
- **Responsive**: Grid layout with auto-fit, 250px minimum

### QuestionListPage
List of questions filtered by user role
- **Member view**: Only user's own questions
- **Admin view**: All questions with author name
- **Features**: Search/filter (future), sorting
- **Empty state**: "No questions" message

### QuestionDetailPage
Single question with answers
- **Member view**: Own question only, view answers
- **Admin view**: Answer form (if pending), answer display
- **Features**: Breadcrumb navigation, answer section
- **Unauthorized**: Show 403 state for access denied

## Styling System

### CSS Variables (variables.css)

All values use CSS custom properties for consistency:

```css
:root {
  /* Colors */
  --color-primary-navy: #0d47a1;
  --color-primary-violet: #7c4dff;
  --color-primary-blue: #0277bd;
  --color-status-pending: #ff9800;
  --color-status-completed: #4caf50;
  --color-status-closed: #9ca3af;
  
  /* Typography */
  --font-size-hero-title: 48px;
  --font-size-page-title: 28px;
  --font-size-section-title: 18px;
  --font-size-body: 14px;
  --font-size-body-lg: 16px;
  --font-size-label: 13px;
  --font-size-caption: 12px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 24px;
  --spacing-2xl: 32px;
  --spacing-3xl: 48px;
  
  /* Components */
  --button-height: 44px;
  --button-padding: 12px 28px;
  --input-height: 44px;
  --border-radius-md: 6px;
  --border-radius-lg: 8px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  
  /* Gradient */
  --gradient-aurora: linear-gradient(135deg, #0d47a1 0%, #5e35b1 50%, #0277bd 100%);
}
```

### Media Queries

```css
@media (max-width: 767px) {
  /* Mobile: 375px width */
  --font-size-hero-title: 32px;
  --font-size-page-title: 24px;
  --padding-h: 16px;
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet: 768px width */
  --font-size-hero-title: 40px;
  --padding-h: 32px;
}
```

## Accessibility Features

✅ **Semantic HTML**: Using correct elements (button, input, nav, main)
✅ **ARIA Attributes**: aria-invalid, aria-describedby, role="alert"
✅ **Focus Management**: 2px navy outline with offset
✅ **Keyboard Navigation**: Enter/Space support for interactive elements
✅ **Color Contrast**: All text meets WCAG AA standards
✅ **Motion**: prefers-reduced-motion support for animations

## Usage Patterns

### Form Inputs
```jsx
<Input
  id="email"
  label="이메일"
  type="email"
  error={emailError}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Status Displays
```jsx
<Badge status={question.status} />
// or with custom label
<Badge status="pending">답변 대기</Badge>
```

### Conditional Rendering
```jsx
{!answer ? (
  <EmptyState title="아직 답변이 없습니다" />
) : (
  <AnswerDisplay answer={answer} />
)}
```

---

**Learn more**: See component source files in `src/components/common/`
