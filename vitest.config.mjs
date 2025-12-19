import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? typeof __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({ // defineConfig는 더 이상 비동기일 필요 없음
  resolve: { // resolve 객체 추가
    alias: {
      '@/': path.resolve(dirname, './src/'), // '@/' 별칭을 './src/'로 매핑
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.node'], // 이 라인을 추가
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    deps: { // 이 부분을 추가
      inline: [
        /@\/shared\//, // @/shared/ 경로의 모듈들을 인라인 처리 (예: UI 컴포넌트)
        /@\/features\/tools\/tools\/markdown-editor\//, // 마크다운 에디터 컴포넌트도 인라인 처리
      ],
    },
  }
});