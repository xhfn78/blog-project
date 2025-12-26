#!/usr/bin/env node

/**
 * 🔍 Auto Trend Analyzer v1.1
 *
 * Google 검색 및 GitHub Trending을 자동으로 크롤링하여
 * 최신 개발자 도구 트렌드를 분석합니다.
 *
 * 사용법:
 *   node automation/scripts/auto-trend-analyzer.js          # 캐시 사용 (24시간)
 *   node automation/scripts/auto-trend-analyzer.js --force  # 강제 새로고침
 *   npm run trend-analysis                                  # 캐시 사용
 *   npm run trend-analysis -- --force                       # 강제 새로고침
 *
 * 출력:
 *   automation/cache/competitive-analysis.json
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// ===== Playwright 자동 설치 =====

/**
 * Playwright 설치 여부 확인 및 자동 설치
 */
async function ensurePlaywrightInstalled() {
  try {
    // 1. Playwright 모듈 존재 확인
    require.resolve('playwright');
    console.log('✅ Playwright 이미 설치됨\n');
    
    // 2. Chromium 브라우저 존재 확인
    const { chromium } = require('playwright');
    try {
      const browser = await chromium.launch({ headless: true });
      await browser.close();
      console.log('✅ Chromium 브라우저 준비됨\n');
      return true;
    } catch (browserError) {
      console.log('⚠️  Chromium 브라우저 미설치 - 다운로드 시작...\n');
      
      // 브라우저만 다운로드
      console.log('📥 Chromium 다운로드 중... (1-2분 소요)');
      execSync('npx playwright install chromium', {
        stdio: 'inherit',
        cwd: path.join(__dirname, '../../'),
      });
      
      console.log('\n✅ Chromium 다운로드 완료\n');
      return true;
    }
  } catch (error) {
    // Playwright 모듈 자체가 없음
    console.log('⚠️  Playwright 미설치 - 설치 시작...\n');
    
    try {
      // 1. Playwright 패키지 설치
      console.log('📦 Playwright 설치 중... (30초-1분 소요)');
      execSync('npm install playwright --save-dev', {
        stdio: 'inherit',
        cwd: path.join(__dirname, '../../'),
      });
      
      console.log('\n✅ Playwright 설치 완료\n');
      
      // 2. Chromium 브라우저 다운로드
      console.log('📥 Chromium 브라우저 다운로드 중... (1-2분 소요)');
      execSync('npx playwright install chromium', {
        stdio: 'inherit',
        cwd: path.join(__dirname, '../../'),
      });
      
      console.log('\n✅ Chromium 다운로드 완료\n');
      console.log('🎉 Playwright 설치 완료! 트렌드 분석을 시작합니다.\n');
      
      return true;
    } catch (installError) {
      console.error('❌ Playwright 설치 실패:', installError.message);
      console.error('\n수동 설치 방법:');
      console.error('  1. npm install playwright --save-dev');
      console.error('  2. npx playwright install chromium\n');
      return false;
    }
  }
}


// ===== 설정 =====
const CACHE_DIR = path.join(__dirname, '../cache');
const OUTPUT_FILE = path.join(CACHE_DIR, 'competitive-analysis.json');
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24시간 (밀리초)

// 한국어 검색 쿼리 (한국 시장 특화)
const SEARCH_QUERIES = [
  // 한국어 트렌드
  '개발자 도구 추천 2025',
  '프론트엔드 개발 도구',
  'Next.js 개발 도구',
  'React 컴포넌트 생성기',
  'Tailwind CSS 도구',
  
  // 영어 트렌드 (글로벌 참고용)
  'trending web developer tools 2025',
  'figma to code converter',
  'typescript code generator',
  'nextjs developer utilities',
  'ai powered developer tools 2025',
];

const COMPETITOR_DOMAINS = [
  'transform.tools',
  'codebeautify.org',
  'jsonformatter.org',
  'regex101.com',
  'devtoys.app',
];

// ===== 유틸리티 함수 =====

/**
 * Google 검색 결과에서 트렌드 키워드 추출
 */
