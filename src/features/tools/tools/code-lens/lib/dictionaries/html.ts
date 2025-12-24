import { CodePattern, ScenarioPattern } from '../types';

export const HTML_PATTERNS: CodePattern[] = [
  // [1] 문서 메타 정보 및 루트 (Metadata & Root)
  { 
    id: 'html-html', 
    regex: /<html/g, 
    description: '문서의 시작', 
    template: 'HTML 문서의 **최상위 루트 요소**입니다.', 
    analogy: '책의 **겉표지**와 같아서, 이 안에 모든 내용이 담깁니다.',
    category: 'Meta', 
    importance: 'high',
    tips: ['lang 속성을 설정하면 브라우저와 검색엔진이 문서의 주 언어를 정확히 인식합니다.'],
    warnings: ['모든 HTML 요소는 반드시 이 태그 안에 위치해야 합니다.']
  },
  { 
    id: 'html-head', 
    regex: /<head/g, 
    description: '문서 정보 컨테이너', 
    template: '브라우저에 보이지 않는 **메타데이터(제목, 설정, 스타일 등)**를 담습니다.', 
    analogy: '사람의 **뇌**와 같아서, 겉으로 보이진 않지만 페이지의 모든 기능을 제어합니다.',
    category: 'Meta', 
    importance: 'high' 
  },
  { 
    id: 'html-title', 
    regex: /<title/g, 
    description: '브라우저 탭 제목', 
    template: '브라우저 탭이나 검색 결과에 표시되는 **페이지의 공식 제목**입니다.', 
    category: 'Meta', 
    importance: 'high',
    tips: ['SEO(검색 최적화)를 위해 페이지마다 고유하고 구체적인 제목을 쓰는 것이 좋습니다.']
  },
  { 
    id: 'html-meta-charset', 
    regex: /<meta\s+charset/g, 
    description: '문서 인코딩 설정', 
    template: '문서의 **글자 인코딩(주로 UTF-8)**을 설정하여 글자 깨짐을 방지합니다.', 
    category: 'Meta', 
    importance: 'high' 
  },
  { 
    id: 'html-meta-viewport', 
    regex: /<meta\s+name=["']viewport["']/g, 
    description: '반응형 뷰포트 설정', 
    template: '모바일 기기에서 **화면 크기에 맞게 페이지를 조절**하도록 지시합니다.', 
    category: 'Meta', 
    importance: 'high' 
  },
  { 
    id: 'html-meta-description', 
    regex: /<meta\s+name=["']description["']/g, 
    description: '페이지 요약 설명', 
    template: '검색 결과 화면에서 제목 아래에 표시되는 **페이지의 간략한 설명**입니다.', 
    category: 'Meta', 
    importance: 'medium' 
  },
  { 
    id: 'html-link', 
    regex: /<link/g, 
    description: '외부 자원 연결', 
    template: 'CSS 파일이나 파비콘 등 **외부 리소스를 현재 문서와 연결**합니다.', 
    category: 'Meta', 
    importance: 'high' 
  },
  { 
    id: 'html-base', 
    regex: /<base/g, 
    description: '기준 경로 설정', 
    template: '문서 내 모든 상대 경로의 **기준이 되는 URL**을 지정합니다.', 
    category: 'Meta', 
    importance: 'low' 
  },

  // [2] 시맨틱 레이아웃 (Semantic Structure)
  { 
    id: 'html-main', 
    regex: /<main/g, 
    description: '핵심 본문 영역', 
    template: '페이지의 **가장 중요한 핵심 내용**이 담기는 영역입니다.', 
    analogy: '전시회의 **메인 홀**과 같아서, 관객이 가장 집중해서 봐야 할 장소입니다.',
    category: 'Structure', 
    importance: 'high',
    tips: ['문서당 하나만 사용해야 하며, 스크린 리더 사용자가 본문으로 바로 건너뛰는 기준점이 됩니다.']
  },
  { 
    id: 'html-header', 
    regex: /<header/g, 
    description: '머리말 영역', 
    template: '페이지나 구역 상단에 위치하여 **제목이나 로고, 메뉴**를 보여줍니다.', 
    category: 'Structure', 
    importance: 'high' 
  },
  { 
    id: 'html-nav', 
    regex: /<nav/g, 
    description: '탐색 메뉴 영역', 
    template: '다른 페이지로 이동하는 **주요 링크들의 집합**입니다.', 
    analogy: '건물의 **이정표나 엘리베이터 층별 안내도** 역할을 합니다.',
    category: 'Structure', 
    importance: 'high' 
  },
  { 
    id: 'html-section', 
    regex: /<section/g, 
    description: '주제별 구역', 
    template: '문서의 내용을 **주제별로 크게 나누는 마디** 역할을 합니다.', 
    category: 'Structure', 
    importance: 'medium',
    tips: ['일반적으로 내부에 제목(h1~h6)을 포함하는 것이 권장됩니다.']
  },
  { 
    id: 'html-article', 
    regex: /<article/g, 
    description: '독립된 콘텐츠', 
    template: '포스트, 기사처럼 **그 자체로 독립적인 의미를 갖는 내용**입니다.', 
    category: 'Structure', 
    importance: 'medium' 
  },
  { 
    id: 'html-aside', 
    regex: /<aside/g, 
    description: '보조 정보 영역', 
    template: '주변 콘텐츠와 관련은 있지만 **없어도 흐름에 지장이 없는 정보(광고, 링크 등)**입니다.', 
    category: 'Structure', 
    importance: 'low' 
  },
  { 
    id: 'html-footer', 
    regex: /<footer/g, 
    description: '꼬리말 영역', 
    template: '페이지 하단에서 **저작권 정보, 연락처, 사이트맵** 등을 안내합니다.', 
    category: 'Structure', 
    importance: 'high' 
  },
  { 
    id: 'html-div', 
    regex: /<div/g, 
    description: '구역 나누기(블록)', 
    template: '의미는 없지만 **레이아웃이나 스타일링을 위해 구역을 묶는 상자**입니다.', 
    category: 'Structure', 
    importance: 'medium' 
  },

  // [3] 텍스트 콘텐츠 및 의미론 (Text Content)
  { 
    id: 'html-h1-h6', 
    regex: /<h[1-6]/g, 
    description: '단계별 제목', 
    template: 'h1부터 h6까지 **내용의 중요도에 따른 계층**을 구성합니다.', 
    analogy: '신문 기사의 **대제목, 중제목, 소제목**과 같은 위계질서입니다.',
    category: 'Text', 
    importance: 'high',
    warnings: ['디자인을 위해 단계를 건너뛰지 마세요. (h1 다음 바로 h3 사용 금지)']
  },
  { 
    id: 'html-p', 
    regex: /<p/g, 
    description: '단락(문단)', 
    template: '텍스트를 **하나의 의미 있는 문단**으로 묶습니다.', 
    category: 'Text', 
    importance: 'high' 
  },
  { 
    id: 'html-br', 
    regex: /<br/g, 
    description: '강제 줄바꿈', 
    template: '문장 중간에서 **강제로 다음 줄로 줄을 바꿀 때** 사용합니다.', 
    category: 'Text', 
    importance: 'low' 
  },
  { 
    id: 'html-hr', 
    regex: /<hr/g, 
    description: '구분선', 
    template: '주제 변경이나 단락 구분을 위해 **가로 선**을 긋습니다.', 
    category: 'Text', 
    importance: 'low' 
  },
  { 
    id: 'html-pre', 
    regex: /<pre/g, 
    description: '형식 유지 텍스트', 
    template: '작성한 그대로의 **공백과 줄바꿈을 브라우저에 그대로 표현**합니다.', 
    category: 'Text', 
    importance: 'medium' 
  },
  { 
    id: 'html-blockquote', 
    regex: /<blockquote/g, 
    description: '긴 인용구', 
    template: '다른 출처에서 가져온 **긴 분량의 인용 내용**임을 나타냅니다.', 
    category: 'Text', 
    importance: 'medium' 
  },
  { 
    id: 'html-strong', 
    regex: /<strong/g, 
    description: '중요한 강조', 
    template: '내용상 매우 중요하다는 의미로 **글자를 두껍게** 표시합니다.', 
    category: 'Text', 
    importance: 'medium' 
  },
  { 
    id: 'html-em', 
    regex: /<em/g, 
    description: '의미상 강조', 
    template: '말의 뉘앙스를 강조할 때 쓰며 보통 **기울임꼴**로 표현됩니다.', 
    category: 'Text', 
    importance: 'low' 
  },
  { 
    id: 'html-code', 
    regex: /<code/g, 
    description: '코드 조각', 
    template: '짧은 **프로그래밍 코드나 명령어**를 나타낼 때 씁니다.', 
    category: 'Text', 
    importance: 'medium' 
  },
  { 
    id: 'html-span', 
    regex: /<span/g, 
    description: '범위 지정(인라인)', 
    template: '텍스트의 **특정 부분에만 스타일을 줄 때** 사용하는 이름표 없는 상자입니다.', 
    category: 'Text', 
    importance: 'medium' 
  },
  { 
    id: 'html-a', 
    regex: /<a/g, 
    description: '하이퍼링크', 
    template: '누르면 **다른 주소나 파일로 이동**하는 통로입니다.', 
    analogy: '다른 세상으로 연결되는 **포털(Portal)**과 같습니다.',
    category: 'Structure', 
    importance: 'high',
    tips: ['새 창으로 열 때는 target="_blank"와 rel="noopener"를 꼭 함께 쓰세요.']
  },

  // [4] 목록 및 그룹화 (Lists)
  { id: 'html-ul', regex: /<ul/g, description: '순서 없는 목록', template: '순서가 무관한 **점(불렛) 형태의 리스트**를 만듭니다.', category: 'List', importance: 'high' },
  { id: 'html-ol', regex: /<ol/g, description: '순서 있는 목록', template: '1, 2, 3처럼 **번호가 붙는 순서가 중요한 리스트**를 만듭니다.', category: 'List', importance: 'high' },
  { id: 'html-li', regex: /<li/g, description: '목록 항목', template: 'ul이나 ol 내부에서 **개별 데이터 항목**을 나타냅니다.', category: 'List', importance: 'high' },
  { id: 'html-dl', regex: /<dl/g, description: '설명 목록', template: '용어와 그에 대한 정의를 짝지어 나열하는 **사전식 목록**입니다.', category: 'List', importance: 'medium' },
  { id: 'html-dt', regex: /<dt/g, description: '용어 이름', template: 'dl 목록에서 **설명할 용어의 제목** 부분입니다.', category: 'List', importance: 'medium' },
  { id: 'html-dd', regex: /<dd/g, description: '용어 설명', template: 'dl 목록에서 **용어에 대한 실제 설명** 부분입니다.', category: 'List', importance: 'medium' },

  // [5] 폼 및 사용자 입력 (Forms)
  { 
    id: 'html-form', 
    regex: /<form/g, 
    description: '입력 양식 묶음', 
    template: '사용자 데이터를 서버로 전송하기 위한 **전체 입력 영역**입니다.', 
    category: 'Form', 
    importance: 'high' 
  },
  { 
    id: 'html-label', 
    regex: /<label/g, 
    description: '입력창 이름표', 
    template: '입력 요소가 무엇인지 설명하며, 클릭 시 **해당 입력창으로 포커스**를 보냅니다.', 
    category: 'Form', 
    importance: 'high',
    tips: ['input의 id와 label의 for 속성을 연결하면 접근성이 크게 좋아집니다.']
  },
  { 
    id: 'html-input', 
    regex: /<input/g, 
    description: '데이터 입력창', 
    template: '글자 입력, 체크박스 등 **다양한 사용자 정보**를 받습니다.', 
    category: 'Form', 
    importance: 'high' 
  },
  { 
    id: 'html-button', 
    regex: /<button/g, 
    description: '실행 버튼', 
    template: '클릭 시 폼을 전송하거나 **특정 동작을 실행**합니다.', 
    category: 'Form', 
    importance: 'high' 
  },
  { 
    id: 'html-select', 
    regex: /<select/g, 
    description: '선택 목록창', 
    template: '여러 옵션 중 하나를 고르는 **드롭다운 형태의 목록**입니다.', 
    category: 'Form', 
    importance: 'medium' 
  },
  { 
    id: 'html-textarea', 
    regex: /<textarea/g, 
    description: '여러 줄 입력창', 
    template: '게시글 본문처럼 **긴 문장의 텍스트를 입력**받는 넓은 공간입니다.', 
    category: 'Form', 
    importance: 'medium' 
  },
  { id: 'html-fieldset', regex: /<fieldset/g, description: '입력 그룹화', template: '폼 내부에서 서로 **연관된 입력 요소들을 그룹**으로 묶습니다.', category: 'Form', importance: 'low' },
  { id: 'html-legend', regex: /<legend/g, description: '그룹 제목', template: 'fieldset으로 묶인 **입력 그룹의 제목**을 정의합니다.', category: 'Form', importance: 'low' },

  // [6] 테이블 데이터 (Table)
  { id: 'html-table', regex: /<table/g, description: '표 데이터', template: '행과 열로 구성된 **표 형식의 데이터**를 표현합니다.', category: 'Table', importance: 'medium' },
  { id: 'html-tr', regex: /<tr/g, description: '표의 행', template: '표에서 **가로 방향의 한 줄**을 나타냅니다.', category: 'Table', importance: 'medium' },
  { id: 'html-th', regex: /<th/g, description: '표의 제목 셀', template: '해당 행이나 열의 **제목 역할을 하는 칸**입니다.', category: 'Table', importance: 'medium' },
  { id: 'html-td', regex: /<td/g, description: '표의 일반 셀', template: '표 내부의 **실제 데이터가 들어가는 개별 칸**입니다.', category: 'Table', importance: 'medium' },
  { id: 'html-thead', regex: /<thead/g, description: '표 머리글', template: '표의 상단 **열 제목 영역**입니다.', category: 'Table', importance: 'low' },
  { id: 'html-tbody', regex: /<tbody/g, description: '표 본문', template: '표의 **실제 데이터 영역**입니다.', category: 'Table', importance: 'low' },

  // [7] 멀티미디어 및 임베디드 (Media)
  { 
    id: 'html-img', 
    regex: /<img/g, 
    description: '이미지 삽입', 
    template: '화면에 **사진이나 그림**을 표시합니다.', 
    category: 'Media', 
    importance: 'high',
    tips: ['alt 속성에 설명을 적어주면 이미지를 못 보는 사용자도 내용을 알 수 있습니다.']
  },
  { id: 'html-video', regex: /<video/g, description: '비디오 재생', template: '브라우저에서 **직접 동영상을 재생**합니다.', category: 'Media', importance: 'medium' },
  { id: 'html-audio', regex: /<audio/g, description: '오디오 재생', template: '브라우저에서 **음악이나 소리 파일을 재생**합니다.', category: 'Media', importance: 'medium' },
  { id: 'html-iframe', regex: /<iframe/g, description: '외부 문서 삽입', template: '현재 페이지 안에 **다른 웹 페이지나 유튜브 영상** 등을 포함합니다.', category: 'Media', importance: 'medium' },
  { id: 'html-svg', regex: /<svg/g, description: '벡터 그래픽', template: '수식으로 그려져 **확대해도 깨지지 않는 정밀한 그래픽**입니다.', category: 'Media', importance: 'medium' },

  // [8] 대화형 및 웹 컴포넌트 (Interactive)
  { 
    id: 'html-details', 
    regex: /<details/g, 
    description: '상세 정보 접기', 
    template: '클릭하면 추가 정보가 나타나는 **접고 펼치기 위젯**입니다.', 
    category: 'Interactive', 
    importance: 'medium' 
  },
  { id: 'html-summary', regex: /<summary/g, description: '접기 제목', template: 'details 요소가 닫혀 있을 때 보여지는 **요약 제목**입니다.', category: 'Interactive', importance: 'medium' },
  { 
    id: 'html-dialog', 
    regex: /<dialog/g, 
    description: '대화 상자(모달)', 
    template: '사용자에게 알림을 주거나 입력을 받는 **팝업창**을 만듭니다.', 
    analogy: '중요한 말을 하기 위해 잠시 화면을 가로막는 **알림판**입니다.',
    category: 'Interactive', 
    importance: 'medium' 
  },
  { id: 'html-template', regex: /<template/g, description: '콘텐츠 템플릿', template: '나중에 스크립트로 사용할 **HTML 조각을 보관**해두는 창고입니다.', category: 'Advanced', importance: 'low' },

  // [9] 접근성 속성 (ARIA) - 고급
  { 
    id: 'aria-role', 
    regex: /role=["'][^"']+["']/g, 
    description: '요소의 역할 정의', 
    template: '해당 요소가 **무엇으로 작동하는지(버튼, 메뉴 등)** 스크린 리더에게 직접 알려줍니다.', 
    category: 'Advanced', 
    importance: 'high' 
  },
  { 
    id: 'aria-label', 
    regex: /aria-label=["'][^"']+["']/g, 
    description: '접근성 이름표', 
    template: '화면에는 안 보이지만 **스크린 리더가 읽어줄 이름**을 설정합니다.', 
    category: 'Advanced', 
    importance: 'high' 
  },
  {
    id: 'aria-hidden',
    regex: /aria-hidden=["']true["']/g,
    description: '접근성 숨김',
    template: '시각적으로는 보이지만 **스크린 리더는 무시하도록** 설정합니다.',
    category: 'Advanced',
    importance: 'medium'
  },

  // [10] Web Components & Shadow DOM (웹 컴포넌트)
  { id: 'html-slot', regex: /<slot/g, description: '슬롯(컨텐츠 삽입구)', template: 'Web Component 내부에서 외부 콘텐츠를 받아들이는 **자리 표시자**입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'html-custom-element', regex: /<[a-z]+-[a-z]+/g, description: '커스텀 엘리먼트', template: '개발자가 직접 만든 **재사용 가능한 HTML 태그**입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'html-is-attribute', regex: /\bis=["'][^"']+["']/g, description: 'Customized Built-in', template: '기존 HTML 요소를 확장하여 새로운 기능을 추가합니다.', category: 'Advanced', importance: 'low' },

  // [11] SEO & Social Media (검색 최적화 고급)
  { id: 'og-title', regex: /<meta\s+property=["']og:title["']/g, description: 'Open Graph 제목', template: '페이스북, 카카오톡 등 SNS에 공유될 때 표시되는 **제목**입니다.', category: 'Meta', importance: 'high', tips: ['일반 title과 다르게 SNS 최적화된 문구를 사용하세요.'] },
  { id: 'og-description', regex: /<meta\s+property=["']og:description["']/g, description: 'Open Graph 설명', template: 'SNS 공유 시 표시되는 **간략한 소개글**입니다.', category: 'Meta', importance: 'high' },
  { id: 'og-image', regex: /<meta\s+property=["']og:image["']/g, description: 'Open Graph 이미지', template: 'SNS 공유 시 함께 표시되는 **대표 이미지 URL**입니다.', category: 'Meta', importance: 'high', tips: ['1200x630px 권장 크기입니다.'] },
  { id: 'og-url', regex: /<meta\s+property=["']og:url["']/g, description: 'Open Graph URL', template: '공유될 페이지의 **정식 주소**입니다.', category: 'Meta', importance: 'medium' },
  { id: 'og-type', regex: /<meta\s+property=["']og:type["']/g, description: 'Open Graph 타입', template: '콘텐츠 종류(article, website, video 등)를 명시합니다.', category: 'Meta', importance: 'medium' },
  { id: 'twitter-card', regex: /<meta\s+name=["']twitter:card["']/g, description: '트위터 카드', template: '트위터 공유 시 표시 형식(요약, 큰 이미지 등)을 정합니다.', category: 'Meta', importance: 'medium' },
  { id: 'canonical', regex: /<link\s+rel=["']canonical["']/g, description: '표준 URL 지정', template: '중복된 콘텐츠 중 **검색엔진이 인덱싱할 대표 주소**를 알려줍니다.', category: 'Meta', importance: 'high' },
  { id: 'schema-org', regex: /<script\s+type=["']application\/ld\+json["']/g, description: '구조화된 데이터(JSON-LD)', template: '검색엔진이 콘텐츠를 정확히 이해할 수 있도록 **Schema.org 형식으로 정보를 제공**합니다.', category: 'Advanced', importance: 'high', tips: ['리치 스니펫(별점, 가격 등)으로 검색 결과에 노출됩니다.'] },

  // [12] 성능 최적화 (Resource Hints & Preloading)
  { id: 'link-preload', regex: /<link\s+rel=["']preload["']/g, description: '리소스 미리 로드', template: '페이지 로딩 초기에 **중요한 파일을 먼저 다운로드**하도록 지시합니다.', category: 'Advanced', importance: 'high', tips: ['폰트, 중요 CSS/JS에 사용하면 LCP가 개선됩니다.'] },
  { id: 'link-prefetch', regex: /<link\s+rel=["']prefetch["']/g, description: '다음 페이지 미리 가져오기', template: '사용자가 곧 방문할 가능성이 높은 페이지를 **유휴 시간에 미리 다운로드**합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'link-dns-prefetch', regex: /<link\s+rel=["']dns-prefetch["']/g, description: 'DNS 미리 조회', template: '외부 도메인의 DNS를 미리 조회하여 **연결 시간을 단축**합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'link-preconnect', regex: /<link\s+rel=["']preconnect["']/g, description: '서버 미리 연결', template: '외부 서버와의 **연결을 미리 수립**하여 지연 시간을 줄입니다.', category: 'Advanced', importance: 'medium' },
  { id: 'link-modulepreload', regex: /<link\s+rel=["']modulepreload["']/g, description: 'ES 모듈 미리 로드', template: 'JavaScript 모듈을 미리 다운로드하고 파싱하여 **실행 속도를 높입니다**.', category: 'Advanced', importance: 'medium' },
  { id: 'script-async', regex: /<script[^>]*\s+async/g, description: '스크립트 비동기 로딩', template: '스크립트를 **HTML 파싱과 병렬로 다운로드**하여 페이지 로딩을 방해하지 않습니다.', category: 'Advanced', importance: 'high' },
  { id: 'script-defer', regex: /<script[^>]*\s+defer/g, description: '스크립트 지연 실행', template: 'HTML 파싱이 완료된 후에 **순서대로 스크립트를 실행**합니다.', category: 'Advanced', importance: 'high', tips: ['외부 라이브러리는 defer 사용이 권장됩니다.'] },
  { id: 'loading-lazy', regex: /loading=["']lazy["']/g, description: '지연 로딩(Lazy Loading)', template: '이미지나 iframe이 **화면에 보일 때만 로드**하여 초기 속도를 개선합니다.', category: 'Media', importance: 'high' },
  { id: 'decoding-async', regex: /decoding=["']async["']/g, description: '이미지 비동기 디코딩', template: '이미지 디코딩을 비동기로 처리하여 **메인 스레드를 차단하지 않습니다**.', category: 'Media', importance: 'medium' },

  // [13] 보안 (Security)
  { id: 'csp-meta', regex: /<meta\s+http-equiv=["']Content-Security-Policy["']/g, description: '콘텐츠 보안 정책(CSP)', template: 'XSS 공격을 방지하기 위해 **허용된 리소스 출처만 로드**하도록 제한합니다.', category: 'Advanced', importance: 'high', warnings: ['너무 엄격하면 정상 기능이 작동하지 않을 수 있습니다.'] },
  { id: 'integrity', regex: /integrity=["']sha/g, description: '서브리소스 무결성(SRI)', template: 'CDN 파일이 **변조되지 않았는지 해시로 검증**합니다.', category: 'Advanced', importance: 'high', tips: ['외부 라이브러리 사용 시 필수입니다.'] },
  { id: 'crossorigin', regex: /crossorigin=["'](anonymous|use-credentials)["']/g, description: 'CORS 설정', template: '외부 리소스를 가져올 때 **인증 정보 포함 여부**를 결정합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'referrerpolicy', regex: /referrerpolicy=["'][^"']+["']/g, description: 'Referrer 정책', template: '다른 사이트로 이동할 때 **현재 주소를 얼마나 공유할지** 제어합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'sandbox', regex: /sandbox=["'][^"']+["']/g, description: 'iframe 샌드박스', template: 'iframe 내부 콘텐츠의 **권한을 제한**하여 보안을 강화합니다.', category: 'Advanced', importance: 'high', warnings: ['필요한 권한만 최소한으로 허용하세요.'] },
  { id: 'rel-noopener', regex: /rel=["'][^"']*noopener[^"']*["']/g, description: '새 창 보안(noopener)', template: '새 창에서 **원본 페이지에 접근하지 못하도록** 차단합니다.', category: 'Advanced', importance: 'high', tips: ['target="_blank" 사용 시 필수입니다.'] },
  { id: 'rel-noreferrer', regex: /rel=["'][^"']*noreferrer[^"']*["']/g, description: 'Referrer 차단', template: '링크 이동 시 **출처 정보를 전송하지 않습니다**.', category: 'Advanced', importance: 'medium' },

  // [14] 폼 고급 (Advanced Forms)
  { id: 'input-email', regex: /<input[^>]*type=["']email["']/g, description: '이메일 입력창', template: '이메일 형식을 자동으로 검증하고 **모바일에서 @ 키보드**를 제공합니다.', category: 'Form', importance: 'high' },
  { id: 'input-tel', regex: /<input[^>]*type=["']tel["']/g, description: '전화번호 입력창', template: '모바일에서 **숫자 키패드**를 자동으로 표시합니다.', category: 'Form', importance: 'medium' },
  { id: 'input-url', regex: /<input[^>]*type=["']url["']/g, description: 'URL 입력창', template: 'URL 형식을 검증하고 모바일에서 **.com 등 도메인 단축키**를 제공합니다.', category: 'Form', importance: 'medium' },
  { id: 'input-number', regex: /<input[^>]*type=["']number["']/g, description: '숫자 입력창', template: '숫자만 입력 가능하며 **증감 버튼**이 표시됩니다.', category: 'Form', importance: 'medium' },
  { id: 'input-range', regex: /<input[^>]*type=["']range["']/g, description: '범위 슬라이더', template: '최소/최대 사이에서 **슬라이더로 값을 선택**합니다.', category: 'Form', importance: 'medium' },
  { id: 'input-date', regex: /<input[^>]*type=["']date["']/g, description: '날짜 선택기', template: '브라우저 내장 **캘린더로 날짜를 선택**합니다.', category: 'Form', importance: 'medium' },
  { id: 'input-time', regex: /<input[^>]*type=["']time["']/g, description: '시간 선택기', template: '시간을 입력하거나 선택할 수 있는 **시계 UI**를 제공합니다.', category: 'Form', importance: 'low' },
  { id: 'input-color', regex: /<input[^>]*type=["']color["']/g, description: '색상 선택기', template: '브라우저 내장 **컬러 피커**로 색상을 선택합니다.', category: 'Form', importance: 'low' },
  { id: 'input-file', regex: /<input[^>]*type=["']file["']/g, description: '파일 업로드', template: '사용자 기기에서 **파일을 선택하여 업로드**합니다.', category: 'Form', importance: 'high' },
  { id: 'input-hidden', regex: /<input[^>]*type=["']hidden["']/g, description: '숨겨진 데이터', template: '화면에 보이지 않지만 **폼 전송 시 함께 보낼 데이터**를 저장합니다.', category: 'Form', importance: 'medium' },
  { id: 'input-search', regex: /<input[^>]*type=["']search["']/g, description: '검색창', template: '검색 기능에 특화된 입력창으로 **X 버튼**이 자동 표시됩니다.', category: 'Form', importance: 'medium' },
  { id: 'datalist', regex: /<datalist/g, description: '자동완성 목록', template: 'input에 **미리 정의된 추천 옵션 목록**을 제공합니다.', category: 'Form', importance: 'medium' },
  { id: 'required', regex: /\brequired\b/g, description: '필수 입력 표시', template: '폼 제출 전에 **반드시 입력해야 하는 필드**임을 나타냅니다.', category: 'Form', importance: 'high' },
  { id: 'pattern', regex: /pattern=["'][^"']+["']/g, description: '입력 패턴 검증', template: '정규식을 사용하여 **입력값의 형식을 엄격히 검증**합니다.', category: 'Form', importance: 'high', tips: ['전화번호, 우편번호 등 특정 형식 강제에 유용합니다.'] },
  { id: 'minlength-maxlength', regex: /(minlength|maxlength)=["']\d+["']/g, description: '글자 수 제한', template: '입력할 수 있는 **최소/최대 글자 수**를 제한합니다.', category: 'Form', importance: 'medium' },
  { id: 'autocomplete', regex: /autocomplete=["'][^"']+["']/g, description: '자동완성 힌트', template: '브라우저가 이전 입력값을 기반으로 **자동완성을 제안**하도록 돕습니다.', category: 'Form', importance: 'medium', tips: ['name, email, address 등 표준 값을 사용하세요.'] },
  { id: 'placeholder', regex: /placeholder=["'][^"']+["']/g, description: '입력 힌트', template: '입력창이 비어있을 때 표시되는 **안내 문구**입니다.', category: 'Form', importance: 'medium' },
  { id: 'readonly', regex: /\breadonly\b/g, description: '읽기 전용', template: '값을 볼 수는 있지만 **수정할 수 없게** 만듭니다.', category: 'Form', importance: 'low' },
  { id: 'disabled', regex: /\bdisabled\b/g, description: '비활성화', template: '요소를 **사용 불가능 상태로 만들고 폼 전송에서 제외**합니다.', category: 'Form', importance: 'medium' },
  { id: 'form-novalidate', regex: /novalidate/g, description: '폼 검증 비활성화', template: '브라우저 기본 유효성 검사를 **건너뛰고 제출**합니다.', category: 'Form', importance: 'low' },

  // [15] 멀티미디어 고급 (Advanced Media)
  { id: 'picture', regex: /<picture/g, description: '반응형 이미지 컨테이너', template: '화면 크기나 해상도에 따라 **최적의 이미지를 자동 선택**합니다.', category: 'Media', importance: 'high', tips: ['WebP fallback 구현 시 필수입니다.'] },
  { id: 'source', regex: /<source/g, description: '미디어 소스 지정', template: 'video/audio/picture 내부에서 **여러 형식의 파일을 제공**합니다.', category: 'Media', importance: 'medium' },
  { id: 'track', regex: /<track/g, description: '자막 트랙', template: '비디오에 **자막, 캡션, 설명** 등을 추가합니다.', category: 'Media', importance: 'medium' },
  { id: 'autoplay', regex: /\bautoplay\b/g, description: '자동 재생', template: '페이지 로딩 시 **미디어를 자동으로 재생**합니다.', category: 'Media', importance: 'low', warnings: ['사용자 경험을 해칠 수 있으니 신중히 사용하세요.'] },
  { id: 'loop', regex: /\bloop\b/g, description: '반복 재생', template: '미디어가 끝나면 **처음부터 다시 재생**합니다.', category: 'Media', importance: 'low' },
  { id: 'muted', regex: /\bmuted\b/g, description: '음소거', template: '미디어를 **소리 없이 재생**합니다.', category: 'Media', importance: 'low', tips: ['autoplay와 함께 사용 시 브라우저 제한을 우회할 수 있습니다.'] },
  { id: 'controls', regex: /\bcontrols\b/g, description: '재생 컨트롤 표시', template: '재생, 일시정지, 볼륨 등 **기본 컨트롤 UI**를 표시합니다.', category: 'Media', importance: 'high' },
  { id: 'poster', regex: /poster=["'][^"']+["']/g, description: '비디오 썸네일', template: '비디오 재생 전 표시되는 **대표 이미지**입니다.', category: 'Media', importance: 'medium' },
  { id: 'srcset', regex: /srcset=["'][^"']+["']/g, description: '해상도별 이미지', template: '기기 해상도에 맞는 **최적 크기의 이미지**를 제공합니다.', category: 'Media', importance: 'high', tips: ['Retina 디스플레이 대응에 필수입니다.'] },
  { id: 'sizes', regex: /sizes=["'][^"']+["']/g, description: '이미지 크기 힌트', template: '브라우저가 srcset에서 **어떤 이미지를 선택할지 결정**하는 기준을 제공합니다.', category: 'Media', importance: 'medium' },

  // [16] 국제화 & 다국어 (Internationalization)
  { id: 'lang', regex: /\blang=["'][^"']+["']/g, description: '언어 지정', template: '해당 요소의 **콘텐츠 언어**를 명시합니다.', category: 'Meta', importance: 'high', tips: ['검색엔진과 번역기가 올바르게 인식합니다.'] },
  { id: 'dir-rtl', regex: /\bdir=["'](rtl|ltr)["']/g, description: '텍스트 방향', template: '아랍어, 히브리어 등 **오른쪽에서 왼쪽으로 쓰는 언어**를 지원합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'translate', regex: /translate=["'](yes|no)["']/g, description: '번역 제어', template: '자동 번역 도구가 이 영역을 **번역할지 여부**를 제어합니다.', category: 'Advanced', importance: 'low', tips: ['브랜드명, 코드는 translate="no"로 보호하세요.'] },
  { id: 'hreflang', regex: /hreflang=["'][^"']+["']/g, description: '대체 언어 페이지', template: '같은 콘텐츠의 **다른 언어 버전 페이지**를 검색엔진에 알려줍니다.', category: 'Meta', importance: 'medium' },

  // [17] HTML5 API & 속성 (Modern HTML Features)
  { id: 'data-attribute', regex: /data-[a-z0-9-]+=["'][^"']*["']/g, description: '커스텀 데이터 속성', template: 'HTML 요소에 **임의의 데이터를 저장**하여 JavaScript에서 활용합니다.', category: 'Advanced', importance: 'high', tips: ['dataset API로 쉽게 접근 가능합니다.'] },
  { id: 'contenteditable', regex: /contenteditable=["']true["']/g, description: '편집 가능 콘텐츠', template: '일반 HTML 요소를 **텍스트 에디터처럼 수정 가능**하게 만듭니다.', category: 'Interactive', importance: 'medium' },
  { id: 'draggable', regex: /draggable=["']true["']/g, description: '드래그 가능', template: '요소를 **마우스로 드래그하여 이동**할 수 있게 만듭니다.', category: 'Interactive', importance: 'medium' },
  { id: 'spellcheck', regex: /spellcheck=["'](true|false)["']/g, description: '맞춤법 검사', template: '브라우저의 **자동 맞춤법 검사를 활성화/비활성화**합니다.', category: 'Form', importance: 'low' },
  { id: 'download', regex: /\bdownload\b/g, description: '다운로드 링크', template: '링크 클릭 시 이동하지 않고 **파일을 다운로드**합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'rel-alternate', regex: /rel=["'][^"']*alternate[^"']*["']/g, description: '대체 버전', template: 'RSS 피드나 모바일 버전 등 **대체 형식의 페이지**를 명시합니다.', category: 'Meta', importance: 'medium' },
  { id: 'tabindex', regex: /tabindex=["']-?\d+["']/g, description: '탭 순서 제어', template: 'Tab 키로 이동할 때의 **포커스 순서**를 지정합니다.', category: 'Advanced', importance: 'medium', tips: ['음수는 프로그래밍 방식으로만 포커스 가능하게 만듭니다.'] },
  { id: 'accesskey', regex: /accesskey=["'][^"']+["']/g, description: '키보드 단축키', template: '특정 키 조합으로 요소에 **빠르게 접근**할 수 있게 합니다.', category: 'Advanced', importance: 'low' },
  { id: 'hidden', regex: /\bhidden\b/g, description: 'DOM에서 숨김', template: '요소를 **완전히 숨기고 접근성 트리에서도 제거**합니다.', category: 'Advanced', importance: 'medium' },

  // [18] 접근성 고급 ARIA 속성 (Advanced ARIA)
  { id: 'aria-live', regex: /aria-live=["'](polite|assertive|off)["']/g, description: '실시간 영역 알림', template: '콘텐츠가 동적으로 변경될 때 **스크린 리더가 즉시 읽어주도록** 합니다.', category: 'Advanced', importance: 'high', tips: ['채팅, 알림, 에러 메시지에 필수입니다.'] },
  { id: 'aria-describedby', regex: /aria-describedby=["'][^"']+["']/g, description: '상세 설명 연결', template: '요소에 대한 **추가 설명 텍스트**를 연결합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-labelledby', regex: /aria-labelledby=["'][^"']+["']/g, description: '레이블 요소 연결', template: '다른 요소를 이 요소의 **이름으로 사용**합니다.', category: 'Advanced', importance: 'high' },
  { id: 'aria-expanded', regex: /aria-expanded=["'](true|false)["']/g, description: '확장 상태 표시', template: '아코디언이나 드롭다운이 **열려있는지 닫혀있는지** 알려줍니다.', category: 'Advanced', importance: 'high' },
  { id: 'aria-selected', regex: /aria-selected=["'](true|false)["']/g, description: '선택 상태 표시', template: '탭이나 옵션이 **현재 선택되었는지** 나타냅니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-checked', regex: /aria-checked=["'](true|false|mixed)["']/g, description: '체크 상태 표시', template: '커스텀 체크박스의 **체크 여부**를 알려줍니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-disabled', regex: /aria-disabled=["']true["']/g, description: '비활성 상태 표시', template: '요소가 **상호작용 불가능한 상태**임을 나타냅니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-invalid', regex: /aria-invalid=["']true["']/g, description: '유효하지 않은 입력', template: '입력값이 **검증에 실패**했음을 알립니다.', category: 'Advanced', importance: 'high' },
  { id: 'aria-required', regex: /aria-required=["']true["']/g, description: '필수 입력 알림', template: '스크린 리더에게 **반드시 입력해야 하는 필드**임을 알려줍니다.', category: 'Advanced', importance: 'high' },
  { id: 'aria-current', regex: /aria-current=["'](page|step|location|date|time|true)["']/g, description: '현재 항목 표시', template: '네비게이션에서 **현재 페이지나 단계**를 나타냅니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-controls', regex: /aria-controls=["'][^"']+["']/g, description: '제어 대상 명시', template: '이 요소가 **어떤 다른 요소를 제어하는지** 연결합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-haspopup', regex: /aria-haspopup=["'](true|menu|listbox|tree|grid|dialog)["']/g, description: '팝업 보유 여부', template: '이 요소가 **팝업을 트리거**할 수 있음을 알립니다.', category: 'Advanced', importance: 'medium' },
  { id: 'aria-modal', regex: /aria-modal=["']true["']/g, description: '모달 대화상자', template: '이 대화상자가 **모달(배경 차단)**임을 나타냅니다.', category: 'Advanced', importance: 'high' },
  { id: 'role-button', regex: /role=["']button["']/g, description: '버튼 역할', template: 'div나 span을 **버튼처럼 작동**하도록 선언합니다.', category: 'Advanced', importance: 'high', warnings: ['가능하면 실제 <button> 태그를 사용하세요.'] },
  { id: 'role-navigation', regex: /role=["']navigation["']/g, description: '탐색 영역', template: '이 영역이 **사이트 네비게이션**임을 명시합니다.', category: 'Advanced', importance: 'medium' },
  { id: 'role-alert', regex: /role=["']alert["']/g, description: '경고 메시지', template: '중요한 메시지를 **즉시 알림**으로 전달합니다.', category: 'Advanced', importance: 'high' },
  { id: 'role-dialog', regex: /role=["']dialog["']/g, description: '대화 상자', template: '이 영역이 **모달이나 대화창**임을 나타냅니다.', category: 'Advanced', importance: 'high' },

  // [19] 테이블 고급 (Advanced Tables)
  { id: 'html-tfoot', regex: /<tfoot/g, description: '표 꼬리글', template: '표의 하단 **요약 정보나 합계**를 담는 영역입니다.', category: 'Table', importance: 'low' },
  { id: 'html-caption', regex: /<caption/g, description: '표 제목', template: '표 전체를 설명하는 **제목**을 제공합니다.', category: 'Table', importance: 'medium', tips: ['접근성을 위해 모든 테이블에 추가하세요.'] },
  { id: 'html-colgroup', regex: /<colgroup/g, description: '열 그룹', template: '여러 열을 묶어 **공통 스타일을 적용**합니다.', category: 'Table', importance: 'low' },
  { id: 'html-col', regex: /<col/g, description: '열 정의', template: 'colgroup 내부에서 **개별 열의 속성**을 지정합니다.', category: 'Table', importance: 'low' },
  { id: 'colspan', regex: /colspan=["']\d+["']/g, description: '열 병합', template: '테이블 셀을 **가로로 여러 칸 합칩니다**.', category: 'Table', importance: 'medium' },
  { id: 'rowspan', regex: /rowspan=["']\d+["']/g, description: '행 병합', template: '테이블 셀을 **세로로 여러 칸 합칩니다**.', category: 'Table', importance: 'medium' },
  { id: 'scope', regex: /scope=["'](row|col|rowgroup|colgroup)["']/g, description: '제목 셀 범위', template: 'th가 **어떤 범위의 제목**인지 명시합니다.', category: 'Table', importance: 'medium', tips: ['접근성 향상에 중요합니다.'] },

  // [20] 기타 고급 태그 (Miscellaneous Advanced)
  { id: 'html-mark', regex: /<mark/g, description: '하이라이트 표시', template: '검색 결과 등에서 **중요한 부분을 형광펜처럼 강조**합니다.', category: 'Text', importance: 'medium' },
  { id: 'html-time', regex: /<time/g, description: '날짜/시간 정보', template: '기계가 읽을 수 있는 형식으로 **날짜와 시간**을 나타냅니다.', category: 'Text', importance: 'medium', tips: ['datetime 속성과 함께 사용하세요.'] },
  { id: 'html-progress', regex: /<progress/g, description: '진행률 표시', template: '작업의 **완료 정도를 막대**로 시각화합니다.', category: 'Interactive', importance: 'medium' },
  { id: 'html-meter', regex: /<meter/g, description: '측정값 표시', template: '디스크 용량처럼 **범위 내의 측정값**을 표시합니다.', category: 'Interactive', importance: 'low' },
  { id: 'html-abbr', regex: /<abbr/g, description: '약어', template: '약어나 두문자어의 **전체 뜻**을 title로 제공합니다.', category: 'Text', importance: 'low' },
  { id: 'html-cite', regex: /<cite/g, description: '작품 제목', template: '책, 영화, 노래 등 **창작물의 제목**을 나타냅니다.', category: 'Text', importance: 'low' },
  { id: 'html-q', regex: /<q/g, description: '짧은 인용', template: '문장 내에서 **짧은 인용구**를 나타내며 자동으로 따옴표가 붙습니다.', category: 'Text', importance: 'low' },
  { id: 'html-del', regex: /<del/g, description: '삭제된 텍스트', template: '문서에서 **제거된 내용**을 취소선으로 표시합니다.', category: 'Text', importance: 'low' },
  { id: 'html-ins', regex: /<ins/g, description: '추가된 텍스트', template: '문서에 **새로 추가된 내용**을 밑줄로 표시합니다.', category: 'Text', importance: 'low' },
  { id: 'html-kbd', regex: /<kbd/g, description: '키보드 입력', template: '사용자가 눌러야 할 **키보드 키**를 나타냅니다.', category: 'Text', importance: 'low' },
  { id: 'html-samp', regex: /<samp/g, description: '샘플 출력', template: '프로그램의 **출력 결과 예시**를 나타냅니다.', category: 'Text', importance: 'low' },
  { id: 'html-var', regex: /<var/g, description: '변수', template: '수학 공식이나 프로그래밍에서 **변수**를 나타냅니다.', category: 'Text', importance: 'low' },
  { id: 'html-sub', regex: /<sub/g, description: '아래 첨자', template: '화학식(H₂O)이나 수학에서 **아래 첨자**를 만듭니다.', category: 'Text', importance: 'low' },
  { id: 'html-sup', regex: /<sup/g, description: '위 첨자', template: '거듭제곱(x²)이나 각주에서 **위 첨자**를 만듭니다.', category: 'Text', importance: 'low' },
  { id: 'html-small', regex: /<small/g, description: '작은 글씨', template: '부가 설명이나 법적 고지를 **작은 글씨**로 표시합니다.', category: 'Text', importance: 'low' },
  { id: 'html-wbr', regex: /<wbr/g, description: '줄바꿈 기회', template: '긴 단어에서 **줄바꿈이 가능한 위치**를 제안합니다.', category: 'Text', importance: 'low' },
  { id: 'html-ruby', regex: /<ruby/g, description: '루비 주석(동아시아)', template: '한자나 일본어 위에 **발음 표기(후리가나)**를 추가합니다.', category: 'Text', importance: 'low' },
  { id: 'html-rt', regex: /<rt/g, description: '루비 텍스트', template: 'ruby 내부에서 **실제 주석 텍스트**를 담습니다.', category: 'Text', importance: 'low' },
  { id: 'html-rp', regex: /<rp/g, description: '루비 괄호', template: 'ruby를 지원하지 않는 브라우저에서 **괄호를 표시**합니다.', category: 'Text', importance: 'low' },
  { id: 'html-bdi', regex: /<bdi/g, description: '방향 격리', template: '주변 텍스트와 **방향성을 독립적으로 처리**합니다.', category: 'Advanced', importance: 'low' },
  { id: 'html-bdo', regex: /<bdo/g, description: '방향 재정의', template: '텍스트의 **방향을 강제로 변경**합니다.', category: 'Advanced', importance: 'low' },
  { id: 'html-output', regex: /<output/g, description: '계산 결과 출력', template: '폼 내에서 **계산 결과나 동적 값**을 표시합니다.', category: 'Form', importance: 'low' },
  { id: 'html-noscript', regex: /<noscript/g, description: 'JavaScript 비활성 대체', template: 'JavaScript가 꺼져있을 때 표시할 **대체 콘텐츠**입니다.', category: 'Advanced', importance: 'low' },
  { id: 'html-embed', regex: /<embed/g, description: '외부 콘텐츠 삽입', template: 'PDF, 플래시 등 **외부 플러그인 콘텐츠**를 삽입합니다.', category: 'Media', importance: 'low', warnings: ['보안 문제로 현대 웹에서는 사용을 권장하지 않습니다.'] },
  { id: 'html-object', regex: /<object/g, description: '외부 리소스 포함', template: '이미지, 비디오, 플러그인 등 **다양한 외부 리소스**를 포함합니다.', category: 'Media', importance: 'low' },
  { id: 'html-param', regex: /<param/g, description: '객체 매개변수', template: 'object 요소에 전달할 **설정값**을 정의합니다.', category: 'Advanced', importance: 'low' }
];

export const SCENARIO_PATTERNS: ScenarioPattern[] = [
  {
    id: 'scen-semantic-layout',
    requiredKeywords: ['header', 'nav', 'main', 'footer'],
    title: '🏗️ 완벽한 시맨틱 레이아웃',
    description: '검색엔진과 스크린 리더가 코드를 완벽하게 이해할 수 있도록 설계된 웹 표준 구조입니다.',
    category: 'Architecture'
  },
  {
    id: 'scen-accessible-form',
    requiredKeywords: ['label', 'input', 'id'],
    title: '⌨️ 접근성이 고려된 입력 폼',
    description: '누구나 불편함 없이 정보를 입력할 수 있도록 이름표와 입력창이 잘 연결된 친절한 설계입니다.',
    category: 'Accessibility'
  },
  {
    id: 'scen-seo-metadata',
    requiredKeywords: ['title', 'meta', 'link'],
    title: '🚀 검색 최적화(SEO) 기반 설정',
    description: '구글이나 네이버에서 사이트가 더 잘 검색되고 매력적으로 보이도록 메타 정보가 충실히 갖춰져 있습니다.',
    category: 'Marketing'
  },
  {
    id: 'scen-interactive-ui',
    requiredKeywords: ['details|summary', 'dialog|button'],
    title: '🖱️ 사용자 상호작용 UI',
    description: '모달이나 아코디언 메뉴 등 사용자의 동작에 반응하는 역동적인 UI 구조를 포함하고 있습니다.',
    category: 'Interaction'
  },
  {
    id: 'scen-accessible-rich-ui',
    requiredKeywords: ['role', 'aria-'],
    title: '♿ 고도화된 접근성(ARIA) 패턴',
    description: '장애가 있는 사용자를 배려하여 스크린 리더가 UI의 상태와 역할을 정확히 알 수 있게 설계된 섬세한 코드입니다.',
    category: 'Accessibility'
  },
  {
    id: 'scen-sns-optimized',
    requiredKeywords: ['og:', 'twitter:'],
    title: '📱 SNS 공유 최적화 (OG/Twitter Card)',
    description: '페이스북, 카카오톡, 트위터 등 소셜 미디어에 공유될 때 풍부한 미리보기 카드를 제공하는 마케팅 친화적 설계입니다.',
    category: 'Marketing'
  },
  {
    id: 'scen-performance-optimized',
    requiredKeywords: ['preload', 'prefetch', 'async', 'defer'],
    title: '⚡ 성능 최적화 (Resource Hints)',
    description: '리소스 미리 로드, DNS 사전 조회 등 브라우저 힌트를 활용하여 페이지 로딩 속도를 극대화한 구조입니다.',
    category: 'Performance'
  },
  {
    id: 'scen-responsive-media',
    requiredKeywords: ['picture', 'srcset', 'sizes'],
    title: '📐 반응형 이미지 시스템',
    description: '기기 해상도와 화면 크기에 맞는 최적의 이미지를 자동으로 제공하여 성능과 품질을 모두 잡은 설계입니다.',
    category: 'Performance'
  },
  {
    id: 'scen-secure-architecture',
    requiredKeywords: ['integrity', 'crossorigin', 'noopener', 'sandbox'],
    title: '🔒 보안 강화 아키텍처',
    description: 'XSS, CSRF 등 웹 공격을 방어하기 위한 CSP, SRI, sandbox 등 다층 보안 장치가 적용된 견고한 구조입니다.',
    category: 'Security'
  }
];
