# QANOW 구현 준비도 체크리스트

**목적**: spec.md, design.md, implementation-plan.md가 구현 시작에 충분한지 검증  
**작성일**: 2025-08-29  
**상태**: 준비도 검사

---

## 1. 사용자 역할이 명확한가

### ✅ 확인 사항

| 항목 | 출처 | 상태 | 세부사항 |
|------|------|------|---------|
| **회원 (Member)** | spec.md §Persona 1, §User Roles & Permissions | ✓ 명확 | 질문 작성/수정/삭제(미답변), 답변 조회 |
| **관리자 (Admin)** | spec.md §Persona 2, §User Roles & Permissions | ✓ 명확 | 모든 질문/답변 조회, 답변 작성/수정, 부적절 콘텐츠 삭제 |
| **비회원 (Guest)** | spec.md §Persona 3 | ✓ 명확 | 메인 페이지만 조회, 질문/답변 불가 |

### 📋 구현 준비도

- [x] 역할별 권한 명시적 정의됨
- [x] 역할별 액션 목록 완성
- [x] design.md에서 UI 분기점 명시됨 (§6 회원/관리자 상태 차이)
- [x] implementation-plan.md에서 AuthContext로 역할 관리 계획됨

### 결론: **✓ 준비 완료**

---

## 2. 회원과 관리자 데이터 범위가 명확한가

### ✅ 확인 사항

| 항목 | 정의 | 상태 |
|------|------|------|
| **회원이 조회 가능한 데이터** | spec.md §Read Questions: "자신의 질문만" | ✓ 명확 |
| **관리자가 조회 가능한 데이터** | spec.md §Read Questions: "모든 회원의 질문" | ✓ 명확 |
| **답변 시각 범위** | spec.md §Read Answers: 작성일, 작성자 명시 | ✓ 명확 |
| **목록에서의 작성자 표시** | design.md §11: 회원은 표시 안 함, 관리자는 표시 | ✓ 명확 |

### 📊 데이터 범위 매트릭스

```
회원 (Member):
  ├─ 자신의 질문 (전체 필드)
  ├─ 자신의 질문에 대한 관리자 답변
  └─ 타인의 데이터: 불가

관리자 (Admin):
  ├─ 모든 질문 (작성자 포함)
  ├─ 모든 답변 (조회/수정/삭제)
  └─ 사용자 프로필 (조회만, 향후)
```

### 📋 구현 준비도

- [x] 회원 데이터 필터링 규칙 정의됨 (spec.md §II Data-Layer)
- [x] RLS 정책 SQL 작성됨 (implementation-plan.md §12)
- [x] useQuestions, useAnswers 쿼리 계획됨
- [x] Mock 데이터로 UI 검증 가능하게 설계됨

### 결론: **✓ 준비 완료**

---

## 3. 답변 전후 수정·삭제 규칙이 명확한가

### ✅ 확인 사항

| 조건 | 회원 수정 | 회원 삭제 | 관리자 삭제 | 출처 |
|------|---------|---------|----------|------|
| **미답변 (pending)** | ✓ 가능 | ✓ 가능 | ✓ 가능 | spec.md §Update/Delete Question |
| **답변 완료 (answered)** | ✗ 불가 | ✗ 불가 | ✓ 가능 | spec.md §Precondition |
| **닫힘 (closed)** | ✗ 불가 | ✗ 불가 | ✓ 가능 | spec.md §User Roles |

### 📋 구현 준비도

- [x] 상태별 액션 명시적 정의 (spec.md §3 Answer Management)
- [x] UI에서 조건부 버튼 표시 계획 (design.md §13)
- [x] RLS 정책에서 상태 검증 (implementation-plan.md: `AND status = 'pending'`)
- [x] 에러 메시지 정의됨 (spec.md: "이미 답변이 있습니다. 수정을 선택하세요")

### 결론: **✓ 준비 완료**

---

