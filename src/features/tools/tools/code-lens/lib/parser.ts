// src/features/tools/tools/code-lens/lib/parser.ts
import { AnalysisResult, Language, CodePattern, ScenarioPattern } from './types';
import { JS_TS_PATTERNS, SCENARIO_PATTERNS as JS_SCENARIOS } from './dictionaries/js-ts';
import { HTML_PATTERNS } from './dictionaries/html';
import { CSS_PATTERNS } from './dictionaries/css';
import { JSON_PATTERNS } from './dictionaries/json';
import { SQL_PATTERNS } from './dictionaries/sql';
import { MARKDOWN_PATTERNS } from './dictionaries/markdown';
import { YAML_PATTERNS } from './dictionaries/yaml';
import { GRAPHQL_PATTERNS } from './dictionaries/graphql';

const PATTERNS_BY_LANG: Record<Language, CodePattern[]> = {
  javascript: [...JS_TS_PATTERNS, ...HTML_PATTERNS], 
  typescript: [...JS_TS_PATTERNS, ...HTML_PATTERNS],
  html: HTML_PATTERNS,
  css: CSS_PATTERNS,
  json: JSON_PATTERNS,
  sql: SQL_PATTERNS,
  markdown: MARKDOWN_PATTERNS,
  yaml: YAML_PATTERNS,
  graphql: GRAPHQL_PATTERNS,
  unknown: [],
};

const SCENARIOS_BY_LANG: Record<Language, ScenarioPattern[]> = {
  javascript: JS_SCENARIOS,
  typescript: JS_SCENARIOS,
  html: [],
  css: [],
  json: [],
  sql: [],
  markdown: [],
  yaml: [],
  graphql: [],
  unknown: [],
};

const TAILWIND_SPEC: Record<string, string> = {
  'flex': 'display: flex; (유연한 레이아웃 박스)',
  'grid': 'display: grid; (격자형 레이아웃)',
  'list-disc': '목록 앞에 ● 모양의 불렛 기호 표시',
  'list-decimal': '목록 앞에 1, 2, 3 숫자 표시',
  'items-': '수직 정렬 설정',
  'justify-': '수평 간격 배치',
  'gap-': '요소 사이의 간격',
  'space-y-': '세로로 나열된 항목들 사이의 간격',
  'space-x-': '가로로 나열된 항목들 사이의 간격',
  'p-': '내부 여백(Padding)',
  'pl-': '왼쪽 내부 여백',
  'pr-': '오른쪽 내부 여백',
  'm-': '외부 여백(Margin)',
  'mt-': '위쪽 외부 여백',
  'mb-': '아래쪽 외부 여백',
  'w-': '너비(Width) 설정',
  'h-': '높이(Height) 설정',
  'text-': '글자 크기 및 색상',
  'leading-': '줄 간격(행간) 조절로 가독성 향상',
  'rounded': '모서리 둥글게 설정',
  'border': '테두리 선 설정',
  'shadow': '그림자 효과',
  'transition': '부드러운 상태 변화 효과',
  'dark:': '다크모드(어두운 화면) 환경 전용 스타일',
  'backdrop-blur': '배경을 흐리게 처리하는 효과 (유리창 느낌)',
  'bg-opacity': '배경색의 투명도 조절',
  'sticky': '스크롤 시 특정 위치에 고정',
  'z-': '요소의 겹침 순서 설정'
};

function detectLanguage(code: string): Language {
  const trimmed = code.trim();

  // 1. JSON 감지 (가장 명확한 구조)
  if (/^\s*\{/.test(trimmed) && /:\s*["'\[\{]/.test(trimmed) && /"[a-zA-Z_][a-zA-Z0-9_]*"\s*:/.test(trimmed)) {
    return 'json';
  }

  // 2. SQL 감지 (키워드 기반)
  if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|FROM|WHERE|JOIN)\b/i.test(trimmed)) {
    return 'sql';
  }

  // 3. YAML 감지 (들여쓰기 + 콜론 구조)
  if (/^[a-z_-]+:\s*$/im.test(trimmed) || /^\s+-\s+[a-z]/im.test(trimmed)) {
    return 'yaml';
  }

  // 4. GraphQL 감지
  if (/\b(query|mutation|subscription|fragment|type|interface|schema)\b/.test(trimmed) && /{[^}]*}/s.test(trimmed)) {
    return 'graphql';
  }

  // 5. Markdown 감지
  if (/^#+\s+/.test(trimmed) || /\[.+\]\(.+\)/.test(trimmed) || /^[*-]\s+/.test(trimmed) || /```/.test(trimmed)) {
    return 'markdown';
  }

  // 6. HTML 감지
  if (/<[a-z1-6]+[^>]*>/i.test(trimmed)) {
    return 'html';
  }

  // 7. CSS 감지
  if (/(?:@media|@keyframes|[:.][a-z0-9_-]+\s*{)/i.test(trimmed)) {
    return 'css';
  }

  // 8. JavaScript/TypeScript 감지
  if (/(?:import|export|const|let|var|function|=>|useState|useEffect|onChange|onClick|set[A-Z])/.test(trimmed)) {
    return /interface|type|:\s*[A-Z]/.test(trimmed) ? 'typescript' : 'javascript';
  }

  // 9. 기본값 (JavaScript로 추정)
  return 'javascript';
}

