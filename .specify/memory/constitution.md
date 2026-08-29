<!-- Sync Impact Report: constitution.md
Version: 0.0.0 → 1.0.0 (MINOR: Initial constitution with 13 core principles)
Type: New constitution document
Principles Added: 13 (Authority Separation, Data-Layer Enforcement, Input Validation, Spec Compliance, UI Consistency, Performance, Motion Safety, Keyboard Accessibility, Color+Text States, Responsive Design, MVP Priority, Task Traceability, Build/Test Requirements)
Sections Added: Core Principles, Quality & Accessibility, Development Practice, Governance
Deferred Items: None
-->

# QANOW Constitution

질의응답 게시판 플랫폼의 구축 원칙과 설계 철학

## Core Principles

### I. Authority Separation (권한 분리)

**Rule**: 회원(사용자)과 관리자의 권한을 명확히 분리하고, 역할 기반 접근 제어(RBAC)를 구현한다.

- 회원: 질문 작성, 답변 조회, 본인 질문 수정/삭제만 허용
- 관리자: 모든 질문/답변 조회, 부적절한 콘텐츠 수정/삭제, 공지사항 관리

**Rationale**: 명확한 권한 분리는 보안을 강화하고, 사용자 신뢰를 구축하며, 악의적 행동을 방지한다. 역할이 모호하면 권한 침해와 데이터 노출 위험이 증가한다.

**Review Criteria**:
- 각 역할의 액션이 명시적으로 정의되었는가?
- 권한 경계를 넘는 액션은 없는가?
- 거부된 액션 시 명확한 오류 메시지가 표시되는가?

---

### II. Data-Layer Authorization Enforcement (데이터 계층 권한 강제)

**Rule**: 권한 검사는 UI에서만 수행하지 않으며, 데이터베이스 쿼리 및 API 응답 계층에서 최종 강제한다.

- UI는 사용자 경험을 위해서만 권한 버튼/메뉴를 숨김
- 모든 API 엔드포인트는 요청 사용자의 권한을 재검증
- 데이터 쿼리는 사용자 역할에 따라 필터링하여 반환

**Rationale**: UI 권한 검사만으로는 클라이언트 해킹이나 직접 API 호출로 우회 가능하다. 데이터 계층에서 강제하면 어떤 경로로든 권한이 보장된다.

**Review Criteria**:
- API 핸들러에 권한 검증 로직이 있는가?
- 데이터베이스 쿼리에 역할 기반 필터가 적용되는가?
- 미인증/미인가 요청 시 적절한 HTTP 상태(401/403)를 반환하는가?
- 단위 테스트에서 권한 위반 케이스를 검증하는가?

---

### III. Input Validation (입력 검증)

**Rule**: 모든 사용자 입력은 클라이언트와 서버 모두에서 검증하며, 허용 목록 기반 검증을 우선한다.

- 질문/답변 텍스트: 최대 길이, 금지 패턴(스크립트, HTML), 빈 입력 검사
- 카테고리, 상태: 사전 정의된 옵션에서만 선택
- 파일 업로드(향후): MIME 타입, 파일 크기, 바이러스 스캔

**Rationale**: 검증되지 않은 입력은 XSS, SQL 인젝션, 데이터 무결성 훼손을 초래한다. 클라이언트 검증은 UX 개선, 서버 검증은 보안을 담당한다.

**Review Criteria**:
- 모든 API 엔드포인트가 입력 검증 미들웨어를 통과하는가?
- 거부된 입력에 구체적인 오류 메시지(예: "제목은 최소 5자 이상이어야 합니다")를 반환하는가?
- 테스트에서 유효하지 않은 입력을 커버하는가?
- 클라이언트에서도 실시간 검증 피드백을 제공하는가?

---

### IV. Specification Compliance (명세 준수)

**Rule**: 명세에 정의되지 않은 기능을 임의로 추가하지 않으며, 모든 기능은 요구사항 문서의 승인을 거친다.

- 기능 추가 전 `.specify` 문서에서 검토
- 설계 승인 없이 코드 작성 금지
- "편의 기능"이라는 이유로 스코프 확대 금지

**Rationale**: 과도한 기능 추가는 일정 지연, 버그 증가, 유지보수 복잡도 증가를 야기한다. MVP 원칙과 함께 빠른 배포와 명확한 제품 정의를 보장한다.

