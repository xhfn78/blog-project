#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

// ============================================
// 경로 상수
// ============================================
const TOOLS_DIR = path.join(__dirname, '../../src/features/tools/tools');

// ============================================
// 검증 규칙 정의 (카테고리별 차등화)
// ============================================
const VALIDATION_RULES_BY_CATEGORY = {
  converter: {
    minContentLength: 2000,
    minDescriptionLength: 200,
    minTags: 5,
    maxTags: 7,
    requiredSections: ['사용 방법', '주요 기능', '자주 묻는 질문'],
    minFAQCount: 3,
    minInternalLinks: 2,
  },

  formatter: {
    minContentLength: 2200,
    minDescriptionLength: 220,
    minTags: 5,
    maxTags: 8,
    requiredSections: ['사용 방법', '주요 기능', '실무', '자주 묻는 질문'],
    minFAQCount: 4,
    minInternalLinks: 3,
  },

  generator: {
    minContentLength: 2800,
    minDescriptionLength: 250,
    minTags: 6,
    maxTags: 8,
    requiredSections: ['사용 방법', '주요 기능', '실무', '기술', '자주 묻는 질문'],
    minFAQCount: 5,
    minInternalLinks: 3,
  },

  utility: {
    minContentLength: 2500,
    minDescriptionLength: 230,
    minTags: 6,
    maxTags: 8,
    requiredSections: ['사용 방법', '주요 기능', '실무', '자주 묻는 질문'],
    minFAQCount: 4,
    minInternalLinks: 3,
  },
};

// 공통 규칙
const COMMON_RULES = {
  // 필수 파일
  requiredFiles: ['tool.config.ts', 'index.tsx'],

  // FSD 필수 폴더
  requiredFolders: ['ui', 'model', 'lib', '__tests__'],
};

// ============================================
// AI 탐지 규칙 (2025년 SEO 트렌드)
// ============================================
const AI_DETECTION_RULES = {
  // Tier 1: 즉시 경고 (명백한 AI 패턴)
  criticalPhrases: [
    { pattern: /여러분[,\s]?안녕하세요/, reason: 'AI 인사말', severity: 'error' },
    { pattern: /요약하자면|결론적으로|정리하면/, reason: 'AI 연결어', severity: 'warning' },
    { pattern: /(놀라운|혁신적인|완벽한|최고의)\s+(도구|기능|방법)/, reason: '과장 수식', severity: 'warning' },
    { pattern: /여러분/, reason: '부자연스러운 호칭', severity: 'warning' },
    { pattern: /해보세요|해볼까요|시작해봅시다/, reason: 'AI 명령형', severity: 'warning' },
    { pattern: /간단합니다|쉽습니다/, reason: '과도한 단순화', severity: 'warning' },
  ],

  // Tier 2: 맥락 고려 경고
  contextualPhrases: [
    {
      pattern: /함께/,
      allowedContexts: [/라이브러리와 함께/, /프레임워크와 함께/, /팀과 함께/],
      reason: '기술 용어 맥락 외 사용'
    },
    {
      pattern: /누구나/,
      allowedContexts: [/누구나 접근 가능한 웹/, /누구나 사용할 수 있는 표준/],
      reason: '접근성 맥락 외 사용'
    },
  ],
};

// ============================================
// 색상 헬퍼
// ============================================
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  dim: (text) => `\x1b[2m${text}\x1b[0m`,
};

// ============================================
// 텍스트 카운터
// ============================================
function countTextContent(content) {
  // JSX/TSX에서 실제 텍스트만 추출
  const textOnly = content
    // 주석 제거
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    // import 문 제거
    .replace(/^import\s+.*$/gm, '')
    // export 문 제거 (코드)
    .replace(/^export\s+(default\s+)?(function|const|let|var|class|interface|type)\s+/gm, '')
    // JSX 태그 제거
    .replace(/<[^>]+>/g, ' ')
    // JSX 표현식 제거 (변수 참조 등)
    .replace(/\{[^}]*\}/g, ' ')
    // 코드 블록 제거
    .replace(/```[\s\S]*?```/g, '')
    // 마크다운 코드 제거
    .replace(/`[^`]+`/g, '')
    // 특수문자 제거
    .replace(/[{}()[\];:'"`,.<>/?!@#$%^&*=+\\|~-]/g, ' ')
    // 연속 공백 정리
    .replace(/\s+/g, ' ')
    .trim();

  return textOnly.length;
}

