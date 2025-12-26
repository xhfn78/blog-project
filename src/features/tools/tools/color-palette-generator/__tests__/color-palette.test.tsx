import { describe, it, expect } from 'vitest';
import { generatePalette, isValidHex, hexToRgb } from '../lib/utils';

describe('Color Palette Generator Logic', () => {
  describe('isValidHex', () => {
    it('should validate correct hex codes', () => {
      expect(isValidHex('#000')).toBe(true);
      expect(isValidHex('#000000')).toBe(true);
      expect(isValidHex('fff')).toBe(true);
      expect(isValidHex('FFFFFF')).toBe(true);
    });

    it('should reject invalid hex codes', () => {
      expect(isValidHex('#gggggg')).toBe(false); // Invalid chars
      expect(isValidHex('#12')).toBe(false);     // Invalid length
      expect(isValidHex('12345')).toBe(false);   // Missing char
      expect(isValidHex('')).toBe(false);        // Empty
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to rgb correctly', () => {
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should handle shorthand hex codes', () => {
      expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should return null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull();
    });
  });

  describe('generatePalette', () => {
    it('should generate 11 shades (50-950) for a valid color', () => {
      const palette = generatePalette('#3B82F6');
      expect(palette).toHaveLength(11);
      
      const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
      weights.forEach((w, i) => {
        expect(palette[i].weight).toBe(w);
        expect(palette[i].hex).toMatch(/^#[0-9a-f]{6}$/);
      });
    });

    it('should return empty array for invalid input', () => {
      const palette = generatePalette('invalid');
      expect(palette).toEqual([]);
    });

    it('should include the base color logic (approximate)', () => {
      // 500 weight should be close to base color or exactly it depending on algorithm
      // Here we just ensure it generates *something* valid
      const palette = generatePalette('#000000');
      expect(palette[5].hex).toBe('#000000'); // Black base should stay black
    });
  });
});
