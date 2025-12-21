import { ChecklistItem } from './checklist-data';

const STORAGE_KEY = 'claude-code-quick-start-checklist';

/**
 * localStorage에서 체크리스트 상태 로드
 */
export function loadChecklistState(): ChecklistItem[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load checklist state:', error);
    return null;
  }
}

/**
 * localStorage에 체크리스트 상태 저장
 */
export function saveChecklistState(items: ChecklistItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save checklist state:', error);
  }
}

/**
 * localStorage에서 체크리스트 상태 삭제
 */
export function clearChecklistState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear checklist state:', error);
  }
}
