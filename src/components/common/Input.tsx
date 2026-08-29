import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({ label, error, maxLength, value, id, ...props }) => {
  const charCount = String(value || '').length;
  const errorId = error ? `${id}-error` : undefined;
  const counterId = maxLength ? `${id}-counter` : undefined;
  const describedBy = [errorId, counterId].filter(Boolean).join(' ');

  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: 'var(--font-size-label)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-primary-navy)',
            marginBottom: 'var(--spacing-sm)',
          }}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        style={{
          width: '100%',
          height: 'var(--input-height)',
          padding: 'var(--input-padding)',
          border: error ? '1px solid var(--color-status-error)' : '1px solid var(--color-border)',
          borderRadius: 'var(--border-radius-md)',
          fontSize: 'var(--font-size-body)',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
        }}
        maxLength={maxLength}
        value={value}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'var(--spacing-sm)',
          fontSize: 'var(--font-size-caption)',
        }}
      >
        {error && (
          <span id={errorId} style={{ color: 'var(--color-status-error)' }} role="alert">
            {error}
          </span>
        )}
        {maxLength && (
          <span id={counterId} style={{ color: 'var(--color-text-secondary)' }}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
