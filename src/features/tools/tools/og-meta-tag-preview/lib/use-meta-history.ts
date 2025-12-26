'use client';

import { useState, useEffect } from 'react';
import { MetaTagsData } from '../model/types';

const STORAGE_KEY = 'og-meta-tag-history';
const MAX_HISTORY = 5;

export function useMetaHistory() {
  const [history, setHistory] = useState<MetaTagsData[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // setState를 비동기적으로 실행하여 Cascading Render 방지 (Next.js 15+)
        Promise.resolve().then(() => {
          setHistory(parsed);
        });
      } catch (e) {
        console.error('Failed to parse meta history', e);
      }
    }
  }, []);

  const saveToHistory = (data: MetaTagsData) => {
    if (!data.title) return;

    const filtered = history.filter((item) => item.url !== data.url);
    const updated = [data, ...filtered].slice(0, MAX_HISTORY);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { history, saveToHistory };
}