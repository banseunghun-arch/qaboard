import React from 'react';

export const LoadingState: React.FC = () => {
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-3xl)',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid var(--color-border)',
          borderTop: '4px solid var(--color-primary-navy)',
          borderRadius: '50%',
          animation: prefersReducedMotion ? 'none' : 'spin 1s linear infinite',
        }}
      />
      <p
        style={{
          marginTop: 'var(--spacing-lg)',
          color: 'var(--color-text-secondary)',
        }}
      >
        로딩 중...
      </p>
    </div>
  );
};
