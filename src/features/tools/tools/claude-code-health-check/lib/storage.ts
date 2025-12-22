import { DiagnosticItem } from './diagnostic-data';

const STORAGE_KEY = 'claude-code-health-check-v1';

/**
 * localStorage에서 진단 상태 로드
 */
export function loadDiagnosticState(): DiagnosticItem[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load diagnostic state:', error);
    return null;
  }
}

/**
 * localStorage에 진단 상태 저장
 */
export function saveDiagnosticState(items: DiagnosticItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save diagnostic state:', error);
  }
}

/**
 * localStorage에서 진단 상태 삭제
 */
export function clearDiagnosticState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear diagnostic state:', error);
  }
}
