import { CodePattern, ScenarioPattern } from '../types';

export const CSS_PATTERNS: CodePattern[] = [
  // [1] 선택자 및 기본 구조 (Selectors & Structure)
  { 
    id: 'css-root', 
    regex: /:root/g, 
    description: '최상위 변수 저장소', 
    template: '문서 전체에서 사용할 **공통 스타일 변수(CSS Variables)**를 선언하는 곳입니다.', 
    analogy: '웹사이트 전체의 색상과 크기를 결정하는 **중앙 통제실**과 같습니다.',
    category: 'Structure', 
    importance: 'high',
    tips: ['다크모드나 브랜드 테마를 구현할 때 여기에 변수를 몰아넣으면 한 곳에서 모든 디자인을 바꿀 수 있습니다.']
  },
  { 
    id: 'css-var', 
    regex: /var\(--[^)]+\)/g, 
    description: '사용자 정의 변수 사용', 
    template: '미리 정의된 **색상이나 크기 변수**를 가져와 일관된 디자인을 유지합니다.', 
    analogy: '색상 코드를 일일이 쓰지 않고 **"그때 정한 메인 색상 써줘"**라고 별명을 부르는 것과 같습니다.',
    category: 'Structure', 
    importance: 'high' 
  },
  { 
    id: 'css-important', 
    regex: /!important/g, 
    description: '우선순위 강제 적용', 
    template: '다른 모든 스타일을 무시하고 **이 설정을 가장 우선적으로 적용**합니다.', 
    warnings: ['남용하면 스타일 수정이 매우 힘들어집니다. 최후의 수단으로만 사용하세요.'],
    category: 'Logic', 
    importance: 'medium' 
  },
  { 
    id: 'css-calc', 
    regex: /calc\([^)]+\)/g, 
    description: '동적 수치 계산', 
    template: '단위가 다른 값(예: 100% - 20px)을 **브라우저가 실시간으로 계산**합니다.', 
    analogy: '도화지 크기에 상관없이 **"전체에서 딱 손가락 한 마디만 빼고 다 채워줘"**라고 정밀하게 주문하는 것과 같습니다.',
    category: 'Logic', 
    importance: 'high' 
  },

  // [2] 레이아웃 - Flexbox
  { 
    id: 'css-flex', 
    regex: /display:\s*flex/g, 
    description: '유연한 배치(Flex)', 
    template: '자식 요소들을 **가로 혹은 세로 한 방향으로 유연하게 정렬**하는 현대적 레이아웃 방식입니다.', 
    analogy: '자식들을 한 줄로 세우고 간격을 자유자재로 조절하는 **유능한 지휘자**입니다.',
    category: 'Layout', 
    importance: 'high'
  },
  { id: 'css-flex-dir', regex: /flex-direction:\s*([^;]+)/g, description: '배치 방향 설정', template: '요소들을 **가로(row)로 나열할지, 세로(column)로 쌓을지** 정합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-justify', regex: /justify-content:\s*([^;]+)/g, description: '메인축 정렬', template: '배치 방향에 따라 요소를 **왼쪽, 오른쪽, 가운데, 혹은 균등 간격**으로 배치합니다.', category: 'Layout', importance: 'high' },
  { id: 'css-align-items', regex: /align-items:\s*([^;]+)/g, description: '교차축 정렬', template: '배치 방향의 반대 방향(세로축 등)의 **정렬 방식**을 결정합니다.', category: 'Layout', importance: 'high' },
  { id: 'css-flex-wrap', regex: /flex-wrap:\s*([^;]+)/g, description: '줄바꿈 여부', template: '공간이 부족할 때 요소를 **다음 줄로 넘길지, 한 줄에 욱여넣을지** 정합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-flex-grow', regex: /flex-grow:\s*\d+/g, description: '공간 차지 비중', template: '남는 공간을 **얼마나 더 많이 차지할지 배수**로 지정합니다.', category: 'Layout', importance: 'low' },
  { 
    id: 'css-gap', 
    regex: /\bgap:\s*([^;]+)/g, 
    description: '요소 사이 간격', 
    template: '아이템들 사이에 **일정한 거리(여백)**를 간편하게 줍니다.', 
    analogy: '아이들 사이에 **"주먹 하나만큼의 거리"**를 일정하게 유지하게 시키는 것과 같습니다.',
    category: 'Layout', 
    importance: 'high' 
  },

  // [3] 레이아웃 - Grid
  { 
    id: 'css-grid', 
    regex: /display:\s*grid/g, 
    description: '격자 배치(Grid)', 
    template: '화면을 **가로세로 바둑판 모양의 격자**로 나누어 정교하게 설계합니다.', 
    analogy: '모눈종이 위에 칸을 나누고 원하는 위치에 물건을 배치하는 **건축 설계도**와 같습니다.',
    category: 'Layout', 
    importance: 'high' 
  },
  { id: 'css-grid-cols', regex: /grid-template-columns:\s*([^;]+)/g, description: '열 구조 정의', template: '그리드의 **세로 칸(열) 개수와 너비**를 설정합니다.', category: 'Layout', importance: 'high' },
  { id: 'css-grid-rows', regex: /grid-template-rows:\s*([^;]+)/g, description: '행 구조 정의', template: '그리드의 **가로 줄(행) 개수와 높이**를 설정합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-grid-area', regex: /grid-template-areas:\s*([^;]+)/g, description: '구역 이름 배치', template: '각 칸에 이름을 붙여 **레이아웃 지도를 그리듯 직관적으로 배치**합니다.', category: 'Layout', importance: 'medium' },

  // [4] 박스 모델 및 위치 (Box Model & Position)
  { 
    id: 'css-box-sizing', 
    regex: /box-sizing:\s*border-box/g, 
    description: '박스 크기 계산법', 
    template: '테두리와 안쪽 여백을 **전체 너비에 포함**시켜 레이아웃이 깨지는 것을 방지합니다.', 
    tips: ['모든 요소에 기본적으로 적용하는 것이 현대 웹 개발의 표준입니다.'],
    category: 'BoxModel', 
    importance: 'high' 
  },
  { id: 'css-padding', regex: /padding:\s*([^;]+)/g, description: '안쪽 여백', template: '내용물과 테두리 사이의 **내부 공간**을 만듭니다.', category: 'BoxModel', importance: 'medium' },
  { id: 'css-margin', regex: /margin:\s*([^;]+)/g, description: '바깥쪽 여백', template: '상자 바깥의 **다른 요소와의 거리**를 둡니다.', category: 'BoxModel', importance: 'medium' },
  { id: 'css-overflow', regex: /overflow:\s*([^;]+)/g, description: '넘치는 내용 처리', template: '내용이 상자보다 클 때 **숨길지, 스크롤바를 보여줄지** 결정합니다.', category: 'BoxModel', importance: 'medium' },
  { 
    id: 'css-position', 
    regex: /position:\s*(relative|absolute|fixed|sticky)/g, 
    description: '배치 기준 설정', 
    template: '요소를 배치하는 **기준점(현재 위치, 부모, 브라우저 등)**을 변경합니다.', 
    category: 'Position', 
    importance: 'high' 
  },
  { 
    id: 'css-sticky', 
    regex: /position:\s*sticky/g, 
    description: '스크롤 고정', 
    template: '평소에는 흐름을 따르다가 **특정 위치에 도달하면 화면에 착 달라붙습니다.**', 
    analogy: '게시판의 **"공지사항 고정"** 핀과 같은 역할을 합니다.',
    category: 'Position', 
    importance: 'medium' 
  },
  { id: 'css-zindex', regex: /z-index:\s*(-?\d+)/g, description: '겹침 순서(Z-축)', template: '요소들이 겹칠 때 **숫자가 클수록 더 위쪽**에 보입니다.', category: 'Position', importance: 'medium' },

  // [5] 타이포그래피 (Typography)
  { id: 'css-font-family', regex: /font-family:\s*([^;]+)/g, description: '글꼴 설정', template: '텍스트에 적용할 **폰트 종류와 우선순위**를 지정합니다.', category: 'Typography', importance: 'medium' },
  { id: 'css-font-size', regex: /font-size:\s*([^;]+)/g, description: '글자 크기', template: '텍스트의 **크기를 조절**하여 가독성과 계층 구조를 만듭니다.', category: 'Typography', importance: 'high' },
  { id: 'css-font-weight', regex: /font-weight:\s*([^;]+)/g, description: '글자 굵기', template: '글자를 **얇게(100)부터 아주 굵게(900)**까지 조절합니다.', category: 'Typography', importance: 'medium' },
  { id: 'css-line-height', regex: /line-height:\s*([^;]+)/g, description: '줄 간격', template: '텍스트 행 사이의 **세로 간격**을 조절하여 가독성을 높입니다.', category: 'Typography', importance: 'low' },
  { id: 'css-text-align', regex: /text-align:\s*(left|center|right|justify)/g, description: '글자 정렬', template: '텍스트를 **왼쪽, 가운데, 오른쪽** 중 어디로 맞출지 정합니다.', category: 'Typography', importance: 'medium' },
  { id: 'css-text-overflow', regex: /text-overflow:\s*ellipsis/g, description: '말줄임표(...) 처리', template: '넘치는 글자를 자르고 **끝에 세 점(...)**을 붙여 깔끔하게 정리합니다.', category: 'Typography', importance: 'medium' },
  { id: 'css-white-space', regex: /white-space:\s*nowrap/g, description: '줄바꿈 금지', template: '텍스트가 길어져도 **강제로 줄바꿈되지 않고 한 줄로** 표시합니다.', category: 'Typography', importance: 'low' },

  // [6] 시각적 효과 및 디자인 패턴 (Visual Effects)
  { id: 'css-background', regex: /background(-color)?:\s*([^;]+)/g, description: '배경 설정', template: '상자의 **색상, 이미지, 그라데이션** 등 배경을 꾸밉니다.', category: 'Visual', importance: 'medium' },
  { 
    id: 'css-border-radius', 
    regex: /border-radius:\s*([^;]+)/g, 
    description: '테두리 곡률(둥근 모서리)', 
    template: '상자의 모서리를 **둥글게 깎아 부드럽고 현대적인 느낌**을 줍니다.', 
    analogy: '딱딱한 직사각형을 **모서리가 둥근 세련된 스마트폰 모양**으로 바꾸는 것과 같습니다.',
    category: 'Visual', 
    importance: 'medium' 
  },
  { 
    id: 'css-box-shadow', 
    regex: /box-shadow:\s*([^;]+)/g, 
    description: '상자 그림자', 
    template: '요소 뒤에 **입체적인 그림자**를 넣어 떠 있는 효과를 줍니다.', 
    analogy: '평면적인 종이를 바닥에서 살짝 띄워 **입체감과 깊이(Depth)**를 주는 마법입니다.',
    category: 'Visual', 
    importance: 'medium',
    tips: ['그림자가 부드러울수록 더 고급스러운 UI 느낌이 납니다.']
  },
  { id: 'css-opacity', regex: /opacity:\s*([^;]+)/g, description: '투명도', template: '요소를 **반투명하게 만들거나 완전히 투명**하게 숨깁니다.', category: 'Visual', importance: 'low' },
  { id: 'css-filter', regex: /filter:\s*(blur|brightness|contrast|grayscale|invert)/g, description: '이미지 필터', template: '흐리게, 흑백 등 **이미지나 요소에 특수 효과**를 줍니다.', category: 'Visual', importance: 'low' },
  { 
    id: 'css-backdrop-filter', 
    regex: /backdrop-filter:\s*([^;]+)/g, 
    description: '배경 투명 블러', 
    template: '유리창 너머를 보는 듯한 **배경 흐림 효과(Glassmorphism)**를 만듭니다.', 
    analogy: '뿌연 안개가 낀 **고급스러운 유리 질감**을 표현합니다.',
    category: 'Visual', 
    importance: 'medium' 
  },

  // [7] 애니메이션 및 변형 (Animation & Transform)
  { 
    id: 'css-transition', 
    regex: /transition:\s*([^;]+)/g, 
    description: '부드러운 상태 변화', 
    template: '색상이나 크기가 바뀔 때 **툭 끊기지 않고 부드럽게 변하도록** 합니다.', 
    analogy: '불이 순식간에 켜지는 게 아니라 **서서히 밝아지는 디머 스위치**와 같습니다.',
    category: 'Animation', 
    importance: 'high' 
  },
  { 
    id: 'css-transform', 
    regex: /transform:\s*([^;]+)/g, 
    description: '기하학적 변형', 
    template: '요소를 **회전, 확대/축소, 이동**시켜 동적인 느낌을 줍니다.', 
    category: 'Animation', 
    importance: 'high' 
  },
  { id: 'css-keyframes', regex: /@keyframes\s+\w+/g, description: '애니메이션 시나리오', template: '시간 흐름에 따라 **스타일이 어떻게 변할지 단계별로 정의**합니다.', category: 'Animation', importance: 'medium' },
  { id: 'css-animation', regex: /\banimation:\s*([^;]+)/g, description: '애니메이션 적용', template: '정의한 keyframes를 불러와 **움직임을 실제로 실행**합니다.', category: 'Animation', importance: 'medium' },

  // [8] 반응형 및 고급 기술 (Responsive & Advanced)
  { 
    id: 'css-media', 
    regex: /@media\s*\([^)]+\)/g, 
    description: '반응형 디자인', 
    template: '기기 화면 크기에 따라 **스마트폰, 태블릿, PC별로 다른 스타일**을 보여줍니다.', 
    analogy: '입는 사람의 몸 크기에 맞춰 **알아서 줄어들거나 늘어나는 옷**과 같습니다.',
    category: 'Responsive', 
    importance: 'high' 
  },
  { id: 'css-aspect-ratio', regex: /aspect-ratio:\s*([^;]+)/g, description: '종횡비 유지', template: '너비가 변해도 **일정한 가로세로 비율(예: 16/9)**을 유지합니다.', category: 'Advanced', importance: 'medium' },
  { 
    id: 'css-container-query', 
    regex: /@container/g, 
    description: '컨테이너 쿼리', 
    template: '브라우저 크기가 아니라 **자신을 감싸고 있는 상자의 크기**에 반응하는 최신 기술입니다.', 
    category: 'Advanced', 
    importance: 'high' 
  },
  { id: 'css-has-selector', regex: /:has\(/g, description: '부모/인접 선택자(:has)', template: '특정 자식을 포함하고 있는 **부모 요소를 선택**할 수 있게 해주는 아주 강력한 도구입니다.', category: 'Advanced', importance: 'high' },

  // [9] CSS Grid 고급 기능 (Advanced Grid)
  { id: 'css-grid-auto-flow', regex: /grid-auto-flow:\s*([^;]+)/g, description: 'Grid 자동 배치 방향', template: '새로운 항목이 **가로로 쌓일지, 세로로 쌓일지** 자동 배치 방향을 결정합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-grid-auto-rows', regex: /grid-auto-rows:\s*([^;]+)/g, description: '자동 생성 행 크기', template: '명시하지 않은 행들의 **기본 높이**를 설정합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-grid-auto-columns', regex: /grid-auto-columns:\s*([^;]+)/g, description: '자동 생성 열 크기', template: '명시하지 않은 열들의 **기본 너비**를 설정합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-grid-column', regex: /grid-column:\s*([^;]+)/g, description: 'Grid 열 위치 지정', template: '아이템이 **몇 번째 열부터 몇 번째까지 차지할지** 한 번에 정합니다.', category: 'Layout', importance: 'high' },
  { id: 'css-grid-row', regex: /grid-row:\s*([^;]+)/g, description: 'Grid 행 위치 지정', template: '아이템이 **몇 번째 행부터 몇 번째까지 차지할지** 한 번에 정합니다.', category: 'Layout', importance: 'high' },
  { id: 'css-place-items', regex: /place-items:\s*([^;]+)/g, description: 'Grid 아이템 정렬(통합)', template: 'align-items와 justify-items를 **한 줄로 동시에 설정**하는 단축 속성입니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-place-content', regex: /place-content:\s*([^;]+)/g, description: 'Grid 콘텐츠 정렬(통합)', template: 'align-content와 justify-content를 **한 번에 설정**합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-minmax', regex: /minmax\(/g, description: 'Grid 최소/최대 크기', template: '열이나 행의 **최소와 최대 크기를 동시에 지정**하여 유연한 레이아웃을 만듭니다.', category: 'Layout', importance: 'high', tips: ['반응형 그리드의 핵심 기능입니다.'] },
  { id: 'css-repeat', regex: /repeat\(/g, description: 'Grid 반복 패턴', template: '같은 크기의 열이나 행을 **반복해서 생성**할 때 간결하게 작성합니다.', category: 'Layout', importance: 'high' },
  { id: 'css-auto-fit', regex: /auto-fit/g, description: 'Grid 자동 맞춤', template: '가능한 공간에 **자동으로 아이템을 채워** 넣습니다.', category: 'Layout', importance: 'high', tips: ['반응형 카드 그리드에 최적입니다.'] },
  { id: 'css-auto-fill', regex: /auto-fill/g, description: 'Grid 자동 채우기', template: '공간이 남아도 **빈 트랙을 유지**하며 아이템을 배치합니다.', category: 'Layout', importance: 'medium' },
  { id: 'css-subgrid', regex: /subgrid/g, description: '하위 Grid 상속', template: '부모 그리드의 라인을 **자식 그리드가 그대로 따르도록** 만듭니다.', category: 'Advanced', importance: 'medium' },

  // [10] CSS 함수 (CSS Functions)
  { id: 'css-min', regex: /\bmin\(/g, description: '최솟값 선택', template: '여러 값 중 **가장 작은 값**을 자동으로 선택합니다.', category: 'Logic', importance: 'high' },
  { id: 'css-max', regex: /\bmax\(/g, description: '최댓값 선택', template: '여러 값 중 **가장 큰 값**을 자동으로 선택합니다.', category: 'Logic', importance: 'high' },
  { id: 'css-clamp', regex: /clamp\(/g, description: '범위 제한', template: '최소, 선호, 최대 값을 지정하여 **그 범위 안에서만 값이 변하도록** 제한합니다.', analogy: '온도 조절기처럼 **최저 18도, 최고 26도 사이에서만 유지**하는 것과 같습니다.', category: 'Logic', importance: 'high', tips: ['반응형 타이포그래피에 완벽합니다.'] },
  { id: 'css-attr', regex: /attr\(/g, description: 'HTML 속성 값 사용', template: 'HTML 속성값을 **CSS에서 직접 가져와** 사용합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-url', regex: /url\(/g, description: '외부 리소스 경로', template: '이미지, 폰트 등 **외부 파일의 경로**를 지정합니다.', category: 'Structure', importance: 'high' },

  // [11] Scroll 관련 (Scroll Behavior)
  { id: 'css-scroll-behavior', regex: /scroll-behavior:\s*smooth/g, description: '부드러운 스크롤', template: '앵커 링크 이동 시 **툭 끊기지 않고 부드럽게 스크롤**됩니다.', category: 'Animation', importance: 'medium' },
  { id: 'css-scroll-snap-type', regex: /scroll-snap-type:\s*([^;]+)/g, description: 'Snap 스크롤 타입', template: '스크롤이 **특정 위치에 자석처럼 달라붙도록** 만듭니다.', analogy: '사진 갤러리에서 **사진이 정확히 중앙에 멈추는 느낌**을 줍니다.', category: 'Advanced', importance: 'high' },
  { id: 'css-scroll-snap-align', regex: /scroll-snap-align:\s*([^;]+)/g, description: 'Snap 정렬 위치', template: '스크롤 멈춤 위치를 **시작, 중앙, 끝** 중 선택합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-scroll-padding', regex: /scroll-padding:\s*([^;]+)/g, description: 'Snap 여백', template: 'Snap 위치에 **여백을 추가**하여 상단 고정 헤더 등을 고려합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-scroll-margin', regex: /scroll-margin:\s*([^;]+)/g, description: 'Snap 마진', template: '요소가 snap 될 때 **주변 공간을 확보**합니다.', category: 'Advanced', importance: 'low' },
  { id: 'css-overscroll-behavior', regex: /overscroll-behavior:\s*([^;]+)/g, description: '과도한 스크롤 제어', template: '스크롤이 끝에 도달했을 때 **페이지 전체가 튕기지 않도록** 방지합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-scrollbar-width', regex: /scrollbar-width:\s*(thin|none|auto)/g, description: '스크롤바 두께', template: '스크롤바를 **얇게 만들거나 숨깁니다**.', category: 'Visual', importance: 'low' },
  { id: 'css-scrollbar-color', regex: /scrollbar-color:\s*([^;]+)/g, description: '스크롤바 색상', template: '스크롤바의 **색상을 커스터마이징**합니다.', category: 'Visual', importance: 'low' },

  // [12] CSS Logical Properties (논리적 속성 - 다국어 대응)
  { id: 'css-inline-size', regex: /inline-size:\s*([^;]+)/g, description: '인라인 방향 크기', template: '텍스트 방향에 따라 **자동으로 너비가 될 수도, 높이가 될 수도** 있습니다.', category: 'Advanced', importance: 'medium', tips: ['다국어 지원 시 좌우 언어와 상하 언어를 모두 대응합니다.'] },
  { id: 'css-block-size', regex: /block-size:\s*([^;]+)/g, description: '블록 방향 크기', template: '블록 흐름 방향의 크기로, 보통 **높이에 해당**합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-margin-inline', regex: /margin-inline:\s*([^;]+)/g, description: '인라인 마진', template: '좌우가 아닌 **텍스트 흐름 방향의 마진**을 설정합니다.', category: 'BoxModel', importance: 'medium' },
  { id: 'css-margin-block', regex: /margin-block:\s*([^;]+)/g, description: '블록 마진', template: '상하가 아닌 **블록 방향의 마진**을 설정합니다.', category: 'BoxModel', importance: 'medium' },
  { id: 'css-padding-inline', regex: /padding-inline:\s*([^;]+)/g, description: '인라인 패딩', template: '텍스트 방향을 기준으로 한 **양쪽 안쪽 여백**입니다.', category: 'BoxModel', importance: 'medium' },
  { id: 'css-padding-block', regex: /padding-block:\s*([^;]+)/g, description: '블록 패딩', template: '블록 방향의 **양쪽 안쪽 여백**입니다.', category: 'BoxModel', importance: 'medium' },
  { id: 'css-inset', regex: /\binset:\s*([^;]+)/g, description: 'Position 단축 속성', template: 'top, right, bottom, left를 **한 줄로 설정**합니다.', category: 'Position', importance: 'medium' },
  { id: 'css-inset-inline', regex: /inset-inline:\s*([^;]+)/g, description: '인라인 위치', template: 'position 요소의 **인라인 방향 위치**를 설정합니다.', category: 'Position', importance: 'low' },
  { id: 'css-inset-block', regex: /inset-block:\s*([^;]+)/g, description: '블록 위치', template: 'position 요소의 **블록 방향 위치**를 설정합니다.', category: 'Position', importance: 'low' },

  // [13] CSS Shapes & Clip-path (도형 및 자르기)
  { id: 'css-clip-path', regex: /clip-path:\s*([^;]+)/g, description: '도형으로 자르기', template: '요소를 **원, 다각형 등 특정 도형 모양으로 자릅니다**.', analogy: '종이를 가위로 **별 모양, 하트 모양**으로 오려내는 것과 같습니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-clip-path-polygon', regex: /polygon\(/g, description: '다각형 자르기', template: '좌표를 지정하여 **임의의 다각형 모양**으로 자릅니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-clip-path-circle', regex: /circle\(/g, description: '원형 자르기', template: '요소를 **원 모양**으로 자릅니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-clip-path-ellipse', regex: /ellipse\(/g, description: '타원 자르기', template: '요소를 **타원 모양**으로 자릅니다.', category: 'Visual', importance: 'low' },
  { id: 'css-shape-outside', regex: /shape-outside:\s*([^;]+)/g, description: '텍스트 감싸기 도형', template: '텍스트가 **특정 도형을 따라 흐르도록** 만듭니다.', category: 'Advanced', importance: 'low' },
  { id: 'css-shape-margin', regex: /shape-margin:\s*([^;]+)/g, description: '도형 마진', template: 'shape-outside로 만든 도형과 **텍스트 사이의 간격**을 조절합니다.', category: 'Advanced', importance: 'low' },

  // [14] CSS Filters 고급 (고급 필터 효과)
  { id: 'css-filter-drop-shadow', regex: /drop-shadow\(/g, description: '이미지 그림자', template: 'box-shadow와 달리 **이미지의 실제 모양을 따라 그림자**를 만듭니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-filter-hue-rotate', regex: /hue-rotate\(/g, description: '색상 회전', template: '이미지의 **색상 스펙트럼을 회전**시킵니다.', category: 'Visual', importance: 'low' },
  { id: 'css-filter-saturate', regex: /saturate\(/g, description: '채도 조절', template: '색상의 **선명함을 강화하거나 약화**시킵니다.', category: 'Visual', importance: 'low' },
  { id: 'css-filter-sepia', regex: /sepia\(/g, description: '세피아 효과', template: '이미지에 **오래된 사진 같은 갈색 톤**을 입힙니다.', category: 'Visual', importance: 'low' },

  // [15] CSS Blend Modes (합성 모드)
  { id: 'css-mix-blend-mode', regex: /mix-blend-mode:\s*([^;]+)/g, description: '요소 혼합 모드', template: '요소가 배경과 **어떻게 섞일지** 포토샵처럼 제어합니다.', analogy: '물감을 섞는 방식처럼 **곱하기, 스크린, 오버레이** 등 다양한 합성 효과를 줍니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-background-blend-mode', regex: /background-blend-mode:\s*([^;]+)/g, description: '배경 혼합 모드', template: '여러 배경 이미지나 색상을 **서로 혼합**합니다.', category: 'Visual', importance: 'low' },
  { id: 'css-isolation', regex: /isolation:\s*isolate/g, description: '혼합 격리', template: 'blend-mode 효과가 **특정 범위 밖으로 퍼지지 않도록** 격리합니다.', category: 'Visual', importance: 'low' },

  // [16] CSS 성능 최적화 (Performance)
  { id: 'css-will-change', regex: /will-change:\s*([^;]+)/g, description: '변화 예고', template: '브라우저에게 **이 요소가 곧 변화할 것**이라고 미리 알려 성능을 최적화합니다.', category: 'Advanced', importance: 'high', warnings: ['남용하면 오히려 성능이 떨어집니다.'] },
  { id: 'css-contain', regex: /\bcontain:\s*([^;]+)/g, description: '렌더링 격리', template: '요소 내부의 변화가 **외부에 영향을 주지 않도록** 격리합니다.', category: 'Advanced', importance: 'high', tips: ['대규모 리스트나 복잡한 컴포넌트 성능 개선에 필수입니다.'] },
  { id: 'css-content-visibility', regex: /content-visibility:\s*auto/g, description: '콘텐츠 가시성 최적화', template: '화면 밖 콘텐츠의 **렌더링을 건너뛰어** 초기 로딩 속도를 극적으로 개선합니다.', category: 'Advanced', importance: 'high' },

  // [17] CSS 커스텀 속성 고급 (Advanced Custom Properties)
  { id: 'css-var-fallback', regex: /var\([^,)]+,\s*[^)]+\)/g, description: '변수 기본값', template: '변수가 정의되지 않았을 때 사용할 **대체값**을 지정합니다.', category: 'Structure', importance: 'medium' },
  { id: 'css-at-property', regex: /@property/g, description: '커스텀 속성 정의', template: 'CSS 변수에 **타입, 초기값, 상속 여부**를 명시적으로 정의합니다.', category: 'Advanced', importance: 'medium' },

  // [18] CSS Nesting (중첩)
  { id: 'css-nesting', regex: /&\s*{/g, description: 'CSS 중첩 (&)', template: 'Sass처럼 **선택자를 중첩**하여 작성할 수 있게 해줍니다.', category: 'Advanced', importance: 'high', tips: ['CSS 네이티브 중첩은 최신 브라우저만 지원합니다.'] },

  // [19] CSS Layers (@layer)
  { id: 'css-layer', regex: /@layer/g, description: 'CSS 레이어', template: '스타일 우선순위를 **레이어로 명시적으로 제어**합니다.', analogy: '포토샵의 레이어처럼 **어떤 스타일이 위에 올라갈지** 명확히 정합니다.', category: 'Advanced', importance: 'medium' },

  // [20] CSS Color 고급 (Modern Color)
  { id: 'css-color-mix', regex: /color-mix\(/g, description: '색상 혼합', template: '두 색상을 **특정 비율로 섞어** 새로운 색을 만듭니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-oklch', regex: /oklch\(/g, description: 'OKLCH 색공간', template: '인간의 **지각에 더 가까운 색상 공간**으로 더 정확한 색 표현이 가능합니다.', category: 'Visual', importance: 'medium' },
  { id: 'css-color-function', regex: /color\(/g, description: 'Color 함수', template: '다양한 색공간을 활용하여 **넓은 범위의 색상**을 표현합니다.', category: 'Visual', importance: 'low' },

  // [21] Pseudo-classes 고급 (고급 가상 클래스)
  { id: 'css-is', regex: /:is\(/g, description: '선택자 그룹(:is)', template: '여러 선택자를 **하나로 묶어** 코드를 간결하게 만듭니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-where', regex: /:where\(/g, description: '명시도 0 선택자(:where)', template: ':is와 비슷하지만 **명시도를 0으로** 만들어 쉽게 덮어쓸 수 있게 합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-not', regex: /:not\(/g, description: '부정 선택자(:not)', template: '특정 조건에 **해당하지 않는 요소만** 선택합니다.', category: 'Advanced', importance: 'high' },
  { id: 'css-nth-child', regex: /:nth-child\(/g, description: 'N번째 자식', template: '특정 순서의 자식 요소를 **수식으로 선택**합니다.', category: 'Advanced', importance: 'high', tips: ['홀수(odd), 짝수(even), n+3 등 다양한 패턴 가능합니다.'] },
  { id: 'css-nth-of-type', regex: /:nth-of-type\(/g, description: 'N번째 타입', template: '같은 태그 중 **N번째만** 선택합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-first-child', regex: /:first-child/g, description: '첫 번째 자식', template: '부모의 **첫 번째 자식 요소**를 선택합니다.', category: 'Advanced', importance: 'high' },
  { id: 'css-last-child', regex: /:last-child/g, description: '마지막 자식', template: '부모의 **마지막 자식 요소**를 선택합니다.', category: 'Advanced', importance: 'high' },
  { id: 'css-only-child', regex: /:only-child/g, description: '외동 자식', template: '형제가 없는 **유일한 자식 요소**를 선택합니다.', category: 'Advanced', importance: 'low' },
  { id: 'css-hover', regex: /:hover/g, description: '마우스 오버', template: '마우스가 올라갔을 때의 **스타일을 정의**합니다.', category: 'Interactive', importance: 'high' },
  { id: 'css-focus', regex: /:focus/g, description: '포커스 상태', template: '키보드나 클릭으로 **포커스된 상태**의 스타일입니다.', category: 'Interactive', importance: 'high' },
  { id: 'css-focus-visible', regex: /:focus-visible/g, description: '키보드 포커스만', template: '마우스가 아닌 **키보드로 포커스했을 때만** 스타일을 적용합니다.', category: 'Advanced', importance: 'high', tips: ['접근성을 위해 :focus 대신 사용을 권장합니다.'] },
  { id: 'css-focus-within', regex: /:focus-within/g, description: '내부 포커스', template: '자신이나 **자식 중 하나라도 포커스**되면 스타일이 적용됩니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-active', regex: /:active/g, description: '클릭 중', template: '마우스로 **누르고 있는 동안**의 스타일입니다.', category: 'Interactive', importance: 'medium' },
  { id: 'css-visited', regex: /:visited/g, description: '방문한 링크', template: '이미 **방문한 적 있는 링크**의 색상을 변경합니다.', category: 'Interactive', importance: 'low' },
  { id: 'css-target', regex: /:target/g, description: 'URL 타겟', template: 'URL의 #해시와 **일치하는 ID를 가진 요소**를 선택합니다.', category: 'Advanced', importance: 'low' },
  { id: 'css-checked', regex: /:checked/g, description: '체크된 상태', template: 'input이 **체크되었을 때**의 스타일입니다.', category: 'Interactive', importance: 'medium' },
  { id: 'css-disabled', regex: /:disabled/g, description: '비활성 상태', template: '**사용 불가능한 상태**의 입력 요소를 선택합니다.', category: 'Interactive', importance: 'medium' },
  { id: 'css-enabled', regex: /:enabled/g, description: '활성 상태', template: '**사용 가능한 상태**의 입력 요소를 선택합니다.', category: 'Interactive', importance: 'low' },
  { id: 'css-placeholder-shown', regex: /:placeholder-shown/g, description: 'Placeholder 표시 중', template: 'input에 **placeholder가 보이는 상태**를 선택합니다.', category: 'Interactive', importance: 'medium' },

  // [22] Pseudo-elements (가상 요소)
  { id: 'css-before', regex: /::before/g, description: '앞에 삽입(::before)', template: '요소의 **맨 앞에 가상 콘텐츠**를 추가합니다.', category: 'Advanced', importance: 'high' },
  { id: 'css-after', regex: /::after/g, description: '뒤에 삽입(::after)', template: '요소의 **맨 뒤에 가상 콘텐츠**를 추가합니다.', category: 'Advanced', importance: 'high' },
  { id: 'css-first-line', regex: /::first-line/g, description: '첫 줄', template: '텍스트의 **첫 번째 줄만** 스타일링합니다.', category: 'Typography', importance: 'low' },
  { id: 'css-first-letter', regex: /::first-letter/g, description: '첫 글자', template: '텍스트의 **첫 글자를 크게** 강조합니다.', analogy: '신문 기사의 **드롭 캡(Drop Cap)** 효과입니다.', category: 'Typography', importance: 'low' },
  { id: 'css-selection', regex: /::selection/g, description: '선택 영역', template: '사용자가 **드래그로 선택한 텍스트**의 스타일을 변경합니다.', category: 'Interactive', importance: 'low' },
  { id: 'css-marker', regex: /::marker/g, description: '리스트 마커', template: '목록의 **불렛이나 숫자 부분**만 스타일링합니다.', category: 'Typography', importance: 'low' },
  { id: 'css-placeholder', regex: /::placeholder/g, description: 'Placeholder 스타일', template: 'input의 **placeholder 텍스트 색상과 스타일**을 변경합니다.', category: 'Typography', importance: 'medium' },

  // [23] Display 고급 (Advanced Display)
  { id: 'css-display-contents', regex: /display:\s*contents/g, description: 'Display Contents', template: '요소 자체는 사라지고 **자식들만 부모의 직계 자식처럼** 행동합니다.', analogy: '포장 상자를 벗겨내고 **내용물만 남기는 것**과 같습니다.', category: 'Advanced', importance: 'medium' },
  { id: 'css-display-flow-root', regex: /display:\s*flow-root/g, description: 'Flow Root', template: '새로운 **블록 포맷팅 컨텍스트(BFC)**를 생성하여 float를 안전하게 포함합니다.', category: 'Advanced', importance: 'medium' },

  // [24] Border 고급 (Advanced Border)
  { id: 'css-border-image', regex: /border-image:\s*([^;]+)/g, description: '이미지 테두리', template: '테두리를 **이미지로 채웁니다**.', category: 'Visual', importance: 'low' },
  { id: 'css-outline', regex: /\boutline:\s*([^;]+)/g, description: '외곽선(Outline)', template: '레이아웃에 영향을 주지 않는 **외곽 선**을 그립니다.', category: 'Visual', importance: 'medium', tips: ['접근성을 위해 :focus 스타일링에 자주 사용됩니다.'] },
  { id: 'css-outline-offset', regex: /outline-offset:\s*([^;]+)/g, description: 'Outline 간격', template: 'outline과 요소 사이의 **간격**을 조절합니다.', category: 'Visual', importance: 'low' },

  // [25] Cursor & Pointer Events (커서 및 이벤트)
  { id: 'css-cursor', regex: /cursor:\s*(pointer|grab|text|wait|not-allowed)/g, description: '마우스 커서 모양', template: '마우스 커서의 **모양을 변경**하여 사용자에게 힌트를 줍니다.', category: 'Interactive', importance: 'medium' },
  { id: 'css-pointer-events', regex: /pointer-events:\s*none/g, description: '마우스 이벤트 차단', template: '요소가 **마우스 클릭과 호버를 무시**하도록 만듭니다.', category: 'Interactive', importance: 'medium', tips: ['모달 배경 등에서 하위 요소 클릭을 막을 때 유용합니다.'] },
  { id: 'css-user-select', regex: /user-select:\s*none/g, description: '텍스트 선택 방지', template: '텍스트를 **드래그로 선택할 수 없게** 만듭니다.', category: 'Interactive', importance: 'medium' },

  // [26] Object Fit & Position (이미지/비디오 크기 조절)
  { id: 'css-object-fit', regex: /object-fit:\s*(cover|contain|fill|none|scale-down)/g, description: '객체 맞춤 방식', template: '이미지나 비디오가 **부모 상자에 어떻게 들어갈지** 결정합니다.', analogy: '액자에 사진을 넣을 때 **꽉 채울지, 여백을 둘지, 자를지** 결정하는 것과 같습니다.', category: 'Media', importance: 'high' },
  { id: 'css-object-position', regex: /object-position:\s*([^;]+)/g, description: '객체 위치', template: 'object-fit으로 맞춘 이미지의 **정렬 위치**를 조절합니다.', category: 'Media', importance: 'medium' }
];

export const SCENARIO_PATTERNS: ScenarioPattern[] = [
  {
    id: 'scen-window-frame',
    requiredKeywords: ['shadow', 'radius', 'bg', 'border'],
    title: '🪟 윈도우 프레임(창) 스타일',
    description: '그림자, 둥근 모서리, 배경색이 조화롭게 사용되어 마치 운영체제의 프로그램 창이나 고급스러운 카드 UI와 같은 느낌을 줍니다.',
    category: 'Design Pattern'
  },
  {
    id: 'scen-glassmorphism',
    requiredKeywords: ['backdrop-filter', 'blur', 'opacity'],
    title: '🧊 글래스모피즘(유리 효과)',
    description: '배경을 흐릿하게 하고 투명한 레이어를 쌓아, 세련되고 현대적인 유리 질감의 UI를 표현합니다.',
    category: 'Design Pattern'
  },
  {
    id: 'scen-responsive-layout',
    requiredKeywords: ['@media', 'flex|grid'],
    title: '📱 반응형 화면 설계',
    description: '모바일과 데스크탑 등 다양한 환경에서 최적의 레이아웃을 보여주기 위한 유동적인 구조입니다.',
    category: 'Layout Strategy'
  },
  {
    id: 'scen-complex-animation',
    requiredKeywords: ['@keyframes', 'animation', 'transform'],
    title: '✨ 고급 애니메이션 시스템',
    description: '단순한 변화를 넘어, 여러 단계의 움직임과 기하학적 변형을 조합한 생동감 넘치는 시각 효과입니다.',
    category: 'Motion Design'
  },
  {
    id: 'scen-modern-grid-layout',
    requiredKeywords: ['display: grid', 'grid-template-'],
    title: '🏁 격자형 고도화 레이아웃',
    description: '바둑판 모양의 정교한 그리드 시스템을 사용하여, 복잡한 대시보드나 잡지 스타일의 화면을 완벽하게 제어합니다.',
    category: 'Layout Strategy'
  },
  {
    id: 'scen-scroll-snap-gallery',
    requiredKeywords: ['scroll-snap', 'overflow'],
    title: '📸 Snap 스크롤 갤러리',
    description: '사진이나 카드가 자석처럼 정확한 위치에 멈추는 부드러운 스크롤 경험을 제공하는 모던 갤러리 패턴입니다.',
    category: 'Interaction'
  },
  {
    id: 'scen-performance-critical',
    requiredKeywords: ['will-change', 'contain', 'content-visibility'],
    description: '대규모 리스트나 복잡한 애니메이션에서 렌더링 성능을 극대화하기 위한 최적화 기법이 적용된 고성능 설계입니다.',
    category: 'Performance'
  },
  {
    id: 'scen-responsive-typography',
    requiredKeywords: ['clamp', 'min', 'max'],
    title: '📏 반응형 타이포그래피',
    description: '화면 크기에 따라 자연스럽게 크기가 조절되는 유동적인 글자 시스템으로, 미디어쿼리 없이도 완벽한 가독성을 보장합니다.',
    category: 'Typography'
  }
];