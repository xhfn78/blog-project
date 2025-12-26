#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');

// ============================================
// 경로 상수
// ============================================
const PROJECT_ROOT = path.join(__dirname, '../..');
const TOOLS_DIR = path.join(PROJECT_ROOT, 'src/features/tools/tools');
const PACKAGE_JSON_PATH = path.join(PROJECT_ROOT, 'package.json');

// ============================================
// 색상 헬퍼
// ============================================
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`,
};

// ============================================
// 의존성 기반 추천 매핑
// ============================================
const DEPENDENCY_RECOMMENDATIONS = {
  // 정규식 / 유효성 검사 관련
  'validator': {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'dev-tools',
    reason: 'validator 라이브러리 사용 감지 - 정규식 테스트 도구가 유용합니다'
  },
  'zod': {
    slug: 'json-schema-generator',
    name: 'JSON Schema Generator',
    category: 'generator',
    reason: 'Zod 스키마 사용 중 - JSON Schema 변환 도구가 도움이 됩니다'
  },

  // 아이콘 관련
  'lucide-react': {
    slug: 'icon-gallery',
    name: 'Lucide Icon Gallery',
    category: 'web-dev',
    reason: 'lucide-react 아이콘 라이브러리 사용 중 - 아이콘 검색기가 생산성을 높입니다'
  },
  '@heroicons/react': {
    slug: 'icon-gallery',
    name: 'Heroicons Gallery',
    category: 'web-dev',
    reason: 'Heroicons 사용 중 - 아이콘 검색기가 필요합니다'
  },
  'react-icons': {
    slug: 'icon-gallery',
    name: 'React Icons Gallery',
    category: 'web-dev',
    reason: 'react-icons 사용 중 - 통합 아이콘 검색기가 필요합니다'
  },

  // 색상 관련
  'tailwindcss': {
    slug: 'tailwind-color-picker',
    name: 'Tailwind Color Picker',
    category: 'web-dev',
    reason: 'Tailwind CSS 사용 중 - 색상 팔레트 생성기가 디자인 작업을 돕습니다'
  },

  // 마크다운 관련
  'react-markdown': {
    slug: 'markdown-preview',
    name: 'Markdown Live Preview',
    category: 'formatter',
    reason: 'react-markdown 사용 중 - 이미 마크다운 편집기가 있을 수 있습니다'
  },
  'remark': {
    slug: 'markdown-linter',
    name: 'Markdown Linter',
    category: 'validator',
    reason: 'remark 사용 중 - 마크다운 린팅 도구가 유용합니다'
  },

  // 날짜/시간 관련
  'date-fns': {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'converter',
    reason: 'date-fns 날짜 처리 사용 중 - 타임스탬프 변환기가 디버깅에 도움됩니다'
  },
  'dayjs': {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'converter',
    reason: 'dayjs 사용 중 - 타임스탬프 변환기가 필요합니다'
  },
  'moment': {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'converter',
    reason: 'moment.js 사용 중 - 타임스탬프 변환기가 유용합니다'
  },

  // 이미지 관련
  'sharp': {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'image',
    reason: 'sharp 이미지 처리 사용 중 - 웹용 이미지 압축 도구가 유용합니다'
  },
  'html2canvas': {
    slug: 'screenshot-tool',
    name: 'Screenshot Tool',
    category: 'image',
    reason: 'html2canvas 사용 중 - 스크린샷 도구가 이미 있거나 개선 가능합니다'
  },

  // 코드 하이라이팅
  'highlight.js': {
    slug: 'syntax-highlighter',
    name: 'Syntax Highlighter Preview',
    category: 'formatter',
    reason: 'highlight.js 사용 중 - 문법 강조 미리보기가 유용합니다'
  },
  'prism-react-renderer': {
    slug: 'syntax-highlighter',
    name: 'Syntax Highlighter',
    category: 'formatter',
    reason: 'Prism 사용 중 - 코드 스니펫 포맷터가 도움됩니다'
  },

  // 토큰/인증 관련
  'jsonwebtoken': {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'dev-tools',
    reason: 'jsonwebtoken 사용 중 - JWT 디코더가 디버깅에 필수입니다'
  },
  'jose': {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'dev-tools',
    reason: 'jose 라이브러리 사용 중 - JWT 분석 도구가 필요합니다'
  },

  // UUID 관련
  'uuid': {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    category: 'generator',
    reason: 'uuid 라이브러리 사용 중 - UUID 생성기가 편리합니다'
  },

  // 암호화 관련
  'bcrypt': {
    slug: 'hash-generator',
    name: 'Hash Generator',
    category: 'generator',
    reason: 'bcrypt 사용 중 - 해시 생성/검증 도구가 유용합니다'
  },

  // API 관련
  'axios': {
    slug: 'api-tester',
    name: 'API Tester',
    category: 'dev-tools',
    reason: 'axios HTTP 클라이언트 사용 중 - API 테스트 도구가 도움됩니다'
  },
};

// ============================================
// 파일 패턴 기반 추천
// ============================================
const FILE_PATTERN_RECOMMENDATIONS = [
  {
    pattern: /\.json$/,
    minCount: 5,
    suggestion: {
      slug: 'json-diff-viewer',
      name: 'JSON Diff Viewer',
      category: 'utility',
      reason: 'JSON 설정 파일 다수 감지 - 비교 도구가 설정 충돌 방지에 도움됩니다'
    }
  },
  {
    pattern: /\.css$/,
    minCount: 3,
    suggestion: {
      slug: 'css-unit-converter',
      name: 'CSS Unit Converter',
      category: 'converter',
      reason: 'CSS 파일 다수 감지 - px/rem/em 변환기가 반응형 작업에 유용합니다'
    }
  },
  {
    pattern: /\.svg$/,
    minCount: 5,
    suggestion: {
      slug: 'svg-optimizer',
      name: 'SVG Optimizer',
      category: 'image',
      reason: 'SVG 파일 다수 감지 - SVG 최적화 도구가 성능 개선에 도움됩니다'
    }
  },
  {
    pattern: /\.md$/,
    minCount: 10,
    suggestion: {
      slug: 'markdown-toc-generator',
      name: 'Markdown TOC Generator',
      category: 'generator',
      reason: '마크다운 파일 다수 감지 - 목차 자동 생성기가 문서화에 도움됩니다'
    }
  },
  {
    pattern: /\.(png|jpg|jpeg|gif|webp)$/i,
    minCount: 20,
    suggestion: {
      slug: 'image-optimizer',
      name: 'Image Optimizer',
      category: 'image',
      reason: '이미지 파일 다수 감지 - 일괄 최적화 도구가 필요합니다'
    }
  },
  {
    pattern: /\.env/,
    minCount: 2,
    suggestion: {
      slug: 'env-validator',
      name: 'ENV Validator',
      category: 'validator',
      reason: '환경 변수 파일 감지 - ENV 검증 도구가 배포 오류를 방지합니다'
    }
  },
];

// ============================================
// 코드 패턴 기반 추천
// ============================================
const CODE_PATTERN_RECOMMENDATIONS = [
  {
    pattern: /new RegExp\(|\/[^/]+\/[gimsuvy]*/g,
    minCount: 10,
    suggestion: {
      slug: 'regex-tester',
      name: 'Regex Tester',
      category: 'dev-tools',
      reason: '정규식 사용 빈도 높음 - 시각적 테스터가 디버깅을 가속화합니다'
    }
  },
  {
    pattern: /console\.(log|warn|error|info)/g,
    minCount: 50,
    suggestion: {
      slug: 'console-cleaner',
      name: 'Console Statement Cleaner',
      category: 'utility',
      reason: 'console 문이 많이 사용됨 - 일괄 제거 도구가 필요합니다'
    }
  },
  {
    pattern: /fetch\(|axios\.|http\./g,
    minCount: 10,
    suggestion: {
      slug: 'api-mock-generator',
      name: 'API Mock Generator',
      category: 'generator',
      reason: 'API 호출이 많음 - Mock 데이터 생성기가 테스트에 도움됩니다'
    }
  },
];

// ============================================
// 분석 함수들
// ============================================
async function getExistingTools() {
  try {
    const entries = await fs.readdir(TOOLS_DIR, { withFileTypes: true });
    return entries
      .filter(e => e.isDirectory() && !e.name.startsWith('_'))
      .map(e => e.name);
  } catch (error) {
    console.warn('⚠️ 도구 폴더 스캔 실패:', error.message);
    return [];
  }
}

async function analyzeDependencies() {
  try {
    const pkg = await fs.readJson(PACKAGE_JSON_PATH);
    return {
      ...pkg.dependencies,
      ...pkg.devDependencies
    };
  } catch (error) {
    console.warn('⚠️ package.json 읽기 실패:', error.message);
    return {};
  }
}

async function analyzeFilePatterns() {
  const stats = {};
  const srcDir = path.join(PROJECT_ROOT, 'src');

  async function scan(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            await scan(fullPath);
          }
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          const name = entry.name.toLowerCase();

          // 확장자별 카운트
          if (ext) {
            stats[ext] = (stats[ext] || 0) + 1;
          }

          // 특수 파일 카운트
          if (name.startsWith('.env')) {
            stats['.env'] = (stats['.env'] || 0) + 1;
          }
        }
      }
    } catch (error) {
      // 권한 오류 등 무시
    }
  }

  await scan(srcDir);
  await scan(PROJECT_ROOT); // 루트 레벨 파일도 스캔

  return stats;
}

async function analyzeCodePatterns() {
  const results = {};
  const srcDir = path.join(PROJECT_ROOT, 'src');

  async function scan(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
            await scan(fullPath);
          }
        } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          try {
            const content = await fs.readFile(fullPath, 'utf-8');

            for (const rule of CODE_PATTERN_RECOMMENDATIONS) {
              const matches = content.match(rule.pattern) || [];
              const key = rule.suggestion.slug;
              results[key] = (results[key] || 0) + matches.length;
            }
          } catch (e) {
            // 파일 읽기 실패 무시
          }
        }
      }
    } catch (error) {
      // 권한 오류 등 무시
    }
  }

  await scan(srcDir);
  return results;
}

function generateRecommendations(existingTools, dependencies, fileStats, codeStats) {
  const recommendations = [];
  const added = new Set();

  // 1. 의존성 기반 추천
  for (const [dep, rec] of Object.entries(DEPENDENCY_RECOMMENDATIONS)) {
    if (dependencies[dep] && !existingTools.includes(rec.slug) && !added.has(rec.slug)) {
      recommendations.push({
        ...rec,
        source: 'dependency',
        priority: 'high',
        trigger: dep
      });
      added.add(rec.slug);
    }
  }

  // 2. 파일 패턴 기반 추천
  for (const rule of FILE_PATTERN_RECOMMENDATIONS) {
    const count = Object.entries(fileStats)
      .filter(([ext]) => rule.pattern.test(ext))
      .reduce((sum, [, c]) => sum + c, 0);

    if (count >= rule.minCount && !existingTools.includes(rule.suggestion.slug) && !added.has(rule.suggestion.slug)) {
      recommendations.push({
        ...rule.suggestion,
        source: 'file-pattern',
        priority: 'medium',
        trigger: `${count}개 파일`
      });
      added.add(rule.suggestion.slug);
    }
  }

  // 3. 코드 패턴 기반 추천
  for (const rule of CODE_PATTERN_RECOMMENDATIONS) {
    const count = codeStats[rule.suggestion.slug] || 0;
    if (count >= rule.minCount && !existingTools.includes(rule.suggestion.slug) && !added.has(rule.suggestion.slug)) {
      recommendations.push({
        ...rule.suggestion,
        source: 'code-pattern',
        priority: 'medium',
        trigger: `${count}회 발견`
      });
      added.add(rule.suggestion.slug);
    }
  }

  // 우선순위별 정렬
  return recommendations.sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return 0;
  });
}

// ============================================
// 출력 함수들
// ============================================
function printHeader() {
  console.log('\n' + '═'.repeat(60));
  console.log(colors.cyan('🔍 프로젝트 분석 기반 도구 추천 시스템'));
  console.log('═'.repeat(60));
}

function printAnalysisProgress(step, detail) {
  console.log(`\n📊 ${colors.dim(step)}`);
  console.log(`   ${detail}`);
}

function printRecommendations(recommendations) {
  console.log('\n' + '─'.repeat(60));
  console.log(colors.bold('💡 추천 도구'));
  console.log('─'.repeat(60));

  if (recommendations.length === 0) {
    console.log('\n   현재 추가로 추천할 도구가 없습니다.');
    console.log('   기존 도구들이 잘 구성되어 있습니다! 🎉\n');
    return;
  }

  recommendations.forEach((rec, i) => {
    const priorityBadge = rec.priority === 'high'
      ? colors.red('🔴 HIGH')
      : colors.yellow('🟡 MEDIUM');

    console.log(`\n${colors.bold(`${i + 1}. ${rec.name}`)} ${colors.dim(`(${rec.slug})`)}`);
    console.log(`   ${priorityBadge} | ${colors.dim(rec.category)}`);
    console.log(`   └─ ${rec.reason}`);
    console.log(`   └─ 감지: ${colors.cyan(rec.trigger)}`);
  });

  console.log('\n' + '─'.repeat(60));
  console.log(colors.green('👉 생성하려면:') + ` npm run create-tool <slug>`);
  console.log(colors.dim('   예: npm run create-tool ' + recommendations[0].slug));
  console.log('─'.repeat(60) + '\n');
}

function printStats(existingTools, dependencies, fileStats) {
  console.log('\n📈 ' + colors.bold('프로젝트 통계'));
  console.log(`   • 기존 도구: ${existingTools.length}개`);
  console.log(`   • 의존성 패키지: ${Object.keys(dependencies).length}개`);

  const topExtensions = Object.entries(fileStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ext, count]) => `${ext}(${count})`)
    .join(', ');

  console.log(`   • 주요 파일 타입: ${topExtensions}`);
}

// ============================================
// 메인 실행
// ============================================
async function main() {
  printHeader();

  // 1. 기존 도구 분석
  printAnalysisProgress('기존 도구 스캔 중...', '');
  const existingTools = await getExistingTools();
  console.log(`   ✓ ${existingTools.length}개 도구 발견`);

  // 2. 의존성 분석
  printAnalysisProgress('package.json 의존성 분석 중...', '');
  const dependencies = await analyzeDependencies();
  console.log(`   ✓ ${Object.keys(dependencies).length}개 패키지 분석`);

  // 3. 파일 패턴 분석
  printAnalysisProgress('파일 패턴 분석 중...', '');
  const fileStats = await analyzeFilePatterns();
  const totalFiles = Object.values(fileStats).reduce((a, b) => a + b, 0);
  console.log(`   ✓ ${totalFiles}개 파일 스캔`);

  // 4. 코드 패턴 분석
  printAnalysisProgress('코드 패턴 분석 중...', '');
  const codeStats = await analyzeCodePatterns();
  console.log('   ✓ 패턴 분석 완료');

  // 5. 통계 출력
  printStats(existingTools, dependencies, fileStats);

  // 6. 추천 생성 및 출력
  const recommendations = generateRecommendations(
    existingTools,
    dependencies,
    fileStats,
    codeStats
  );

  printRecommendations(recommendations);
}

main().catch(error => {
  console.error('\n❌ 분석 중 에러 발생:', error.message);
  console.error(error.stack);
  process.exit(1);
});
