<p align="center">
  <h1 align="center">K-Auth</h1>
</p>

<p align="center">
  <strong>한국형 소셜 로그인, 설정 10초 & 디자인 0초</strong>
</p>

<p align="center">
  카카오 · 네이버 · 구글 · 애플 로그인을 Next.js에서 가장 쉽게
</p>

<p align="center">
  <a href="#설치">설치</a> •
  <a href="#빠른-시작">빠른 시작</a> •
  <a href="#버튼-컴포넌트">버튼</a> •
  <a href="#api">API</a>
</p>

---

## 왜 K-Auth인가요?

| 기존 방식 | K-Auth |
|-----------|--------|
| OAuth 설정 복잡 | `clientId`만 입력하면 끝 |
| 버튼 CSS 직접 작성 | 공식 디자인 버튼 제공 |
| 영어 에러 메시지 | 친절한 한국어 에러 |
| 카카오/네이버 문서 왔다갔다 | 통합 API 제공 |

---

## 설치

```bash
npm install k-auth
```

> next-auth가 자동으로 함께 설치됩니다.

---

## 빠른 시작

### Step 1. 인증 설정

`auth.ts` 파일을 생성하세요:

```typescript
import { KAuth } from 'k-auth';

export const { handlers, auth, signIn, signOut } = KAuth({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
  },
});
```

### Step 2. API 라우트

`app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
```

### Step 3. 로그인 버튼

```tsx
import { Button } from 'k-auth/ui';
import { signIn } from '@/auth';

export default function LoginPage() {
  return (
    <Button.Group>
      <Button.Kakao onClick={() => signIn('kakao')} />
      <Button.Naver onClick={() => signIn('naver')} />
    </Button.Group>
  );
}
```

**3단계면 끝!**

---

## 버튼 컴포넌트

K-Auth는 각 서비스의 공식 디자인 가이드를 준수한 버튼을 제공합니다.

### 지원 버튼

```tsx
import { Button } from 'k-auth/ui';

<Button.Kakao />   // 카카오 (노란색)
<Button.Naver />   // 네이버 (초록색)
<Button.Google />  // 구글 (흰색)
<Button.Apple />   // 애플 (검은색)
```

### 크기 옵션

```tsx
<Button.Kakao size="sm" />      // 작게
<Button.Kakao size="default" /> // 기본
<Button.Kakao size="lg" />      // 크게
<Button.Kakao size="icon" />    // 아이콘만
```

### 버튼 그룹

```tsx
// 세로 배치 (기본)
<Button.Group>
  <Button.Kakao />
  <Button.Naver />
</Button.Group>

// 가로 배치
<Button.Group direction="row">
  <Button.Kakao size="icon" />
  <Button.Naver size="icon" />
</Button.Group>

// 간격 조절
<Button.Group gap="sm">  // sm | md | lg
  ...
</Button.Group>
```

### 스타일 커스텀

Tailwind CSS 클래스로 자유롭게 커스텀할 수 있습니다:

```tsx
<Button.Kakao className="w-full shadow-lg rounded-xl" />
```

---

## 구글 / 애플 추가하기

구글, 애플 로그인을 추가하려면 `nextAuthConfig`를 사용하세요:

```typescript
import { KAuth } from 'k-auth';
import Google from 'next-auth/providers/google';
import Apple from 'next-auth/providers/apple';

export const { handlers, auth, signIn, signOut } = KAuth({
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_CLIENT_SECRET!,
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID!,
    clientSecret: process.env.NAVER_CLIENT_SECRET!,
  },
  // 구글/애플 추가
  nextAuthConfig: {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Apple({
        clientId: process.env.APPLE_CLIENT_ID!,
        clientSecret: process.env.APPLE_CLIENT_SECRET!,
      }),
    ],
  },
});
```

```tsx
<Button.Group>
  <Button.Kakao onClick={() => signIn('kakao')} />
  <Button.Naver onClick={() => signIn('naver')} />
  <Button.Google onClick={() => signIn('google')} />
  <Button.Apple onClick={() => signIn('apple')} />
</Button.Group>
```

---

## API

### KAuth 옵션

