export interface User {
  id: string;
  email: string;
  name: string;
  role: 'member' | 'admin';
  created_at: Date;
}

export type QuestionStatus = 'pending' | 'completed' | 'closed';

export interface Question {
  id: string;
  created_by: string;
  title: string;
  content: string;
  status: QuestionStatus;
  created_at: Date;
  updated_at: Date;
  author?: User;
}

export interface Answer {
  id: string;
  question_id: string;
  created_by: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  author?: User;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
