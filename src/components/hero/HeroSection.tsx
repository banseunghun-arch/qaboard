import React from 'react';
import { useResponsive } from '../../hooks/useResponsive';

export const HeroSection: React.FC = () => {
  const isMobile = useResponsive('(max-width: 767px)');

  return (
    <section
      style={{
        padding: 'var(--spacing-3xl) var(--padding-h)',
        background: 'linear-gradient(135deg, #0d47a1 0%, #5e35b1 50%, #0277bd 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? '500px' : '600px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.08,
        }}
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <div
        style={{
          maxWidth: '700px',
          position: 'relative',
          zIndex: 2,
          color: 'white',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--font-size-hero-title)',
            fontWeight: 'var(--font-weight-bold)',
            margin: '0 0 var(--spacing-md) 0',
            lineHeight: 'var(--line-height-title)',
          }}
        >
          질문은 빠르게, 답변은 명확하게.
        </h1>

        <p
          style={{
            fontSize: isMobile ? '16px' : '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 var(--spacing-2xl) 0',
            lineHeight: 'var(--line-height-body)',
          }}
        >
          궁금한 점을 남기면 관리자가 확인하고 답변해드립니다.
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <button
            style={{
              backgroundColor: 'white',
              color: '#0d47a1',
              padding: 'var(--button-padding)',
              borderRadius: 'var(--border-radius-md)',
              border: 'none',
              fontSize: 'var(--font-size-label)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
            }}
          >
            질문 작성하기
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: 'var(--button-padding)',
              borderRadius: 'var(--border-radius-md)',
              border: '1px solid white',
              fontSize: 'var(--font-size-label)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
            }}
          >
            내 질문 확인하기
          </button>
        </div>
      </div>
    </section>
  );
};
