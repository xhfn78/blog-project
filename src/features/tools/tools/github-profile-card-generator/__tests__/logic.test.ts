import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGitHubCard } from '../lib/use-github-card';

describe('useGitHubCard Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('초기 상태가 올바르게 설정되어야 한다', () => {
    const { result } = renderHook(() => useGitHubCard());
    expect(result.current.username).toBe('');
    expect(result.current.options.theme).toBe('modern');
    expect(result.current.stats).toBeNull();
  });

  it('사용자 이름을 변경할 수 있어야 한다', () => {
    const { result } = renderHook(() => useGitHubCard());
    act(() => {
      result.current.setUsername('tester');
    });
    expect(result.current.username).toBe('tester');
  });

  it('옵션을 업데이트할 수 있어야 한다', () => {
    const { result } = renderHook(() => useGitHubCard());
    act(() => {
      result.current.updateOption('theme', 'cyberpunk');
    });
    expect(result.current.options.theme).toBe('cyberpunk');
  });

  it('데이터를 가져올 때 로딩 상태가 활성화되어야 한다', () => {
    const { result } = renderHook(() => useGitHubCard());
    act(() => {
      result.current.fetchMockStats('octocat');
    });
    expect(result.current.isLoading).toBe(true);
    
    act(() => {
      vi.runAllTimers();
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.stats?.username).toBe('octocat');
  });

  it('통계 데이터가 있으면 SVG 코드가 생성되어야 한다', () => {
    const { result } = renderHook(() => useGitHubCard());
    act(() => {
      result.current.fetchMockStats('octocat');
      vi.runAllTimers();
    });
    expect(result.current.generatedSVG).toContain('<svg');
    expect(result.current.generatedSVG).toContain('@octocat');
  });
});
