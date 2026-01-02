'use client';

import { useState } from 'react';
import { pxToRem, remToPx } from './converter';

export function useConverter() {
  const [baseSize, setBaseSize] = useState<number>(16);
  const [px, setPx] = useState<number>(16);
  const [rem, setRem] = useState<number>(1);

  const handlePxChange = (newPx: number) => {
    setPx(newPx);
    setRem(pxToRem(newPx, baseSize));
  };

  const handleRemChange = (newRem: number) => {
    setRem(newRem);
    setPx(remToPx(newRem, baseSize));
  };

  const handleBaseSizeChange = (newBase: number) => {
    setBaseSize(newBase);
    // Recalculate REM based on current PX
    setRem(pxToRem(px, newBase));
  };

  return {
    px,
    rem,
    baseSize,
    setPx: handlePxChange,
    setRem: handleRemChange,
    setBaseSize: handleBaseSizeChange,
  };
}
