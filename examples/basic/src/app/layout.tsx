import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'K-Auth Demo - 한국형 소셜 로그인',
  description: '카카오, 네이버 등 한국형 소셜 로그인을 Next.js에서 쉽게 구현할 수 있는 라이브러리입니다.',
  keywords: ['카카오 로그인', '네이버 로그인', 'OAuth', 'Next.js', '소셜 로그인'],
  authors: [{ name: 'relkimm' }],
  openGraph: {
    title: 'K-Auth Demo',
    description: '한국형 소셜 로그인 라이브러리',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#171717',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="min-h-screen bg-neutral-50 font-sans antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
