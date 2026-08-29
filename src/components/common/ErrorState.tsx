import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div
    style={{
      backgroundColor: 'var(--color-status-error-bg)',
      border: '1px solid var(--color-status-error)',
      padding: 'var(--spacing-lg)',
      borderRadius: 'var(--border-radius-md)',
      display: 'flex',
      gap: 'var(--spacing-lg)',
      alignItems: 'center',
    }}
    role="alert"
  >
    <span style={{ fontSize: '24px' }} aria-hidden="true">
      ⚠️
    </span>
    <div style={{ flex: 1 }}>
      <p
        style={{
          margin: 0,
          fontSize: 'var(--font-size-body)',
          color: 'var(--color-status-error-dark)',
        }}
      >
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