```typescript
KAuth({
  kakao?: KakaoOptions,
  naver?: NaverOptions,
  nextAuthConfig?: NextAuthConfig,  // 고급 설정
})
```

### 카카오 옵션

| 옵션 | 타입 | 필수 | 설명 |
|------|------|:----:|------|
| `clientId` | `string` | ✅ | 카카오 REST API 키 |
| `clientSecret` | `string` | ✅ | 카카오 Client Secret |
| `collectPhone` | `boolean` | | 전화번호 수집 |
| `collectBirth` | `boolean` | | 생년월일 수집 |
| `collectGender` | `boolean` | | 성별 수집 |
| `collectAgeRange` | `boolean` | | 연령대 수집 |

### 네이버 옵션

| 옵션 | 타입 | 필수 | 설명 |
|------|------|:----:|------|
| `clientId` | `string` | ✅ | 네이버 Client ID |
| `clientSecret` | `string` | ✅ | 네이버 Client Secret |
| `collectPhone` | `boolean` | | 전화번호 수집 |
| `collectBirth` | `boolean` | | 생년월일 수집 |
| `collectGender` | `boolean` | | 성별 수집 |
| `collectName` | `boolean` | | 실명 수집 |

---

## 환경 변수 설정

`.env.local` 파일:

```env
# 카카오
KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret

# 네이버
NAVER_CLIENT_ID=your_naver_client_id
NAVER_CLIENT_SECRET=your_naver_client_secret

# (선택) 구글
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# (선택) 애플
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret

# NextAuth 필수
AUTH_SECRET=your_random_secret_key  # openssl rand -base64 32
```

---

## 개발자 콘솔 설정

<details>
<summary><strong>카카오 설정하기</strong></summary>

1. [Kakao Developers](https://developers.kakao.com) 접속
2. 애플리케이션 추가
3. **앱 키** > REST API 키 복사 → `KAKAO_CLIENT_ID`
4. **보안** > Client Secret 생성 → `KAKAO_CLIENT_SECRET`
5. **카카오 로그인** > 활성화
6. **Redirect URI** 등록:
   - 개발: `http://localhost:3000/api/auth/callback/kakao`
   - 배포: `https://yourdomain.com/api/auth/callback/kakao`

</details>

<details>
<summary><strong>네이버 설정하기</strong></summary>

1. [NAVER Developers](https://developers.naver.com) 접속
2. 애플리케이션 등록
3. Client ID 복사 → `NAVER_CLIENT_ID`
4. Client Secret 복사 → `NAVER_CLIENT_SECRET`
5. **서비스 URL**: `http://localhost:3000`
6. **Callback URL**: `http://localhost:3000/api/auth/callback/naver`

</details>

<details>
<summary><strong>구글 설정하기</strong></summary>

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 프로젝트 생성
3. **OAuth 동의 화면** 설정
4. **사용자 인증 정보** > OAuth 2.0 클라이언트 ID 생성
5. **Redirect URI**: `http://localhost:3000/api/auth/callback/google`

</details>

<details>
<summary><strong>애플 설정하기</strong></summary>

1. [Apple Developer](https://developer.apple.com) 접속
2. Certificates, Identifiers & Profiles
3. **Identifiers** > App ID 생성 (Sign in with Apple 활성화)
4. **Keys** > Sign in with Apple 키 생성
5. **Redirect URI**: `https://yourdomain.com/api/auth/callback/apple`

> 애플 로그인은 HTTPS가 필수입니다.

</details>

---

## 에러 처리

K-Auth는 친절한 한국어 에러 메시지를 제공합니다:

```
==================================================
[K-Auth 오류] KAKAO_PHONE_NOT_ENABLED
==================================================

메시지: 전화번호 동의 항목이 비활성화되어 있습니다.
힌트: 카카오 개발자센터 > 동의항목 > 전화번호를 활성화해주세요.
문서: https://developers.kakao.com/console

==================================================
```

---

## 요구사항

- Next.js 14+
- React 18+

---

## 라이센스

MIT

---

<p align="center">
  <sub>귀찮은 건 제가 다 했습니다. 여러분은 키(Key)만 넣으세요.</sub>
</p>
