import { ERROR_CODES, type ErrorCode } from './codes';

export interface KAuthErrorOptions {
  code: ErrorCode;
  cause?: Error;
  details?: Record<string, unknown>;
}

/**
 * K-Auth 커스텀 에러 클래스
 * 한글 에러 메시지와 해결 힌트를 제공합니다.
 */
export class KAuthError extends Error {
  readonly code: ErrorCode;
  readonly hint: string;
  readonly docs?: string;
  readonly details?: Record<string, unknown>;
  readonly originalCause?: Error;

  constructor(options: KAuthErrorOptions) {
    const errorInfo = ERROR_CODES[options.code];

    super(errorInfo.message);

    this.name = 'KAuthError';
    this.code = options.code;
    this.hint = errorInfo.hint;
    this.docs = 'docs' in errorInfo ? errorInfo.docs : undefined;
    this.details = options.details;
    this.originalCause = options.cause;

    // 프로토타입 체인 유지
    Object.setPrototypeOf(this, KAuthError.prototype);
  }

  /**
   * 개발자 친화적인 에러 메시지 출력
   */
  toString(): string {
    let result = `[K-Auth] ${this.message}`;

    if (this.hint) {
      result += `\n힌트: ${this.hint}`;
    }

    if (this.docs) {
      result += `\n문서: ${this.docs}`;
    }

    return result;
  }

  /**
   * 콘솔에 에러 상세 정보 출력
   */
  log(): void {
    console.error('\n' + '='.repeat(50));
    console.error(`[K-Auth 오류] ${this.code}`);
    console.error('='.repeat(50));
    console.error(`\n메시지: ${this.message}`);
    console.error(`힌트: ${this.hint}`);

    if (this.docs) {
      console.error(`문서: ${this.docs}`);
    }

    if (this.details) {
      console.error(`\n상세 정보:`, this.details);
    }

    if (this.originalCause) {
      console.error(`\n원인:`, this.originalCause);
    }

    console.error('\n' + '='.repeat(50) + '\n');
  }
}

/**
 * 에러 생성 헬퍼 함수
 */
export function createError(
  code: ErrorCode,
  details?: Record<string, unknown>,
  cause?: Error
): KAuthError {
  return new KAuthError({ code, details, cause });
}
