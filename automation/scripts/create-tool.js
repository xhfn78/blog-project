#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const { program } = require('commander');

// ============================================
// 설정 로드
// ============================================
const CONFIG_PATH = path.join(__dirname, '../config/tool-factory.config.json');
let config = {
  categories: ['utility'],
  uiLibrary: 'Tailwind CSS',
  testLibrary: 'Vitest'
};

if (fs.existsSync(CONFIG_PATH)) {
  try {
    config = require(CONFIG_PATH);
  } catch (e) {
    console.warn('⚠️  Could not load tool-factory.config.json, using defaults.');
  }
}

// ============================================
// 경로 상수
// ============================================
const TEMPLATE_DIR = path.join(__dirname, '../../src/features/tools/tools/_template');
const TOOLS_DIR = path.join(__dirname, '../../src/features/tools/tools');
const PROMPT_TEMPLATE_PATH = path.join(__dirname, '../prompts/templates/new-tool-impl.md');

// ============================================
// ToolCreator 클래스 (롤백 지원)
// ============================================
class ToolCreator {
  constructor() {
    this.createdPaths = [];
    this.currentStep = '';
  }

  /**
   * 생성 작업 추적
   */
  async trackCreate(targetPath, operation) {
    await operation();
    this.createdPaths.push(targetPath);
  }

  /**
   * 실패 시 롤백
   */
  async rollback() {
    if (this.createdPaths.length === 0) {
      return;
    }

    console.log('\n🔄 롤백 중...');
    for (const p of this.createdPaths.reverse()) {
      try {
        if (fs.existsSync(p)) {
          await fs.remove(p);
          console.log(`   ✓ 삭제됨: ${path.relative(process.cwd(), p)}`);
        }
      } catch (e) {
        console.warn(`   ⚠️ 삭제 실패: ${p}`);
      }
    }
    console.log('✅ 롤백 완료\n');
  }

  /**
   * 도구 생성 실행
   */
  async create(slug, options) {
    const newToolDir = path.join(TOOLS_DIR, slug);

    try {
      // Step 1: 폴더 복사
      this.currentStep = '템플릿 복사';
      console.log(`\n📁 [${this.currentStep}]`);
      await this.trackCreate(newToolDir, async () => {
        await fs.copy(TEMPLATE_DIR, newToolDir);
      });
      console.log(`   ✓ ${path.relative(process.cwd(), newToolDir)}`);

      // Step 2: FSD 하위 폴더 생성
      this.currentStep = 'FSD 구조 생성';
      console.log(`\n📂 [${this.currentStep}]`);
      const fsdFolders = ['ui', 'model', 'lib', '__tests__'];
      for (const folder of fsdFolders) {
        const folderPath = path.join(newToolDir, folder);
        await fs.ensureDir(folderPath);
        console.log(`   ✓ ${folder}/`);
      }

      // Step 3: tool.config.ts 업데이트
      this.currentStep = 'tool.config.ts 업데이트';
      console.log(`\n📝 [${this.currentStep}]`);
      const configPath = path.join(newToolDir, 'tool.config.ts');
      let toolConfig = await fs.readFile(configPath, 'utf8');
      toolConfig = toolConfig
        .replace(/slug: '.*'/, `slug: '${slug}'`)
        .replace(/name: '.*'/, `name: '${options.name}'`)
        .replace(/description: '.*'/, `description: '${(options.description || '').replace(/'/g, "\\'")}'`)
        .replace(/category: '.*'/, `category: '${options.category}'`);
      await fs.writeFile(configPath, toolConfig);
      console.log('   ✓ 메타데이터 업데이트 완료');

      // Step 4: README.md 업데이트
      this.currentStep = 'README.md 업데이트';
      const readmePath = path.join(newToolDir, 'README.md');
      if (fs.existsSync(readmePath)) {
        const readmeContent = `# ${options.name}\n\n${options.description || ''}\n\n## 사용법\n\nTODO: 사용법을 작성하세요.\n`;
        await fs.writeFile(readmePath, readmeContent);
        console.log(`\n📄 [${this.currentStep}]`);
        console.log('   ✓ README.md 생성 완료');
      }

      // Step 5: AI Instruction 생성 (선택적)
      if (!options.skipInstruction && fs.existsSync(PROMPT_TEMPLATE_PATH)) {
        this.currentStep = 'AI Instruction 생성';
        console.log(`\n🧠 [${this.currentStep}]`);
        let prompt = await fs.readFile(PROMPT_TEMPLATE_PATH, 'utf8');
        prompt = prompt
          .replace(/{{TOOL_NAME}}/g, options.name)
          .replace(/{{TOOL_SLUG}}/g, slug)
          .replace(/{{TOOL_CATEGORY}}/g, options.category)
          .replace(/{{TOOL_DESCRIPTION}}/g, options.description || '')
          .replace(/{{UI_LIBRARY}}/g, config.uiLibrary)
          .replace(/{{TEST_LIBRARY}}/g, config.testLibrary);

        const instructionPath = path.join(newToolDir, 'INSTRUCTION.md');
        await fs.writeFile(instructionPath, prompt);
        console.log('   ✓ INSTRUCTION.md 생성 완료');
      }

      // 완료 메시지
      this.printSuccess(slug, newToolDir, options);
      return true;

    } catch (error) {
      console.error(`\n❌ [${this.currentStep}] 에러 발생:`);
      console.error(error.stack);
      await this.rollback();
      return false;
    }
  }

