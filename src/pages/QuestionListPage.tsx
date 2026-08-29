import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/common/PageLayout';
import { Button } from '../components/common/Button';
import { QuestionCard } from '../components/common/QuestionCard';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { MOCK_QUESTIONS } from '../utils/mock-data';

export default function QuestionListPage() {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [questions] = React.useState(MOCK_QUESTIONS);

  const filteredQuestions = React.useMemo(() => {
    if (role === 'member' && user) {
      return questions.filter((q) => q.created_by === user.id);
    }
    return questions;
  }, [questions, role, user]);

  if (!user) {
    return (
      <PageLayout>
        <div style={{ padding: 'var(--padding-h)' }}>
          <EmptyState
            title="로그인이 필요합니다"
            description="질문을 보려면 먼저 로그인해주세요."
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div style={{ padding: 'var(--padding-h)' }}>
        <div
          style={{
            maxWidth: 'var(--max-detail-width)',
            margin: '0 auto',
            marginBottom: 'var(--spacing-2xl)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ fontSize: 'var(--font-size-page-title)', margin: 0 }}>질문 목록</h1>
          <Button onClick={() => navigate('/')}>+ 질문 작성</Button>
        </div>

        {filteredQuestions.length === 0 ? (
          <EmptyState title="질문이 없습니다" description="첫 번째 질문을 작성해보세요!" />
        ) : (
          <div style={{ maxWidth: 'var(--max-detail-width)', margin: '0 auto' }}>
            {filteredQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onClick={() => navigate(`/questions/${q.id}`)}
                showAuthor={role === 'admin'}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
