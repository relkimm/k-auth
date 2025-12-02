'use client';

import { useState, useEffect } from 'react';

export interface ProviderConfig {
  kakao: { clientId: string; clientSecret: string; enabled: boolean };
  naver: { clientId: string; clientSecret: string; enabled: boolean };
  google: { clientId: string; clientSecret: string; enabled: boolean };
  apple: { clientId: string; clientSecret: string; enabled: boolean };
}

const STORAGE_KEY = 'k-auth-demo-config';

const defaultConfig: ProviderConfig = {
  kakao: { clientId: '', clientSecret: '', enabled: false },
  naver: { clientId: '', clientSecret: '', enabled: false },
  google: { clientId: '', clientSecret: '', enabled: false },
  apple: { clientId: '', clientSecret: '', enabled: false },
};

export function useConfig() {
  const [config, setConfig] = useState<ProviderConfig>(defaultConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch {
        setConfig(defaultConfig);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveConfig = (newConfig: ProviderConfig) => {
    setConfig(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  const isConfigured = (provider: keyof ProviderConfig) => {
    const p = config[provider];
    return p.enabled && p.clientId.trim() !== '' && p.clientSecret.trim() !== '';
  };

  const hasAnyProvider = () => {
    return Object.keys(config).some((key) => isConfigured(key as keyof ProviderConfig));
  };

  return { config, saveConfig, isConfigured, hasAnyProvider, isLoaded };
}

interface ConfigPanelProps {
  open: boolean;
  onClose: () => void;
  config: ProviderConfig;
  onSave: (config: ProviderConfig) => void;
}

const providerInfo = {
  kakao: {
    name: '카카오',
    color: 'bg-[#FEE500]',
    textColor: 'text-[#191919]',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.86 5.33 4.64 6.74l-1.18 4.36c-.1.38.32.68.65.47l5.19-3.43c.23.01.46.02.7.02 5.52 0 10-3.58 10-8 0-4.42-4.48-8-10-8z"/>
      </svg>
    ),
  },
  naver: {
    name: '네이버',
    color: 'bg-[#03C75A]',
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" transform="scale(0.6) translate(8, 8)"/>
      </svg>
    ),
  },
  google: {
    name: 'Google',
    color: 'bg-white border border-neutral-200',
    textColor: 'text-neutral-700',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
  },
  apple: {
    name: 'Apple',
    color: 'bg-black',
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
  },
};

export function ConfigPanel({ open, onClose, config, onSave }: ConfigPanelProps) {
  const [localConfig, setLocalConfig] = useState<ProviderConfig>(config);
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleToggle = (provider: keyof ProviderConfig) => {
    setLocalConfig((prev) => ({
      ...prev,
      [provider]: { ...prev[provider], enabled: !prev[provider].enabled },
    }));
  };

  const handleChange = (provider: keyof ProviderConfig, field: 'clientId' | 'clientSecret', value: string) => {
    setLocalConfig((prev) => ({
      ...prev,
      [provider]: { ...prev[provider], [field]: value },
    }));
  };

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Provider 설정</h2>
              <p className="mt-0.5 text-sm text-neutral-500">OAuth 인증에 사용할 Provider를 설정하세요</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[calc(85vh-140px)] overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {(Object.keys(providerInfo) as Array<keyof typeof providerInfo>).map((provider) => {
              const info = providerInfo[provider];
              const providerConfig = localConfig[provider];
              const isExpanded = expandedProvider === provider;

              return (
                <div
                  key={provider}
                  className={`rounded-xl border transition-all ${
                    providerConfig.enabled ? 'border-neutral-200 bg-white' : 'border-neutral-100 bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center gap-3 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${info.color} ${info.textColor}`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900">{info.name}</div>
                      <div className="text-xs text-neutral-500">
                        {providerConfig.enabled && providerConfig.clientId
                          ? `Client ID: ${providerConfig.clientId.slice(0, 8)}...`
                          : '설정되지 않음'}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpandedProvider(isExpanded ? null : provider)}
                      className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                    >
                      <svg
                        className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={providerConfig.enabled}
                        onChange={() => handleToggle(provider)}
                        className="peer sr-only"
                      />
                      <div className="h-6 w-11 rounded-full bg-neutral-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-neutral-900 peer-checked:after:translate-x-full" />
                    </label>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-neutral-100 px-4 pb-4 pt-3">
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-neutral-600">Client ID</label>
                          <input
                            type="text"
                            value={providerConfig.clientId}
                            onChange={(e) => handleChange(provider, 'clientId', e.target.value)}
                            placeholder="클라이언트 ID를 입력하세요"
                            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-neutral-600">Client Secret</label>
                          <input
                            type="password"
                            value={providerConfig.clientSecret}
                            onChange={(e) => handleChange(provider, 'clientSecret', e.target.value)}
                            placeholder="클라이언트 시크릿을 입력하세요"
                            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-amber-50 p-4">
            <div className="flex gap-3">
              <svg className="h-5 w-5 flex-shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <div className="text-sm text-amber-800">
                <p className="font-medium">데모 환경 안내</p>
                <p className="mt-1 text-amber-700">
                  입력한 정보는 브라우저의 로컬 스토리지에만 저장됩니다.
                  실제 OAuth 인증을 테스트하려면 각 플랫폼의 개발자 콘솔에서
                  Redirect URI를 설정해야 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-100 px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex-1 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              저장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
