import NextAuth from 'next-auth';
import type { NextAuthConfig, NextAuthResult } from 'next-auth';
import { Kakao, type KakaoOptions } from '@/providers/kakao';
import { Naver, type NaverOptions } from '@/providers/naver';
import { KAuthError } from '@/errors';

/**
 * KAuth 설정 옵션
 */
export interface KAuthConfig {
  /** 카카오 로그인 설정 */
  kakao?: KakaoOptions;
  /** 네이버 로그인 설정 */
  naver?: NaverOptions;
  /** NextAuth 추가 설정 (고급) */
  nextAuthConfig?: Partial<Omit<NextAuthConfig, 'providers'>>;
}

/**
 * KAuth 결과 타입
 */
export type KAuthResult = NextAuthResult;

/**
 * 설정 유효성 검사
 */
function validateConfig(config: KAuthConfig): void {
  if (config.kakao) {
    if (!config.kakao.clientId) {
      const error = new KAuthError({ code: 'MISSING_CLIENT_ID', details: { provider: 'kakao' } });
      error.log();
      throw error;
    }
    if (!config.kakao.clientSecret) {
      const error = new KAuthError({ code: 'MISSING_CLIENT_SECRET', details: { provider: 'kakao' } });
      error.log();
      throw error;
    }
  }

  if (config.naver) {
    if (!config.naver.clientId) {
      const error = new KAuthError({ code: 'MISSING_CLIENT_ID', details: { provider: 'naver' } });
      error.log();
      throw error;
    }
    if (!config.naver.clientSecret) {
      const error = new KAuthError({ code: 'MISSING_CLIENT_SECRET', details: { provider: 'naver' } });
      error.log();
      throw error;
    }
  }

  if (!config.kakao && !config.naver) {
    const error = new KAuthError({ code: 'NO_PROVIDERS' });
    error.log();
    throw error;
  }
}

/**
 * K-Auth 메인 함수
 * 한국형 소셜 로그인을 10초 만에 설정
 *
 * @example
 * ```ts
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
 * ```
 */
export function KAuth(config: KAuthConfig): KAuthResult {
  // 설정 유효성 검사
  validateConfig(config);

  const providers = [];

  if (config.kakao) {
    providers.push(Kakao(config.kakao));
  }

  if (config.naver) {
    providers.push(Naver(config.naver));
  }

  return NextAuth({
    providers,
    ...config.nextAuthConfig,
  });
}
