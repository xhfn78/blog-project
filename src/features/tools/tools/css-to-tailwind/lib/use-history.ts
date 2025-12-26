"use client";

import { useState, useEffect } from "react";

export interface HistoryItem {
  id: string;
  timestamp: number;
  input: string;
  output: string;
}

export function useHistory(key: string, maxItems = 10) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, [key]);

  const addToHistory = (input: string, output: string) => {
    if (!input.trim()) return;
    
    // 중복 제거 및 최신화
    const filtered = history.filter((item) => item.input !== input);
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      input,
      output,
    };

    const newHistory = [newItem, ...filtered].slice(0, maxItems);
    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(key);
  };

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter((item) => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  return { history, addToHistory, clearHistory, removeFromHistory };
}
