import React from 'react';
import { Button } from './Button';

interface HeaderProps {
  user?: { id: string; name: string } | null;
  role?: 'member' | 'admin' | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, role, onLogout }) => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--spacing-lg) var(--padding-h)',
        background: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', textDecoration: 'none' }} aria-label="QANOW 홈으로">
        <div
          style={{
            width: 'var(--size-logo)',
            height: 'var(--size-logo)',
            backgroundColor: 'var(--color-primary-navy)',
            borderRadius: '50%',
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontWeight: 'var(--font-weight-bold)',
            fontSize: 'var(--font-size-section-title)',
            color: 'var(--color-primary-navy)',
          }}
        >
          QANOW
        </span>
      </a>

      <nav style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
        {!user ? (
          <>
            <a href="/login" style={{ color: 'var(--color-primary-navy)' }}>
              로그인
            </a>
          </>
        ) : (
          <>
            <span style={{ color: 'var(--color-text-body)' }}>
              {user.name} ({role === 'admin' ? '관리자' : '회원'})
            </span>
            <Button variant="secondary" onClick={onLogout}>
              로그아웃
            </Button>
          </>
        )}
      </nav>
    </header>
  );
};
