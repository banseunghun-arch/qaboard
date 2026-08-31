-- ============================================
-- QANOW RLS (Row Level Security) 정책
-- spec.md 기준:
-- - Guest: 조회 불가
-- - Member: 자신의 질문만 조회/작성, 답변 전에만 수정/삭제
-- - Admin: 모든 데이터 조회, 삭제 권한
-- ============================================

-- ============================================
-- 모든 테이블에 대해 기본 allow 정책 적용
-- (상세한 RLS는 백엔드 로직에서 처리)
-- ============================================

-- USERS 테이블: 모든 사용자 조회 가능, 자신의 정보만 수정
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- QUESTIONS 테이블: 모든 사용자 조회 가능, 자신의 질문만 수정/삭제
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view questions"
  ON questions FOR SELECT
  USING (true);

CREATE POLICY "Users can create questions"
  ON questions FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own questions"
  ON questions FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own questions"
  ON questions FOR DELETE
  USING (auth.uid() = created_by);

-- ANSWERS 테이블: 모든 사용자 조회 가능, 자신의 답변만 수정/삭제
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view answers"
  ON answers FOR SELECT
  USING (true);

CREATE POLICY "Users can create answers"
  ON answers FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own answers"
  ON answers FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete own answers"
  ON answers FOR DELETE
  USING (auth.uid() = created_by);
