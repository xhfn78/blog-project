import { describe, it, expect } from 'vitest';
import { safeEncode, safeDecode } from '../lib/url-utils';

describe('URL Utils', () => {
  describe('safeEncode', () => {
    it('encodes normal text correctly', () => {
      expect(safeEncode('hello world')).toBe('hello%20world');
    });

    it('encodes special characters correctly', () => {
      expect(safeEncode('hello&world=1')).toBe('hello%26world%3D1');
    });

    it('encodes korean characters correctly', () => {
      expect(safeEncode('안녕하세요')).toBe('%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94');
    });
  });

  describe('safeDecode', () => {
    it('decodes normal text correctly', () => {
      expect(safeDecode('hello%20world')).toBe('hello world');
    });

    it('decodes special characters correctly', () => {
      expect(safeDecode('hello%26world%3D1')).toBe('hello&world=1');
    });

    it('decodes korean characters correctly', () => {
      expect(safeDecode('%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94')).toBe('안녕하세요');
    });

    it('handles malformed uri gracefully', () => {
      expect(safeDecode('%E0%A4%A')).toBe('Error: Malformed URI sequence');
    });
  });
});
