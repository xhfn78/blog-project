// src/features/tools/tools/code-lens/lib/dictionaries/yaml.ts
import { CodePattern } from '../types';

export const YAML_PATTERNS: CodePattern[] = [
  {
    id: 'yaml-github-on',
    regex: /^on:\s*(.+)$/m,
    description: '자동화 발동',
    template: '**{0}** 이벤트가 생기면 자동으로 **미리 준비된 비서(GitHub Actions)**가 일을 시작합니다.',
    category: 'Logic',
    importance: 'high',
  },
  {
    id: 'yaml-docker-img',
    regex: /image:\s*([^ \n]+)/,
    description: '서버 설치 팩',
    template: '**{0}**이라는 이미 준비된 설치 팩(Docker)을 사용하여 서버를 구축합니다.',
    category: 'Data',
    importance: 'high',
  },
  {
    id: 'yaml-ports-conn',
    regex: /ports:\s*\[?([^\]\n]+)\]?/, 
    description: '통신 통로',
    template: '컴퓨터의 **{0}번 통로를 열어서** 외부와 대화할 수 있게 합니다.',
    category: 'Logic',
    importance: 'medium',
  }
];