**Review Criteria**:
- PR 설명에 관련 요구사항 문서(링크 또는 ID)가 명시되는가?
- 코드 리뷰어가 명세 범위를 확인했는가?
- 명세 외 변경이 있다면 이슈로 분리되었는가?

---

### V. UI Consistency Across Core Screens (핵심 화면 일관성)

**Rule**: 세 핵심 화면(메인, 질문 목록, 질문 상세)의 정보 구조, 디자인, 상호작용 패턴을 일관되게 유지한다.

- 같은 정보는 같은 위치와 스타일로 표현
- 버튼, 입력, 카드 컴포넌트 재사용
- 색상, 타이포그래피, 간격(spacing) 토큰 공유
- 네비게이션 구조 동일

**Rationale**: 일관성은 학습 곡선을 낮추고, 사용자가 화면 간 전환 시 혼동을 줄인다. 또한 유지보수와 향후 확장이 용이해진다.

**Review Criteria**:
- 디자인 시스템(토큰, 컴포넌트)이 문서화되었는가?
- 모든 화면이 동일한 컴포넌트 라이브러리를 사용하는가?
- 색상, 크기, 여백이 일관되는가?
- 사용자 테스트에서 "헷갈리는 부분"이 보고되지 않는가?

---

### VI. Performance and Readability First (성능과 가독성 우선)

**Rule**: 메인 페이지의 시각 효과(애니메이션, 그래디언트, 이미지)는 로딩 성능과 콘텐츠 가독성을 훼손하지 않는다.

- 이미지는 적절히 압축하고 lazy loading 적용
- 애니메이션은 실제 필요한 부분에만 제한 (예: 마이크로 인터랙션)
- 그래디언트는 성능에 영향 없는 범위에서 사용
- Core Web Vitals (LCP, FID, CLS) 목표: 메인 페이지 LCP < 2.5s

**Rationale**: 느린 로딩과 과도한 시각 효과는 사용자 이탈을 높이고 SEO 순위를 낮춘다. 가독성 훼손은 접근성 위반이다.

**Review Criteria**:
- 번들 크기와 로딩 시간을 Lighthouse 또는 WebPageTest로 측정했는가?
- 효과와 성능의 트레이드오프를 문서화했는가?
- 모바일에서도 목표 성능을 달성하는가?

---

### VII. Respect Motion Preferences (모션 접근성)

**Rule**: 모든 애니메이션은 `prefers-reduced-motion` CSS 미디어 쿼리를 준수하여, 전정기관 민감성이 있는 사용자를 보호한다.

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

- 의료적 필요성이 있는 애니메이션만 예외 (예: 로딩 스피너는 필수 정보이므로 허용 가능)
- 애니메이션 지속 시간은 최소 200ms, 최대 500ms (스트레스 완화)

**Rationale**: 전정 장애(vestibular disorder)가 있는 사용자는 과도한 모션으로 어지러움, 불안감을 경험한다. 이는 WCAG 2.1 Success Criterion 2.3.3 (Level AAA)의 요구사항이다.

**Review Criteria**:
- 개발자 도구에서 `prefers-reduced-motion: reduce` 설정 후 애니메이션이 비활성화되는가?
- 모든 CSS transition, animation에 미디어 쿼리가 적용되었는가?
- 단위 테스트에서 스타일 규칙을 검증하는가?

---

### VIII. Keyboard-Accessible Primary Actions (키보드 접근성)

**Rule**: 사용자가 마우스 없이 키보드만으로 모든 주요 행동(질문 작성, 답변, 댓글 등)을 완료할 수 있어야 한다.

- Tab 키로 모든 인터랙티브 요소 순회 가능
- Enter/Space로 버튼, 링크 활성화
- Escape로 모달 닫기
- Focus 시각 표시 (outline, ring) 제거 금지
- 키보드 trap(갇혀서 나갈 수 없음) 금지

**Rationale**: 모터 장애, RSI(반복성 스트레스 손상), 시각 장애 등으로 마우스 사용이 불가능한 사용자도 서비스를 이용할 권리가 있다. 또한 파워 사용자는 키보드 단축키를 선호한다.

