import { useRouter } from 'next/router';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <strong>K-Auth</strong>,
  project: {
    link: 'https://github.com/relkimm/k-auth',
  },
  docsRepositoryBase: 'https://github.com/relkimm/k-auth/tree/main/docs',
  footer: {
    text: 'K-Auth - 한국형 소셜 로그인',
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath === '/') {
      return { titleTemplate: 'K-Auth - 한국형 소셜 로그인' };
    }
    return { titleTemplate: '%s – K-Auth' };
  },
  head: function Head() {
    const { asPath } = useRouter();
    const { frontMatter, title } = useConfig();

    const defaultDescription = 'Next.js에서 카카오, 네이버 소셜 로그인을 쉽게 구현하는 라이브러리';
    const description = frontMatter.description || defaultDescription;
    const pageTitle = title ? `${title} – K-Auth` : 'K-Auth - 한국형 소셜 로그인';
    const url = `https://k-auth.vercel.app${asPath}`;

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="K-Auth" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={url} />
      </>
    );
  },
  primaryHue: {
    dark: 204,  // 청록색 (다크모드)
    light: 212, // 파란색 (라이트모드)
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: '피드백 보내기 →',
    labels: 'feedback',
  },
  editLink: {
    text: '이 페이지 수정하기 →',
  },
};

export default config;