async function extractTrendsFromGoogle(page, query) {
  console.log(`🔍 검색 중: "${query}"`);

  try {
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    // Google 검색 결과 타이틀 추출
    const results = await page.$$eval('h3', (elements) =>
      elements.map((el) => el.textContent.trim()).filter(Boolean)
    );

    // 관련 검색어 추출 (People also ask, Related searches)
    const relatedSearches = await page.$$eval(
      'div[data-topic] span, a[data-ved] div',
      (elements) => elements.map((el) => el.textContent.trim()).filter(Boolean)
    );

    return {
      results: results.slice(0, 10),
      relatedSearches: relatedSearches.slice(0, 10),
    };
  } catch (error) {
    console.warn(`⚠️  검색 실패: ${query} - ${error.message}`);
    return { results: [], relatedSearches: [] };
  }
}

/**
 * GitHub Trending에서 인기 저장소 추출
 */
async function extractGitHubTrending(page) {
  console.log('🐙 GitHub Trending 분석 중...');

  try {
    await page.goto('https://github.com/trending/javascript?since=weekly', {
      waitUntil: 'domcontentloaded', // networkidle → domcontentloaded
      timeout: 60000, // 30초 → 60초
    });

    const repos = await page.$$eval('article.Box-row', (articles) =>
      articles.slice(0, 10).map((article) => {
        const titleEl = article.querySelector('h2 a');
        const descEl = article.querySelector('p');
        const starsEl = article.querySelector('svg.octicon-star ~ span');

        return {
          name: titleEl?.textContent.trim().replace(/\s+/g, ' ') || '',
          description: descEl?.textContent.trim() || '',
          stars: starsEl?.textContent.trim() || '0',
        };
      })
    );

    return repos.filter((r) => r.name);
  } catch (error) {
    console.warn(`⚠️  GitHub Trending 실패: ${error.message}`);
    return [];
  }
}

/**
 * 경쟁사 도구 분석
 */
async function analyzeCompetitor(page, domain) {
  console.log(`🔎 경쟁사 분석: ${domain}`);

  try {
    await page.goto(`https://${domain}`, {
      waitUntil: 'domcontentloaded', // networkidle → domcontentloaded (광고 많은 사이트 대응)
      timeout: 60000, // 30초 → 60초
    });

    // 메타 정보 추출
    const metadata = await page.evaluate(() => {
      const getMetaContent = (name) =>
        document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.content || '';

      return {
        title: document.title,
        description: getMetaContent('description') || getMetaContent('og:description'),
      };
    });

    // 주요 기능 추출 (h1, h2, h3 제목 기반)
    const features = await page.$$eval('h1, h2, h3', (headings) =>
      headings
        .map((h) => h.textContent.trim())
        .filter((text) => text.length > 5 && text.length < 100)
        .slice(0, 5)
    );

    // 간단한 gap 분석 (한국어 지원 여부 확인)
    const hasKoreanSupport = await page.evaluate(() => {
      const bodyText = document.body.textContent;
      return /[가-힣]/.test(bodyText);
    });

    const gaps = [];
    if (!hasKoreanSupport) gaps.push('No Korean support');
    if (features.length < 3) gaps.push('Limited features');

    return {
      name: domain,
      title: metadata.title,
      description: metadata.description.slice(0, 150),
      features: features.slice(0, 5),
      gaps,
    };
  } catch (error) {
    console.warn(`⚠️  ${domain} 분석 실패: ${error.message}`);
    return {
      name: domain,
      title: '',
      description: '',
      features: [],
      gaps: ['Analysis failed'],
    };
  }
}

/**
 * 키워드에서 롱테일 키워드 추출 (3단어 이상)
 */
