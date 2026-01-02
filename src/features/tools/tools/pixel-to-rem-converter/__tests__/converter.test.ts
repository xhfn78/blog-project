import { describe, it, expect } from 'vitest';
import { pxToRem, remToPx } from '../lib/converter';

describe('Pixel to REM Converter', () => {
  describe('pxToRem', () => {
    it('converts px to rem correctly with default base 16', () => {
      expect(pxToRem(16, 16)).toBe(1);
      expect(pxToRem(32, 16)).toBe(2);
      expect(pxToRem(8, 16)).toBe(0.5);
    });

    it('converts px to rem correctly with custom base', () => {
      expect(pxToRem(20, 10)).toBe(2);
      expect(pxToRem(15, 15)).toBe(1);
    });

    it('handles 0 correctly', () => {
      expect(pxToRem(0, 16)).toBe(0);
    });
  });

  describe('remToPx', () => {
    it('converts rem to px correctly with default base 16', () => {
      expect(remToPx(1, 16)).toBe(16);
      expect(remToPx(2, 16)).toBe(32);
      expect(remToPx(0.5, 16)).toBe(8);
    });

    it('converts rem to px correctly with custom base', () => {
      expect(remToPx(2, 10)).toBe(20);
    });
  });
});
