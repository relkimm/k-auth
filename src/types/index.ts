/**
 * K-Auth 공통 타입 정의
 */

/** 표준화된 사용자 프로필 */
export interface KAuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
  birthday?: string | null;
  birthyear?: string | null;
  gender?: 'male' | 'female' | null;
  ageRange?: string | null;
}

/** Provider 타입 */
export type KAuthProvider = 'kakao' | 'naver';
