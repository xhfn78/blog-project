import { CodePattern } from '../types';

export const YAML_PATTERNS: CodePattern[] = [
  // [1] 기본 구조 (Data Structure)
  { 
    id: 'yaml-key-value', 
    regex: /^\s*[a-zA-Z0-9_-]+\s*:/gm, 
    description: '설정 항목(Key)', 
    template: '**Key**: 설정값의 이름을 나타내는 이름표입니다.', 
    category: 'Data', 
    importance: 'high' 
  },
  { 
    id: 'yaml-list', 
    regex: /^\s*-\s+.+$/gm, 
    description: '목록(List)', 
    template: '**List Item**: 여러 개의 값을 순서대로 나열한 항목입니다.', 
    analogy: '체크리스트의 **"개별 항목들"**과 같습니다.',
    category: 'Data', 
    importance: 'high' 
  },

  // [2] CI/CD 설정 (DevOps & Actions)
  { 
    id: 'yaml-gh-on', 
    regex: /^on\s*:/gm, 
    description: '실행 트리거 설정', 
    template: '**On/Trigger**: 이 워크플로우(자동화)가 **언제 실행될지** 조건을 정합니다.', 
    analogy: '벨이 울리면(push) 문을 연다(deploy)는 식의 **"방아쇠"**와 같습니다.',
    category: 'Logic', 
    importance: 'high' 
  },
  { id: 'yaml-gh-jobs', regex: /^jobs\s*:/gm, description: '작업 정의', template: '**Jobs**: 수행해야 할 구체적인 작업 단위들을 정의합니다.', category: 'Logic', importance: 'high' },
  { id: 'yaml-gh-steps', regex: /^\s*steps\s*:/gm, description: '상세 단계', template: '**Steps**: 하나의 작업 안에서 순서대로 실행할 상세 명령들입니다.', category: 'Logic', importance: 'medium' },
  { id: 'yaml-gh-uses', regex: /^\s*uses\s*:/gm, description: '외부 액션 사용', template: '**Uses**: 이미 만들어진 다른 사람의 **자동화 도구(Action)**를 가져와 사용합니다.', category: 'Advanced', importance: 'high' },
  { id: 'yaml-env', regex: /env\s*:|environment\s*:/gi, description: '환경 변수 설정', template: '**Environment**: 시스템 내부에서 사용할 중요한 비밀번호나 설정값을 관리합니다.', category: 'Data', importance: 'high' },

  // [3] 인프라 및 도커 설정 (Infrastructure & Docker)
  { id: 'yaml-docker-services', regex: /^services\s*:/gm, description: '서비스 컨테이너 정의', template: '**Services**: 도커 시스템에서 실행할 가상 서버(컨테이너) 목록입니다.', category: 'Structure', importance: 'high' },
  { id: 'yaml-docker-image', regex: /image\s*:\s*.+$/gm, description: '이미지 이름', template: '**Docker Image**: 가상 서버를 만들 때 사용할 **원본 설계도**의 이름입니다.', category: 'Structure', importance: 'medium' },
  { id: 'yaml-docker-ports', regex: /ports\s*:|volumes\s*:/gi, description: '네트워크/저장소 연결', template: '**Networking/Storage**: 외부와 통신할 통로(포트)나 데이터를 저장할 공간(볼륨)을 연결합니다.', category: 'Advanced', importance: 'high' },

  // [4] 쿠버네티스 및 클라우드 (Cloud Native)
  { id: 'yaml-k8s-kind', regex: /kind\s*:\s*.+$/gm, description: '리소스 종류(K8s)', template: '**Kind**: 쿠버네티스 시스템에서 생성할 리소스의 타입(Pod, Deployment 등)을 지정합니다.', category: 'Structure', importance: 'high' },
  { id: 'yaml-api-version', regex: /apiVersion\s*:\s*.+$/gm, description: 'API 버전 정보', template: '**API Version**: 설정을 해석할 시스템의 버전을 지정합니다.', category: 'Meta', importance: 'medium' }
];