// ============================================
// 개별 검증 함수들
// ============================================
async function checkRequiredFiles(toolDir, results) {
  for (const file of COMMON_RULES.requiredFiles) {
    const filePath = path.join(toolDir, file);
    if (!fs.existsSync(filePath)) {
      results.errors.push(`필수 파일 누락: ${file}`);
    }
  }
}

async function checkFSDStructure(toolDir, results) {
  for (const folder of COMMON_RULES.requiredFolders) {
    const folderPath = path.join(toolDir, folder);
    if (!fs.existsSync(folderPath)) {
      results.warnings.push(`FSD 폴더 누락: ${folder}/`);
    } else {
      // 폴더가 비어있는지 확인
      const files = await fs.readdir(folderPath);
      const hasFiles = files.some(f => !f.startsWith('.'));
      if (!hasFiles && folder !== '__tests__') {
        results.info.push(`빈 폴더: ${folder}/ (필요시 구현)`);
      }
    }
  }
}

async function checkSEOContent(toolDir, rules, results) {
  const indexPath = path.join(toolDir, 'index.tsx');
  if (!fs.existsSync(indexPath)) return;

  const content = await fs.readFile(indexPath, 'utf-8');

  // 1. 콘텐츠 길이 검사 (카테고리별 차등)
  const textLength = countTextContent(content);
  if (textLength < rules.minContentLength) {
    results.warnings.push(
      `SEO 콘텐츠 부족: ${textLength}자 (최소 ${rules.minContentLength}자 필요)`
    );
  } else {
    results.info.push(`콘텐츠 길이: ${textLength}자 ✓`);
  }

  // 2. generateMetadata 함수 존재 확인
  if (!content.includes('generateMetadata')) {
    results.warnings.push('generateMetadata 함수가 없습니다 (SEO 필수)');
  }

  // 3. 필수 섹션 확인 (카테고리별 차등)
  for (const section of rules.requiredSections) {
    // 다양한 형태로 섹션 찾기
    const patterns = [
      new RegExp(`<h2[^>]*>.*${section}.*</h2>`, 'i'),
      new RegExp(`variant="h2"[^>]*>.*${section}`, 'i'),
      new RegExp(`<Typography[^>]*h2[^>]*>.*${section}`, 'i'),
      new RegExp(`## ${section}`, 'i'),
    ];

    const hasSection = patterns.some(p => p.test(content));
    if (!hasSection) {
      results.warnings.push(`SEO 섹션 누락: "${section}"`);
    }
  }

  // 4. Table 존재 확인
  if (!content.includes('<table') && !content.includes('<Table')) {
    results.warnings.push('표(Table)가 없습니다 (SEO 권장)');
  }

  // 5. 내부 링크 확인 (카테고리별 차등)
  const internalLinkPattern = /href=["'][^"']*\/(utility|converter|generator|formatter|validator)[^"']*["']/g;
  const internalLinks = content.match(internalLinkPattern) || [];
  if (internalLinks.length < rules.minInternalLinks) {
    results.warnings.push(
      `내부 링크 부족: ${internalLinks.length}개 (최소 ${rules.minInternalLinks}개 필요)`
    );
  } else {
    results.info.push(`내부 링크: ${internalLinks.length}개 ✓`);
  }

  // 6. FAQ 개수 확인 (카테고리별 차등)
  const faqPattern = /(Q\d+:|### Q\d+:|<h3[^>]*>Q\d+:)/g;
  const faqMatches = content.match(faqPattern) || [];
  if (faqMatches.length < rules.minFAQCount) {
    results.warnings.push(
      `FAQ 부족: ${faqMatches.length}개 (최소 ${rules.minFAQCount}개 필요)`
    );
  } else {
    results.info.push(`FAQ 개수: ${faqMatches.length}개 ✓`);
  }

  // 7. AI 탐지 (v2 알고리즘)
  const aiDetectionResult = detectAIContent(content);
  if (aiDetectionResult.warnings.length > 0) {
    aiDetectionResult.warnings.forEach(warning => {
      if (warning.level === 'error') {
        results.warnings.push(`[AI 탐지] ${warning.message}`);
      } else {
        results.info.push(`[AI 탐지 경고] ${warning.message}`);
      }
    });
  }
}

// ============================================
// AI 탐지 함수 (v2)
// ============================================
function detectAIContent(content) {
  const warnings = [];

  // Tier 1: Critical Phrases
  for (const rule of AI_DETECTION_RULES.criticalPhrases) {
    if (rule.pattern.test(content)) {
      warnings.push({
        level: rule.severity,
        message: `${rule.reason}: ${rule.pattern.source}`,
      });
    }
  }

  // Tier 2: Contextual Phrases
  for (const rule of AI_DETECTION_RULES.contextualPhrases) {
    if (rule.pattern.test(content)) {
      const hasAllowedContext = rule.allowedContexts.some(ctx => ctx.test(content));
      if (!hasAllowedContext) {
        warnings.push({
          level: 'warning',
          message: `${rule.reason}: '${rule.pattern.source}'`,
        });
      }
    }
  }

  // Tier 3: 통계 기반 탐지
  // 문장 길이 균일성 체크
  const sentences = content.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
  if (sentences.length > 5) {
    const lengths = sentences.map(s => s.split(/\s+/).length);
    const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
    const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) / lengths.length;

    if (variance < 20) {
      warnings.push({
        level: 'warning',
        message: `문장 길이가 너무 균일함 (평균: ${avg.toFixed(1)}단어, 분산: ${variance.toFixed(1)}) - AI 패턴 의심`,
      });
    }
  }

  // 구체적 수치 부족 체크
  const numberPattern = /\d+(\.\d+)?%|\d+(\.\d+)?\s?(초|ms|건|배|개|MB|KB|GB)/g;
  const numbers = content.match(numberPattern) || [];
  const expectedCount = Math.floor(content.length / 500);
  if (numbers.length < expectedCount) {
    warnings.push({
      level: 'info',
      message: `구체적 수치 부족 (${numbers.length}/${expectedCount}) - 더 구체적인 데이터 추가 권장`,
    });
  }

  return { warnings };
}

async function checkToolConfig(toolDir, rules, results) {
  const configPath = path.join(toolDir, 'tool.config.ts');
  if (!fs.existsSync(configPath)) return;

  const content = await fs.readFile(configPath, 'utf-8');

  // 1. description 길이 검사 (카테고리별 차등)
  const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
  if (descMatch) {
    const descLength = descMatch[1].length;
    if (descLength < rules.minDescriptionLength) {
      results.warnings.push(
        `description 길이 부족: ${descLength}자 (최소 ${rules.minDescriptionLength}자)`
      );
    }
  } else {
    // 멀티라인 description 확인
    const multilineDescMatch = content.match(/description:\s*(['"`][\s\S]*?['"`])\s*,/);
    if (multilineDescMatch) {
      const desc = multilineDescMatch[1].replace(/['"`\s+]/g, ' ').trim();
      if (desc.length < rules.minDescriptionLength) {
        results.warnings.push(
          `description 길이 부족: ${desc.length}자 (최소 ${rules.minDescriptionLength}자)`
        );
      }
    } else {
      results.errors.push('description이 정의되지 않았습니다');
    }
  }

  // 2. 태그 개수 확인 (카테고리별 차등)
  const tagsMatch = content.match(/tags:\s*\[([^\]]+)\]/);
  if (tagsMatch) {
    const tags = tagsMatch[1].split(',').filter(t => t.trim());
    if (tags.length < rules.minTags) {
      results.warnings.push(
        `태그 부족: ${tags.length}개 (최소 ${rules.minTags}개 필요)`
      );
    } else if (tags.length > rules.maxTags) {
      results.warnings.push(
        `태그 과다: ${tags.length}개 (최대 ${rules.maxTags}개 권장)`
      );
    } else {
      results.info.push(`태그 개수: ${tags.length}개 ✓`);
    }
  } else {
    results.errors.push('tags가 정의되지 않았습니다');
  }

  // 3. author 확인
  if (!content.includes('author:')) {
    results.warnings.push('author가 정의되지 않았습니다');
  }
}

async function checkTests(toolDir, results) {
  const testsDir = path.join(toolDir, '__tests__');
  if (!fs.existsSync(testsDir)) return;

  const testFiles = (await fs.readdir(testsDir)).filter(f =>
    f.endsWith('.test.ts') || f.endsWith('.test.tsx')
  );

  if (testFiles.length === 0) {
    results.info.push('테스트 파일 없음 (작성 권장)');
  } else {
    results.info.push(`테스트 파일: ${testFiles.length}개`);
  }
}

async function checkAccessibility(toolDir, results) {
  const indexPath = path.join(toolDir, 'index.tsx');
  if (!fs.existsSync(indexPath)) return;

  const content = await fs.readFile(indexPath, 'utf-8');

  // 1. 이미지 alt 속성 확인
  const imgTags = content.match(/<img[^>]*>/g) || [];
  for (const img of imgTags) {
    if (!img.includes('alt=')) {
      results.warnings.push(`접근성: <img> 태그에 alt 속성이 누락되었습니다.`);
    }
  }

  // 2. 버튼 aria-label 확인 (아이콘만 있는 버튼 등)
  const buttons = content.match(/<(Button|button)[^>]*>[\s\S]*?<\/(Button|button)>/g) || [];
  for (const btn of buttons) {
    const isIconOnly = btn.includes('Icon') && !btn.replace(/<[^>]+>/g, '').trim();
    if (isIconOnly && !btn.includes('aria-label')) {
      results.warnings.push(`접근성: 아이콘 버튼에 aria-label이 누락되었습니다.`);
    }
  }

  // 3. Label - Input 연결 확인
  const inputs = content.match(/<Input[^>]*\/>/g) || [];
  const labels = content.match(/<Label[^>]*>[\s\S]*?<\/Label>/g) || [];
  if (inputs.length > labels.length) {
    results.info.push(`접근성: Input 개수에 비해 Label이 적습니다. id와 htmlFor 연결을 확인하세요.`);
  }
}

// 메인 검증 함수
async function validateTool(slug, options = {}) {
  const toolDir = path.join(TOOLS_DIR, slug);
  const results = { errors: [], warnings: [], info: [] };

  // 도구가 존재하는지 확인
  if (!fs.existsSync(toolDir)) {
    results.errors.push(`도구 폴더가 존재하지 않습니다: ${slug}`);
    return results;
  }

  // tool.config.ts에서 category 읽기
  const configPath = path.join(toolDir, 'tool.config.ts');
  let category = 'utility'; // 기본값

  if (fs.existsSync(configPath)) {
    const configContent = await fs.readFile(configPath, 'utf-8');
    const categoryMatch = configContent.match(/category:\s*['"`](\w+)['"`]/);
    if (categoryMatch) {
      category = categoryMatch[1];
    }
  }

  // 카테고리별 규칙 가져오기
  const rules = VALIDATION_RULES_BY_CATEGORY[category] || VALIDATION_RULES_BY_CATEGORY.utility;
  results.info.push(`카테고리: ${category} (${rules.minContentLength}자 기준)`);

  // 검증 수행
  await checkRequiredFiles(toolDir, results);
  await checkFSDStructure(toolDir, results);
  await checkSEOContent(toolDir, rules, results);
  await checkToolConfig(toolDir, rules, results);
  await checkAccessibility(toolDir, results);
  await checkTests(toolDir, results);

  return results;
}

// ============================================
// 결과 출력 함수
// ============================================
function printResults(slug, results, verbose = false) {
  const hasErrors = results.errors.length > 0;
  const hasWarnings = results.warnings.length > 0;
  const hasInfo = results.info.length > 0;

  // 상태 아이콘
  let statusIcon = '✅';
  if (hasErrors) statusIcon = '❌';
  else if (hasWarnings) statusIcon = '⚠️';

  console.log(`\n${statusIcon} ${colors.cyan(slug)}`);

  // 에러 출력
  for (const error of results.errors) {
    console.log(`   ${colors.red('❌')} ${error}`);
  }

  // 경고 출력
  for (const warning of results.warnings) {
    console.log(`   ${colors.yellow('⚠️')}  ${warning}`);
  }

  // 정보 출력 (verbose 모드)
  if (verbose && hasInfo) {
    for (const info of results.info) {
      console.log(`   ${colors.dim('ℹ️')}  ${colors.dim(info)}`);
    }
  }

  // 통과 메시지
  if (!hasErrors && !hasWarnings) {
    console.log(`   ${colors.green('모든 검증 통과')}`);
  }

  return { hasErrors, hasWarnings };
}

// ============================================
// 요약 출력
// ============================================
function printSummary(stats) {
  console.log('\n' + '═'.repeat(50));
  console.log(`📊 검증 요약`);
  console.log('═'.repeat(50));
  console.log(`   총 도구: ${stats.total}개`);
  console.log(`   ${colors.green('통과')}: ${stats.passed}개`);
  console.log(`   ${colors.yellow('경고')}: ${stats.withWarnings}개`);
  console.log(`   ${colors.red('실패')}: ${stats.failed}개`);
  console.log('═'.repeat(50));
}

// ============================================
// CLI 정의
// ============================================
program
  .name('validate-tool')
  .description('개발 도구의 품질 규칙 준수 여부를 검증합니다')
  .argument('[slug]', '검증할 도구의 슬러그 (없으면 --all 필요)')
  .option('-a, --all', '모든 도구 검증')
  .option('-v, --verbose', '상세 정보 출력')
  .option('--strict', '경고도 에러로 처리')
  .action(async (slug, options) => {
    try {
      console.log('\n🔍 ' + colors.cyan('도구 검증 시작'));

      const stats = {
        total: 0,
        passed: 0,
        withWarnings: 0,
        failed: 0
      };

      if (options.all) {
        // 모든 도구 검증
        const entries = await fs.readdir(TOOLS_DIR, { withFileTypes: true });
        const tools = entries
          .filter(e => e.isDirectory() && !e.name.startsWith('_'))
          .map(e => e.name)
          .sort();

        stats.total = tools.length;
        console.log(`   대상: ${stats.total}개 도구\n`);

        for (const tool of tools) {
          const results = await validateTool(tool, options);
          const { hasErrors, hasWarnings } = printResults(tool, results, options.verbose);

          if (hasErrors || (options.strict && hasWarnings)) {
            stats.failed++;
          } else if (hasWarnings) {
            stats.withWarnings++;
          } else {
            stats.passed++;
          }
        }

        printSummary(stats);

        // 실패 시 exit code 1
        if (stats.failed > 0) {
          process.exit(1);
        }

      } else if (slug) {
        // 단일 도구 검증
        stats.total = 1;
        const results = await validateTool(slug, options);
        const { hasErrors, hasWarnings } = printResults(slug, results, options.verbose);

        if (hasErrors || (options.strict && hasWarnings)) {
          stats.failed = 1;
          process.exit(1);
        } else if (hasWarnings) {
          stats.withWarnings = 1;
        } else {
          stats.passed = 1;
        }

        console.log('');

      } else {
        console.error('\n❌ slug 또는 --all 옵션이 필요합니다.\n');
        program.help();
      }

    } catch (error) {
      console.error('\n❌ 검증 중 에러 발생:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  });

// 도움말 추가
program.addHelpText('after', `
예시:
  $ npm run validate-tool json-to-table
  $ npm run validate-tool json-to-table -- --verbose
  $ npm run validate-tool -- --all
  $ npm run validate-tool -- --all --strict

검증 항목 (신규 사이트 SEO 최적화 기준):
  • 필수 파일: tool.config.ts, index.tsx
  • FSD 폴더: ui/, model/, lib/, __tests__/
  • SEO 콘텐츠: 최소 2,500자, generateMetadata, 필수 섹션 5개
  • tool.config.ts: description 250자 이상, tags 6-8개
  • 내부 링크: 최소 3개
  • FAQ: 최소 5개
  • AI 티 나는 표현 자동 감지
`);

program.parse();
