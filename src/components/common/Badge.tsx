import React from 'react';

interface BadgeProps {
  status: 'pending' | 'completed' | 'closed';
  children?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const bgVars = {
    pending: 'var(--color-status-pending-bg)',
    completed: 'var(--color-status-completed-bg)',
    closed: 'var(--color-status-closed-bg)',
  };

  const textVars = {
    pending: 'var(--color-status-pending)',
    completed: 'var(--color-status-completed)',
    closed: 'var(--color-status-closed)',
  };

  const labels = {
    pending: '답변 대기 중',
    completed: '답변 완료',
    closed: '닫힘',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: bgVars[status],
        color: textVars[status],
        padding: 'var(--spacing-xs) var(--spacing-sm)',
        borderRadius: 'var(--border-radius-sm)',
        fontSize: 'var(--font-size-caption)',
        fontWeight: 'var(--font-weight-semibold)',
      }}
    >
      {children || labels[status]}
    </span>
  );
};