function analyzePatterns(code: string, language: Language) {
  const patterns = PATTERNS_BY_LANG[language] || [];
  const scenarios = SCENARIOS_BY_LANG[language] || [];
  const found: { pattern: CodePattern; count: number }[] = [];
  const foundScenarios: ScenarioPattern[] = [];
  const lowercaseCode = code.toLowerCase();

  patterns.forEach(pt => {
    const regex = new RegExp(pt.regex);
    if (regex.test(code)) {
      found.push({ pattern: pt, count: 1 });
    }
  });

  scenarios.forEach(scen => {
    const hasAll = scen.requiredKeywords.every(kw => lowercaseCode.includes(kw.toLowerCase()));
    if (hasAll) foundScenarios.push(scen);
  });

  // [Tailwind 스캐닝 보강]
  const classMatches = code.match(/className=["']([^"']+)["']/g);
  if (classMatches) {
    const allClasses = classMatches.flatMap(m => m.replace(/className=["']|["']/g, '').split(/\s+/));
    const uniqueClasses = Array.from(new Set(allClasses));
    
    uniqueClasses.forEach(cls => {
      const isDark = cls.startsWith('dark:');
      const cleanCls = isDark ? cls.replace('dark:', '') : cls;
      
      const specKey = Object.keys(TAILWIND_SPEC).find(key => 
        cleanCls === key || (key.includes('-') && cleanCls.startsWith(key))
      );
      
      if (specKey) {
        let template = `**${cls}**: ${TAILWIND_SPEC[specKey]}`;
        if (isDark) template = `**${cls}**: [다크모드] ${TAILWIND_SPEC[specKey]}`;
        
        found.push({
          pattern: {
            id: `tw-${cls}`,
            regex: new RegExp(cls),
            description: `디자인: ${cls}`,
            template: template,
            category: 'Style',
            importance: 'medium'
          },
          count: 1
        });
      }
    });
  }

  return { found, foundScenarios };
}

function formatPatternContent(pt: CodePattern): string {
  let content = pt.template || pt.description;
  
  if (pt.analogy) {
    content += `\n> 💡 **비유로 이해하기**: ${pt.analogy}`;
  }
  
  if (pt.tips && pt.tips.length > 0) {
    content += `\n* **Tips**: ${pt.tips.join(', ')}`;
  }
  
  if (pt.warnings && pt.warnings.length > 0) {
    content += `\n* ⚠️ **주의**: ${pt.warnings.join(', ')}`;
  }
  
  return content;
}

function generateStructuredReport(language: Language, analysis: any): AnalysisResult {
  const { found, foundScenarios } = analysis;
  const sections: { title: string; content: string[] }[] = [];

  const grouped = found.reduce((acc: any, p: any) => {
    const cat = p.pattern.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(formatPatternContent(p.pattern));
    return acc;
  }, {} as Record<string, string[]>);

  if (foundScenarios.length > 0) {
    sections.push({
      title: '🎯 이 코드의 핵심 목적',
      content: foundScenarios.map((s: any) => `### ${s.title}\n${s.description}`)
    });
  }

  const CATEGORY_MAP: Record<string, string> = {
    // 기본 카테고리 (12개)
    Structure: '🏗️ 화면 구조 및 구성',
    Logic: '⚙️ 실행 로직 및 제어 흐름',
    Style: '💅 스타일링 (Design)',
    Type: '📘 타입 정의 및 타입 시스템',
    Data: '📊 데이터 처리 및 변환',
    Async: '🌐 통신 및 비동기 작업',
    UI: '🎨 사용자 인터페이스 요소',
    Event: '🕹️ 상호작용 및 이벤트',
    State: '💾 정보 기억 및 상태 관리',
    Scenario: '🎯 실무 시나리오 패턴',
    Flow: '🔄 실행 흐름 및 제어',
    Unknown: '❓ 미분류',
    // 확장 카테고리 (19개)
    Meta: '🏷️ 메타데이터 및 설정 정보',
    Advanced: '🚀 고급 기술 및 최적화',
    Media: '🖼️ 멀티미디어 (이미지/비디오/오디오)',
    Interactive: '⚡ 상호작용 요소',
    Security: '🔒 보안 및 접근 제어',
    Performance: '⚡ 성능 최적화 및 튜닝',
    OOP: '🏛️ 객체 지향 프로그래밍',
    FP: '🔧 함수형 프로그래밍',
    Module: '📦 모듈 시스템 및 Import/Export',
    NextJS: '▲ Next.js 전용 패턴',
    Error: '🚨 에러 처리 및 예외',
    Regex: '🔍 정규식 패턴',
    Pattern: '🎨 디자인 패턴',
    DOM: '🌲 DOM 조작 및 쿼리',
    Test: '🧪 테스팅 및 품질 검증',
    Layout: '📐 레이아웃 설계 (Grid/Flexbox)',
    Positioning: '📍 위치 지정 및 배치',
    Animation: '✨ 애니메이션 및 전환 효과',
    Form: '⌨️ 입력 양식 및 버튼'
  };

  Object.entries(CATEGORY_MAP).forEach(([key, title]) => {
    if (grouped[key]) {
      sections.push({ title, content: Array.from(new Set(grouped[key])) });
    }
  });

  if (sections.length === 0) {
    sections.push({
      title: '📝 분석 리포트',
      content: ['식별 가능한 키워드가 부족합니다.']
    });
  }

  const title = foundScenarios.length > 0 
    ? `✅ ${foundScenarios[0].title} 패턴을 식별했습니다.` 
    : `🔎 ${found.length}개의 기술 요소를 분석했습니다.`;

  return {
    language,
    title,
    sections,
    score: Math.min(100, 10 + found.length * 10),
    keywords: Array.from(new Set(found.map((p: any) => p.pattern.id.split('-').pop() || '')))
  };
}

export function analyzeCode(code: string): AnalysisResult {
  const language = detectLanguage(code);
  const analysis = analyzePatterns(code, language);
  return generateStructuredReport(language, analysis);
}