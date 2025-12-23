// src/features/tools/tools/code-lens/lib/dictionaries/html.ts
import { CodePattern } from '../types';

export const HTML_PATTERNS: CodePattern[] = [
  // =================================================================
  // [1] 큰 틀 및 섹션 구분 (Structure)
  // =================================================================
  {
    id: 'html-doctype',
    regex: /<!DOCTYPE\s+html>/i,
    description: '웹 표준 선언',
    template: '이 문서가 **최신 웹 표준 기술(HTML5)로 만들어졌음**을 브라우저에 알립니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'html-main-content',
    regex: /<main[^>]*>/i,
    description: '핵심 본문',
    template: '이 페이지에서 **가장 주인공인 핵심 내용**이 들어가는 핵심 영역입니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'html-section',
    regex: /<section[^>]*>/i,
    description: '내용 구역',
    template: '주제가 비슷한 내용들을 **하나의 큰 단락(섹션)**으로 묶었습니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'html-article',
    regex: /<article[^>]*>/i,
    description: '독립 기사',
    template: '뉴스나 블로그 포스트처럼 **그 자체로 완결성 있는 글 한 편**을 담습니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'html-header-footer',
    regex: /<(header|footer)[^>]*>/i,
    description: '머리말/꼬리말',
    template: '페이지의 **맨 위(머리말)** 혹은 **맨 아래(꼬리말)** 부분을 정의합니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'html-nav-menu',
    regex: /<nav[^>]*>/i,
    description: '메뉴판',
    template: '다른 페이지로 이동할 수 있는 **링크들이 모여 있는 메뉴 영역**입니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'html-aside',
    regex: /<aside[^>]*>/i,
    description: '보조 정보',
    template: '본문과는 직접 상관없지만 **도움이 되는 보조 내용(광고, 링크 등)**을 담는 칸입니다.',
    category: 'Structure',
    importance: 'low',
  },

  // =================================================================
  // [2] 텍스트 및 정보 전달 (Content)
  // =================================================================
  {
    id: 'html-heading',
    regex: /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/i,
    description: '중요한 제목',
    template: '**"{1}"**이라는 문구를 **강조된 제목**으로 사용하여 시선을 끕니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'html-paragraph',
    regex: /<p[^>]*>([\s\S]*?)<\/p>/i,
    description: '일반 설명 글',
    template: '사용자가 편하게 읽을 수 있는 **상세한 설명 문장**이 들어있습니다.',
    category: 'UI',
    importance: 'medium',
  },
  {
    id: 'html-strong-bold',
    regex: /<(strong|b)>([\s\S]*?)<\/\1>/i,
    description: '강조 텍스트',
    template: '**"{1}"**이라는 핵심 단어를 **굵게 표시하여 강조**했습니다.',
    category: 'UI',
    importance: 'low',
  },
  {
    id: 'html-details-summary',
    regex: /<details>|<summary>/i,
    description: '접고 펼치기',
    template: '내용을 숨겨두었다가 **클릭하면 촤르륵 펼쳐지는 상세 보기** 기능을 만듭니다.',
    category: 'UI',
    importance: 'medium',
  },

  // =================================================================
  // [3] 목록 및 표 (Data UI)
  // =================================================================
  {
    id: 'html-list-container',
    regex: /<(ul|ol)[^>]*>/i,
    description: '목록 상자',
    template: '여러 개의 항목을 한데 모아 보여주는 **데이터 목록(List) 상자**를 만듭니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'html-list-item',
    regex: /<li>([\s\S]*?)<\/li>/i,
    description: '목록 한 줄',
    template: '목록 안에 들어갈 **각각의 항목**을 정의합니다.',
    category: 'UI',
    importance: 'medium',
  },
  {
    id: 'html-table',
    regex: /<table[^>]*>/i,
    description: '데이터 표',
    template: '복잡한 정보를 한눈에 보기 좋게 **표(Table) 형식**으로 정리합니다.',
    category: 'Structure',
    importance: 'high',
  },

  // =================================================================
  // [4] 링크, 이미지, 버튼 (Interactive)
  // =================================================================
  {
    id: 'html-anchor-link',
    regex: /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i,
    description: '이동 링크',
    template: '누르면 **{0}** 페이지로 **바로 날아가는 링크**를 만듭니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'html-img-display',
    regex: /<img[^>]*src=["']([^"']+)["'][^>]*>/i,
    description: '사진 표시',
    template: '화면에 **사진이나 아이콘 이미지를 불러와서** 보여줍니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'html-button-click',
    regex: /<button[^>]*>([\s\S]*?)<\/button>/i,
    description: '동작 버튼',
    template: '사용자가 꾹 누를 수 있는 **명령 버튼**을 배치했습니다.',
    category: 'UI',
    importance: 'high',
  },

  // =================================================================
  // [5] 입력 양식 (Forms)
  // =================================================================
  {
    id: 'html-form',
    regex: /<form[^>]*>/i,
    description: '입력 묶음',
    template: '사용자가 적은 정보를 모아 **서버로 안전하게 보낼 준비**를 합니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'html-input',
    regex: /<input[^>]*type=["']([^"']+)["'][^>]*>/i,
    description: '입력 칸',
    template: '사용자가 **{0} 형식의 정보를 타이핑**할 수 있는 칸을 만듭니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'html-label',
    regex: /<label[^>]*>/i,
    description: '이름표',
    template: '입력창이 **무엇을 적는 칸인지 알려주는 친절한 이름표**를 붙입니다.',
    category: 'UI',
    importance: 'low',
  },

  // =================================================================
  // [6] 접근성 및 검색 엔진 최적화 (SEO/Aria)
  // =================================================================
  {
    id: 'html-meta-seo',
    regex: /<meta\s+name=["'](description|keywords)["'][^>]*>/i,
    description: '사이트 소개',
    template: '구글이나 네이버가 **우리 사이트를 잘 찾을 수 있게 설명**을 적어둡니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'html-og-tag',
    regex: /<meta\s+property=["']og:([^"']+)["'][^>]*>/i,
    description: '공유 정보',
    template: '카톡이나 SNS에 공유할 때 보일 **예쁜 미리보기 제목과 이미지**를 설정합니다.',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'html-aria',
    regex: /aria-[a-z]+=["']([^"']+)["']/,
    description: '음성 도우미',
    template: '눈이 불편한 분들의 기기가 **이 요소를 소리로 잘 읽어주도록** 안내를 답니다.',
    category: 'UI',
    importance: 'medium',
  }
];
