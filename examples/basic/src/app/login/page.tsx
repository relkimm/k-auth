'use client';

import { useState, useEffect } from 'react';
import { Button } from '@relkimm/k-auth/ui';
import { signIn } from 'next-auth/react';
import { AlertDialog } from '@/components/AlertDialog';
import { ConfigPanel, useConfig, ProviderConfig } from '@/components/ConfigPanel';

type ProviderKey = keyof ProviderConfig;

const providerNames: Record<ProviderKey, string> = {
  kakao: '카카오',
  naver: '네이버',
  google: 'Google',
  apple: 'Apple',
};

export default function Login() {
  const { config, saveConfig, isConfigured, hasAnyProvider, isLoaded } = useConfig();
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [alertState, setAlertState] = useState<{
    open: boolean;
    provider: ProviderKey | null;
  }>({ open: false, provider: null });

  const handleLogin = (provider: ProviderKey) => {
    // 데모 모드: 환경변수가 설정되어 있으면 바로 로그인
    // 실제 환경에서는 환경변수를 사용하므로 바로 진행
    signIn(provider, { callbackUrl: '/' });
  };

  const handleProviderClick = (provider: ProviderKey) => {
    // 환경변수 기반 인증은 항상 시도 (서버 측에서 처리)
    handleLogin(provider);
  };

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 p-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 p-4">
      <div className="w-full max-w-[420px]">
        {/* Main Card */}
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

          {/* Login Buttons */}
          <div className="p-6">
            <div className="mb-4 text-center">
              <p className="text-sm text-neutral-600">소셜 계정으로 간편하게 로그인하세요</p>
            </div>

            <Button.Group>
              <Button.Kakao onClick={() => handleProviderClick('kakao')} />
              <Button.Naver onClick={() => handleProviderClick('naver')} />
              <Button.Google onClick={() => handleProviderClick('google')} />
              <Button.Apple onClick={() => handleProviderClick('apple')} />
            </Button.Group>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">또는</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            {/* Settings Button */}
            <button
              onClick={() => setShowConfigPanel(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-600 transition-all hover:border-neutral-300 hover:bg-neutral-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Provider 설정하기
            </button>
          </div>
        </div>

        {/* Help Card */}
        <div className="mt-4 rounded-xl bg-white/80 p-4 backdrop-blur">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">처음이신가요?</p>
              <p className="mt-0.5 text-xs text-neutral-500">
                이 데모는 환경변수(.env)에 설정된 OAuth 인증 정보를 사용합니다.
                각 플랫폼의 개발자 콘솔에서 앱을 생성하고 Redirect URI를 설정해야 합니다.
              </p>
              <a
                href="https://k-auth-docs.vercel.app/console-setup"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                설정 가이드 보기
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>

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

      {/* Config Panel */}
      <ConfigPanel
        open={showConfigPanel}
        onClose={() => setShowConfigPanel(false)}
        config={config}
        onSave={saveConfig}
      />

      {/* Alert Dialog */}
      <AlertDialog
        open={alertState.open}
        onClose={() => setAlertState({ open: false, provider: null })}
        title="Provider 설정 필요"
        description={`${alertState.provider ? providerNames[alertState.provider] : ''} 로그인을 사용하려면 먼저 Client ID와 Client Secret을 설정해야 합니다.`}
        type="warning"
        action={{
          label: '설정하기',
          onClick: () => {
            setAlertState({ open: false, provider: null });
            setShowConfigPanel(true);
          },
        }}
      />
    </main>
  );
}