**Review Criteria**:
- 키보드 네비게이션 테스트를 완료했는가? (탭 순서 확인)
- tabindex 음수 사용으로 포커스 순서를 방해하지 않는가?
- 자동 포커스 관리가 모달/드롭다운에 적용되었는가?
- NVDA, JAWS 등 스크린 리더로 테스트했는가?

---

### IX. Color + Text for State Indication (색상 + 텍스트로 상태 표현)

**Rule**: UI 상태(성공, 오류, 경고, 정보)를 색상만으로 구분하지 않으며, 반드시 텍스트 또는 아이콘을 함께 사용한다.

- 오류: 빨강 + "입력이 유효하지 않습니다" 메시지
- 성공: 녹색 + "답변이 저장되었습니다" 메시지
- 경고: 주황색 + "이 작업을 되돌릴 수 없습니다" 메시지
- 아이콘도 함께 사용 (예: ✔️, ❌, ⚠️)

**Rationale**: 색맹/색약 사용자는 색상만으로 상태를 인식하지 못한다. 텍스트 라벨은 모든 사용자에게 명확성을 제공한다. (WCAG 2.1 Success Criterion 1.4.1)

**Review Criteria**:
- 모든 색상이 지정된 요소에 텍스트 라벨이 있는가?
- 색맹 시뮬레이터로 UI를 검증했는가?
- aria-live 또는 role="alert"로 상태 변화를 스크린 리더에 전달하는가?
- 아이콘이 사용되면 alt 텍스트를 제공하는가?

---

### X. Responsive Design (반응형 설계)

**Rule**: 데스크톱과 모바일 환경에서 핵심 사용자 시나리오(질문 작성, 질문 검색, 답변 읽기, 의견 작성)가 완료되어야 한다.

- 모바일 우선 설계: 375px (최소), 425px (일반), 768px (태블릿), 1024px (데스크톱)
- 모든 상호작용 요소는 44px 이상 크기 (터치 친화적)
- 네비게이션은 모바일에서 햄버거 메뉴 또는 하단 탭바

**Rationale**: 전 세계 웹 트래픽의 60% 이상이 모바일에서 발생한다. 모바일을 무시하면 대다수 사용자를 배제한다.

**Review Criteria**:
- 실제 모바일 디바이스에서 테스트했는가? (Chrome DevTools 아님)
- 각 시나리오를 모바일에서 완료할 수 있는가?
- 이미지, 폰트 크기가 모바일에서 읽기 가능한가?
- 터치 영역이 최소 44×44 CSS 픽셀인가?

---

### XI. MVP-First Architecture (MVP 우선 구조)

**Rule**: 단순한 최소 기능 제품(MVP) 구조를 우선하며, 불필요한 추상화, 복잡한 아키텍처, 과도한 라이브러리 의존성을 피한다.

- 기본 요구사항만 구현: 질문 CRUD, 답변 CRUD, 검색
- 복잡한 기능 (추천, 실시간 알림, 소셜 로그인)은 Phase 2 이상으로 연기
- 코드는 명확하고 직관적일 것 (과도한 DRY 추상화 금지)
- 데이터베이스 정규화는 필요한 수준에서만 (과도한 조인 피하기)

**Rationale**: 빠른 출시, 사용자 피드백 수집, 점진적 개선이 미리 완벽한 시스템을 만드는 것보다 효율적이다. 초기 복잡성은 나중에 기술 부채가 된다.

**Review Criteria**:
- 요구사항 문서에 Phase 1/2 구분이 있는가?
- PR이 요구사항 외 최적화를 포함하지 않는가?
- 코드 복잡도(cyclomatic complexity)가 과도하지 않은가? (함수당 < 10)
- 외부 라이브러리 추가 시 정당성을 문서화했는가?

---

### XII. Traceable Implementation Tasks (추적 가능한 구현 작업)

**Rule**: 모든 구현 Task는 요구사항 문서(`.specify` 혹은 GitHub Issue)와 설계 근거를 추적할 수 있어야 한다.