## 4. 권한 없는 접근 처리가 정의되어 있는가

### ✅ 확인 사항

| 시나리오 | HTTP 상태 | UI 표시 | 메시지 | 출처 |
|--------|---------|--------|--------|------|
| **회원이 타인 질문 접근** | 403 | UnauthorizedState | "이 질문에 접근할 수 없습니다" | spec.md §Clarification Q4, design.md §14 |
| **비회원이 보호 페이지 접근** | 401 | 로그인 페이지로 리다이렉트 | - | spec.md §Login |
| **회원이 답변 작성 시도** | 403 | 폼 표시 안 됨 | - | spec.md §User Roles: "답변 작성 불가" |

### 📋 구현 준비도

- [x] HTTP 상태 코드 명시 (spec.md §Security & Access Control)
- [x] UnauthorizedState 컴포넌트 설계 (design.md §14)
- [x] RLS 정책에서 거부 처리 (implementation-plan.md: `USING` 절)
- [x] UI에서 권한 없으면 버튼 숨김 (design.md §회원과 관리자 상태 차이)
- [x] 네비게이션: 목록으로 돌아가기 링크 (design.md §14 "내 질문 목록으로")

### 결론: **✓ 준비 완료**

---

## 5. 입력 길이와 빈 값 처리가 정의되어 있는가

### ✅ 확인 사항

| 필드 | 최소 | 최대 | 빈 값 | 검증 레이어 | 출처 |
|------|-----|------|------|-----------|------|
| **질문 제목** | 1 | 100 | 불가 | 클라이언트+서버 | spec.md §Input Validation Rules |
| **질문 내용** | 1 | 5000 | 불가 | 클라이언트+서버 | spec.md §Input Validation Rules |
| **답변 내용** | 1 | 5000 | 불가 | 클라이언트+서버 | spec.md §Input Validation Rules |
| **XSS 방지** | - | - | - | 서버 (필터링) | spec.md §Input Validation + constitution.md §III |

### 📋 구현 준비도

- [x] 길이 제한 명시 (spec.md §13: "공백 제거 후")
- [x] 에러 메시지 정의 (spec.md: "제목은 100자 이내여야 합니다")
- [x] 클라이언트 검증 함수 계획 (implementation-plan.md §13: validateQuestion)
- [x] 실시간 글자 수 표시 계획 (design.md에서 카운터 표시)
- [x] XSS 패턴 필터링 명시 (spec.md: `<script>`, `onclick=` 등)
- [x] 서버 검증은 Supabase trigger 또는 API 핸들러 (향후 계획)

### 결론: **✓ 준비 완료**

---

## 6. 성공 기준이 측정 가능한가

### ✅ 확인 사항

| 기준 | 정의 | 측정 방법 | 출처 |
|------|------|---------|------|
| **기능 완성** | 8가지 CRUD 기능 | 체크리스트 (spec.md §704-713) | spec.md §Acceptance Criteria |
| **권한 제어** | 회원/관리자 분리 | RLS 테스트 + E2E | constitution.md §I, II |
| **UI 일관성** | 3개 화면 통일 | 컴포넌트 재사용 검증 | constitution.md §V |
| **성능** | LCP < 2.5초 | Lighthouse / 개발자 도구 | spec.md §529-530 |
| **접근성** | WCAG AA | 색상 대비 4.5:1, 포커스 표시 | design.md §21, §23 |

### 📋 구현 준비도

- [x] Functional Success 체크리스트 명시 (spec.md §509-515)
- [x] Usability Success 정의됨 (spec.md §517-521)
- [x] Accessibility Success 정의됨 (spec.md §523-527)
- [x] Performance Success 명시됨 (spec.md §529-532)
- [x] Data Integrity Success 정의됨 (spec.md §534-537)
- [x] design.md §24에서 검증 체크리스트 제공 (색상, 타이포, 레이아웃, 반응형, 접근성)

