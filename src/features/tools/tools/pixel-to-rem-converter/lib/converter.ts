export function pxToRem(px: number, baseSize: number): number {
  if (baseSize === 0) return 0;
  return parseFloat((px / baseSize).toFixed(4));
}

export function remToPx(rem: number, baseSize: number): number {
  return parseFloat((rem * baseSize).toFixed(4));
}
