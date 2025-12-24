import { CodePattern } from '../types';

export const JSON_PATTERNS: CodePattern[] = [
  // [1] 기본 구조 (Data Types)
  { 
    id: 'json-object', 
    regex: /{[^}]*}/g, 
    description: '객체 구조', 
    template: '**Object**: 이름과 값이 한 쌍으로 묶인 복합 데이터 뭉치입니다.', 
    analogy: '이름표가 붙은 여러 개의 서랍이 모인 **"수납장"**과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { 
    id: 'json-array', 
    regex: /\[[^\]]*\]/g, 
    description: '배열 구조', 
    template: '**Array**: 여러 개의 데이터를 순서대로 나열한 목록입니다.', 
    analogy: '기차 칸처럼 일렬로 쭉 이어진 **"데이터 목록"**입니다.',
    category: 'Data', 
    importance: 'high' 
  },
  { id: 'json-string', regex: /"[^"]*"\s*:/g, description: '데이터 이름(Key)', template: '**Key**: 데이터가 무엇인지 나타내는 이름표입니다.', category: 'Data', importance: 'medium' },

  // [2] 웹 설정 (Package & Config) - 프로젝트 관점
  { 
    id: 'json-pkg-deps', 
    regex: /"dependencies"|"devDependencies"/g, 
    description: '외부 라이브러리 목록', 
    template: '**Dependencies**: 이 프로젝트가 작동하는 데 꼭 필요한 **외부 도구(라이브러리)** 목록입니다.', 
    category: 'Structure', 
    importance: 'high',
    tips: ['보안 업데이트를 위해 주기적으로 라이브러리 버전을 확인하는 것이 좋습니다.']
  },
  { id: 'json-pkg-scripts', regex: /"scripts"\s*:/g, description: '실행 명령어 설정', template: '**Scripts**: 빌드, 테스트, 실행 등 자주 쓰는 명령어를 단축키처럼 등록해둔 곳입니다.', category: 'Logic', importance: 'high' },
  { id: 'json-pkg-name', regex: /"name"\s*:\s*"[^"]*"/g, description: '프로젝트 이름', template: '**Project Name**: 이 소프트웨어의 공식 이름입니다.', category: 'Meta', importance: 'medium' },
  { id: 'json-pkg-version', regex: /"version"\s*:\s*"[^"]*"/g, description: '버전 정보', template: '**Version**: 소프트웨어의 현재 출시 단계와 업데이트 이력을 나타냅니다.', category: 'Meta', importance: 'medium' },

  // [3] API 응답 패턴 (API Responses)
  { 
    id: 'json-api-status', 
    regex: /"status"\s*:\s*(\d+|"[^"]*")|"code"\s*:/g, 
    description: '응답 상태 코드', 
    template: '**Status**: 요청이 성공했는지, 실패했는지 알려주는 결과 신호입니다.', 
    category: 'Logic', 
    importance: 'high' 
  },
  { id: 'json-api-message', regex: /"message"\s*:\s*"[^"]*"/g, description: '안내 메시지', template: '**Message**: 결과에 대한 상세한 설명을 담고 있습니다.', category: 'Data', importance: 'medium' },
  { id: 'json-api-data', regex: /"data"\s*:\s*[{\[]/g, description: '핵심 데이터 영역', template: '**Data Payload**: 우리가 실제로 필요로 하는 정보의 알맹이가 담긴 곳입니다.', category: 'Data', importance: 'high' },
  { id: 'json-api-meta', regex: /"meta"\s*:\s*{/g, description: '부가 정보(Pagination 등)', template: '**Metadata**: 전체 개수, 현재 페이지 등 데이터 외적인 보조 정보를 담고 있습니다.', category: 'Meta', importance: 'medium' },

  // [4] 개발 도구 설정 (Tooling Config)
  { id: 'json-ts-config', regex: /"compilerOptions"/g, description: 'TypeScript 컴파일러 설정', template: '**TS Config**: 코드 번역 방식과 문법 검사 규칙을 정하는 중요한 설정입니다.', category: 'Advanced', importance: 'high' },
  { id: 'json-eslint-config', regex: /"eslintConfig"|"rules"/g, description: '코드 스타일 규칙', template: '**Lint Rules**: 팀원들과 협업할 때 코드 모양을 똑같이 맞추기 위한 약속입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-tailwind-config', regex: /"theme"|"extend"/g, description: 'Tailwind 디자인 테마', template: '**Tailwind Theme**: 프로젝트의 색상, 폰트, 간격 등 디자인 시스템의 뼈대입니다.', category: 'Structure', importance: 'medium' },

  // [5] package.json 전체 필드 (메타데이터 & 설정)
  { id: 'json-pkg-author', regex: /"author"\s*:/g, description: '제작자 정보', template: '**Author**: 이 패키지를 만든 사람의 이름과 연락처입니다.', category: 'Meta', importance: 'medium' },
  { id: 'json-pkg-license', regex: /"license"\s*:\s*"[^"]*"/g, description: '라이선스', template: '**License**: 이 소프트웨어를 어떤 조건으로 사용할 수 있는지 명시합니다.', category: 'Meta', importance: 'high', tips: ['MIT, Apache-2.0, GPL 등이 대표적입니다.'] },
  { id: 'json-pkg-repository', regex: /"repository"\s*:/g, description: '저장소 정보', template: '**Repository**: 소스 코드가 관리되는 Git 저장소 주소입니다.', category: 'Meta', importance: 'medium' },
  { id: 'json-pkg-homepage', regex: /"homepage"\s*:\s*"[^"]*"/g, description: '홈페이지 URL', template: '**Homepage**: 프로젝트의 공식 웹사이트 주소입니다.', category: 'Meta', importance: 'low' },
  { id: 'json-pkg-bugs', regex: /"bugs"\s*:/g, description: '버그 리포트 경로', template: '**Bugs**: 문제를 신고할 수 있는 이슈 트래커 주소입니다.', category: 'Meta', importance: 'low' },
  { id: 'json-pkg-engines', regex: /"engines"\s*:/g, description: 'Node/npm 버전 제한', template: '**Engines**: 이 패키지가 작동하기 위해 필요한 Node.js나 npm의 버전을 지정합니다.', category: 'Structure', importance: 'high', tips: ['버전 불일치로 인한 오류를 방지합니다.'] },
  { id: 'json-pkg-main', regex: /"main"\s*:\s*"[^"]*"/g, description: '진입점 파일', template: '**Main**: 패키지를 import할 때 실행되는 메인 파일 경로입니다.', category: 'Structure', importance: 'high' },
  { id: 'json-pkg-module', regex: /"module"\s*:\s*"[^"]*"/g, description: 'ES 모듈 진입점', template: '**Module**: ES6 모듈 방식으로 사용할 때의 진입점입니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-pkg-types', regex: /"types"\s*:\s*"[^"]*"|"typings"\s*:/g, description: 'TypeScript 타입 정의', template: '**Types**: TypeScript 타입 정의 파일(.d.ts)의 위치입니다.', category: 'Type', importance: 'high' },
  { id: 'json-pkg-exports', regex: /"exports"\s*:/g, description: 'ESM exports 맵', template: '**Exports**: 패키지의 여러 진입점을 세밀하게 제어합니다.', category: 'Advanced', importance: 'medium', tips: ['Node.js 12+에서 지원하는 현대적 방식입니다.'] },
  { id: 'json-pkg-keywords', regex: /"keywords"\s*:\s*\[/g, description: '검색 키워드', template: '**Keywords**: npm 검색에서 이 패키지를 찾기 쉽게 하는 태그입니다.', category: 'Meta', importance: 'low' },
  { id: 'json-pkg-private', regex: /"private"\s*:\s*true/g, description: '비공개 패키지', template: '**Private**: npm에 실수로 배포되지 않도록 막습니다.', category: 'Meta', importance: 'medium' },
  { id: 'json-pkg-workspaces', regex: /"workspaces"\s*:/g, description: '모노레포 워크스페이스', template: '**Workspaces**: 여러 패키지를 한 저장소에서 관리하는 모노레포 설정입니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-pkg-peer-deps', regex: /"peerDependencies"\s*:/g, description: '동료 의존성', template: '**Peer Dependencies**: 사용자가 설치해야 할 호환 패키지를 명시합니다.', category: 'Structure', importance: 'high', tips: ['플러그인이나 확장 패키지에서 주로 사용합니다.'] },
  { id: 'json-pkg-optional-deps', regex: /"optionalDependencies"\s*:/g, description: '선택적 의존성', template: '**Optional Dependencies**: 없어도 작동하지만 있으면 기능이 추가되는 패키지입니다.', category: 'Structure', importance: 'low' },
  { id: 'json-pkg-bundled-deps', regex: /"bundledDependencies"\s*:/g, description: '번들 포함 의존성', template: '**Bundled Dependencies**: 패키지 배포 시 함께 포함할 의존성입니다.', category: 'Structure', importance: 'low' },
  { id: 'json-pkg-bin', regex: /"bin"\s*:/g, description: '실행 가능한 명령어', template: '**Bin**: 이 패키지가 제공하는 CLI 명령어를 정의합니다.', category: 'Structure', importance: 'medium', tips: ['전역 설치 시 터미널에서 실행할 수 있습니다.'] },
  { id: 'json-pkg-files', regex: /"files"\s*:\s*\[/g, description: '배포 파일 목록', template: '**Files**: npm 배포 시 포함할 파일과 폴더를 지정합니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-pkg-publish-config', regex: /"publishConfig"\s*:/g, description: '배포 설정', template: '**Publish Config**: npm 배포 시 사용할 레지스트리나 접근 권한을 설정합니다.', category: 'Advanced', importance: 'low' },
  { id: 'json-pkg-browser', regex: /"browser"\s*:/g, description: '브라우저 진입점', template: '**Browser**: 브라우저 환경에서 사용할 때의 진입점입니다.', category: 'Structure', importance: 'low' },

  // [6] tsconfig.json 전체 필드
  { id: 'json-ts-target', regex: /"target"\s*:\s*"[^"]*"/g, description: '컴파일 타겟', template: '**Target**: JavaScript를 어떤 버전으로 변환할지 지정합니다.', category: 'Type', importance: 'high', tips: ['ES2020, ES2022 등 최신 버전일수록 코드가 간결합니다.'] },
  { id: 'json-ts-module', regex: /"module"\s*:\s*"[^"]*"/g, description: '모듈 시스템', template: '**Module**: CommonJS, ESNext 등 모듈 방식을 선택합니다.', category: 'Type', importance: 'high' },
  { id: 'json-ts-lib', regex: /"lib"\s*:\s*\[/g, description: '사용할 라이브러리', template: '**Lib**: DOM, ES2021 등 사용할 타입 정의 라이브러리를 지정합니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-jsx', regex: /"jsx"\s*:\s*"[^"]*"/g, description: 'JSX 변환 방식', template: '**JSX**: React JSX를 어떻게 변환할지 결정합니다.', category: 'Type', importance: 'high', tips: ['react-jsx는 React 17+ 자동 런타임입니다.'] },
  { id: 'json-ts-strict', regex: /"strict"\s*:\s*true/g, description: '엄격 모드', template: '**Strict**: 모든 타입 검사를 최대한 엄격하게 수행합니다.', category: 'Type', importance: 'high', warnings: ['버그를 조기에 발견하지만 초기 학습 곡선이 있습니다.'] },
  { id: 'json-ts-esmodule-interop', regex: /"esModuleInterop"\s*:\s*true/g, description: 'ES/CommonJS 상호운용', template: '**esModuleInterop**: CommonJS와 ES 모듈 간 호환성을 높입니다.', category: 'Type', importance: 'high' },
  { id: 'json-ts-skip-lib-check', regex: /"skipLibCheck"\s*:\s*true/g, description: '라이브러리 검사 건너뛰기', template: '**skipLibCheck**: 외부 라이브러리 타입 검사를 생략하여 속도를 높입니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-module-resolution', regex: /"moduleResolution"\s*:\s*"[^"]*"/g, description: '모듈 해석 전략', template: '**moduleResolution**: 모듈 경로를 찾는 방식을 지정합니다.', category: 'Type', importance: 'high', tips: ['"node"가 가장 일반적입니다.'] },
  { id: 'json-ts-base-url', regex: /"baseUrl"\s*:\s*"[^"]*"/g, description: '기본 경로', template: '**baseUrl**: 절대 경로 import의 기준 디렉토리입니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-paths', regex: /"paths"\s*:/g, description: '경로 별칭', template: '**Paths**: @/components 같은 경로 단축키를 정의합니다.', category: 'Type', importance: 'high', tips: ['긴 상대 경로를 깔끔하게 만듭니다.'] },
  { id: 'json-ts-outdir', regex: /"outDir"\s*:\s*"[^"]*"/g, description: '출력 디렉토리', template: '**outDir**: 컴파일된 파일이 저장될 폴더입니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-rootdir', regex: /"rootDir"\s*:\s*"[^"]*"/g, description: '루트 디렉토리', template: '**rootDir**: 소스 파일의 루트 폴더입니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-declaration', regex: /"declaration"\s*:\s*true/g, description: '타입 정의 생성', template: '**declaration**: .d.ts 타입 정의 파일을 자동 생성합니다.', category: 'Type', importance: 'high' },
  { id: 'json-ts-source-map', regex: /"sourceMap"\s*:\s*true/g, description: '소스맵 생성', template: '**sourceMap**: 디버깅을 위한 소스맵 파일을 생성합니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-no-emit', regex: /"noEmit"\s*:\s*true/g, description: '파일 생성 안 함', template: '**noEmit**: 타입 검사만 하고 파일은 생성하지 않습니다.', category: 'Type', importance: 'medium', tips: ['Next.js처럼 별도 번들러를 쓸 때 유용합니다.'] },
  { id: 'json-ts-isolated-modules', regex: /"isolatedModules"\s*:\s*true/g, description: '격리된 모듈', template: '**isolatedModules**: 각 파일을 독립적으로 컴파일할 수 있게 강제합니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-allow-synthetic', regex: /"allowSyntheticDefaultImports"\s*:\s*true/g, description: 'Default Import 허용', template: '**allowSyntheticDefaultImports**: default export가 없어도 default import를 허용합니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-resolve-json', regex: /"resolveJsonModule"\s*:\s*true/g, description: 'JSON 모듈 해석', template: '**resolveJsonModule**: .json 파일을 모듈로 import할 수 있게 합니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-force-casing', regex: /"forceConsistentCasingInFileNames"\s*:\s*true/g, description: '파일명 대소문자 일관성', template: '**forceConsistentCasingInFileNames**: import 시 파일명 대소문자를 정확히 지키도록 강제합니다.', category: 'Type', importance: 'medium' },
  { id: 'json-ts-include', regex: /"include"\s*:\s*\[/g, description: '포함할 파일', template: '**include**: 컴파일에 포함할 파일 패턴입니다.', category: 'Type', importance: 'high' },

  // [7] ESLint 설정
  { id: 'json-eslint-extends', regex: /"extends"\s*:\s*(\[|")/g, description: '확장 설정', template: '**Extends**: 다른 ESLint 설정을 상속받습니다.', category: 'Advanced', importance: 'high', tips: ['eslint:recommended, airbnb 등이 인기 있습니다.'] },
  { id: 'json-eslint-parser', regex: /"parser"\s*:\s*"[^"]*"/g, description: '파서 지정', template: '**Parser**: TypeScript나 Babel 코드를 해석할 파서를 지정합니다.', category: 'Advanced', importance: 'high' },
  { id: 'json-eslint-parser-options', regex: /"parserOptions"\s*:/g, description: '파서 옵션', template: '**parserOptions**: 파서의 상세 설정을 정의합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-eslint-plugins', regex: /"plugins"\s*:\s*\[/g, description: 'ESLint 플러그인', template: '**Plugins**: 추가 규칙을 제공하는 플러그인 목록입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-eslint-env', regex: /"env"\s*:/g, description: '실행 환경', template: '**Env**: 브라우저, Node.js 등 코드가 실행될 환경을 지정합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-eslint-globals', regex: /"globals"\s*:/g, description: '전역 변수', template: '**Globals**: 미리 정의된 전역 변수를 선언합니다.', category: 'Advanced', importance: 'low' },
  { id: 'json-eslint-overrides', regex: /"overrides"\s*:\s*\[/g, description: '파일별 규칙 재정의', template: '**Overrides**: 특정 파일 패턴에만 다른 규칙을 적용합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-eslint-ignore', regex: /"ignorePatterns"\s*:/g, description: '무시 패턴', template: '**ignorePatterns**: 린트 검사에서 제외할 파일 패턴입니다.', category: 'Advanced', importance: 'medium' },

  // [8] Prettier 설정
  { id: 'json-prettier-print-width', regex: /"printWidth"\s*:\s*\d+/g, description: '줄 최대 너비', template: '**printWidth**: 한 줄의 최대 글자 수를 제한합니다.', category: 'Style', importance: 'medium' },
  { id: 'json-prettier-tab-width', regex: /"tabWidth"\s*:\s*\d+/g, description: '탭 너비', template: '**tabWidth**: 들여쓰기 공백 개수를 지정합니다.', category: 'Style', importance: 'medium' },
  { id: 'json-prettier-semi', regex: /"semi"\s*:\s*(true|false)/g, description: '세미콜론 사용', template: '**semi**: 문장 끝에 세미콜론을 붙일지 여부입니다.', category: 'Style', importance: 'low' },
  { id: 'json-prettier-single-quote', regex: /"singleQuote"\s*:\s*true/g, description: '작은따옴표 사용', template: '**singleQuote**: 문자열을 작은따옴표로 감쌉니다.', category: 'Style', importance: 'low' },
  { id: 'json-prettier-trailing-comma', regex: /"trailingComma"\s*:\s*"[^"]*"/g, description: '마지막 쉼표', template: '**trailingComma**: 배열/객체 마지막 항목 뒤에 쉼표를 붙입니다.', category: 'Style', importance: 'low', tips: ['Git diff를 깔끔하게 만듭니다.'] },
  { id: 'json-prettier-bracket-spacing', regex: /"bracketSpacing"\s*:\s*(true|false)/g, description: '중괄호 공백', template: '**bracketSpacing**: 중괄호 안쪽에 공백을 넣습니다.', category: 'Style', importance: 'low' },
  { id: 'json-prettier-arrow-parens', regex: /"arrowParens"\s*:\s*"[^"]*"/g, description: '화살표 함수 괄호', template: '**arrowParens**: 화살표 함수 인자를 괄호로 감쌀지 결정합니다.', category: 'Style', importance: 'low' },
  { id: 'json-prettier-eol', regex: /"endOfLine"\s*:\s*"[^"]*"/g, description: '줄바꿈 문자', template: '**endOfLine**: 줄바꿈 문자를 LF, CRLF 중 선택합니다.', category: 'Style', importance: 'low' },

  // [9] Next.js config (next.config.js → JSON 형태)
  { id: 'json-next-strict-mode', regex: /"reactStrictMode"\s*:\s*true/g, description: 'React Strict Mode', template: '**reactStrictMode**: React의 엄격 모드를 활성화합니다.', category: 'Structure', importance: 'high', tips: ['잠재적 문제를 조기 발견합니다.'] },
  { id: 'json-next-images', regex: /"images"\s*:/g, description: '이미지 최적화 설정', template: '**images**: Next.js 이미지 최적화 옵션을 설정합니다.', category: 'Advanced', importance: 'high' },
  { id: 'json-next-experimental', regex: /"experimental"\s*:/g, description: '실험적 기능', template: '**experimental**: 정식 출시 전 실험 단계 기능을 활성화합니다.', category: 'Advanced', importance: 'medium', warnings: ['프로덕션에서는 신중히 사용하세요.'] },
  { id: 'json-next-webpack', regex: /"webpack"\s*:/g, description: 'Webpack 커스터마이징', template: '**webpack**: Webpack 설정을 직접 수정합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-next-env', regex: /"env"\s*:/g, description: '환경 변수', template: '**env**: 빌드 타임에 주입할 환경 변수입니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-next-rewrites', regex: /"rewrites"\s*:/g, description: 'URL 재작성', template: '**rewrites**: URL을 다른 경로로 매핑합니다.', category: 'Advanced', importance: 'medium', tips: ['프록시 API나 레거시 URL 지원에 유용합니다.'] },
  { id: 'json-next-redirects', regex: /"redirects"\s*:/g, description: 'URL 리다이렉트', template: '**redirects**: 특정 URL을 다른 곳으로 영구/임시 리다이렉트합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-next-headers', regex: /"headers"\s*:/g, description: 'HTTP 헤더 설정', template: '**headers**: 응답에 커스텀 HTTP 헤더를 추가합니다.', category: 'Advanced', importance: 'medium' },

  // [10] Vite config
  { id: 'json-vite-plugins', regex: /"plugins"\s*:\s*\[/g, description: 'Vite 플러그인', template: '**plugins**: React, Vue 등 Vite 플러그인 목록입니다.', category: 'Structure', importance: 'high' },
  { id: 'json-vite-resolve', regex: /"resolve"\s*:/g, description: '모듈 해석 설정', template: '**resolve**: alias 같은 모듈 경로 설정입니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-vite-server', regex: /"server"\s*:/g, description: '개발 서버 설정', template: '**server**: 포트, 프록시 등 개발 서버 옵션입니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-vite-build', regex: /"build"\s*:/g, description: '빌드 설정', template: '**build**: 프로덕션 빌드 옵션을 설정합니다.', category: 'Structure', importance: 'high' },
  { id: 'json-vite-define', regex: /"define"\s*:/g, description: '전역 상수 정의', template: '**define**: 빌드 타임에 대체될 전역 상수를 정의합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-vite-css', regex: /"css"\s*:/g, description: 'CSS 설정', template: '**css**: CSS 전처리기나 모듈 설정입니다.', category: 'Style', importance: 'medium' },

  // [11] Tailwind config
  { id: 'json-tailwind-content', regex: /"content"\s*:\s*\[/g, description: '스캔 파일 경로', template: '**content**: Tailwind가 클래스를 찾을 파일 경로입니다.', category: 'Structure', importance: 'high', tips: ['누락하면 해당 파일의 스타일이 빌드에서 제외됩니다.'] },
  { id: 'json-tailwind-plugins', regex: /"plugins"\s*:\s*\[/g, description: 'Tailwind 플러그인', template: '**plugins**: 추가 유틸리티 클래스를 제공하는 플러그인입니다.', category: 'Structure', importance: 'medium' },
  { id: 'json-tailwind-darkmode', regex: /"darkMode"\s*:\s*"[^"]*"/g, description: '다크모드 전략', template: '**darkMode**: 다크모드 활성화 방식(class 또는 media)을 선택합니다.', category: 'Style', importance: 'medium' },
  { id: 'json-tailwind-safelist', regex: /"safelist"\s*:/g, description: '안전 목록', template: '**safelist**: 사용하지 않아도 빌드에 포함할 클래스입니다.', category: 'Advanced', importance: 'low' },
  { id: 'json-tailwind-important', regex: /"important"\s*:\s*(true|"[^"]*")/g, description: '!important 강제', template: '**important**: 모든 유틸리티에 !important를 추가합니다.', category: 'Style', importance: 'low', warnings: ['특별한 경우가 아니면 권장하지 않습니다.'] },
  { id: 'json-tailwind-prefix', regex: /"prefix"\s*:\s*"[^"]*"/g, description: '클래스 접두사', template: '**prefix**: 모든 Tailwind 클래스에 접두사를 붙입니다.', category: 'Style', importance: 'low' },
  { id: 'json-tailwind-separator', regex: /"separator"\s*:\s*"[^"]*"/g, description: '변형 구분자', template: '**separator**: hover: 같은 변형 구분자를 변경합니다.', category: 'Style', importance: 'low' },
  { id: 'json-tailwind-colors', regex: /"colors"\s*:/g, description: '색상 팔레트', template: '**colors**: 프로젝트 전용 색상 시스템을 정의합니다.', category: 'Style', importance: 'high' },

  // [12] Jest/Vitest config
  { id: 'json-test-env', regex: /"testEnvironment"\s*:\s*"[^"]*"/g, description: '테스트 환경', template: '**testEnvironment**: jsdom, node 등 테스트 실행 환경입니다.', category: 'Advanced', importance: 'high', tips: ['DOM 테스트는 jsdom, 서버 로직은 node를 사용합니다.'] },
  { id: 'json-test-setup', regex: /"setupFiles(AfterEnv)?"\s*:/g, description: '테스트 설정 파일', template: '**setupFiles**: 테스트 전에 실행할 초기화 파일입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-test-module-mapper', regex: /"moduleNameMapper"\s*:/g, description: '모듈 경로 매핑', template: '**moduleNameMapper**: @/components 같은 별칭을 실제 경로로 변환합니다.', category: 'Advanced', importance: 'high' },
  { id: 'json-test-transform', regex: /"transform"\s*:/g, description: '파일 변환기', template: '**transform**: TypeScript, JSX 등을 변환할 방법을 지정합니다.', category: 'Advanced', importance: 'high' },
  { id: 'json-test-coverage', regex: /"collectCoverageFrom"\s*:\s*\[/g, description: '커버리지 대상', template: '**collectCoverageFrom**: 코드 커버리지를 측정할 파일 패턴입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-test-match', regex: /"testMatch"\s*:\s*\[/g, description: '테스트 파일 패턴', template: '**testMatch**: 테스트 파일로 인식할 파일 패턴입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'json-test-ignore', regex: /"testPathIgnorePatterns"\s*:\s*\[/g, description: '테스트 무시 패턴', template: '**testPathIgnorePatterns**: 테스트에서 제외할 경로입니다.', category: 'Advanced', importance: 'low' },
  { id: 'json-test-globals', regex: /"globals"\s*:/g, description: '전역 변수', template: '**globals**: 테스트에서 사용할 전역 변수를 정의합니다.', category: 'Advanced', importance: 'low' },

  // [13] API Response 표준 패턴
  { id: 'json-api-success', regex: /"success"\s*:\s*(true|false)/g, description: '성공 플래그', template: '**success**: 요청 처리 성공 여부를 불린으로 나타냅니다.', category: 'Logic', importance: 'high' },
  { id: 'json-api-error', regex: /"error"\s*:\s*{/g, description: '에러 객체', template: '**error**: 실패 시 에러 상세 정보를 담는 객체입니다.', category: 'Logic', importance: 'high' },
  { id: 'json-api-errors', regex: /"errors"\s*:\s*\[/g, description: '에러 배열', template: '**errors**: 여러 검증 오류를 배열로 반환합니다.', category: 'Logic', importance: 'medium', tips: ['폼 검증 실패 시 유용합니다.'] },
  { id: 'json-api-pagination', regex: /"pagination"\s*:/g, description: '페이지네이션 정보', template: '**pagination**: 전체 개수, 현재 페이지 등 목록 탐색 정보입니다.', category: 'Data', importance: 'high' },
  { id: 'json-api-timestamp', regex: /"timestamp"\s*:\s*"[^"]*"|"createdAt"|"updatedAt"/g, description: '타임스탬프', template: '**timestamp**: 요청/응답 시각이나 데이터 생성/수정 시각입니다.', category: 'Data', importance: 'medium' },
  { id: 'json-api-request-id', regex: /"requestId"|"traceId"/g, description: '요청 추적 ID', template: '**requestId**: 로그 추적을 위한 고유 요청 식별자입니다.', category: 'Meta', importance: 'medium', tips: ['디버깅과 모니터링에 필수적입니다.'] },
  { id: 'json-api-version', regex: /"version"\s*:\s*"[^"]*"|"apiVersion"/g, description: 'API 버전', template: '**version**: API의 버전 정보입니다.', category: 'Meta', importance: 'low' },
  { id: 'json-api-total', regex: /"total"\s*:\s*\d+/g, description: '전체 개수', template: '**total**: 목록의 전체 항목 수입니다.', category: 'Data', importance: 'high' },
  { id: 'json-api-page', regex: /"page"\s*:\s*\d+/g, description: '현재 페이지', template: '**page**: 현재 조회 중인 페이지 번호입니다.', category: 'Data', importance: 'high' },
  { id: 'json-api-limit', regex: /"limit"\s*:\s*\d+/g, description: '페이지당 개수', template: '**limit**: 한 페이지에 표시할 최대 항목 수입니다.', category: 'Data', importance: 'high' },

  // [14] Scenario Patterns (실무 JSON 구조)
  {
    id: 'scenario-rest-api',
    regex: /"(data|meta|status|message)"\s*:/g,
    description: 'REST API 응답 구조',
    template: '**REST API Response**: data, status, message를 포함하는 표준 API 응답입니다.',
    analogy: '**"우편물"**처럼 내용물(data), 배송 상태(status), 안내 쪽지(message)를 함께 전달하는 구조입니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['일관된 응답 구조는 프론트엔드 개발을 크게 간소화합니다.']
  },
  {
    id: 'scenario-graphql',
    regex: /"(query|mutation|subscription)"\s*:/g,
    description: 'GraphQL 쿼리',
    template: '**GraphQL**: query(조회), mutation(변경), subscription(구독) 중 하나를 포함합니다.',
    analogy: '**"주문서"**처럼 원하는 데이터를 정확히 명시하여 요청하는 구조입니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['필요한 필드만 요청하여 오버페칭을 방지합니다.']
  },
  {
    id: 'scenario-error-handling',
    regex: /"(error|errors|statusCode|errorCode)"\s*:/g,
    description: '에러 핸들링 구조',
    template: '**Error Handling**: 에러 코드, 메시지, 상세 정보를 체계적으로 전달합니다.',
    analogy: '**"경고등"**처럼 무엇이 잘못되었고 어떻게 해결할지 명확히 알려줍니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['사용자 친화적인 에러 메시지와 개발자용 디버그 정보를 분리하세요.']
  },
  {
    id: 'scenario-pagination',
    regex: /"(page|limit|total|offset|hasMore)"\s*:/g,
    description: '페이지네이션 패턴',
    template: '**Pagination**: page, limit, total로 목록을 페이지 단위로 나눕니다.',
    analogy: '**"책의 목차"**처럼 전체 내용을 여러 페이지로 나눠 탐색하기 쉽게 만듭니다.',
    category: 'Scenario',
    importance: 'high',
    tips: ['무한 스크롤은 offset+limit, 페이지 번호는 page+limit 방식을 사용합니다.']
  },
  {
    id: 'scenario-i18n',
    regex: /"(locale|language|translations)"\s*:/g,
    description: '다국어 설정',
    template: '**i18n**: 언어 코드별 번역 텍스트를 관리하는 구조입니다.',
    analogy: '**"다국어 사전"**처럼 같은 내용을 여러 언어로 저장합니다.',
    category: 'Scenario',
    importance: 'medium',
    tips: ['번역 키는 계층 구조로 관리하면 유지보수가 쉽습니다.']
  }
];