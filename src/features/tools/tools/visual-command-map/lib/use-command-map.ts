'use client';

import { useState, useCallback, useEffect } from 'react';
import { CustomCommand } from './types';

const STORAGE_KEY = 'visual-command-map-state';

interface StoredState {
  expandedPhases: string[];
  completedCommands: string[];
  currentPhase: string;
  customCommands: CustomCommand[];
}

const defaultState: StoredState = {
  expandedPhases: ['project-init'],
  completedCommands: [],
  currentPhase: 'project-init',
  customCommands: [],
};

export function useCommandMap() {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(defaultState.expandedPhases);
  const [completedCommands, setCompletedCommands] = useState<string[]>(defaultState.completedCommands);
  const [currentPhase, setCurrentPhase] = useState<string>(defaultState.currentPhase);
  const [customCommands, setCustomCommands] = useState<CustomCommand[]>(defaultState.customCommands);
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 상태 복원
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredState = JSON.parse(stored);
        setExpandedPhases(parsed.expandedPhases || defaultState.expandedPhases);
        setCompletedCommands(parsed.completedCommands || defaultState.completedCommands);
        setCurrentPhase(parsed.currentPhase || defaultState.currentPhase);
        setCustomCommands(parsed.customCommands || defaultState.customCommands);
      }
    } catch {
      // 파싱 실패 시 기본값 유지
    }
    setIsLoaded(true);
  }, []);

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    if (!isLoaded) return;

    const state: StoredState = {
      expandedPhases,
      completedCommands,
      currentPhase,
      customCommands,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [expandedPhases, completedCommands, currentPhase, customCommands, isLoaded]);

  // 단계 펼침/접기
  const togglePhase = useCallback((phaseId: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseId)
        ? prev.filter((id) => id !== phaseId)
        : [...prev, phaseId]
    );
  }, []);

  // 모든 단계 펼치기
  const expandAll = useCallback((phaseIds: string[]) => {
    setExpandedPhases(phaseIds);
  }, []);

  // 모든 단계 접기
  const collapseAll = useCallback(() => {
    setExpandedPhases([]);
  }, []);

  // 명령어 완료 토글
  const toggleCommand = useCallback((commandId: string) => {
    setCompletedCommands((prev) =>
      prev.includes(commandId)
        ? prev.filter((id) => id !== commandId)
        : [...prev, commandId]
    );
  }, []);

  // 현재 단계 설정
  const setPhase = useCallback((phaseId: string) => {
    setCurrentPhase(phaseId);
  }, []);

  // 커스텀 명령어 추가
  const addCustomCommand = useCallback((phaseId: string, command: string, description: string) => {
    const newCommand: CustomCommand = {
      id: `custom-${Date.now()}`,
      phaseId,
      command,
      description,
      createdAt: new Date().toISOString(),
    };
    setCustomCommands((prev) => [...prev, newCommand]);
  }, []);

  // 커스텀 명령어 삭제
  const removeCustomCommand = useCallback((commandId: string) => {
    setCustomCommands((prev) => prev.filter((cmd) => cmd.id !== commandId));
    setCompletedCommands((prev) => prev.filter((id) => id !== commandId));
  }, []);

  // 진행 상태 리셋
  const resetProgress = useCallback(() => {
    setCompletedCommands([]);
    setCurrentPhase('project-init');
    setExpandedPhases(['project-init']);
  }, []);

  // 전체 리셋 (커스텀 명령어 포함)
  const resetAll = useCallback(() => {
    setExpandedPhases(defaultState.expandedPhases);
    setCompletedCommands(defaultState.completedCommands);
    setCurrentPhase(defaultState.currentPhase);
    setCustomCommands(defaultState.customCommands);
  }, []);

  return {
    // 상태
    expandedPhases,
    completedCommands,
    currentPhase,
    customCommands,
    isLoaded,

    // 단계 관련
    togglePhase,
    expandAll,
    collapseAll,
    setPhase,

    // 명령어 관련
    toggleCommand,
    addCustomCommand,
    removeCustomCommand,

    // 리셋
    resetProgress,
    resetAll,
  };
}
