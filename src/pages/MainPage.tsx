import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/common/PageLayout';
import { Button } from '../components/common/Button';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--gradient-aurora)',
          color: 'white',
          padding: 'var(--spacing-3xl) var(--padding-h)',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '700px' }}>
          <h1
            style={{
              fontSize: 'var(--font-size-hero-title)',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            질문은 빠르게, 답변은 명확하게.
          </h1>
          <p
            style={{
              fontSize: 'var(--font-size-body-lg)',
              marginBottom: 'var(--spacing-2xl)',
            }}
          >
            궁금한 점을 남기면 관리자가 확인하고 답변해드립니다.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <Button onClick={() => navigate('/questions')}>질문 작성하기</Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/questions')}
              style={{ borderColor: 'white', color: 'white' }}
            >
              내 질문 확인하기
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: 'var(--spacing-3xl) var(--padding-h)' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'var(--font-size-page-title)',
            marginBottom: 'var(--spacing-2xl)',
          }}
        >
          3단계로 진행됩니다
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-2xl)',
          }}
        >
          {['1. 질문 작성', '2. 관리자 확인', '3. 답변 확인'].map((item) => (
            <div
              key={item}
              style={{
                textAlign: 'center',
                padding: 'var(--spacing-xl)',
                background: 'white',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  background: 'var(--color-primary-navy)',
                  color: 'white',
                  width: 'var(--size-icon-badge)',
                  height: 'var(--size-icon-badge)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--font-size-card-title)',
                  margin: '0 auto var(--spacing-md)',
                  transition: 'transform 0.3s ease',
                }}
              >
                {item[0]}
              </div>
              <p style={{ margin: 0, color: 'var(--color-text-primary)', fontWeight: '500' }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section
        style={{
          padding: 'var(--spacing-3xl) var(--padding-h)',
          background: 'var(--color-bg-page)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'var(--font-size-page-title)',
            marginBottom: 'var(--spacing-2xl)',
          }}
        >
          핵심 가치
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-2xl)',
          }}
        >
          {['빠른 응답', '신뢰성', '접근성'].map((value) => (
            <div
              key={value}
              style={{
                padding: 'var(--spacing-xl)',
                background: 'white',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <p
                style={{
                  fontSize: 'var(--font-size-section-title)',
                  fontWeight: 'bold',
                  color: 'var(--color-primary-navy)',
                  margin: 0,
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
