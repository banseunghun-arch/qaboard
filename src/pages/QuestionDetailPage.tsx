import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/common/PageLayout';
import { QuestionCard } from '../components/common/QuestionCard';
import { UnauthorizedState } from '../components/common/UnauthorizedState';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { MOCK_QUESTIONS, MOCK_ANSWERS } from '../utils/mock-data';

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const question = MOCK_QUESTIONS.find((q) => q.id === id);
  const answer = MOCK_ANSWERS.find((a) => a.question_id === id);

  if (!user) {
    return (
      <PageLayout>
        <div style={{ padding: 'var(--padding-h)' }}>
          <UnauthorizedState onNavigate={() => navigate('/')} />
        </div>
      </PageLayout>
    );
  }

  if (!question) {
    return (
      <PageLayout>
        <div style={{ padding: 'var(--padding-h)' }}>
          <UnauthorizedState onNavigate={() => navigate('/questions')} />
        </div>
      </PageLayout>
    );
  }

  const canAccess = role === 'admin' || (role === 'member' && question.created_by === user.id);

  if (!canAccess) {
    return (
      <PageLayout>
        <div style={{ padding: 'var(--padding-h)' }}>
          <UnauthorizedState onNavigate={() => navigate('/questions')} />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div style={{ padding: 'var(--padding-h)' }}>
        <div style={{ maxWidth: 'var(--max-detail-width)', margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: 'var(--spacing-lg)', fontSize: 'var(--font-size-label)' }}>
            <a href="/questions" style={{ cursor: 'pointer' }}>
              질문 목록
            </a>
            {' / '}
            <span>{question.title}</span>
          </div>

          {/* Question Card */}
          <QuestionCard question={question} />

          {/* Answer Section */}
          <div style={{ marginTop: 'var(--spacing-3xl)' }}>
            <h2
              style={{
                fontSize: 'var(--font-size-section-title)',
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--color-primary-navy)',
              }}
            >
              답변
            </h2>

            {!answer ? (
              <EmptyState
                title="아직 답변이 없습니다"
                description="관리자가 확인하고 답변을 올려드릴 예정입니다."
              />
            ) : (
              <div
                style={{
                  background: 'var(--color-status-completed-bg)',
                  padding: 'var(--spacing-xl)',
                  paddingLeft: 'var(--spacing-2xl)',
                  borderRadius: 'var(--border-radius-lg)',
                  boxShadow: 'var(--shadow-sm)',
                  borderLeft: '4px solid var(--color-status-completed)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'var(--color-status-completed)',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: 'var(--font-size-caption)',
                      fontWeight: 'var(--font-weight-semibold)',
                      marginRight: 'var(--spacing-md)',
                    }}
                  >
                    답변 완료
                  </span>
                  <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-secondary)' }}>
                    {new Date(answer.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
                <p
                  style={{
                    color: 'var(--color-text-body)',
                    lineHeight: 'var(--line-height-relaxed)',
                    margin: 0,
                    fontSize: 'var(--font-size-body)',
                  }}
                >
                  {answer.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
