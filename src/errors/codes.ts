/**
 * K-Auth 에러 코드 및 한글 메시지 정의
 */

export const ERROR_CODES = {
  // 설정 관련 에러
  MISSING_CLIENT_ID: {
    code: 'MISSING_CLIENT_ID',
    message: 'clientId가 설정되지 않았습니다.',
    hint: '환경 변수를 확인해주세요.',
  },
  MISSING_CLIENT_SECRET: {
    code: 'MISSING_CLIENT_SECRET',
    message: 'clientSecret이 설정되지 않았습니다.',
    hint: '환경 변수를 확인해주세요.',
  },
  NO_PROVIDERS: {
    code: 'NO_PROVIDERS',
    message: 'Provider가 하나도 설정되지 않았습니다.',
    hint: 'kakao 또는 naver 중 하나 이상을 설정해주세요.',
  },

  // 카카오 관련 에러
  KAKAO_CONSENT_REQUIRED: {
    code: 'KAKAO_CONSENT_REQUIRED',
    message: '카카오 동의 항목 설정이 필요합니다.',
    hint: '카카오 개발자센터 > 동의항목에서 필요한 항목을 활성화해주세요.',
    docs: 'https://developers.kakao.com/console',
  },
  KAKAO_PHONE_NOT_ENABLED: {
    code: 'KAKAO_PHONE_NOT_ENABLED',
    message: '전화번호 동의 항목이 비활성화되어 있습니다.',
    hint: '카카오 개발자센터 > 동의항목 > 전화번호를 활성화해주세요.',
    docs: 'https://developers.kakao.com/console',
  },
  KAKAO_INVALID_REDIRECT_URI: {
    code: 'KAKAO_INVALID_REDIRECT_URI',
    message: 'Redirect URI가 등록되지 않았습니다.',
    hint: '카카오 개발자센터 > 카카오 로그인 > Redirect URI에 콜백 URL을 등록해주세요.',
    docs: 'https://developers.kakao.com/console',
  },

  // 네이버 관련 에러
  NAVER_INVALID_CALLBACK: {
    code: 'NAVER_INVALID_CALLBACK',
    message: 'Callback URL이 등록되지 않았습니다.',
    hint: '네이버 개발자센터 > API 설정 > 콜백 URL을 확인해주세요.',
    docs: 'https://developers.naver.com/apps',
  },
  NAVER_SERVICE_URL_MISMATCH: {
    code: 'NAVER_SERVICE_URL_MISMATCH',
    message: '서비스 URL이 일치하지 않습니다.',
    hint: '네이버 개발자센터 > 서비스 URL 설정을 확인해주세요.',
    docs: 'https://developers.naver.com/apps',
  },

  // OAuth 공통 에러
  OAUTH_CALLBACK_ERROR: {
    code: 'OAUTH_CALLBACK_ERROR',
    message: '로그인 처리 중 오류가 발생했습니다.',
    hint: '잠시 후 다시 시도해주세요.',
  },
  ACCESS_TOKEN_ERROR: {
    code: 'ACCESS_TOKEN_ERROR',
    message: '액세스 토큰을 가져오는데 실패했습니다.',
    hint: 'Client Secret이 올바른지 확인해주세요.',
  },
  USER_INFO_ERROR: {
    code: 'USER_INFO_ERROR',
    message: '사용자 정보를 가져오는데 실패했습니다.',
    hint: '필수 동의 항목이 설정되어 있는지 확인해주세요.',
  },

  // 알 수 없는 에러
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    message: '알 수 없는 오류가 발생했습니다.',
    hint: '문제가 지속되면 이슈를 등록해주세요.',
    docs: 'https://github.com/your-repo/k-auth/issues',
  },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
