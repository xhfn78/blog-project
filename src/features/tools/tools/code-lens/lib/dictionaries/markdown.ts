import { CodePattern } from '../types';

export const MARKDOWN_PATTERNS: CodePattern[] = [
  // [1] 문서 제목 및 계층 (Headings)
  {
    id: 'md-heading',
    regex: /^#+\s+.+$/gm,
    description: '문서 제목',
    template: '**Heading**: 문서의 논리적인 제목입니다. # 개수가 적을수록 상위 제목입니다.',
    analogy: '신문의 **대제목, 중제목, 소제목**처럼 글의 뼈대를 잡는 역할을 합니다.',
    category: 'Structure',
    importance: 'high',
    tips: ['#은 하나만 써서 문서 전체의 제목(h1)을 정하고, 나머지는 ##부터 사용하는 것이 좋습니다.']
  },

  // [2] 텍스트 스타일 및 강조 (Formatting)
  {
    id: 'md-bold',
    regex: /\*\*[^*]+\ жок|__[^*]+__/g,
    description: '굵게 강조',
    template: '**Bold**: 중요한 내용을 진하게 표시하여 눈에 띄게 합니다.',
    category: 'Text',
    importance: 'medium'
  },
  { id: 'md-italic', regex: /\*[^*]+\*|_\*[^\*]+_/g, description: '기울임(이탤릭)', template: '**Italic**: 특정 단어나 강조하고 싶은 부분에 살짝 변화를 줍니다.', category: 'Text', importance: 'low' },
  { id: 'md-strikethrough', regex: /~~[^~]+~~/g, description: '취소선', template: '**Strikethrough**: 이미 삭제되었거나 수정된 내용임을 나타냅니다.', category: 'Text', importance: 'low' },
  {
    id: 'md-inline-code',
    regex: /`[^`]+`/g,
    description: '인라인 코드',
    template: '**Code**: 문장 안에서 **변수명, 경로, 명령어** 등을 구분하여 보여줍니다.',
    category: 'Text',
    importance: 'medium'
  },

  // [3] 목록 및 인용 (Lists & Quotes)
  { id: 'md-list-unordered', regex: /^[*+-]\s+.+$/gm, description: '순서 없는 목록', template: '**Unordered List**: 순서와 상관없는 개별 항목들을 나열합니다.', category: 'List', importance: 'medium' },
  { id: 'md-list-ordered', regex: /^\d+\.\s+.+$/gm, description: '순서 있는 목록', template: '**Ordered List**: 1, 2, 3 등 **순서나 단계**가 중요한 항목을 나열합니다.', category: 'List', importance: 'medium' },
  { id: 'md-checkbox', regex: /^- \[[ xX]]/gm, description: '체크박스 목록', template: '**Task List**: 할 일을 관리하거나 진행 상황을 체크할 때 씁니다.', category: 'List', importance: 'low' },
  {
    id: 'md-blockquote',
    regex: /^>\s+.+$/gm,
    description: '인용구',
    template: '**Blockquote**: 외부의 말이나 글을 인용할 때 사용하며, 시각적으로 구분됩니다.',
    analogy: '책에서 발췌한 **"중요한 글귀"**를 강조해서 보여주는 공간입니다.',
    category: 'Text',
    importance: 'medium'
  },

  // [4] 링크 및 이미지 (Links & Media)
  {
    id: 'md-link',
    regex: /[[^\]]+\]\([^)]+\)/g,
    description: '하이퍼링크',
    template: '**Link**: 클릭하면 지정된 웹 페이지나 파일로 이동합니다.',
    category: 'Structure',
    importance: 'high'
  },
  {
    id: 'md-image',
    regex: /!\[[^\\\]]*\]\([^)]+\)/g,
    description: '이미지 삽입',
    template: '**Image**: 문서 내부에 그림이나 사진을 보여줍니다.',
    category: 'Media',
    importance: 'medium',
    tips: ['이미지가 로드되지 않을 때를 위해 [] 안에 이미지 설명을 적어주세요.']
  },

  // [5] 고급 레이아웃 (Advanced)
  {
    id: 'md-code-block',
    regex: /^```[\s\S]*?^```/gm,
    description: '코드 블록',
    template: '**Code Block**: 여러 줄의 소스 코드를 프로그래밍 언어의 형식에 맞춰 보여줍니다.',
    category: 'Advanced',
    importance: 'high',
    tips: ['코드 블록 시작 부분에 ```javascript 처럼 언어 이름을 적으면 문법 강조 기능이 활성화됩니다.']
  },
  {
    id: 'md-table',
    regex: /\|.+\|[\r\n]+\|[-:| ]+\|/g,
    description: '표 구조',
    template: '**Table**: 데이터를 행과 열로 구성하여 한눈에 보기 좋게 정리합니다.',
    category: 'Advanced',
    importance: 'medium'
  },
  { id: 'md-horizontal-rule', regex: /^---$|^___$|^\*\*\*$/gm, description: '가로 구분선', template: '**Horizontal Rule**: 주제가 바뀌거나 문서의 흐름을 나눌 때 가로 선을 긋습니다.', category: 'Structure', importance: 'low' }
];
