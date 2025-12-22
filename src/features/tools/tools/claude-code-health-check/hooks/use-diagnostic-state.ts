import { useState, useEffect, useCallback } from 'react';
import { loadDiagnosticState, saveDiagnosticState, clearDiagnosticState } from '../lib/storage';
import { DEFAULT_DIAGNOSTIC_ITEMS, DiagnosticItem } from '../lib/diagnostic-data';

interface UseDiagnosticStateReturn {
  diagnosticItems: DiagnosticItem[];
  toggleItem: (id: string) => void;
  resetAll: () => void;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

/**
 * 진단 상태 관리 커스텀 훅
 *
 * localStorage와 동기화되며 1초 디바운스로 자동 저장됩니다.
 */
export function useDiagnosticState(): UseDiagnosticStateReturn {
  // localStorage에서 초기 상태 로드
  const [items, setItems] = useState<DiagnosticItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_DIAGNOSTIC_ITEMS;

    const saved = loadDiagnosticState();
    return saved || DEFAULT_DIAGNOSTIC_ITEMS;
  });

  // localStorage에 자동 저장 (1초 디바운스)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        saveDiagnosticState(items);
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
    setItems(DEFAULT_DIAGNOSTIC_ITEMS);
    if (typeof window !== 'undefined') {
      clearDiagnosticState();
    }
  }, []);

  // 진행률 계산
  const completed = items.filter(item => item.isCompleted).length;
  const total = items.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    diagnosticItems: items,
    toggleItem,
    resetAll,
    progress: { completed, total, percentage },
  };
}
