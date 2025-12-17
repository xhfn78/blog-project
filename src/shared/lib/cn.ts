import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스 병합 유틸리티
 * clsx와 tailwind-merge를 결합하여 조건부 클래스와 중복 제거를 모두 지원
 *
 * @example
 * cn('px-4 py-2', condition && 'bg-blue-500', { 'text-white': active })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
