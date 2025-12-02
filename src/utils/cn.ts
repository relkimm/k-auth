import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * clsx + tailwind-merge 조합
 * 사용자가 className으로 스타일을 덮어쓸 수 있게 해줌
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