### 결론: **✓ 준비 완료**

---

## 7. 제외 범위가 명확한가

### ✅ 확인 사항

| 항목 | 상태 | 명시 위치 |
|------|------|---------|
| **파일 첨부** | MVP 제외 | spec.md §Out of Scope |
| **댓글 기능** | MVP 제외 | spec.md §Out of Scope |
| **검색** | MVP 제외 (필터링만) | spec.md §Out of Scope |
| **페이지네이션** | MVP 제외 (스크롤/더보기) | spec.md §Out of Scope |
| **소셜 로그인** | MVP 제외 | spec.md §Out of Scope |
| **통계 대시보드** | MVP 제외 | spec.md §Out of Scope |
| **메일 알림** | MVP 제외 | spec.md §Assumptions & Out of Scope |
| **카테고리/태그** | MVP 제외 | spec.md §Out of Scope |

### 📋 구현 준비도

- [x] MVP 제외 항목 명확히 나열됨 (spec.md §552-562)
- [x] Assumptions 섹션에서 향후 추가 항목 명시됨 (spec.md §541-548)
- [x] constitution.md §IV (Specification Compliance)에서 스코프 확대 금지 명시
- [x] 구현 계획에서 Phase 1-2만 계획되고 향후 Phase 3+ 대비 구조 설계

### 결론: **✓ 준비 완료**

---

## 8. 세 핵심 화면의 정보 구조가 design.md에 정의되어 있는가

### ✅ 확인 사항

| 화면 | 정보 구조 | 레이아웃 | 컴포넌트 | 상태 |
|------|---------|---------|---------|------|
| **메인 페이지** | design.md §4 (Hero + Process + Values + Footer) | design.md §4 (레이아웃 다이어그램) | design.md §9, §10 (Hero 상세) | ✓ 완성 |
| **질문 리스트** | design.md §4 (필터 + 카드 목록) | design.md §4 (카드 리스트 구조) | design.md §11 (카드 구조) | ✓ 완성 |
| **질문 상세** | design.md §4 (Q&A 섹션) | design.md §4 (상세 레이아웃) | design.md §13 (Q&A 상세) | ✓ 완성 |

### 📋 구현 준비도

- [x] 정보 구조 명시적 정의 (design.md §4)
- [x] 계층도 제공 (design.md §4 "화면 계층도")
- [x] 메타 정보 (작성일, 상태, 작성자) 위치 명시 (design.md §11, §13)
- [x] 역할별 차이 명시 (design.md §6 표)
- [x] 상태 표시 (배지, 텍스트) 위치 명시 (design.md §11, §13)
- [x] 액션 버튼 (수정/삭제/답변하기) 위치 명시 (design.md §13)

### 결론: **✓ 준비 완료**

---

## 9. 디자인 토큰을 실제 CSS로 변환하는 계획이 있는가

### ✅ 확인 사항

| 토큰 | design.md 정의 | implementation-plan.md 구현 | 상태 |
|------|----------------|---------------------------|------|
| **색상** | §15 (모든 색상 정의) | §3 (CSS 변수 코드) | ✓ 완성 |
| **타이포그래피** | §16 (크기, weight, line-height) | §3 (변수 정의) | ✓ 완성 |
| **간격** | §18 (4px~48px scale) | §3 (변수 정의) | ✓ 완성 |
| **Breakpoint** | §20 (375px/768px/1024px) | §3 (변수 정의) | ✓ 완성 |
| **컴포넌트 스타일** | §19 (Button/Input/Card/Badge) | §4 (코드 예시) | ✓ 완성 |

### 📋 구현 준비도

- [x] variables.css 예시 제공 (implementation-plan.md §3)
- [x] CSS 변수 사용 예시 제공 (Button, Input, Card 컴포넌트)
- [x] 반응형 변수 정의 (모바일/태블릿/데스크톱)
- [x] 토큰명 일관성 (--color-primary-navy 등)
- [x] 매체쿼리와 함께 정의 (@media 블록)