- Task 제목: 명확한 동사 + 대상 (예: "Add question search by keyword")
- Task 설명: 관련 요구사항 링크, 인수 기준, 설계 결정사항 포함
- PR은 관련 Task ID/링크 명시 (예: Closes #42)
- 완료 시 테스트, 리뷰, 문서화 상태를 기록

**Rationale**: 추적 가능성은 책임감을 높이고, 나중에 왜 그렇게 구현했는지 이해할 수 있게 해준다. 버그 수정이나 리팩토링 시 영향 범위를 파악하기 쉬워진다.

**Review Criteria**:
- Task에 요구사항 링크가 있는가?
- PR 설명에 "Why" (이유)가 명시되는가?
- 코드 리뷰에서 설계 결정을 확인했는가?
- 6개월 후에도 왜 이 코드가 있는지 이해할 수 있는가?

---

### XIII. No Incomplete Builds or Test Failures (빌드/테스트 완료 필수)

**Rule**: 테스트나 빌드가 실패한 상태의 작업은 완료 처리하지 않으며, 모든 PR은 CI 통과 후 병합한다.

- 로컬에서 `npm test`, `npm run build` 성공 확인
- CI 파이프라인 통과 (GitHub Actions 또는 유사 도구)
- 커버리지 목표 유지: 신규 코드는 최소 80% 커버리지
- 린팅, 타입 체크 오류 없음

**Rationale**: 컴파일 실패나 테스트 미통과 상태로 배포하면 프로덕션 장애를 초래한다. 자동화된 검사는 수동 리뷰를 보완하는 안전장치다.

**Review Criteria**:
- CI 스크린샷에 모든 체크가 녹색(✅) 표시되는가?
- 테스트 커버리지 리포트를 확인했는가? (감소되지 않았는가?)
- 로컬 실행 결과와 CI 결과가 일치하는가?
- 의도적으로 비활성화된 테스트는 없는가?

---

## Quality & Accessibility Standards

**Performance**:
- Lighthouse Score: 메인 페이지 80점 이상, 모든 페이지 60점 이상
- 모바일 LCP (Largest Contentful Paint): < 2.5초

**Accessibility**:
- WCAG 2.1 Level AA 최소 준수
- 자동 검사 도구 (axe, Lighthouse) 오류 0개
- 수동 테스트: 키보드, 스크린 리더 (NVDA, JAWS) 호환성 확인

**Code Quality**:
- ESLint, Prettier 규칙 준수
- TypeScript strict 모드 (타입 안정성)
- Cypress E2E 테스트: 주요 시나리오 100% 커버

---

## Development Workflow

1. **Requirement Phase**: 요구사항을 `.specify` 문서로 명시
2. **Design Phase**: 설계안을 리뷰하고 승인
3. **Implementation**: Task 기반 구현, 자동화 검사 통과
4. **Review**: 코드, 설계, 접근성 리뷰 (최소 1명)
5. **Merge**: 모든 CI 통과 후 main 브랜치에 병합
6. **Deployment**: 태그 생성, 릴리스 노트 작성, 배포

---

## Governance

### Constitution Authority

이 헌법은 QANOW 프로젝트의 최상위 정책문서로, 모든 개발 의사결정과 리뷰 프로세스를 지배한다. 개인의 선호도나 일시적 필요는 원칙을 정당화하지 않는다.

### Amendment Process

1. **문제 제기**: 현재 원칙의 부족함이나 모순을 GitHub Issue로 제시
2. **검토**: 팀원 전체가 영향 범위를 평가
3. **투표/승인**: 팀 리드 이상 승인자 2명 이상 동의
4. **문서화**: 이 파일을 수정하고, 변경 사유를 기록
5. **공지**: 팀에 변경사항을 전파하고, 적응 기간 부여 (최소 1주)

### Compliance Review

- **분기별 감사**: 최근 PR 10개를 샘플링하여 원칙 준수 확인
- **반기 리뷰**: 원칙 자체가 유효한지 재검토 및 필요시 개정
- **위반 시**: 수정 요청, 재작업 지시, 반복 위반 시 프로세스 개선

### Guidance & Reference

- 구체적인 구현 가이드: `.specify/guidance/` 디렉토리
- 코드 리뷰 체크리스트: `.specify/checklist/`
- 아키텍처 결정 기록: `.specify/adr/` (Architecture Decision Records)

---

**Version**: 1.0.0 | **Ratified**: 2025-08-29 | **Last Amended**: 2025-08-29

*Initial constitution ratification. 13 core principles covering authority, validation, consistency, accessibility, and quality standards.*
