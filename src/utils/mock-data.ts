import type { User, Question, Answer } from '../types/models';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'member1@example.com',
    name: '김회원',
    role: 'member',
    created_at: new Date('2025-01-01'),
  },
  {
    id: 'user-2',
    email: 'member2@example.com',
    name: '이회원',
    role: 'member',
    created_at: new Date('2025-01-05'),
  },
  {
    id: 'admin-1',
    email: 'admin@example.com',
    name: '관리자',
    role: 'admin',
    created_at: new Date('2024-12-01'),
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    created_by: 'user-1',
    title: '배송은 며칠 걸리나요?',
    content: '일반 배송으로 주문했는데 언제쯤 받을 수 있을까요?',
    status: 'pending',
    created_at: new Date('2025-08-29'),
    updated_at: new Date('2025-08-29'),
    author: MOCK_USERS[0],
  },
  {
    id: '2',
    created_by: 'user-2',
    title: '환불 정책은 어떻게 되나요?',
    content: '마음에 안 들면 환불 가능한가요?',
    status: 'completed',
    created_at: new Date('2025-08-27'),
    updated_at: new Date('2025-08-28'),
    author: MOCK_USERS[1],
  },
  {
    id: '3',
    created_by: 'user-1',
    title: '다양한 색상이 있나요?',
    content: '파란색 외에 다른 색상이 있는지 궁금합니다.',
    status: 'pending',
    created_at: new Date('2025-08-25'),
    updated_at: new Date('2025-08-25'),
    author: MOCK_USERS[0],
  },
  {
    id: '4',
    created_by: 'user-2',
    title: '국제 배송은 가능한가요?',
    content: '해외로도 배송 가능한가요?',
    status: 'completed',
    created_at: new Date('2025-08-20'),
    updated_at: new Date('2025-08-21'),
    author: MOCK_USERS[1],
  },
  {
    id: '5',
    created_by: 'user-1',
    title: '할인이 있나요?',
    content: '신규 고객 할인이나 정기 구독 할인이 있나요?',
    status: 'closed',
    created_at: new Date('2025-08-15'),
    updated_at: new Date('2025-08-16'),
    author: MOCK_USERS[0],
  },
];

export const MOCK_ANSWERS: Answer[] = [
  {
    id: 'ans-1',
    question_id: '2',
    created_by: 'admin-1',
    content: '평균 3-5일 내 배송되며, 추적 정보는 이메일로 안내됩니다.',
    created_at: new Date('2025-08-28'),
    updated_at: new Date('2025-08-28'),
    author: MOCK_USERS[2],
  },
  {
    id: 'ans-2',
    question_id: '4',
    created_by: 'admin-1',
    content: '네, 국제 배송도 가능합니다. 추가 배송비가 발생합니다.',
    created_at: new Date('2025-08-21'),
    updated_at: new Date('2025-08-21'),
    author: MOCK_USERS[2],
  },
];