function extractLongTailKeywords(texts) {
  const keywords = new Set();

  texts.forEach((text) => {
    // 3단어 이상의 구문 추출
    const words = text
      .toLowerCase()
      .replace(/[^\w\s가-힣]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    for (let i = 0; i < words.length - 2; i++) {
      const phrase = words.slice(i, i + 3).join(' ');
      if (phrase.length > 10 && phrase.length < 60) {
        keywords.add(phrase);
      }
    }
  });

  return Array.from(keywords).slice(0, 20);
}

/**
 * 트렌드 데이터를 카테고리별로 분류
 */
function categorizeTrends(allTexts) {
  const categories = {
    converter: [],
    generator: [],
    formatter: [],
    utility: [],
  };

  const patterns = {
    converter: /convert|transform|translate|migration|px to|rgb|hex/i,
    generator: /generat|create|build|make|uuid|qr|mock|dummy/i,
    formatter: /format|beautify|pretty|lint|minif|compress/i,
    utility: /tool|util|helper|calculator|validator|tester/i,
  };

  allTexts.forEach((text) => {
    Object.entries(patterns).forEach(([category, regex]) => {
      if (regex.test(text)) {
        categories[category].push(text);
      }
    });
  });

  // 각 카테고리별 상위 5개만 유지
  Object.keys(categories).forEach((cat) => {
    categories[cat] = [...new Set(categories[cat])].slice(0, 5);
  });

  return categories;
}

/**
 * 인사이트 생성 (AI 프롬프트용 요약)
 */
function generateInsights(trends, competitors, githubRepos) {
  const insights = [];

  // 트렌드 키워드 분석
  const trendingTopics = Object.entries(trends)
    .filter(([_, items]) => items.length > 0)
    .map(([cat, items]) => `${cat} 카테고리: ${items[0]}`)
    .join(', ');

  if (trendingTopics) {
    insights.push(`최근 인기 주제: ${trendingTopics}`);
  }

  // 경쟁사 gap 분석
  const competitorsWithoutKorean = competitors.filter((c) =>
    c.gaps.includes('No Korean support')
  );

  if (competitorsWithoutKorean.length > 0) {
    insights.push(
      `한국어 미지원 경쟁사 ${competitorsWithoutKorean.length}개 발견 (차별화 기회)`
    );
  }

  // GitHub 인기 저장소
  if (githubRepos.length > 0) {
    const topRepo = githubRepos[0];
    insights.push(
      `GitHub 트렌딩 1위: ${topRepo.name} (${topRepo.stars} stars) - ${topRepo.description.slice(0, 50)}`
    );
  }

  return insights.join('. ');
}

/**
 * 캐시 확인 및 반환
 * @param {boolean} forceRefresh - 강제 새로고침 여부
 * @returns {object|null} - 캐시 데이터 또는 null
 */
function checkCache(forceRefresh = false) {
  // 강제 새로고침 플래그가 있으면 캐시 무시
  if (forceRefresh) {
    console.log('🔄 강제 새로고침 모드 - 캐시 무시\n');
    return null;
  }

  // 캐시 파일 존재 확인
  if (!fs.existsSync(OUTPUT_FILE)) {
    console.log('📭 캐시 없음 - 새로운 데이터 수집 시작\n');
    return null;
  }

  try {
    const cache = fs.readJsonSync(OUTPUT_FILE);
    const cacheAge = Date.now() - new Date(cache.scannedAt).getTime();
    const cacheAgeHours = Math.floor(cacheAge / (60 * 60 * 1000));
    const cacheAgeMinutes = Math.floor((cacheAge % (60 * 60 * 1000)) / (60 * 1000));

    // 캐시 만료 확인
    if (cacheAge >= CACHE_EXPIRY) {
      console.log(`⏰ 캐시 만료됨 (${cacheAgeHours}시간 ${cacheAgeMinutes}분 경과)`);
      console.log('🔄 새로운 데이터 수집 시작\n');
      return null;
    }

    // 유효한 캐시 발견
    console.log('✅ 유효한 캐시 발견!');
    console.log(`📅 생성 시각: ${new Date(cache.scannedAt).toLocaleString('ko-KR')}`);
    console.log(`⏱️  경과 시간: ${cacheAgeHours}시간 ${cacheAgeMinutes}분`);
    console.log(`⏳ 남은 시간: ${24 - cacheAgeHours}시간`);
    console.log(`\n💡 강제 새로고침: npm run trend-analysis -- --force\n`);

    return cache;
  } catch (error) {
    console.warn(`⚠️  캐시 읽기 실패: ${error.message}`);
    console.log('🔄 새로운 데이터 수집 시작\n');
    return null;
  }
}

/**
 * 메인 실행 함수
 */
async function analyzeTrends(options = {}) {
  const forceRefresh = options.force || false;

  // Playwright 설치 확인 및 자동 설치
  console.log('🔍 Playwright 설치 확인 중...\n');
  const isInstalled = await ensurePlaywrightInstalled();
  
  if (!isInstalled) {
    console.error('❌ Playwright 설치 실패 - AI 기반 폴백으로 전환합니다.\n');
    console.error('💡 Step 2 프롬프트를 읽고 AI가 직접 트렌드를 분석하세요.\n');
    return null; // AI가 수동으로 작업하도록 null 반환
  }

  // 캐시 확인
  const cachedData = checkCache(forceRefresh);
  if (cachedData) {
    return cachedData;
  }

  console.log('🚀 트렌드 분석 시작...\n');

  const { chromium } = require('playwright');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  try {
    // 1. Google 검색 결과 크롤링
    const allGoogleResults = [];
    const allRelatedSearches = [];

    for (const query of SEARCH_QUERIES) {
      const { results, relatedSearches } = await extractTrendsFromGoogle(page, query);
      allGoogleResults.push(...results);
      allRelatedSearches.push(...relatedSearches);
      await page.waitForTimeout(2000); // Rate limiting
    }

    // 2. GitHub Trending 크롤링
    const githubRepos = await extractGitHubTrending(page);
    await page.waitForTimeout(2000);

    // 3. 경쟁사 분석
    const competitors = [];
    for (const domain of COMPETITOR_DOMAINS) {
      const analysis = await analyzeCompetitor(page, domain);
      competitors.push(analysis);
      await page.waitForTimeout(2000);
    }

    // 4. 롱테일 키워드 추출
    const allTexts = [
      ...allGoogleResults,
      ...allRelatedSearches,
      ...githubRepos.map((r) => r.description),
    ];
    const longTailKeywords = extractLongTailKeywords(allTexts);

    // 5. 카테고리별 트렌드 분류
    const categorizedTrends = categorizeTrends(allTexts);

    // 6. 인사이트 생성
    const insights = generateInsights(categorizedTrends, competitors, githubRepos);

    // 7. 결과 저장
    const output = {
      scannedAt: new Date().toISOString(),
      version: '1.0',
      trends: categorizedTrends,
      longTailKeywords: longTailKeywords.slice(0, 15),
      competitors: competitors.map((c) => ({
        name: c.name,
        title: c.title,
        description: c.description,
        features: c.features,
        gaps: c.gaps,
      })),
      githubTrending: githubRepos.slice(0, 5).map((r) => ({
        name: r.name,
        description: r.description,
        stars: r.stars,
      })),
      insights,
      rawData: {
        googleResults: allGoogleResults.slice(0, 20),
        relatedSearches: allRelatedSearches.slice(0, 20),
      },
    };

    fs.ensureDirSync(CACHE_DIR);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

    console.log('\n✅ 트렌드 분석 완료!');
    console.log(`📁 파일 저장: ${OUTPUT_FILE}`);
    console.log(`\n📊 분석 결과 요약:`);
    console.log(`   - 롱테일 키워드: ${longTailKeywords.length}개`);
    console.log(`   - 경쟁사 분석: ${competitors.length}개`);
    console.log(`   - GitHub 트렌딩: ${githubRepos.length}개`);
    console.log(`\n💡 인사이트:\n   ${insights}\n`);

    return output;
  } catch (error) {
    console.error('❌ 트렌드 분석 실패:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
}

// ===== 실행 =====
if (require.main === module) {
  // CLI 인자 파싱
  const args = process.argv.slice(2);
  const forceRefresh = args.includes('--force') || args.includes('-f');

  analyzeTrends({ force: forceRefresh })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { analyzeTrends };
