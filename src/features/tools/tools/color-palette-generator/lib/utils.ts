import { ColorShade } from '../model/types';

export { isValidHex, hexToRgb, rgbToHex, generatePalette };
export type { ColorShade };

function isValidHex(hex: string): boolean {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((char) => char + char).join('');
  }
  
  if (cleanHex.length !== 6) {
    // Check if it's a valid hex string first
    if (!/^[0-9A-F]{6}$/i.test(cleanHex)) return null;
    return null;
  }
  
  // Double check regex for safety if length check passed but chars are wrong
  if (!/^[0-9A-F]{6}$/i.test(cleanHex)) return null;

  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Lighten or darken color
// amount: -1 to 1 (-1 is black, 1 is white)
function adjustColor(r: number, g: number, b: number, amount: number) {
  const target = amount > 0 ? 255 : 0;
  const strength = Math.abs(amount);

  const newR = Math.round(r + (target - r) * strength);
  const newG = Math.round(g + (target - g) * strength);
  const newB = Math.round(b + (target - b) * strength);

  return { r: newR, g: newG, b: newB };
}

function generatePalette(baseHex: string): ColorShade[] {
  if (!isValidHex(baseHex)) return [];
  
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];

  // Tailwind scale mapping
  const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  
  return weights.map(weight => {
    let resultRgb = { ...rgb };
    
    // Simple mixing strategy: 500 is base
    if (weight < 500) {
      // Lighten
      // 50 is 90% lighter, 400 is 10% lighter
      const factor = (500 - weight) / 500 * 0.95; 
      resultRgb = adjustColor(rgb.r, rgb.g, rgb.b, factor);
    } else if (weight > 500) {
      // Darken
      // 600 is 10% darker, 950 is 90% darker
      const factor = (weight - 500) / 450 * 0.9;
      resultRgb = adjustColor(rgb.r, rgb.g, rgb.b, -factor);
    }
    
    const hex = rgbToHex(resultRgb.r, resultRgb.g, resultRgb.b);
    return {
      weight,
      hex,
      rgb: `rgb(${resultRgb.r}, ${resultRgb.g}, ${resultRgb.b})`
    };
  });
}