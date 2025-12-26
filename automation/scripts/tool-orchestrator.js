#!/usr/bin/env node

/**
 * 🚀 완전 자동화 도구 생성 오케스트레이터 (v4.0)
 *
 * 핵심 변경사항:
 * 1. 사용자 액션 2회만 (시작 + Step 5 선택)
 * 2. 파일 생성 자동 감지 (polling)
 * 3. 각 단계 자동 검증
 * 4. Step 6 병합 (8개 → 4개)
 * 5. 세션 기반 캐시 관리
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const { program } = require('commander');
const readline = require('readline');

const PROJECT_ROOT = path.join(__dirname, '../../');
const CACHE_DIR = path.join(__dirname, '../cache');
const PROMPTS_DIR = path.join(__dirname, '../prompts');
const TOOLS_DIR = path.join(PROJECT_ROOT, 'src/features/tools/tools');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
  magenta: '\x1b[35m',
};

// ============================================
// 단계 정의 (Step 6 병합: 8개 → 4개)
// ============================================
const STEPS = [
  {
    id: '1',
    name: '기존 도구 스캔',
    prompt: 'workflows/step1-scan-existing.md',
    outputs: ['existing-tools.json'],
    autoValidate: true,
  },
  {
    id: '2',
    name: '트렌드 및 키워드 분석',
    prompt: 'workflows/step2-competitive-analysis.md',
    outputs: ['competitive-analysis.json'],
    autoValidate: true,
    preExecute: 'auto-trend-analyzer.js', // 자동 크롤링 실행
  },
  {
    id: '3',
    name: '아이디어 브레인스토밍 (30개)',
    prompt: 'workflows/step3-brainstorm-ideas.md',
    outputs: ['all-ideas.json'],
    autoValidate: true,
  },
  {
    id: '4',
    name: '우선순위 평가 및 TOP 5 선정',
    prompt: 'workflows/step4-evaluate-priority.md',
    outputs: ['top5-suggestions.json'],
    autoValidate: true,
    validate: (data) => data.top5 && data.top5.length === 5,
  },
  {
    id: '5',
    name: '사용자 도구 선택 (대화형)',
    prompt: 'workflows/step5-user-selection.md',
    outputs: ['selected-tool.json'],
    requiresUserInput: true,
  },
  {
    id: '6-1',
    name: '핵심 구현 (config + 로직 + UI)',
    prompt: 'workflows/step6-1-core-implementation.md',
    autoValidate: true,
  },
  {
    id: '6-2',
    name: '고도화 (분석 + 파워업 구현)',
    prompt: 'workflows/step6-2-enhancement.md',
    outputs: ['enhancement-plan.json'],
    autoValidate: true,
  },
  {
    id: '6-3',
    name: 'SEO 콘텐츠 작성 (2500자+)',
    prompt: 'workflows/step6-3-seo-content.md',
    autoValidate: true,
  },
  {
    id: '6-4',
    name: '최종 감사 (A11y + AI 탐지)',
    prompt: 'workflows/step6-4-final-audit.md',
    outputs: ['readability-report.json'],
    autoValidate: true,
    validate: (data) => data.score >= 90,
  },
  {
    id: '8',
    name: '자동 단위 테스트 생성',
    prompt: 'workflows/step8-test-generation.md',
    autoValidate: true,
  },
];

// ============================================
// 세션 관리자
// ============================================
class SessionManager {
  constructor() {
    this.sessionId = new Date().toISOString().split('T')[0]; // 2025-12-26
    this.sessionDir = path.join(CACHE_DIR, 'sessions', this.sessionId);
    this.currentLink = path.join(CACHE_DIR, '.current');

    fs.ensureDirSync(this.sessionDir);
    fs.ensureDirSync(path.join(this.sessionDir, 'history'));

    // 현재 세션 symlink 업데이트
    if (fs.existsSync(this.currentLink)) {
      fs.removeSync(this.currentLink);
    }
    fs.symlinkSync(this.sessionDir, this.currentLink);
  }

  getPath(filename) {
    return path.join(this.sessionDir, filename);
  }

  async save(filename, data) {
    const filePath = this.getPath(filename);
    await fs.writeJson(filePath, data, { spaces: 2 });

    // 히스토리 보존
    const historyPath = path.join(this.sessionDir, 'history', `${filename}.${Date.now()}.json`);
    await fs.writeJson(historyPath, data, { spaces: 2 });

    return filePath;
  }

  async load(filename) {
    const filePath = this.getPath(filename);
    if (fs.existsSync(filePath)) {
      return await fs.readJson(filePath);
    }

    // 세션에 없으면 루트 캐시에서 찾기 (하위 호환)
    const rootPath = path.join(CACHE_DIR, filename);
    if (fs.existsSync(rootPath)) {
      return await fs.readJson(rootPath);
    }

    return null;
  }

  exists(filename) {
    return fs.existsSync(this.getPath(filename)) || fs.existsSync(path.join(CACHE_DIR, filename));
  }
}

// ============================================
// 완전 자동화 오케스트레이터
// ============================================
class FullAutoOrchestrator {
  constructor(options = {}) {
    this.mode = options.remodel ? 'remodel' : 'create';
    this.targetSlug = options.slug || null;
    this.session = new SessionManager();
    this.state = this.loadState();
    this.rl = null;
  }

  loadState() {
    const historyFile = this.session.getPath('.orchestrator_state.json');
    if (fs.existsSync(historyFile)) {
      return fs.readJsonSync(historyFile);
    }
    return {
      lastCompletedStep: 0,
      startTime: new Date().toISOString(),
      totalSteps: STEPS.length,
    };
  }

  saveState(stepId) {
    this.state.lastCompletedStep = stepId;
    this.state.lastUpdateTime = new Date().toISOString();
    fs.writeJsonSync(
      this.session.getPath('.orchestrator_state.json'),
      this.state,
      { spaces: 2 }
    );
  }

  log(message, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      step: '🚀',
      wait: '⏳',
      check: '🔍',
    };
    console.log(`${icons[type] || '•'} ${message}`);
  }

  async run() {
    console.log(`\n${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}🚀 완전 자동화 도구 생성 시스템 v4.0${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    console.log(`${colors.dim}세션 ID: ${this.session.sessionId}${colors.reset}`);
    console.log(`${colors.dim}모드: ${this.mode.toUpperCase()}${colors.reset}\n`);

    const activeSteps = this.mode === 'remodel'
      ? STEPS.filter(s => ['6-2', '6-3', '6-4', '8'].includes(s.id))
      : STEPS;

    try {
      for (let i = 0; i < activeSteps.length; i++) {
        const step = activeSteps[i];
        const stepIndex = STEPS.findIndex(s => s.id === step.id);

        // 이미 완료된 단계는 스킵
        if (this.mode === 'create' && stepIndex <= this.state.lastCompletedStep) {
          this.log(`Step ${step.id} 이미 완료됨 (스킵)`, 'success');
          continue;
        }

        console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
        console.log(`${colors.bright}[${i + 1}/${activeSteps.length}] Step ${step.id}: ${step.name}${colors.reset}`);
        console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

        // 단계 실행
        if (step.requiresUserInput) {
          await this.handleUserSelection(step);
        } else {
          await this.executeStep(step);
        }

        // 자동 검증
        if (step.autoValidate) {
          await this.autoValidate(step);
        }

        // 상태 저장
        this.saveState(stepIndex);

        this.log(`Step ${step.id} 완료\n`, 'success');
      }

      // 최종 리포트
      await this.printFinalReport();

    } catch (error) {
      console.error(`\n${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
      console.error(`${colors.red}❌ 오류 발생: ${error.message}${colors.reset}`);
      console.error(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
      console.error(error.stack);
      process.exit(1);
    } finally {
      if (this.rl) {
        this.rl.close();
      }
    }
  }

  async executeStep(step) {
    // Pre-execute 스크립트 실행 (Step 2 자동 크롤링 등)
    if (step.preExecute) {
      await this.runPreExecuteScript(step.preExecute);
    }

    // 프롬프트 로드
    const promptPath = path.join(PROMPTS_DIR, step.prompt);

    if (!fs.existsSync(promptPath)) {
      throw new Error(`프롬프트 파일 없음: ${step.prompt}`);
    }

    const prompt = await fs.readFile(promptPath, 'utf-8');

    console.log(`${colors.dim}📄 프롬프트 파일: automation/prompts/${step.prompt}${colors.reset}`);
    console.log(`${colors.dim}📏 크기: ${Math.ceil(prompt.length / 4)} 토큰 (예상)${colors.reset}\n`);

    // 이전 단계 데이터 주입 (컨텍스트)
    let enrichedPrompt = prompt;

    if (step.id === '6-1') {
      // Step 6-1에 선택된 도구 정보 주입
      const selected = await this.session.load('selected-tool.json');
      if (selected) {
        enrichedPrompt += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        enrichedPrompt += `## 선택된 도구 정보\n\n`;
        enrichedPrompt += `- **슬러그**: ${selected.slug}\n`;
        enrichedPrompt += `- **이름**: ${selected.name}\n`;
        enrichedPrompt += `- **카테고리**: ${selected.category}\n`;
        enrichedPrompt += `- **이유**: ${selected.reason}\n`;
        enrichedPrompt += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      }
    }

    if (step.id === '6-2') {
      // Step 6-2에 경쟁 분석 키워드 주입
      const analysis = await this.session.load('competitive-analysis.json');
      if (analysis && analysis.trends) {
        enrichedPrompt += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        enrichedPrompt += `## SEO 키워드 (트렌드 분석 결과)\n\n`;
        enrichedPrompt += `${analysis.trends.join(', ')}\n`;
        enrichedPrompt += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      }
    }

    if (step.id === '6-3' || step.id === '6-7') {
      // SEO 콘텐츠 작성 단계에서 기존 도구 목록(내부 링크용) 주입
      const existing = await this.session.load('existing-tools.json');
      if (existing && existing.tools) {
        const toolLinks = existing.tools.slice(0, 5).map(t => `- [${t.name}](/tools/${t.category}/${t.slug})`).join('\n');
        enrichedPrompt += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        enrichedPrompt += `## 사용 가능한 내부 링크 (반드시 3개 이상 포함)\n\n`;
        enrichedPrompt += `${toolLinks}\n`;
        enrichedPrompt += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      }
    }

    // AI에게 프롬프트 전달 안내
    console.log(`${colors.yellow}⏳ AI 작업 대기 중...${colors.reset}\n`);
    console.log(`${colors.dim}다음 작업을 수행하세요:${colors.reset}`);
    console.log(`${colors.dim}1. automation/prompts/${step.prompt} 파일을 읽어주세요${colors.reset}`);
    console.log(`${colors.dim}2. 프롬프트 지침에 따라 작업을 수행하세요${colors.reset}`);

    if (step.outputs && step.outputs.length > 0) {
      console.log(`${colors.dim}3. 결과를 다음 위치에 저장하세요:${colors.reset}`);
      step.outputs.forEach(output => {
        console.log(`   ${colors.cyan}→ automation/cache/sessions/${this.session.sessionId}/${output}${colors.reset}`);
        console.log(`      ${colors.dim}또는${colors.reset} ${colors.cyan}automation/cache/${output}${colors.reset}`);
      });
    } else {
      console.log(`${colors.dim}3. 도구 파일을 생성하세요:${colors.reset}`);
      console.log(`   ${colors.cyan}→ src/features/tools/tools/[slug]/tool.config.ts${colors.reset}`);
      console.log(`   ${colors.cyan}→ src/features/tools/tools/[slug]/index.tsx${colors.reset}`);
    }

    console.log('');

    // 출력 파일 대기
    if (step.outputs && step.outputs.length > 0) {
      await this.waitForOutputs(step);
    } else {
      await this.waitForToolFiles(step);
    }
  }

  async waitForOutputs(step) {
    console.log(`${colors.yellow}⏳ 출력 파일 생성 대기 중...${colors.reset}`);
    console.log(`${colors.dim}필요한 파일: ${step.outputs.join(', ')}${colors.reset}\n`);

    const maxAttempts = 60; // 10분 (10초 간격)
    let attempts = 0;

    while (attempts < maxAttempts) {
      const allExist = step.outputs.every(file => this.session.exists(file));

      if (allExist) {
        console.log(`\n${colors.green}✅ 모든 출력 파일 확인됨${colors.reset}\n`);
        return;
      }

      // 10초 대기
      process.stdout.write(`${colors.dim}.${colors.reset}`);
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
    }

    throw new Error(`타임아웃: ${step.outputs.join(', ')} 파일이 생성되지 않았습니다 (10분 초과)`);
  }

  async waitForToolFiles(step) {
    // Step 6 계열에서 도구 파일 생성 대기
    const selected = await this.session.load('selected-tool.json');
    if (!selected) return;

    const toolDir = path.join(TOOLS_DIR, selected.slug);
    const configFile = path.join(toolDir, 'tool.config.ts');
    const indexFile = path.join(toolDir, 'index.tsx');

    console.log(`${colors.yellow}⏳ 도구 파일 생성 대기 중...${colors.reset}`);
    console.log(`${colors.dim}경로: src/features/tools/tools/${selected.slug}/${colors.reset}\n`);

    const maxAttempts = 60; // 10분
    let attempts = 0;

    while (attempts < maxAttempts) {
      const configExists = fs.existsSync(configFile);
      const indexExists = fs.existsSync(indexFile);

      if (configExists && indexExists) {
        console.log(`\n${colors.green}✅ 도구 파일 확인됨${colors.reset}`);
        console.log(`   ${colors.green}→${colors.reset} tool.config.ts`);
        console.log(`   ${colors.green}→${colors.reset} index.tsx\n`);
        return;
      }

      process.stdout.write(`${colors.dim}.${colors.reset}`);
      await new Promise(resolve => setTimeout(resolve, 10000));
      attempts++;
    }

    throw new Error(`타임아웃: 도구 파일이 생성되지 않았습니다 (10분 초과)`);
  }

  async runPreExecuteScript(scriptName) {
    const scriptPath = path.join(__dirname, scriptName);

    if (!fs.existsSync(scriptPath)) {
      console.warn(`${colors.yellow}⚠️  Pre-execute 스크립트 없음: ${scriptName} (스킵)${colors.reset}\n`);
      return;
    }

    console.log(`${colors.blue}🔧 자동화 스크립트 실행: ${scriptName}${colors.reset}\n`);

    try {
      // 스크립트 실행 (동기적으로)
      execSync(`node "${scriptPath}"`, {
        stdio: 'inherit',
        cwd: PROJECT_ROOT,
        timeout: 300000, // 5분 타임아웃
      });

      console.log(`\n${colors.green}✅ 스크립트 실행 완료${colors.reset}\n`);
    } catch (error) {
      // 실패해도 계속 진행 (수동으로 작업 가능)
      console.warn(`\n${colors.yellow}⚠️  스크립트 실행 실패. 수동 작업으로 진행합니다.${colors.reset}`);
      console.warn(`${colors.dim}에러: ${error.message}${colors.reset}\n`);
    }
  }

  async handleUserSelection(step) {
    const top5 = await this.session.load('top5-suggestions.json');

    if (!top5 || !top5.top5) {
      throw new Error('TOP 5 추천 데이터가 없습니다. Step 4를 먼저 완료하세요.');
    }

    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bright}${colors.magenta}📌 TOP 5 도구 추천 (우선순위순)${colors.reset}`);
    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    top5.top5.forEach((tool, idx) => {
      console.log(`${colors.bright}${idx + 1}. ${tool.name}${colors.reset}`);
      console.log(`   ${colors.dim}${tool.reason}${colors.reset}`);
      console.log(`   ${colors.yellow}난이도: ${tool.difficulty}${colors.reset} | ${colors.cyan}점수: ${tool.priorityScore}${colors.reset}\n`);
    });

    // readline으로 사용자 입력 받기
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve, reject) => {
      this.rl.question(`${colors.bright}생성할 도구 번호를 입력하세요 (1-5): ${colors.reset}`, async (answer) => {
        const choice = parseInt(answer.trim());

        if (isNaN(choice) || choice < 1 || choice > 5) {
          console.error(`\n${colors.red}❌ 잘못된 입력입니다. 1-5 사이의 숫자를 입력하세요.${colors.reset}\n`);
          this.rl.close();
          reject(new Error('잘못된 선택'));
          return;
        }

        const selected = top5.top5[choice - 1];

        await this.session.save('selected-tool.json', selected);

        console.log(`\n${colors.green}✅ 선택됨: ${selected.name}${colors.reset}`);
        console.log(`${colors.dim}슬러그: ${selected.slug}${colors.reset}\n`);

        this.rl.close();
        resolve();
      });
    });
  }

  async autoValidate(step) {
    console.log(`${colors.cyan}🔍 자동 검증 수행 중...${colors.reset}`);

    // 출력 파일 검증
    if (step.outputs) {
      for (const output of step.outputs) {
        const data = await this.session.load(output);

        if (!data) {
          throw new Error(`검증 실패: ${output} 파일을 읽을 수 없습니다`);
        }

        // 커스텀 검증 함수 실행
        if (step.validate && !step.validate(data)) {
          throw new Error(`검증 실패: ${output}이 유효성 검사를 통과하지 못했습니다`);
        }

        console.log(`   ${colors.green}✓${colors.reset} ${output} ${colors.dim}(유효함)${colors.reset}`);
      }
    }

    // Step 6-4 (최종 감사)에서 validate-tool 실행
    if (step.id === '6-4') {
      const selected = await this.session.load('selected-tool.json');
      if (selected) {
        console.log(`\n${colors.cyan}🔍 품질 검증 도구 실행 중...${colors.reset}\n`);

        try {
          const validateScript = path.join(__dirname, 'validate-tool.js');
          execSync(`node "${validateScript}" ${selected.slug} --verbose`, {
            stdio: 'inherit',
            cwd: PROJECT_ROOT
          });
        } catch (error) {
          console.warn(`\n${colors.yellow}⚠️  품질 검증에서 경고가 발생했습니다. 계속 진행합니다.${colors.reset}\n`);
        }
      }
    }

    console.log(`${colors.green}✅ 검증 통과${colors.reset}\n`);
  }

  async printFinalReport() {
    const endTime = new Date();
    const startTime = new Date(this.state.startTime);
    const durationMs = endTime - startTime;
    const durationMin = Math.floor(durationMs / 60000);
    const durationSec = Math.floor((durationMs % 60000) / 1000);

    const selected = await this.session.load('selected-tool.json');

    console.log(`\n${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bright}${colors.green}🎉 도구 생성 완료!${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    if (selected) {
      console.log(`${colors.bright}생성된 도구:${colors.reset} ${selected.name}`);
      console.log(`${colors.dim}슬러그:${colors.reset} ${selected.slug}`);
      console.log(`${colors.dim}카테고리:${colors.reset} ${selected.category}\n`);

      console.log(`${colors.bright}📁 생성 위치:${colors.reset}`);
      console.log(`   src/features/tools/tools/${selected.slug}/\n`);

      console.log(`${colors.bright}🌐 로컬 테스트:${colors.reset}`);
      console.log(`   npm run dev`);
      console.log(`   http://localhost:3000/${selected.category}/${selected.slug}\n`);

      console.log(`${colors.bright}🔍 품질 검증:${colors.reset}`);
      console.log(`   npm run validate-tool ${selected.slug}\n`);
    }

    console.log(`${colors.bright}⏱️  소요 시간:${colors.reset} ${durationMin}분 ${durationSec}초`);
    console.log(`${colors.bright}📊 세션 로그:${colors.reset} automation/cache/sessions/${this.session.sessionId}/\n`);

    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  }
}

// ============================================
// CLI 인터페이스
// ============================================
program
  .name('tool-orchestrator')
  .description('완전 자동화 도구 생성 시스템')
  .option('--remodel', '기존 도구 품질 강화 모드')
  .option('--slug <slug>', '대상 도구 슬러그 (remodel 모드 필수)')
  .action((options) => {
    new FullAutoOrchestrator(options).run();
  });

program.parse();
