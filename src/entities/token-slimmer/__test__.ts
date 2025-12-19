// src/entities/token-slimmer/__test__.ts
import { describe, it, expect } from 'vitest';
import { getStats, slimLogic } from '../model/tokenizer-service'; // Will be created in next step

describe('tokenizer-service', () => {
  describe('getStats', () => {
    it('should calculate tokens and cost for a given string', () => {
      const text = `
        function helloWorld() {
          // This is a comment
          console.log("Hello, World!");
        }
      `;
      // Expecting it to be not implemented yet, so the test will fail (RED)
      // Once implemented, we'll assert actual token counts.
      const stats = getStats(text);
      expect(stats).toBeDefined();
      expect(typeof stats.tokens).toBe('number');
      expect(typeof stats.cost).toBe('string'); // Cost is formatted as string
      // More specific assertions will come after implementation
    });
  });

  describe('slimLogic', () => {
    it('should remove comments, imports, and compress whitespace', () => {
      const code = `
        import { someFunc } from './module'; // Import statement

        /**
         * Multi-line comment
         */
        function example() {
          // Single-line comment
          const a = 1;


          console.log(a);
        }
      `;

      // Expecting it to be not implemented yet, so the test will fail (RED)
      // Once implemented, we'll assert the processed string.
      const processedCode = slimLogic(code, { stripImports: true });
      expect(processedCode).toBeDefined();
      expect(processedCode).not.toContain('import');
      expect(processedCode).not.toContain('// Single-line comment');
      expect(processedCode).not.toContain('Multi-line comment');
      expect(processedCode).not.toContain('/**');
      expect(processedCode).not.toContain('*/');
      expect(processedCode).not.toMatch(/\n\s*\n/); // No consecutive empty lines
    });

    it('should not strip imports if option is false', () => {
      const code = `import { someFunc } from './module';`;
      const processedCode = slimLogic(code, { stripImports: false });
      expect(processedCode).toBeDefined();
      expect(processedCode).toContain('import { someFunc } from \'./module\';');
    });
  });
});
