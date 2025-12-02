# K-Auth

한국형 소셜 로그인 라이브러리. 카카오/네이버 OAuth를 Next.js에서 쉽게 구현.

## 패키지 정보

- **이름**: `@relkimm/k-auth`
- **의존성**: next-auth 5.0.0-beta.30 (v5)

## 명령어

```bash
npm run build      # tsup 빌드 (ESM + CJS)
npm run dev        # watch 모드
npm test           # vitest 실행
npm run typecheck  # tsc --noEmit
```

## 구조

```
src/
├── index.ts           # 메인 엔트리 (모든 export)
├── core/kauth.ts      # KAuth() - NextAuth 래퍼
├── providers/         # OAuth Provider
│   ├── kakao.ts       # Kakao() - scope 자동 구성
│   └── naver.ts       # Naver()
├── ui/buttons/        # 로그인 버튼 컴포넌트
│   ├── KakaoButton.tsx
│   ├── NaverButton.tsx
│   ├── GoogleButton.tsx
│   ├── AppleButton.tsx
│   └── ButtonGroup.tsx
├── errors/            # 한글 에러 시스템
│   ├── codes.ts       # ERROR_CODES 정의
│   └── KAuthError.ts  # 에러 클래스
├── types/index.ts     # 공통 타입
└── utils/cn.ts        # clsx + tailwind-merge
```

## Export 구조

```typescript
// @relkimm/k-auth
export { KAuth } from '@/core';

// @relkimm/k-auth/providers
export { Kakao, Naver } from '@/providers';

// @relkimm/k-auth/ui
export { Button, KakaoButton, NaverButton, ... } from '@/ui';
```

## 컨벤션

### 네이밍
- Provider: `Kakao()`, `Naver()` (PascalCase 함수)
- 버튼: `Button.Kakao`, `Button.Naver` (네임스페이스)
- 파일: PascalCase(컴포넌트), camelCase(유틸리티)

### 코드
- `@/` 경로 별칭 사용
- UI 컴포넌트에 `'use client'` 필수
- `cn()` 유틸로 스타일 병합
- SVG 아이콘 내장 (외부 의존성 없음)

### 에러
- `KAuthError` 클래스 사용
- 에러 코드는 `src/errors/codes.ts`
- 모든 메시지 한국어

### 테스트
- 파일: `*.test.ts`, `*.test.tsx`
- 설명 한국어: `it('기본 설정으로 Provider를 생성한다', ...)`

## 커밋

한국어로 작성:

```
feat: 새 기능
fix: 버그 수정
docs: 문서
test: 테스트
refactor: 리팩토링
chore: 설정/빌드
```

## 핵심 패턴

### Provider scope 자동 구성

```typescript
// src/providers/kakao.ts
Kakao({ clientId, clientSecret, collectPhone: true })
// → scope에 'phone_number' 자동 추가
```

### KAuth = NextAuth 래퍼

```typescript
// src/core/kauth.ts
KAuth({ kakao: {...}, naver: {...} })
// → validateConfig() 후 NextAuth() 호출
```
