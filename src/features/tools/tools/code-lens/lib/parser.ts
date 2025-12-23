// src/features/tools/tools/code-lens/lib/parser.ts
import { AnalysisResult, Language, CodePattern } from './types';
import { JS_TS_PATTERNS } from './dictionaries/js-ts';
import { HTML_PATTERNS } from './dictionaries/html';
import { CSS_PATTERNS } from './dictionaries/css';
import { JSON_PATTERNS } from './dictionaries/json';
import { SQL_PATTERNS } from './dictionaries/sql';
import { MARKDOWN_PATTERNS } from './dictionaries/markdown';
import { YAML_PATTERNS } from './dictionaries/yaml';
import { GRAPHQL_PATTERNS } from './dictionaries/graphql';

const PATTERNS_BY_LANG: Record<Language, CodePattern[]> = {
  javascript: JS_TS_PATTERNS,
  typescript: JS_TS_PATTERNS,
  html: HTML_PATTERNS,
  css: CSS_PATTERNS,
  json: JSON_PATTERNS,
  sql: SQL_PATTERNS,
  markdown: MARKDOWN_PATTERNS,
  yaml: YAML_PATTERNS,
  graphql: GRAPHQL_PATTERNS,
  unknown: [],
};

function detectLanguage(code: string): Language {
  const trimmed = code.trim();
  
  // 1. GraphQL 감지
  if (/^(query|mutation|subscription|fragment)\s+/i.test(trimmed) || /\{\s*\n?\s*[a-zA-Z0-9_]+\s*\{/.test(trimmed)) return 'graphql';
  
  // 2. Markdown 감지
  if (/^#\s+|\[.+\]\(.+\)|```|^\s*[-*+]\s+/.test(trimmed)) return 'markdown';
  
  // 3. YAML 감지
  if (/^on:\s+|^jobs:\s+|^services:\s+|^version:\s*['"]|^kind:\s*\w+/.test(trimmed)) return 'yaml';
  
  // 4. HTML 감지
  if (/<[a-z1-6]+[^>]*>|<\/[a-z1-6]+>/i.test(trimmed)) return 'html';
  
  // 5. SQL 감지
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|BEGIN|COMMIT)\s+/i.test(trimmed)) return 'sql';

  // 6. JSON 감지
  if (/^\{\s*"/.test(trimmed) || /^\[\s*\{/.test(trimmed)) return 'json';

  // 7. JS/TS 감지 (특징 키워드 기반)
  if (/^import\s+|^export\s+|const\s+|let\s+|function\s+|=>|{/m.test(trimmed) || /useEffect|useState|useMemo|useCallback|describe|it\(|expect\(/.test(trimmed)) { 
    if (/interface\s+|type\s+|:\s*[A-Z][a-zA-Z0-9]*|<[A-Z]>/.test(trimmed)) return 'typescript';
    return 'javascript';
  }
  
  // 8. CSS 감지
  if (/[.#][\w-]+\s*{|@media|display:\s*|color:\s*|@keyframes/.test(trimmed)) return 'css';
  
  return 'javascript'; 
}

function analyzePatterns(code: string, language: Language) {
  const patterns = PATTERNS_BY_LANG[language] || [];
  const found: { pattern: CodePattern; count: number; captured?: string[] }[] = [];

  patterns.forEach(pt => {
    const regex = new RegExp(pt.regex, pt.regex.flags.includes('g') ? pt.regex.flags : pt.regex.flags + 'g');
    let match;
    let count = 0;
    const capturedSet = new Set<string>();

    while ((match = regex.exec(code)) !== null) {
      count++;
      if (match.length > 1) {
        for (let i = 1; i < match.length; i++) {
          if (match[i]) {
            const cleaned = match[i].trim().replace(/\s+/g, ' ').replace(/<[^>]*>?/gm, ''); 
            if (cleaned.length > 0 && cleaned.length < 100) capturedSet.add(cleaned);
          }
        }
      }
    }
    if (count > 0) {
      found.push({ pattern: pt, count, captured: Array.from(capturedSet) });
    }
  });

  if (language === 'html' || language === 'javascript' || language === 'typescript') {
    const classRegex = /className=["']([^"']+)["']|class=["']([^"']+)["']/g;
    let classMatch;
    const allClassNames = new Set<string>();
    while ((classMatch = classRegex.exec(code)) !== null) {
      const classes = (classMatch[1] || classMatch[2]).split(/\s+/);
      classes.forEach(c => allClassNames.add(c));
    }
    if (allClassNames.size > 0) {
      CSS_PATTERNS.forEach(cssPt => {
        allClassNames.forEach(cls => {
          if (cssPt.regex.test(cls)) {
            found.push({ pattern: cssPt, count: 1, captured: [cls] });
          }
        });
      });
    }
  }

  return found.sort((a, b) => {
    const importanceScore = { high: 3, medium: 2, low: 1 };
    return importanceScore[b.pattern.importance] - importanceScore[a.pattern.importance];
  });
}

function generateStructuredReport(language: Language, foundPatterns: any[]): AnalysisResult {
  const langName = { 
    javascript: 'JavaScript', typescript: 'TypeScript', html: 'HTML', css: 'CSS', 
    json: 'JSON', sql: 'SQL', markdown: 'Markdown', yaml: 'YAML', graphql: 'GraphQL', unknown: '코드' 
  }[language];
  
  let title = `${langName}로 작성된 코드입니다.`;
  
  const allCaptures = foundPatterns.flatMap(p => p.captured || []).filter(c => c.length > 1 && c.length < 30);
  const mainKeywords = Array.from(new Set(allCaptures)).slice(0, 3);
  const keywordString = mainKeywords.length > 0 ? ` **(${mainKeywords.join(', ')})**` : '';

  if (foundPatterns.length > 0) {
    const highPatterns = foundPatterns.filter(p => p.pattern.importance === 'high');
    const ids = foundPatterns.map(p => p.pattern.id);
    
    // V5: 아키텍처 인지형 타이틀 생성
    if (ids.includes('mcp-server-init') && ids.includes('server-http-create')) {
        title = `🤖 AI와 우리 서비스를 연결해주는 전용 서버 코드입니다.${keywordString}`;
    } else if (ids.includes('auth-oauth-flow')) {
        title = `🔐 안전한 로그인을 위한 신분증 확인 및 보안 시스템입니다.${keywordString}`;
    } else if (ids.includes('db-prisma-client') && ids.includes('server-http-create')) {
        title = `💾 데이터를 영구적으로 저장하고 관리하는 DB 연동 서버입니다.${keywordString}`;
    } else if (ids.includes('react-watch-changes')) {
        title = `🔄 실시간 변화를 감지하고 스스로 동작하는 반응형 로직입니다.${keywordString}`;
    } else if (ids.includes('table')) {
        title = `📊 정보를 깔끔한 표(Table)로 정리해서 보여주는 코드입니다.${keywordString}`;
    } else if (ids.includes('list') || ids.includes('ul')) {
        title = `📋 여러 항목을 한눈에 볼 수 있게 나열한 목록 코드입니다.${keywordString}`;
    }
  }

  const sections: { title: string; content: string[] }[] = [];

  const processTemplate = (p: any) => {
    let text = p.pattern.template || p.pattern.description;
    if (p.captured && p.captured.length > 0) {
      p.captured.forEach((val: string, idx: number) => {
         text = text.split(`{${idx}}`).join(val);
      });
    } else if (text.includes('{0}')) {
        text = p.pattern.description;
    }
    return text;
  };

  // 1. 거대 흐름 및 목적 (Architecture)
  const archPatterns = foundPatterns.filter(p => 
    p.pattern.id.startsWith('server-') || 
    p.pattern.id.startsWith('mcp-') || 
    p.pattern.id.startsWith('auth-') ||
    p.pattern.id.startsWith('db-')
  );
  if (archPatterns.length > 0) {
    sections.push({
      title: '🌐 전체적인 시스템 흐름',
      content: Array.from(new Set(archPatterns.slice(0, 10).map(processTemplate)))
    });
  }

  // 2. 화면 구성 및 동작 (UI/Logic)
  const uiLogicPatterns = foundPatterns.filter(p => 
    (p.pattern.category === 'UI' || p.pattern.category === 'Logic' || p.pattern.category === 'Async') &&
    !archPatterns.includes(p)
  );
  if (uiLogicPatterns.length > 0) {
    sections.push({
      title: '⚙️ 핵심 기능 및 동작 방식',
      content: Array.from(new Set(uiLogicPatterns.slice(0, 10).map(processTemplate)))
    });
  }

  // 3. 상세 정보 및 디자인 (Style/Data)
  const styleDataPatterns = foundPatterns.filter(p => 
    (p.pattern.category === 'Style' || p.pattern.category === 'Data' || p.pattern.category === 'Structure') &&
    !archPatterns.includes(p) && !uiLogicPatterns.includes(p)
  );
  if (styleDataPatterns.length > 0) {
    sections.push({
      title: '🎨 상세 설정 및 디자인 요소',
      content: Array.from(new Set(styleDataPatterns.slice(0, 10).map(processTemplate)))
    });
  }

  if (sections.length === 0) {
    sections.push({
      title: '📝 분석 리포트',
      content: ['입력된 코드에서 명확한 패턴을 찾지 못했습니다. 조금 더 긴 코드를 입력하시면 상세히 분석해 드릴게요!']
    });
  }

  return {
    language,
    title,
    sections,
    keywords: Array.from(new Set(foundPatterns.slice(0, 15).map(p => p.pattern.id.split('-').pop() || '')))
  };
}

export function analyzeCode(code: string): AnalysisResult {
  const language = detectLanguage(code);
  const patternsFound = analyzePatterns(code, language);
  return generateStructuredReport(language, patternsFound);
}