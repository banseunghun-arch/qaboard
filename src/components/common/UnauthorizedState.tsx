import React from 'react';
import { Button } from './Button';

interface UnauthorizedStateProps {
  onNavigate?: () => void;
}

export const UnauthorizedState: React.FC<UnauthorizedStateProps> = ({ onNavigate }) => (
  <div
    style={{
      backgroundColor: 'var(--color-bg-card)',
      padding: 'var(--spacing-3xl)',
      borderRadius: 'var(--border-radius-lg)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-sm)',
    }}
    role="alert"
  >
    <div
      style={{
        fontSize: '48px',
        marginBottom: 'var(--spacing-lg)',
        color: 'var(--color-status-warning)',
      }}
      aria-hidden="true"
    >
      ⚠️
    </div>
    <h1
      style={{
        fontSize: 'var(--font-size-card-title)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-status-error)',
        margin: '0 0 var(--spacing-md) 0',
      }}
    >
      이 질문에 접근할 수 없습니다
    </h1>
    <p
      style={{
        fontSize: 'var(--font-size-body)',
        color: 'var(--color-text-secondary)',
        margin: '0 0 var(--spacing-xl) 0',
      }}
    >
      접근 권한이 없거나 삭제된 질문입니다.
    </p>
    {onNavigate && (
      <Button variant="primary" onClick={onNavigate}>
        내 질문 목록으로
      </Button>
    )}
  </div>
);
