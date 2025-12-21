import { ChecklistItem } from './config-data';

const STORAGE_KEY = 'claude-config-master-state';

interface ConfigMasterState {
  checklistItems: ChecklistItem[];
  lastUpdated: string;
  version: string;
}

/**
 * localStorage에서 설정 마스터 상태 로드
 */
export function loadConfigState(): ChecklistItem[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const state: ConfigMasterState = JSON.parse(saved);
    return state.checklistItems;
  } catch (error) {
    console.error('Failed to load config master state:', error);
    return null;
  }
}

/**
 * localStorage에 설정 마스터 상태 저장
 */
export function saveConfigState(items: ChecklistItem[]): void {
  try {
    const state: ConfigMasterState = {
      checklistItems: items,
      lastUpdated: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save config master state:', error);
  }
}

/**
 * localStorage에서 설정 마스터 상태 삭제
 */
export function clearConfigState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear config master state:', error);
  }
}
