import { auth, signOut } from '@/auth';
import Link from 'next/link';

export default async function Page() {
  const session = await auth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 p-4">
      <div className="w-full max-w-[420px]">
        {session?.user ? (
          <>
            {/* Logged In State */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-neutral-200/50">
              {/* Profile Header */}
              <div className="relative bg-gradient-to-r from-neutral-900 to-neutral-800 px-6 pb-16 pt-8">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    로그인됨
                  </span>
                  <h1 className="mt-3 text-lg font-bold text-white">K-Auth Demo</h1>
                </div>

                {/* Avatar - positioned to overlap */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-24 w-24 rounded-full border-4 border-white bg-white object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-neutral-100 shadow-lg">
                      <svg className="h-10 w-10 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="px-6 pb-6 pt-16 text-center">
                <h2 className="text-xl font-bold text-neutral-900">
                  {session.user.name || '사용자'}
                </h2>
                {session.user.email && (
                  <p className="mt-1 text-sm text-neutral-500">{session.user.email}</p>
                )}

                {/* Session Info Card */}
                <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    세션 정보
                  </h3>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center justify-between rounded-lg bg-white p-3">
                      <span className="text-sm text-neutral-500">이름</span>
                      <span className="text-sm font-medium text-neutral-900">
                        {session.user.name || '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white p-3">
                      <span className="text-sm text-neutral-500">이메일</span>
                      <span className="text-sm font-medium text-neutral-900">
                        {session.user.email || '-'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <form
                  action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                  }}
                  className="mt-6"
                >
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                    로그아웃
                  </button>
                </form>
              </div>
            </div>

            {/* Help Text */}
            <p className="mt-4 text-center text-xs text-neutral-400">
              세션 정보는 브라우저 쿠키에 저장됩니다
            </p>
          </>
        ) : (
          <>
            {/* Logged Out State */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-neutral-200/50">
              {/* Header */}
              <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 px-6 py-8 text-center text-white">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold">K-Auth Demo</h1>
                <p className="mt-1.5 text-sm text-white/70">한국형 소셜 로그인 라이브러리</p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                    <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-neutral-900">로그인이 필요합니다</h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    소셜 계정으로 간편하게 시작하세요
                  </p>
                </div>

                <Link
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  로그인하기
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/80 p-4 backdrop-blur">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                  <svg className="h-4 w-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.64 6.74l-1.18 4.36c-.1.38.32.68.65.47l5.19-3.43c.23.01.46.02.7.02 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z"/>
                  </svg>
                </div>
                <p className="text-xs font-medium text-neutral-900">카카오</p>
                <p className="text-[10px] text-neutral-500">Kakao OAuth</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 backdrop-blur">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <span className="text-sm font-bold text-green-600">N</span>
                </div>
                <p className="text-xs font-medium text-neutral-900">네이버</p>
                <p className="text-[10px] text-neutral-500">Naver OAuth</p>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-neutral-400">
          Powered by{' '}
          <a
            href="https://github.com/relkimm/k-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-600 hover:text-neutral-900"
          >
            @relkimm/k-auth
          </a>
        </p>
      </div>
    </main>
  );
}
