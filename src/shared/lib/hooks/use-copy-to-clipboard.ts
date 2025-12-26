'use client';

import { useState, useCallback } from 'react';

/**
 * 클립보드 복사 상태
 */
export type CopyStatus = 'idle' | 'copied' | 'error';

/**
 * 클립보드 복사 훅의 반환 타입
 */
export interface UseCopyToClipboardReturn {
  /**
   * 현재 복사 상태
   */
  status: CopyStatus;
  /**
   * 복사된 텍스트 (복사 성공 시에만 값이 있음)
   */
  copiedText: string | null;
  /**
   * 클립보드에 텍스트를 복사하는 함수
   */
  copyToClipboard: (text: string) => Promise<boolean>;
  /**
   * 상태를 초기화하는 함수
   */
  reset: () => void;
}

/**
 * 클립보드 복사 훅 옵션
 */
export interface UseCopyToClipboardOptions {
  /**
   * 복사 성공 후 자동으로 상태를 리셋할 시간(ms)
   * @default 2000
   */
  resetDelay?: number;
}

/**
 * 클립보드 복사 기능을 제공하는 커스텀 훅
 *
 * @param options - 훅 옵션
 * @returns 복사 상태와 복사 함수
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { status, copyToClipboard } = useCopyToClipboard();
 *
 *   return (
 *     <button onClick={() => copyToClipboard('Hello World')}>
 *       {status === 'copied' ? 'Copied!' : 'Copy'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {}
): UseCopyToClipboardReturn {
  const { resetDelay = 2000 } = options;

  const [status, setStatus] = useState<CopyStatus>('idle');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard API를 사용할 수 없습니다.');
        setStatus('error');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setStatus('copied');

        // 자동 리셋
        setTimeout(() => {
          setStatus('idle');
        }, resetDelay);

        return true;
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
        setStatus('error');
        setCopiedText(null);

        // 에러 상태도 자동 리셋
        setTimeout(() => {
          setStatus('idle');
        }, resetDelay);

        return false;
      }
    },
    [resetDelay]
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setCopiedText(null);
  }, []);

  return {
    status,
    copiedText,
    copyToClipboard,
    reset,
  };
}
