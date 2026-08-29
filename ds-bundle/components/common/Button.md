# Button Component

Versatile button component with multiple variants and states.

## Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  fullWidth?: boolean;
}
```

## Variants

### Primary (Default)
- Navy background (#0d47a1)
- White text
- Used for main actions

### Secondary
- Transparent background
- Navy border
- Navy text
- Used for alternative actions

### Danger
- Transparent background
- Red border (#ef4444)
- Red text
- Used for destructive actions

## States

- **Normal**: Full opacity, pointer cursor
- **Loading**: Shows "저장 중..." text, disabled state
- **Disabled**: 60% opacity, not-allowed cursor
- **Focus**: 2px navy outline with 2px offset

## Usage Example

```jsx
// Primary button
<Button onClick={handleClick}>작성하기</Button>

// Secondary button
<Button variant="secondary">취소</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>삭제</Button>

// Full width button
<Button fullWidth>로그인</Button>

// Loading state
<Button loading={isLoading} disabled={isLoading}>
  저장
</Button>
```

## Styling

- Height: 44px (--button-height)
- Padding: 12px 28px (--button-padding)
- Border radius: 6px (--border-radius-md)
- Font size: 13px (--font-size-label)
- Font weight: 600 (semibold)
- Transition: opacity 0.2s ease

## Accessibility

- ✅ Native `<button>` element
- ✅ `aria-busy={loading}` for loading state
- ✅ Full keyboard support
- ✅ Focus visible outline
- ✅ Disabled state prevents interaction