  /**
   * 성공 메시지 출력
   */
  printSuccess(slug, newToolDir, options) {
    console.log('\n' + '═'.repeat(50));
    console.log('✨ \x1b[32m도구 생성 완료!\x1b[0m');
    console.log('═'.repeat(50));
    console.log(`
📦 도구 정보:
   • 슬러그: ${slug}
   • 이름: ${options.name}
   • 카테고리: ${options.category}
   • 경로: ${path.relative(process.cwd(), newToolDir)}

📁 생성된 구조:
   ${slug}/
   ├── tool.config.ts
   ├── index.tsx
   ├── README.md
   ├── INSTRUCTION.md
   ├── ui/
   ├── model/
   ├── lib/
   └── __tests__/

🚀 다음 단계:
   1. INSTRUCTION.md를 AI에게 전달하여 구현 시작
   2. npm run dev 실행 후 /${options.category}/${slug} 에서 확인
   3. npm run validate-tool ${slug} 로 검증
`);
  }
}

// ============================================
// 미리보기 함수 (dry-run)
// ============================================
function showPreview(slug, options) {
  console.log('\n' + '═'.repeat(50));
  console.log('🔍 \x1b[36m미리보기 모드 (Dry Run)\x1b[0m');
  console.log('═'.repeat(50));
  console.log(`
📦 생성될 도구 정보:
   • 슬러그: ${slug}
   • 이름: ${options.name || toTitleCase(slug)}
   • 카테고리: ${options.category || 'utility'}
   • 설명: ${options.description || '(없음)'}

📁 생성될 파일 구조:
   src/features/tools/tools/${slug}/
   ├── tool.config.ts
   ├── index.tsx
   ├── README.md
   ├── INSTRUCTION.md
   ├── ui/
   ├── model/
   ├── lib/
   └── __tests__/

💡 실제 생성하려면 --dry-run 옵션을 제거하세요.
`);
}

