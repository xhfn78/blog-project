import { ChecklistItem } from './workflow-data';

const STORAGE_KEY = 'claude-workflows-optimization-state';

interface WorkflowState {
  checklistItems: ChecklistItem[];
  lastUpdated: string;
  version: string;
}

/**
 * localStorage에서 워크플로우 상태 로드
 */
export function loadWorkflowState(): ChecklistItem[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const state: WorkflowState = JSON.parse(saved);
    return state.checklistItems;
  } catch (error) {
    console.error('Failed to load workflow state:', error);
    return null;
  }
}

/**
 * localStorage에 워크플로우 상태 저장
 */
export function saveWorkflowState(items: ChecklistItem[]): void {
  try {
    const state: WorkflowState = {
      checklistItems: items,
      lastUpdated: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save workflow state:', error);
  }
}

/**
 * localStorage에서 워크플로우 상태 삭제
 */
export function clearWorkflowState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear workflow state:', error);
  }
}
