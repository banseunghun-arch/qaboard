import React from 'react';
import type { Question } from '../../types/models';
import { Badge } from './Badge';

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
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        padding: 'var(--spacing-xl)',
        borderRadius: 'var(--border-radius-lg)',
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: 'var(--shadow-sm)',
        cursor: onClick ? 'pointer' : 'default',
        marginBottom: 'var(--spacing-md)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-md)',
        }}
      >
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontSize: 'var(--font-size-label)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary-navy)',
              margin: 0,
            }}
          >
            {question.title}
          </h3>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-text-secondary)',
              margin: 'var(--spacing-sm) 0 0 0',
            }}
          >
            {question.created_at.toLocaleDateString('ko-KR')}
            {showAuthor && ` · ${question.author?.name}`}
          </p>
        </div>
        <Badge status={question.status} />
      </div>
      {actions && <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>{actions}</div>}
    </div>
  );
};