// ============================================
// 대화형 입력 함수들
// ============================================
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function ask(rl, query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function interactiveMode(initialSlug) {
  const rl = createReadlineInterface();

  console.log('\n🏭 \x1b[36mV-Log Tool Factory (대화형 모드)\x1b[0m');
  console.log('═'.repeat(50));

  try {
    // Slug 입력
    let slug = initialSlug;
    if (!slug) {
      slug = await ask(rl, '\n🔹 Tool Slug (kebab-case): ');
    }

    if (!slug) {
      console.error('❌ Slug는 필수입니다.');
      rl.close();
      process.exit(1);
    }

    // Slug 검증
    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.error('❌ 잘못된 slug 형식. kebab-case (a-z, 0-9, -)만 사용하세요.');
      rl.close();
      process.exit(1);
    }

    // 중복 검사
    const newToolDir = path.join(TOOLS_DIR, slug);
    if (fs.existsSync(newToolDir)) {
      console.error(`❌ 이미 존재하는 도구입니다: ${slug}`);
      rl.close();
      process.exit(1);
    }

    // Name 입력
    const name = await ask(rl, `🔹 Tool Name (기본값: ${toTitleCase(slug)}): `) || toTitleCase(slug);

    // Category 선택
    console.log('\n📂 카테고리 목록:');
    config.categories.forEach((c, i) => console.log(`   ${i + 1}. ${c}`));
    const catIndex = await ask(rl, `🔹 카테고리 선택 (1-${config.categories.length}): `);
    const category = config.categories[parseInt(catIndex) - 1] || 'utility';

    // Description 입력
    const description = await ask(rl, '🔹 간단한 설명: ');

    rl.close();

    return { slug, name, category, description };

  } catch (error) {
    rl.close();
    throw error;
  }
}

// ============================================
// 유틸리티 함수
// ============================================
function toTitleCase(str) {
  return str.split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ============================================
// CLI 정의 (commander)
// ============================================
program
  .name('create-tool')
  .description('새 개발 도구 스캐폴딩 생성')
  .argument('[slug]', '도구 슬러그 (kebab-case)')
  .option('-n, --name <name>', '도구 표시 이름')
  .option('-c, --category <category>', '도구 카테고리')
  .option('-d, --description <desc>', '도구 설명')
  .option('--dry-run', '미리보기만 (파일 생성 안함)')
  .option('--skip-instruction', 'INSTRUCTION.md 생성 건너뛰기')
  .option('-i, --interactive', '대화형 모드 강제')
  .action(async (slug, options) => {
    try {
      // 대화형 모드
      if (options.interactive || (!slug && !options.name)) {
        const answers = await interactiveMode(slug);
        slug = answers.slug;
        options.name = answers.name;
        options.category = answers.category;
        options.description = answers.description;
      }

      // 필수값 검증
      if (!slug) {
        console.error('❌ Slug는 필수입니다.');
        process.exit(1);
      }

      // Slug 형식 검증
      if (!/^[a-z0-9-]+$/.test(slug)) {
        console.error('❌ 잘못된 slug 형식. kebab-case (a-z, 0-9, -)만 사용하세요.');
        process.exit(1);
      }

      // 중복 검사
      const newToolDir = path.join(TOOLS_DIR, slug);
      if (fs.existsSync(newToolDir)) {
        console.error(`❌ 이미 존재하는 도구입니다: ${slug}`);
        process.exit(1);
      }

      // 기본값 설정
      options.name = options.name || toTitleCase(slug);
      options.category = options.category || 'utility';
      options.description = options.description || '';

      // 카테고리 검증
      if (!config.categories.includes(options.category)) {
        console.warn(`⚠️  알 수 없는 카테고리: ${options.category}`);
        console.log(`   사용 가능: ${config.categories.join(', ')}`);
      }

      // Dry run 모드
      if (options.dryRun) {
        showPreview(slug, options);
        return;
      }

      // 도구 생성
      const creator = new ToolCreator();
      const success = await creator.create(slug, options);

      if (!success) {
        process.exit(1);
      }

    } catch (error) {
      console.error('\n❌ 예상치 못한 에러:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  });

// 도움말 추가
program.addHelpText('after', `
예시:
  $ npm run create-tool my-tool
  $ npm run create-tool my-tool -- --name="My Tool" --category=converter
  $ npm run create-tool my-tool -- --dry-run
  $ npm run create-tool -- -i
`);

program.parse();
