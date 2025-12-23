// src/features/tools/tools/code-lens/lib/dictionaries/js-ts.ts
import { CodePattern } from '../types';

export const JS_TS_PATTERNS: CodePattern[] = [
  // =================================================================
  // [1] 서버 가동 및 네트워크 (Infrastructure & API)
  // =================================================================
  {
    id: 'server-http-create',
    regex: /createServer\s*\(\s*async\s*\(req,\s*res\)\s*=>/,
    description: '웹 서버 가동',
    template: '사용자의 요청을 24시간 기다리는 **웹 서버(인터넷 창구)를 개설**합니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'server-express-init',
    regex: /const\s+(\w+)\s*=\s*express\(\)/,
    description: '웹 프레임워크 가동',
    template: '**{0}**이라는 이름으로 **웹 서버 프로그램을 시작**합니다. (Express 사용)',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'server-middleware',
    regex: /\.use\s*\(([^)]+)\)/,
    description: '중간 검문소(미들웨어)',
    template: '요청이 도착하기 전후에 **보안 검사나 데이터 정리**를 수행하는 중간 단계를 둡니다.',
    category: 'Logic',
    importance: 'medium',
  },
  {
    id: 'server-listen',
    regex: /\.listen\s*\(([^,)]+)/,
    description: '서버 개시',
    template: '**{0}번 포트(통로)**를 열고 외부 손님을 맞이할 준비를 끝냅니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'server-route-get',
    regex: /\.get\s*\(['"]([^'"]+)['"]/,
    description: '조회 주소 설정',
    template: '**{0}** 주소로 접속했을 때 보여줄 **정보 조회 페이지**를 만듭니다.',
    category: 'Logic',
    importance: 'medium',
  },
  {
    id: 'server-route-post',
    regex: /\.post\s*\(['"]([^'"]+)['"]/,
    description: '저장 주소 설정',
    template: '**{0}** 주소로 데이터를 보냈을 때 **정보를 저장하는 기능**을 만듭니다.',
    category: 'Logic',
    importance: 'medium',
  },

  // =================================================================
  // [2] 상태 관리 및 화면 동작 (State & UI Logic)
  // =================================================================
  {
    id: 'ui-remember',
    regex: /const\s*\[(\w+),\s*set\w+\]\s*=\s*useState/,
    description: '값 기억하기',
    template: '**{0}**이라는 정보를 머릿속에 기억해두었다가, **값이 바뀌면 화면도 즉시 업데이트**합니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'ui-auto-run',
    regex: /useEffect\s*\(/,
    description: '자동 실행 명령',
    template: '화면이 처음 나타날 때 **서버에서 데이터를 가져오는 등의 작업을 자동**으로 수행합니다.',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'ui-context',
    regex: /useContext|createContext/,
    description: '전역 정보 공유',
    template: '멀리 떨어진 화면 조각끼리도 **중요한 정보(테마, 로그인 등)를 공유하는 전용 채널**을 만듭니다.',
    category: 'Structure',
    importance: 'high',
  },
  {
    id: 'ui-ref',
    regex: /useRef\s*\(/,
    description: '요소 붙잡기',
    template: '화면상의 특정 부품을 **손으로 꽉 붙잡아 조작하거나, 변하지 않는 값**을 보관합니다.',
    category: 'UI',
    importance: 'medium',
  },
  {
    id: 'ui-reducer',
    regex: /useReducer\s*\(/,
    description: '전문 상태 관리',
    template: '정보를 바꾸는 규칙이 아주 많을 때, **체계적으로 값을 관리하는 전문 처리기**를 사용합니다.',
    category: 'Logic',
    importance: 'medium',
  },
  {
    id: 'state-zustand',
    regex: /create\s*\(\s*\(set\)\s*=>/,
    description: '중앙 정보 창고',
    template: '앱 전체에서 공통으로 사용할 **커다란 데이터 창고(Zustand)**를 구축합니다.',
    category: 'Structure',
    importance: 'high',
  },

  // =================================================================
  // [3] 데이터 가공 및 변환 (Data Processing)
  // =================================================================
  {
    id: 'logic-map',
    regex: /\.map\s*\(/,
    description: '목록 그리기',
    template: '목록에 있는 정보들을 하나씩 꺼내서 **화면에 반복적으로 보여줍니다.**',
    category: 'UI',
    importance: 'high',
  },
  {
    id: 'logic-filter',
    regex: /\.filter\s*\(/,
    description: '골라내기',
    template: '전체 목록 중에서 **조건에 딱 맞는 데이터들만 쏙 골라내어** 따로 모읍니다.',
    category: 'Logic',
    importance: 'high',
  },
  {
    id: 'logic-sort',
    regex: /\.sort\s*\(/,
    description: '줄 세우기',
    template: '데이터들을 **가나다순이나 숫자 크기순으로 나란히 정렬**합니다.',
    category: 'Logic',
    importance: 'medium',
  },
  {
    id: 'logic-find',
    regex: /\.find\s*\(/,
    description: '하나 찾기',
    template: '수많은 데이터 중에서 **내가 찾는 딱 하나의 정보**를 찾아냅니다.',
    category: 'Logic',
    importance: 'medium',
  },
  {
    id: 'logic-json-parse',
    regex: /JSON\.parse\s*\(/,
    description: '문자 해독',
    template: '단순한 글자 덩어리를 **컴퓨터가 읽을 수 있는 데이터 객체**로 변환합니다.',
    category: 'Data',
    importance: 'low',
  },

  // =================================================================
  // [4] 통신 및 비동기 처리 (Async & Communication)
  // =================================================================
  {
    id: 'async-fetch',
    regex: /fetch\s*\(['"]([^'"]+)['"]\)/,
    description: '서버 요청',
    template: '**{0}** 서버에게 **"데이터 좀 보내주세요"라고 요청**합니다.',
    category: 'Async',
    importance: 'high',
  },
  {
    id: 'async-axios',
    regex: /axios\.(get|post|put|delete)/,
    description: '강력한 통신',
    template: '**Axios**라는 전문 도구를 사용하여 서버와 데이터를 주고받습니다.',
    category: 'Async',
    importance: 'high',
  },
  {
    id: 'async-query',
    regex: /useQuery|useMutation/,
    description: '스마트 통신 관리',
    template: '서버 데이터를 **실시간으로 관리하고 자동으로 업데이트**하는 똑똑한 도구를 씁니다.',
    category: 'Async',
    importance: 'high',
  },
  {
    id: 'async-await',
    regex: /await\s+/,
    description: '잠시 대기',
    template: '오래 걸리는 작업이 **끝날 때까지 잠시 기다렸다가 다음 일을 시작**합니다.',
    category: 'Async',
    importance: 'medium',
  },

  // =================================================================
  // [5] 보안 및 시스템 (Security & System)
  // =================================================================
  {
    id: 'auth-jwt',
    regex: /jwt\.sign|jwt\.verify/,
    description: '디지털 증명서',
    template: '로그인 정보를 안전하게 보관하기 위해 **디지털 서명이 된 증명서(토큰)**를 다룹니다.',
    category: 'Async',
    importance: 'high',
  },
  {
    id: 'auth-bcrypt',
    regex: /bcrypt\.hash|bcrypt\.compare/,
    description: '비밀번호 암호화',
    template: '비밀번호를 **누구도 알 수 없게 복잡한 암호**로 바꾸어 보관하거나 대조합니다.',
    category: 'Logic',
    importance: 'high',
  },
  {
    id: 'sys-env',
    regex: /process\.env\.(\w+)/,
    description: '비밀 설정값',
    template: '파일에 직접 적기엔 위험한 **비밀번호나 API 키({0})를 금고(환경변수)에서 꺼내 씁니다.**',
    category: 'Structure',
    importance: 'medium',
  },
  {
    id: 'sys-storage',
    regex: /localStorage|sessionStorage/,
    description: '브라우저 저장소',
    template: '사용자의 컴퓨터 브라우저에 **정보를 몰래 저장해두고 나중에 다시 씁니다.**',
    category: 'Data',
    importance: 'medium',
  },

  // =================================================================
  // [6] 테스트 및 품질 (Testing)
  // =================================================================
  {
    id: 'test-unit',
    regex: /describe\s*\(|it\s*\(|test\s*\(|expect\s*\(/,
    description: '코드 검사기',
    template: '작성한 코드가 **버그 없이 제대로 돌아가는지 자동으로 시험**해봅니다.',
    category: 'Logic',
    importance: 'medium',
  },
  {
    id: 'test-mock',
    regex: /vi\.fn|jest\.fn|mock/,
    description: '가짜 도구',
    template: '테스트를 위해 **진짜 대신 흉내만 내는 가짜 부품**을 만들어 씁니다.',
    category: 'Logic',
    importance: 'low',
  },

  // =================================================================
  // [7] 애니메이션 및 효과 (Animation)
  // =================================================================
  {
    id: 'anim-framer',
    regex: /motion\.\w+|animate={/,
    description: '부드러운 움직임',
    template: '화면 요소들이 **살아있는 듯이 부드럽게 움직이는 애니메이션**을 줍니다.',
    category: 'UI',
    importance: 'medium',
  },

  // =================================================================
  // [8] 최신 문법 (Modern Syntax)
  // =================================================================
  {
    id: 'syntax-destruct',
    regex: /const\s+{([^}]+)}\s*=\s*|const\s+\[([^\]]+)\]\s*=\s*/,
    description: '정보 꺼내기',
    template: '뭉쳐 있는 정보 꾸러미에서 **필요한 알맹이들만 쏙쏙 골라내어** 사용합니다.',
    category: 'Data',
    importance: 'low',
  },
  {
    id: 'syntax-spread',
    regex: /\.\.\.\w+/,
    description: '정보 펼치기',
    template: '기존 정보를 **그대로 복사하거나 다른 정보와 합칠 때** 사용합니다.',
    category: 'Data',
    importance: 'low',
  },
  {
    id: 'syntax-optional',
    regex: /\?\./,
    description: '안전한 확인',
    template: '정보가 **없을 수도 있는 상황에서 에러를 방지하며** 조심스럽게 확인합니다.',
    category: 'Logic',
    importance: 'low',
  },
  {
    id: 'syntax-nullish',
    regex: /\?\?/,
    description: '기본값 설정',
    template: '정보가 **텅 비어있을 때 대신 보여줄 기본값**을 정해둡니다.',
    category: 'Logic',
    importance: 'low',
  }
];
