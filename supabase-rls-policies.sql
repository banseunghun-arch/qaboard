-- ============================================
-- QANOW RLS (Row Level Security) 정책
-- spec.md 기준:
-- - Guest: 조회 불가
-- - Member: 자신의 질문만 조회/작성, 답변 전에만 수정/삭제
-- - Admin: 모든 데이터 조회, 삭제 권한
-- ============================================

-- ============================================
-- USERS 테이블 RLS 정책
-- ============================================

-- Users SELECT: 로그인 사용자는 자신의 정보, Admin은 모두 볼 수 있음
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admin can view all users"
  ON users FOR SELECT
  USING (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- Users UPDATE: 자신의 정보만 수정 가능
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- QUESTIONS 테이블 RLS 정책
-- ============================================

-- Questions SELECT: Member는 자신의 질문, Admin은 모든 질문
CREATE POLICY "Members can view own questions"
  ON questions FOR SELECT
  USING (
    created_by = auth.uid()
    OR (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- Questions INSERT: 로그인한 사용자는 자신의 질문 작성 가능
CREATE POLICY "Users can create questions"
  ON questions FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND created_by = auth.uid()
  );

-- Questions UPDATE: 자신의 질문만 수정 가능 (답변이 없을 때만)
CREATE POLICY "Users can update own questions without answers"
  ON questions FOR UPDATE
  USING (
    created_by = auth.uid()
    AND NOT EXISTS (
      SELECT 1 FROM answers WHERE question_id = questions.id
    )
  )
  WITH CHECK (
    created_by = auth.uid()
    AND NOT EXISTS (
      SELECT 1 FROM answers WHERE question_id = questions.id
    )
  );

-- Questions DELETE: Admin만 삭제 가능
CREATE POLICY "Admin can delete any questions"
  ON questions FOR DELETE
  USING (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- ============================================
-- ANSWERS 테이블 RLS 정책
-- ============================================

-- Answers SELECT: Member는 자신의 질문에 달린 답변, Admin은 모든 답변
CREATE POLICY "Users can view answers for their questions"
  ON answers FOR SELECT
  USING (
    (SELECT created_by FROM questions WHERE id = question_id) = auth.uid()
    OR (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- Answers INSERT: Admin만 답변 작성 가능
CREATE POLICY "Admin can create answers"
  ON answers FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
    AND (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
    AND created_by = auth.uid()
  );

-- Answers UPDATE: Admin만 답변 수정 가능
CREATE POLICY "Admin can update answers"
  ON answers FOR UPDATE
  USING (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  )
  WITH CHECK (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- Answers DELETE: Admin만 답변 삭제 가능
CREATE POLICY "Admin can delete answers"
  ON answers FOR DELETE
  USING (
    (SELECT role FROM users WHERE id = auth.uid() LIMIT 1) = 'admin'
  );

-- ============================================
-- 테스트용 더미 데이터 삽입 (선택사항)
-- ============================================

-- 사용자 생성 (Auth 없이 직접 insert - 테스트용)
-- INSERT INTO users (id, email, name, role) VALUES
-- ('user-member-1', 'member@example.com', '김회원', 'member'),
-- ('user-admin-1', 'admin@example.com', '관리자', 'admin');
