import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/common/PageLayout';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Button } from '../components/common/Button';
import { UnauthorizedState } from '../components/common/UnauthorizedState';
import { useAuth } from '../hooks/useAuth';
import { MOCK_QUESTIONS } from '../utils/mock-data';

export default function QuestionCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return (
      <PageLayout>
        <div style={{ padding: 'var(--padding-h)' }}>
          <UnauthorizedState onNavigate={() => navigate('/')} />
        </div>
      </PageLayout>
    );
  }

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle.length === 0) {
      newErrors.title = '제목을 입력해주세요';
    } else if (trimmedTitle.length < 1 || trimmedTitle.length > 100) {
      newErrors.title = '제목은 1~100자 사이여야 합니다';
    }

    if (trimmedContent.length === 0) {
      newErrors.content = '내용을 입력해주세요';
    } else if (trimmedContent.length < 1 || trimmedContent.length > 5000) {
      newErrors.content = '내용은 1~5000자 사이여야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 임시: Mock 데이터에 추가 (실제로는 Supabase에 저장)
      const newQuestion = {
        id: `${Math.max(...MOCK_QUESTIONS.map((q) => parseInt(q.id, 10))) + 1}`,
        created_by: user.id,
        title: title.trim(),
        content: content.trim(),
        status: 'pending' as const,
        created_at: new Date(),
        updated_at: new Date(),
        author: user,
      };

      MOCK_QUESTIONS.push(newQuestion);

      // 성공 후 목록 페이지로 이동
      navigate('/questions', { state: { successMessage: '질문이 등록되었습니다' } });
    } catch (error) {
      setErrors({ title: '질문 등록 중 오류가 발생했습니다' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/questions');
  };

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
            <span>새 질문</span>
          </div>

          {/* Form */}
          <div
            style={{
              background: 'white',
              padding: 'var(--spacing-2xl)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <h1
              style={{
                fontSize: 'var(--font-size-page-title)',
                marginBottom: 'var(--spacing-2xl)',
                color: 'var(--color-primary-navy)',
              }}
            >
              질문 작성
            </h1>

            <form onSubmit={handleSubmit}>
              <Input
                label="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="질문의 제목을 입력해주세요"
                error={errors.title}
                maxLength={100}
              />

              <div style={{ marginBottom: 'var(--spacing-2xl)' }} />

              <Textarea
                label="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="상세한 내용을 입력해주세요"
                error={errors.content}
                maxLength={5000}
              />

              {/* Form Actions */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                  marginTop: 'var(--spacing-2xl)',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  질문 등록
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
