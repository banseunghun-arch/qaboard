import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => (
  <div
    style={{
      backgroundColor: 'var(--color-status-info-bg)',
      border: '1px solid var(--color-status-info)',
      borderLeft: '4px solid var(--color-status-info)',
      padding: 'var(--spacing-xl)',
      borderRadius: 'var(--border-radius-md)',
      textAlign: 'center',
    }}
  >
    <h3
      style={{
        fontSize: 'var(--font-size-section-title)',
        fontWeight: 'var(--font-weight-bold)',
        color: 'var(--color-primary-blue)',
        margin: '0 0 var(--spacing-sm) 0',
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontSize: 'var(--font-size-body)',
        color: 'var(--color-text-secondary)',
        margin: '0 0 var(--spacing-lg) 0',
      }}
    >
      {description}
    </p>
    {action && (
      <Button variant="primary" onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </div>
);
