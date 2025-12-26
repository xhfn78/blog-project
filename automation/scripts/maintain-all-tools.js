#!/usr/bin/env node

/**
 * 🛠️ 전체 도구 유지보수 자동화 스크립트
 * 
 * 모든 기존 도구를 순회하며 SEO 최적화 및 품질 향상(Remodel) 프로세스를 실행합니다.
 * 
 * 사용법:
 * node automation/scripts/maintain-all-tools.js
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.join(__dirname, '../../');
const TOOLS_DIR = path.join(PROJECT_ROOT, 'src/features/tools/tools');
const ORCHESTRATOR_SCRIPT = path.join(__dirname, 'tool-orchestrator.js');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

async function main() {
  console.log(`\n${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}🛠️  전체 도구 유지보수 자동화 시작${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  if (!fs.existsSync(TOOLS_DIR)) {
    console.error(`${colors.red}❌ 도구 디렉토리를 찾을 수 없습니다: ${TOOLS_DIR}${colors.reset}`);
    process.exit(1);
  }

  // 디렉토리 목록 읽기 (숨김 파일 제외)
  const items = await fs.readdir(TOOLS_DIR);
  const tools = [];

  for (const item of items) {
    if (item.startsWith('.')) continue;
    
    const itemPath = path.join(TOOLS_DIR, item);
    const stat = await fs.stat(itemPath);
    
    if (stat.isDirectory()) {
      tools.push(item);
    }
  }

  console.log(`${colors.dim}발견된 도구: ${tools.length}개${colors.reset}\n`);

  let successCount = 0;
  let failCount = 0;
  const failedTools = [];

  for (let i = 0; i < tools.length; i++) {
    const slug = tools[i];
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bright}[${i + 1}/${tools.length}] ${slug} 최적화 중...${colors.reset}`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    try {
      // tool-orchestrator 실행 (remodel 모드)
      // stdio: 'inherit'으로 실행 과정을 보여줌
      execSync(`node "${ORCHESTRATOR_SCRIPT}" --remodel --slug ${slug}`, {
        stdio: 'inherit',
        cwd: PROJECT_ROOT,
      });

      console.log(`\n${colors.green}✅ ${slug} 완료${colors.reset}\n`);
      successCount++;
    } catch (error) {
      console.error(`\n${colors.red}❌ ${slug} 실패${colors.reset}`);
      console.error(`${colors.dim}${error.message}${colors.reset}\n`);
      failCount++;
      failedTools.push(slug);
    }
  }

  console.log(`\n${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}📊 최종 결과 리포트${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  console.log(`총 도구: ${tools.length}개`);
  console.log(`${colors.green}성공: ${successCount}개${colors.reset}`);
  
  if (failCount > 0) {
    console.log(`${colors.red}실패: ${failCount}개${colors.reset}`);
    console.log(`${colors.red}실패한 도구 목록:${colors.reset}`);
    failedTools.forEach(t => console.log(`- ${t}`));
  } else {
    console.log(`${colors.green}모든 도구가 성공적으로 최적화되었습니다!${colors.reset}`);
  }
  
  console.log('');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
