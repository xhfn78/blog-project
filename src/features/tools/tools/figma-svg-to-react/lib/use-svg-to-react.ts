'use client';

import { useState, useCallback, useEffect } from 'react';
import { SvgConverterState, SvgTransformOptions } from '../model/types';
import { transformSvgToReact } from './svg-parser';

const DEFAULT_OPTIONS: SvgTransformOptions = {
  useTypescript: true,
  useCurrentColor: true,
  componentName: 'IconComponent',
  addPropsInterface: true,
};

export function useSvgToReact() {
  const [state, setState] = useState<SvgConverterState>({
    inputSvg: '',
    options: DEFAULT_OPTIONS,
    result: null,
    isTransforming: false,
  });

  const setInputSvg = (svg: string) => {
    setState((prev) => ({ ...prev, inputSvg: svg }));
  };

  const setOptions = (options: Partial<SvgTransformOptions>) => {
    setState((prev) => ({
      ...prev,
      options: { ...prev.options, ...options },
    }));
  };

  const transform = useCallback(() => {
    if (!state.inputSvg) return;

    setState((prev) => ({ ...prev, isTransforming: true }));
    
    // 복잡한 연산을 위해 시뮬레이션 지연 (UX)
    const result = transformSvgToReact(state.inputSvg, state.options);
    
    setState((prev) => ({
      ...prev,
      result,
      isTransforming: false,
    }));
  }, [state.inputSvg, state.options]);

  // 입력이나 옵션 변경 시 자동 변환 (디바운스 고려 가능하지만 여기서는 즉시)
  useEffect(() => {
    const timer = setTimeout(() => {
      transform();
    }, 300);
    return () => clearTimeout(timer);
  }, [state.inputSvg, state.options, transform]);

  return {
    state,
    setInputSvg,
    setOptions,
    transform,
  };
}
