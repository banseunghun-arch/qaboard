# Implementation Plan: QANOW Q&A Platform

**Branch**: `001-qa-board` | **Date**: 2026-08-31 | **Spec**: spec.md

**Input**: Feature specification from `/specs/001-qa-board/spec.md`

## Summary

QANOW는 회원이 질문을 작성하면 관리자가 답변하는 Q&A 게시판 플랫폼입니다. React 18 + TypeScript + Vite로 구축된 SPA이며, Supabase PostgreSQL과 RLS 정책으로 역할 기반 접근 제어를 구현합니다. 메인 페이지, 질문 목록, 질문 상세 화면 3개 핵심 페이지로 구성되며, 회원/관리자 역할에 따라 다른 UI와 기능을 제공합니다.

## Technical Context

**Language/Version**: TypeScript 5.6, Node.js 24 LTS

**Primary Dependencies**: 
- Frontend: React 18, React Router 7, Vite, Vitest
- Backend: Supabase (PostgreSQL 14.5 + PostgREST + Auth)
- Styling: CSS Variables, CSS Modules

**Storage**: PostgreSQL 14.5 (Supabase) - users, questions, answers tables with RLS

**Testing**: Vitest + @testing-library/react

**Target Platform**: Web (Browser), responsive design (375px-1440px)

**Project Type**: Full-stack web application (React SPA + Supabase backend)

**Performance Goals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

**Constraints**: 
- RLS policies enforce row-level security per spec.md
- Members see only their own questions; admins see all
- Question edit/delete only allowed before answer exists

**Scale/Scope**: 
- 3 main screens (Main, Question List, Question Detail)
- 3 user roles (Guest, Member, Admin)
- 50+ CSS design tokens
- 48 total implementation tasks across 8 phases

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Accessibility**: WCAG 2.1 AA compliance - prefers-reduced-motion, keyboard navigation, ARIA labels
✅ **Security**: RLS policies, input validation, XSS prevention
✅ **Performance**: CSS variables, optimized builds, lazy loading ready
✅ **Code Quality**: ESLint + Prettier configured, TypeScript strict mode

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
