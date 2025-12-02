/**
 * K-Auth
 * 한국형 소셜 로그인, 설정 10초 & 디자인 0초
 *
 * @example
 * ```tsx
 * // auth.ts
 * import { KAuth } from 'k-auth';
 *
 * export const { handlers, auth, signIn, signOut } = KAuth({
 *   kakao: {
 *     clientId: process.env.KAKAO_ID!,
 *     clientSecret: process.env.KAKAO_SECRET!,
 *     collectPhone: true,
 *   },
 *   naver: {
 *     clientId: process.env.NAVER_ID!,
 *     clientSecret: process.env.NAVER_SECRET!,
 *   },
 * });
 *
 * // 로그인 페이지
 * import { Button } from 'k-auth/ui';
 *
 * <Button.Group>
 *   <Button.Kakao onClick={() => signIn('kakao')} />
 *   <Button.Naver onClick={() => signIn('naver')} />
 * </Button.Group>
 * ```
 */

// Core
export { KAuth } from '@/core';
export type { KAuthConfig, KAuthResult } from '@/core';

// Providers (개별 사용 시)
export { Kakao, Naver } from '@/providers';
export type { KakaoOptions, KakaoProfile, NaverOptions, NaverProfile } from '@/providers';

// UI Components
export { Button, KakaoButton, NaverButton, ButtonGroup } from '@/ui';
export type { KakaoButtonProps, NaverButtonProps, ButtonGroupProps } from '@/ui';

// Types
export type { KAuthUser, KAuthProvider } from '@/types';

// Utils
export { cn } from '@/utils/cn';
