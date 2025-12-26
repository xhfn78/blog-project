import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAddressGenerator } from '../lib/use-address-generator';

describe('useAddressGenerator Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('기본 옵션으로 주소 데이터를 생성해야 한다', () => {
    const { result } = renderHook(() => useAddressGenerator());
    
    act(() => {
      result.current.generate();
    });
    
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.data.length).toBe(5);
    expect(result.current.data[0].roadAddress).toBeDefined();
    expect(result.current.data[0].zipCode).toMatch(/^\d{5}$/);
  });

  it('좌표 포함 옵션을 끄면 위경도가 0이어야 한다', () => {
    const { result } = renderHook(() => useAddressGenerator());
    
    act(() => {
      result.current.setOptions(prev => ({ ...prev, includeCoordinates: false }));
    });

    act(() => {
      result.current.generate();
      vi.runAllTimers();
    });

    expect(result.current.data[0].latitude).toBe(0);
    expect(result.current.data[0].longitude).toBe(0);
  });

  it('지정한 개수만큼 데이터를 생성해야 한다', () => {
    const { result } = renderHook(() => useAddressGenerator());
    
    act(() => {
      result.current.setOptions(prev => ({ ...prev, count: 10 }));
    });

    act(() => {
      result.current.generate();
      vi.runAllTimers();
    });

    expect(result.current.data.length).toBe(10);
  });
});
