import React from 'react';

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
  const bgColor =
    variant === 'primary'
      ? 'var(--color-primary-navy)'
      : variant === 'danger'
        ? 'transparent'
        : 'transparent';

  const textColor =
    variant === 'primary'
      ? '#ffffff'
      : variant === 'danger'
        ? 'var(--color-status-error)'
        : 'var(--color-text-body)';

  const border =
    variant === 'danger'
      ? '1px solid var(--color-status-error)'
      : variant === 'secondary'
        ? '1px solid var(--color-border)'
        : 'none';

  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border,
        height: 'var(--button-height)',
        padding: 'var(--button-padding)',
        borderRadius: 'var(--border-radius-md)',
        fontSize: 'var(--font-size-label)',
        fontWeight: 'var(--font-weight-semibold)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        transition: 'opacity 0.2s ease',
      }}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? '저장 중...' : children}
    </button>
  );
};