### 결론: **✓ 준비 완료**

---

## 10. 메인 Hero 시각 효과의 구현 범위가 정의되어 있는가

### ✅ 확인 사항

| 효과 | 설계 | 구현 계획 | 상태 |
|------|------|---------|------|
| **Aurora Gradient** | design-brief.md §10, design.md §10 (135도, 3색) | implementation-plan.md §5 (SVG 없이 CSS gradient) | ✓ 명확 |
| **Grid Pattern** | design-brief.md §10, design.md §10 (opacity 0.08) | implementation-plan.md §5 (SVG inline) | ✓ 명확 |
| **Floating Cards** | design-brief.md §10, design.md §10 (우측, 데스크톱만) | implementation-plan.md §5 (position absolute, 모바일 숨김) | ✓ 명확 |
| **애니메이션** | design-brief.md §15 (없음) | implementation-plan.md §7 (prefers-reduced-motion) | ✓ 명확 |
| **성능** | spec.md §530 (LCP < 2.5초) | CSS만 사용 (자바스크립트 애니 없음) | ✓ 명확 |

### 📋 구현 준비도

- [x] 그라데이션 색상 정확히 정의 (#0d47a1, #5e35b1, #0277bd)
- [x] 그리드 패턴 SVG 구조 명시 (40px × 40px)
- [x] 플로팅 카드 배치 명시 (right 5%, top 50%, transform translateY)
- [x] 모바일에서 카드 숨김 (display: none)
- [x] 실제 코드 예시 제공 (HeroSection, GridPattern, FloatingCards)

### 결론: **✓ 준비 완료**

---

## 11. prefers-reduced-motion 대응이 정의되어 있는가

### ✅ 확인 사항

| 항목 | 정의 | 구현 계획 | 상태 |
|------|------|---------|------|
| **CSS 규칙** | design-brief.md §18, design.md §22 | implementation-plan.md §7 (motion.css 코드) | ✓ 완성 |
| **애니메이션 비활성화** | design.md §22 ("animation: none !important") | implementation-plan.md §7 (CSS) | ✓ 완성 |
| **로딩 스피너** | design.md §22 (회전 없음) | implementation-plan.md §7 (border-top-color 변경) | ✓ 완성 |
| **Transition 비활성화** | design.md §22 ("transition: none !important") | implementation-plan.md §7 (CSS) | ✓ 완성 |
| **JavaScript 감지** | constitution.md §VI (Motion Safety) | implementation-plan.md §7 (window.matchMedia) | ✓ 완성 |

### 📋 구현 준비도

- [x] CSS 정책 명시 (design.md §22)
- [x] 구체적 CSS 코드 제공 (implementation-plan.md §7)
- [x] 로딩 스피너 대안 정의 (회전 대신 색상 변경)
- [x] React에서 감지 방법 제시 (window.matchMedia)
- [x] 테스트 방법 명시 (OS 설정 변경)

### 결론: **✓ 준비 완료**

---

## 12. Loading, Empty, Error, Unauthorized 상태가 정의되어 있는가

### ✅ 확인 사항

| 상태 | design.md 정의 | implementation-plan.md 구현 | 상태 |
|------|----------------|---------------------------|------|
| **Loading** | §14 (스피너 + 텍스트) | §8 (LoadingState 컴포넌트 코드) | ✓ 완성 |
| **Empty** | §14 (파란 배경 메시지) | §8 (EmptyState 컴포넌트 코드) | ✓ 완성 |
| **Error** | §14 (빨강 배경 배너) | §8 (ErrorState 컴포넌트 코드) | ✓ 완성 |
| **Unauthorized (403)** | §14 (경고 아이콘 + 메시지) | §8 (UnauthorizedState 컴포넌트 코드) | ✓ 완성 |

### 📋 구현 준비도

- [x] 각 상태의 시각 정의 (배경색, 아이콘, 텍스트)
- [x] 배경색 정확히 정의 (Loading: 무색, Empty: #f0f9ff, Error: #fef2f2)
- [x] 메시지 텍스트 명시 (spec.md §14)
- [x] CTA 버튼 위치 명시 (Empty에만)
- [x] 실제 React 코드 제공
- [x] 접근성 고려 (색상 + 텍스트 + 아이콘)

### 결론: **✓ 준비 완료**

---

## 13. 회원과 관리자 UI 차이가 정의되어 있는가

### ✅ 확인 사항

| 화면 | 회원 UI | 관리자 UI | 정의 위치 |
|------|--------|---------|---------|
| **질문 리스트** | 필터 없음, 자신의 질문만 | 필터 바 있음, 모든 질문 + 작성자 | design.md §6, spec.md §List |
| **질문 카드** | 제목/날짜/상태 | 제목/작성자/날짜/상태 | design.md §6 표 |
| **카드 액션** | 상세보기 링크 | 상세보기 + 답변하기 버튼 | design.md §6 표 |
| **질문 상세** | 수정/삭제 (미답변만) | 삭제 (항상) | design.md §6, §13 |
| **답변 영역** | Empty 메시지만 보임 | 폼 또는 기존 답변 수정 | design.md §13 |
| **네비게이션** | "내 질문" | "질문 목록" | design.md §7 |

### 📋 구현 준비도

- [x] 권한별 UI 분기 명시적 정의 (design.md §6)
- [x] 동일 URL 다른 컴포넌트 계획 (implementation-plan.md §2: useAuth().role으로 분기)
- [x] 조건부 버튼 표시 계획 (design.md §13)
- [x] 필터 컴포넌트 위치 정의 (design.md §11)
- [x] 작성자 필드 조건부 표시 (design.md §11: showAuthor prop)
- [x] 상태별 액션 메트릭스 (implementation-plan.md §11)

### 결론: **✓ 준비 완료**

---

## 14. UI Mock 구현 후 /design-sync를 실행하는 순서가 정의되어 있는가

### ✅ 확인 사항

| 단계 | 활동 | 산출물 | 정의 |
|------|------|--------|------|
| **Phase 1: UI Component** | CSS + 공통 컴포넌트 + 페이지 (Mock 데이터) | 세 화면 완성 | implementation-plan.md §15 |
| **Phase 2: Design Sync** | design.md와 UI 비교 검증 | 검증 보고서 | implementation-plan.md §16 |
| **Phase 3: Supabase 연결** | 실제 데이터 연결 | 기능 완성 | implementation-plan.md §15 (Phase 3) |

### 📋 구현 준비도

- [x] 단계별 타이밍 명시 (implementation-plan.md: "Week 5: Design Sync")
- [x] Mock 데이터 위치 정의 (implementation-plan.md §15: src/utils/mock-data.ts)
- [x] /design-sync 검증 항목 명시 (implementation-plan.md §16: 9개 항목)
- [x] 각 Phase 기간 명시 (주차별 할당)
- [x] Mock 데이터로 UI 검증 가능하게 설계 (implementation-plan.md §2: 역할별 페이지 분기)
- [x] 실제 데이터 없이도 세 화면 전부 검증 가능 (QuestionCard, Badge, states 등)

### 결론: **✓ 준비 완료**

---

## 15. Supabase 연결이 design-sync 이후에 진행되도록 계획되어 있는가

### ✅ 확인 사항

| 단계 | 활동 | 의존성 | 상태 |
|------|------|--------|------|
| **1-4주: UI 구현** | Mock 데이터로 세 화면 완성 | 디자인 규칙만 필요 | ✓ 정의됨 |
| **5주: Design Sync** | design.md와 비교 검증 | UI 완성 필요 | ✓ 정의됨 |
| **6-7주: Supabase 연결** | 스키마 + RLS + 쿼리 함수 | Design Sync 완료 | ✓ 정의됨 |

### 📋 구현 준비도

- [x] 순서 명시 (implementation-plan.md §15: Phase 1 → 2 → 3)
- [x] 각 Phase 독립적 진행 가능 (Phase 1은 Mock 데이터로 실행)
- [x] Supabase 스키마 사전 정의 (implementation-plan.md §10)
- [x] RLS 정책 사전 작성 (implementation-plan.md §12)
- [x] 쿼리 함수 구조 사전 정의 (implementation-plan.md §3: useQuestions, useAnswers)
- [x] 로컬 Supabase 테스트 방법 제시 (implementation-plan.md §17: supabase start)

### 결론: **✓ 준비 완료**

---

## 종합 평가

### 📊 항목별 준비도

| # | 항목 | 상태 | 비고 |
|---|------|------|------|
| 1 | 사용자 역할 명확성 | ✓ 완료 | 3개 역할 명시적 정의 |
| 2 | 데이터 범위 명확성 | ✓ 완료 | 회원/관리자 필터링 정의 |
| 3 | 수정·삭제 규칙 | ✓ 완료 | 상태별 액션 명시 |
| 4 | 권한 없는 접근 처리 | ✓ 완료 | HTTP 403 + UI 정의 |
| 5 | 입력 검증 규칙 | ✓ 완료 | 길이/XSS 모두 정의 |
| 6 | 성공 기준 측정성 | ✓ 완료 | 체크리스트 형태 제공 |
| 7 | 제외 범위 명확성 | ✓ 완료 | MVP 제외 항목 나열 |
| 8 | 화면 정보 구조 | ✓ 완료 | 레이아웃 다이어그램 포함 |
| 9 | 디자인 토큰 변환 계획 | ✓ 완료 | CSS 변수 코드 제공 |
| 10 | Hero 효과 구현 범위 | ✓ 완료 | Aurora/Grid/Card 상세 정의 |
| 11 | prefers-reduced-motion | ✓ 완료 | CSS + React 코드 정의 |
| 12 | 상태 화면 (4개) | ✓ 완료 | 컴포넌트 코드 제공 |
| 13 | 회원/관리자 UI 차이 | ✓ 완료 | 테이블 형태 정의 |
| 14 | Design Sync 순서 | ✓ 완료 | Phase 2로 명시 |
| 15 | Supabase 연결 순서 | ✓ 완료 | Phase 3로 명시 |

### 최종 결론

## 🎯 **준비 상태: 구현 시작 완전 준비**

| 평가 항목 | 결과 |
|---------|------|
| **기능 명세** | ✅ 완전 정의 |
| **설계 규칙** | ✅ 완전 정의 |
| **구현 계획** | ✅ 완전 정의 |
| **순서 및 의존성** | ✅ 완전 정의 |
| **검증 기준** | ✅ 완전 정의 |

### ✅ 즉시 시작 가능한 항목

1. **Phase 1 (UI Component 구현)** — Mock 데이터로 4주 내 완성 가능
   - CSS 변수 (variables.css) — 즉시 시작 가능
   - 공통 컴포넌트 (Button, Input, Badge) — 즉시 시작 가능
   - 페이지 (MainPage, ListPage, DetailPage) — 의존성 없음

2. **Mock 데이터 검증** — 실제 Supabase 없이 UI 검증 가능

3. **Design Sync** — UI 완성 후 design.md와 일치 확인 가능

### ⚠️ 주의사항

- Supabase 연결은 Design Sync 이후로 계획됨 (Phase 3)
- 현재 상태: 구현 초기화 및 설정만 필요
- 기술적 블로커 없음

---

**작성일**: 2025-08-29  
**검증자**: Claude Code  
**상태**: ✅ 구현 시작 승인  
**다음 단계**: Phase 1 UI Component 구현 시작
