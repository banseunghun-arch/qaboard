import React from 'react';

export const Footer: React.FC = () => (
  <footer
    style={{
      backgroundColor: 'var(--color-primary-navy)',
      color: 'white',
      textAlign: 'center',
      padding: 'var(--spacing-2xl) var(--padding-h)',
      marginTop: 'var(--spacing-3xl)',
    }}
  >
    <p style={{ margin: 0, fontSize: 'var(--font-size-body)' }}>© 2025 QANOW. 모든 권리 보유.</p>
  </footer>
);
