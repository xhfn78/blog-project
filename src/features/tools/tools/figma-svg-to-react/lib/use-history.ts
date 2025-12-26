'use client';

import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string;
  name: string;
  svg: string;
  timestamp: number;
}

const STORAGE_KEY = 'figma-svg-to-react-history';
const MAX_HISTORY = 10;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // 비동기 업데이트로 린트 에러 및 성능 저하 방지
        Promise.resolve().then(() => {
          setHistory(parsed);
        });
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  const addToHistory = (name: string, svg: string) => {
    if (!svg.trim()) return;

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      name: name || 'Unnamed SVG',
      svg: svg,
      timestamp: Date.now(),
    };

    const updatedHistory = [newItem, ...history.filter(item => item.svg !== svg)].slice(0, MAX_HISTORY);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const removeHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    removeHistoryItem,
    clearHistory
  };
}