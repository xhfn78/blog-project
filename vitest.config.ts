import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? typeof __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [] // 스토리북 관련 설정 전체 제거
  }
});