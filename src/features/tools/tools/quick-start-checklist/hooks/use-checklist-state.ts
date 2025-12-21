import { useState, useEffect, useCallback } from 'react';
import { loadChecklistState, saveChecklistState, clearChecklistState } from '../lib/storage';
import { DEFAULT_CHECKLIST_ITEMS, ChecklistItem } from '../lib/checklist-data';

interface UseChecklistStateReturn {
  checklistItems: ChecklistItem[];
  toggleItem: (id: string) => void;
  resetAll: () => void;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

/**
 * 체크리스트 상태 관리 커스텀 훅
 *
 * localStorage와 동기화되며 1초 디바운스로 자동 저장됩니다.
 */
export function useChecklistState(): UseChecklistStateReturn {
  // localStorage에서 초기 상태 로드
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_CHECKLIST_ITEMS;

    const saved = loadChecklistState();
    return saved || DEFAULT_CHECKLIST_ITEMS;
  });

  // localStorage에 자동 저장 (1초 디바운스)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        saveChecklistState(items);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [items]);

  // 아이템 토글
  const toggleItem = useCallback((id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    ));
  }, []);

  // 전체 리셋
  const resetAll = useCallback(() => {
    setItems(DEFAULT_CHECKLIST_ITEMS);
    if (typeof window !== 'undefined') {
      clearChecklistState();
    }
  }, []);

  // 진행률 계산
  const completed = items.filter(item => item.isCompleted).length;
  const total = items.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    checklistItems: items,
    toggleItem,
    resetAll,
    progress: { completed, total, percentage },
  };
}
