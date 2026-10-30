// @vitest-environment node
import { NextRequest } from 'next/server.js';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => vi.unstubAllGlobals());
import { KAuth } from './kauth';

function auth() {
  return KAuth({
    kakao: { clientId: 'synthetic-client', clientSecret: 'synthetic-secret' },
    nextAuthConfig: { secret: 'synthetic-test-secret-at-least-32-bytes', trustHost: true },
  });
}

describe('실제 Auth.js handler의 인증 경계', () => {
  it('설정된 provider만 공개하고 비밀키는 노출하지 않는다', async () => {
    const response = await auth().handlers.GET(new NextRequest('https://localhost/api/auth/providers'));
    expect(response.status).toBe(200);
    const providers = await response.json();
    expect(Object.keys(providers)).toEqual(['kakao']);
    expect(providers.kakao.id).toBe('kakao');
    expect(JSON.stringify(providers)).not.toContain('synthetic-secret');
  });

  it('인증 cookie 없는 세션은 사용자로 인정하지 않는다', async () => {
    const response = await auth().handlers.GET(new NextRequest('https://localhost/api/auth/session'));
    expect(response.status).toBe(200);
    expect(await response.json()).toBeNull();
  });

  it('CSRF token 없는 로그인 요청은 OAuth로 보내지 않는다', async () => {
    const response = await auth().handlers.POST(new NextRequest('https://localhost/api/auth/signin/kakao', {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: 'callbackUrl=https%3A%2F%2Flocalhost',
    }));
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toContain('error=MissingCSRF');
    expect(response.headers.get('location')).not.toContain('kauth.kakao.com');
  });

  it('정상 흐름의 check cookie 없이 전달된 callback을 거부한다', async () => {
    const response = await auth().handlers.GET(new NextRequest('https://localhost/api/auth/callback/kakao?code=forged&state=forged'));
    expect(response.status).toBe(302);
    expect(response.headers.get('location')).toContain('error=Configuration');
  });
});

it('다른 OAuth 계정의 이메일이 같아도 기존 사용자에 자동 연결하지 않는다', async () => {
  const linkAccount = vi.fn();
  const createUser = vi.fn();
  const getUserByEmail = vi.fn(async () => ({ id: 'existing-user', email: 'same@example.test', emailVerified: new Date() }));
  const sdk = KAuth({
    kakao: { clientId: 'synthetic-client', clientSecret: 'synthetic-secret' },
    nextAuthConfig: {
      secret: 'synthetic-test-secret-at-least-32-bytes', trustHost: true,
      adapter: {
        getUserByAccount: async () => null, getUserByEmail, linkAccount, createUser,
        getUser: async () => null, updateUser: vi.fn(),
        createSession: vi.fn(), getSessionAndUser: async () => null,
        updateSession: vi.fn(), deleteSession: vi.fn(),
      },
    },
  });
  vi.stubGlobal('fetch', vi.fn(async (input: string | URL | Request) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (url === 'https://kauth.kakao.com/oauth/token') {
      return Response.json({ access_token: 'synthetic-token', token_type: 'bearer' });
    }
    if (url === 'https://kapi.kakao.com/v2/user/me') {
      return Response.json({ id: 42, kakao_account: { email: 'same@example.test', is_email_verified: true } });
    }
    throw new Error('Unexpected network request in isolated OAuth fixture');
  }));
  const cookies = new Map<string, string>();
  function keepCookies(response: Response) {
    for (const value of response.headers.getSetCookie()) {
      const cookie = value.split(';')[0];
      const separator = cookie.indexOf('=');
      cookies.set(cookie.slice(0, separator), cookie);
    }
  }
  const csrf = await sdk.handlers.GET(new NextRequest('https://localhost/api/auth/csrf'));
  keepCookies(csrf);
  const { csrfToken } = await csrf.json();
  const signIn = await sdk.handlers.POST(new NextRequest('https://localhost/api/auth/signin/kakao', {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', cookie: [...cookies.values()].join('; ') },
    body: new URLSearchParams({ csrfToken }),
  }));
  expect(signIn.status).toBe(302);
  const authorization = new URL(signIn.headers.get('location')!);
  expect(authorization.origin).toBe('https://kauth.kakao.com');
  keepCookies(signIn);
  const callback = new URL('https://localhost/api/auth/callback/kakao');
  callback.searchParams.set('code', 'synthetic-code');
  const state = authorization.searchParams.get('state');
  if (state) callback.searchParams.set('state', state);
  const response = await sdk.handlers.GET(new NextRequest(callback, { headers: { cookie: [...cookies.values()].join('; ') } }));
  expect(getUserByEmail).toHaveBeenCalledWith('same@example.test');
  expect(response.headers.get('location')).toContain('error=OAuthAccountNotLinked');
  expect(linkAccount).not.toHaveBeenCalled();
  expect(createUser).not.toHaveBeenCalled();
  expect(response.headers.getSetCookie().some((cookie) => cookie.includes('session-token='))).toBe(false);
});
