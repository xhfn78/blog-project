#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// ============================================
// 경로 상수
// ============================================
const TOOLS_DIR = path.join(__dirname, '../../src/features/tools/tools');
const CACHE_DIR = path.join(__dirname, '../cache');
const WORKFLOW_DIR = path.join(__dirname, '../prompts/workflows');

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
// 캐시 디렉토리 초기화
// ============================================
async function ensureCacheDir() {
  await fs.ensureDir(CACHE_DIR);
}

// ============================================
// Step 1: 기존 도구 스캔
// ============================================
async function step1ScanExisting() {
  console.log('\n' + '═'.repeat(60));
  console.log(colors.cyan('📊 Step 1: 기존 도구 스캔'));
  console.log('═'.repeat(60));

  const entries = await fs.readdir(TOOLS_DIR, { withFileTypes: true });
  const tools = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue;

    const configPath = path.join(TOOLS_DIR, entry.name, 'tool.config.ts');
    if (!fs.existsSync(configPath)) continue;

    try {
      const configContent = await fs.readFile(configPath, 'utf-8');

      // 간단한 파싱 (정규식)
      const slugMatch = configContent.match(/slug:\s*['"`]([^'"`]+)['"`]/);
      const nameMatch = configContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const categoryMatch = configContent.match(/category:\s*['"`]([^'"`]+)['"`]/);
      const tagsMatch = configContent.match(/tags:\s*\[([^\]]+)\]/);

      if (slugMatch && nameMatch && categoryMatch) {
        tools.push({
          slug: slugMatch[1],
          name: nameMatch[1],
          category: categoryMatch[1],
          tags: tagsMatch
            ? tagsMatch[1]
                .split(',')
                .map((t) => t.trim().replace(/['"`]/g, ''))
                .filter((t) => t)
            : [],
        });
      }
    } catch (error) {
      console.warn(colors.yellow(`   ⚠️  ${entry.name} 파싱 실패`));
    }
  }

  const byCategory = {
    converter: tools.filter((t) => t.category === 'converter').map((t) => t.slug),
    generator: tools.filter((t) => t.category === 'generator').map((t) => t.slug),
    formatter: tools.filter((t) => t.category === 'formatter').map((t) => t.slug),
    utility: tools.filter((t) => t.category === 'utility').map((t) => t.slug),
  };

  const result = {
    scannedAt: new Date().toISOString(),
    totalTools: tools.length,
    byCategory,
    tools,
  };

  await fs.writeJson(path.join(CACHE_DIR, 'existing-tools.json'), result, { spaces: 2 });

  console.log(`   ✓ 총 ${tools.length}개 도구 스캔 완료`);
  console.log(`   • converter: ${byCategory.converter.length}개`);
  console.log(`   • generator: ${byCategory.generator.length}개`);
  console.log(`   • formatter: ${byCategory.formatter.length}개`);
  console.log(`   • utility: ${byCategory.utility.length}개`);

  return result;
}

// ============================================
// Step 2: 경쟁 분석 (건너뛰기 가능)
// ============================================
async function step2CompetitiveAnalysis() {
  console.log('\n' + '═'.repeat(60));
  console.log(colors.cyan('📊 Step 2: 경쟁 분석 (선택적)'));
  console.log('═'.repeat(60));
  console.log(colors.dim('   이 단계는 수동 조사가 필요하므로 건너뜁니다.'));
  console.log(colors.dim('   필요 시 automation/cache/competitive-analysis.json 수동 작성'));

  return null;
}

// ============================================
// Step 3-7: AI 에이전트 호출 필요
// ============================================
function printAIPrompt(stepNumber, stepName, promptFile) {
  console.log('\n' + '═'.repeat(60));
  console.log(colors.cyan(`🤖 Step ${stepNumber}: ${stepName}`));
  console.log('═'.repeat(60));
  console.log(colors.yellow('\n⚠️  이 단계는 AI 에이전트가 수행해야 합니다.\n'));
  console.log(colors.bold('📋 AI에게 전달할 프롬프트 파일:'));
  console.log(colors.green(`   ${promptFile}\n`));
  console.log(colors.dim('다음 내용을 AI에게 입력하세요:'));
  console.log(colors.dim('─'.repeat(60)));
}

async function waitForUserContinue(message = '계속하려면 Enter를 누르세요...') {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(colors.yellow(`\n${message}`), () => {
      rl.close();
      resolve();
    });
  });
}

// ============================================
// 메인 워크플로우
// ============================================
async function main() {
  try {
    console.log('\n' + '╔' + '═'.repeat(58) + '╗');
    console.log('║' + colors.bold(colors.green('  🏭 개발 도구 자동 제안 시스템 (AI 기반)  ')) + '        ║');
    console.log('╚' + '═'.repeat(58) + '╝\n');

    await ensureCacheDir();

    // ====================================
    // Step 1: 기존 도구 스캔 (자동)
    // ====================================
    const existingTools = await step1ScanExisting();

    // ====================================
    // Step 2: 경쟁 분석 (건너뛰기)
    // ====================================
    await step2CompetitiveAnalysis();

    // ====================================
    // Step 3: 아이디어 브레인스토밍 (AI)
    // ====================================
    printAIPrompt(
      3,
      '아이디어 브레인스토밍 (100개 선별)',
      'automation/prompts/workflows/step3-brainstorm-ideas.md'
    );

    console.log(colors.cyan(`
다음 지시사항을 AI에게 전달하세요:

---
automation/prompts/workflows/step3-brainstorm-ideas.md 파일을 참고하여,
기존 도구와 중복되지 않는 새로운 도구 아이디어를 100개 선별하세요.

카테고리별 목표:
- converter: 30개
- generator: 30개
- formatter: 20개
- utility: 20개

각 아이디어는 다음 형식으로 작성:
{
  "slug": "도구-슬러그",
  "name": "롱테일 키워드 포함 도구명 (4-7단어)",
  "category": "converter|generator|formatter|utility",
  "reason": "왜 이 도구가 필요한지",
  "difficulty": "low|medium|high",
  "demandScore": 1-10
}

결과를 automation/cache/all-ideas.json에 저장하세요.
---
    `));

    await waitForUserContinue(
      'Step 3 완료 후 automation/cache/all-ideas.json이 생성되었으면 Enter를 누르세요...'
    );

    // 파일 존재 확인
    const ideasPath = path.join(CACHE_DIR, 'all-ideas.json');
    if (!fs.existsSync(ideasPath)) {
      throw new Error('all-ideas.json이 생성되지 않았습니다. Step 3을 다시 수행하세요.');
    }

    // ====================================
    // Step 4: 우선순위 평가 (AI + 자동)
    // ====================================
    printAIPrompt(
      4,
      '우선순위 평가 및 5개 선정',
      'automation/prompts/workflows/step4-evaluate-priority.md'
    );

    console.log(colors.cyan(`
다음 지시사항을 AI에게 전달하세요:

---
automation/prompts/workflows/step4-evaluate-priority.md 파일을 참고하여,
automation/cache/all-ideas.json의 100개 아이디어를 평가하고 상위 5개를 선정하세요.

평가 기준:
1. SEO 점수 계산 (name 분석)
2. 시너지 점수 계산 (기존 도구와의 관계)
3. 최종 우선순위 점수 계산
4. 상위 5개 선정

결과를 automation/cache/top5-suggestions.json에 저장하세요.
---
    `));

    await waitForUserContinue(
      'Step 4 완료 후 automation/cache/top5-suggestions.json이 생성되었으면 Enter를 누르세요...'
    );

    // 파일 존재 확인
    const top5Path = path.join(CACHE_DIR, 'top5-suggestions.json');
    if (!fs.existsSync(top5Path)) {
      throw new Error('top5-suggestions.json이 생성되지 않았습니다. Step 4를 다시 수행하세요.');
    }

    // ====================================
    // Step 5: 사용자 선택 (대화형)
    // ====================================
    console.log('\n' + '═'.repeat(60));
    console.log(colors.cyan('💬 Step 5: 사용자 선택'));
    console.log('═'.repeat(60));

    const top5 = await fs.readJson(top5Path);

    console.log('\n🎯 추천 개발 도구 TOP 5 (100개 중 자동 선별)\n');

    top5.top5.forEach((tool, index) => {
      console.log(`${index + 1}️⃣  [${tool.priorityScore}점] ${tool.name}`);
      console.log(`    📂 카테고리: ${tool.category}`);
      console.log(`    🔧 난이도: ${tool.difficulty}`);
      console.log(`    💡 이유: ${tool.reason}\n`);
    });

    console.log('─'.repeat(60));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const selection = await new Promise((resolve) => {
      rl.question(
        colors.yellow('어떤 도구를 만들까요? (1-5 입력, exit=종료): '),
        (answer) => {
          rl.close();
          resolve(answer.trim());
        }
      );
    });

    if (selection.toLowerCase() === 'exit') {
      console.log('\n👋 종료합니다.\n');
      process.exit(0);
    }

    const selectionNum = parseInt(selection);
    if (isNaN(selectionNum) || selectionNum < 1 || selectionNum > 5) {
      throw new Error('1-5 사이의 숫자를 입력하세요.');
    }

    const selectedTool = top5.top5[selectionNum - 1];

    await fs.writeJson(
      path.join(CACHE_DIR, 'selected-tool.json'),
      {
        selectedAt: new Date().toISOString(),
        selection: selectedTool,
      },
      { spaces: 2 }
    );

    console.log(colors.green(`\n✅ 선택됨: ${selectedTool.name}\n`));

    // ====================================
    // Step 6-1: tool.config.ts 생성 (AI)
    // ====================================
    printAIPrompt(
      '6-1',
      'tool.config.ts 생성',
      'automation/prompts/workflows/step6-1-config-generation.md'
    );

    console.log(colors.cyan(`
다음 지시사항을 AI에게 전달하세요:

---
automation/prompts/workflows/step6-1-config-generation.md 파일을 참고하여,
automation/cache/selected-tool.json의 정보를 기반으로 tool.config.ts를 생성하세요.

필수 작성 항목:
- description: 250자 이상
- tags: 6-8개

파일 경로:
src/features/tools/tools/${selectedTool.slug}/tool.config.ts
---
    `));

    await waitForUserContinue('Step 6-1 완료 후 Enter를 누르세요...');

    // ====================================
    // Step 6-2: UI 구현 (AI)
    // ====================================
    printAIPrompt('6-2', 'UI 구현', 'automation/prompts/workflows/step6-2-ui-implementation.md');

    console.log(colors.cyan(`
다음 지시사항을 AI에게 전달하세요:

---
automation/prompts/workflows/step6-2-ui-implementation.md 파일을 참고하여,
도구의 실행 UI와 사용 방법 섹션을 구현하세요.

구현 범위:
- 입력/출력 영역
- 변환 로직 (간단한 버전)
- 사용 방법 섹션 (500자)

파일 경로:
src/features/tools/tools/${selectedTool.slug}/index.tsx
---
    `));

    await waitForUserContinue('Step 6-2 완료 후 Enter를 누르세요...');

    // ====================================
    // Step 6-3: SEO 콘텐츠 작성 (AI)
    // ====================================
    printAIPrompt(
      '6-3',
      'SEO 콘텐츠 작성 (2,500자+)',
      'automation/prompts/workflows/step6-3-seo-content.md'
    );

    console.log(colors.cyan(`
다음 지시사항을 AI에게 전달하세요:

---
automation/prompts/workflows/step6-3-seo-content.md 파일을 참고하여,
SEO 최적화 본문 콘텐츠를 작성하세요.

필수 섹션 (순차적으로 작성):
1. 도입부 (400자+)
2. 주요 기능 (500자+)
3. 실무 시나리오 (600자+)
4. 기술적 배경 + 표 (700자+)
5. FAQ (700자+, 5개 이상)
6. 내부 링크 (3개)

총 2,500자 이상 작성 필수.

파일 경로:
src/features/tools/tools/${selectedTool.slug}/index.tsx (Step 6-2에서 생성한 파일에 추가)
---
    `));

    await waitForUserContinue('Step 6-3 완료 후 Enter를 누르세요...');

    // ====================================
    // Step 7: 최종 검증
    // ====================================
    console.log('\n' + '═'.repeat(60));
    console.log(colors.cyan('✅ Step 7: 최종 검증'));
    console.log('═'.repeat(60));

    console.log('\n검증 중...\n');

    try {
      execSync(`npm run validate-tool ${selectedTool.slug}`, { stdio: 'inherit' });
      console.log(colors.green('\n🎉 모든 검증 통과! 도구 생성 완료!\n'));
      console.log(`다음 경로에서 확인하세요:`);
      console.log(`   /${selectedTool.category}/${selectedTool.slug}\n`);
    } catch (error) {
      console.log(colors.yellow('\n⚠️  일부 검증 실패. 위 경고를 확인하고 수정하세요.\n'));
    }
  } catch (error) {
    console.error(colors.red('\n❌ 에러 발생:'), error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ============================================
// 실행
// ============================================
main();
