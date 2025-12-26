import { describe, it, expect } from 'vitest';
import { transformSvgToReact } from '../lib/svg-parser';
import { SvgTransformOptions } from '../model/types';

describe('Figma SVG to React 변환 로직 테스트', () => {
  const mockOptions: SvgTransformOptions = {
    useTypescript: true,
    useCurrentColor: true,
    componentName: 'TestIcon',
    addPropsInterface: true,
  };

  const simpleSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
    <circle cx="12" cy="12" r="10" />
  </svg>`;

  it('기본 SVG를 React 컴포넌트로 올바르게 변환해야 한다', () => {
    const result = transformSvgToReact(simpleSvg, mockOptions);
    
    expect(result.code).toContain('const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (');
    expect(result.code).toContain('strokeWidth="2"'); // camelCase 변환 확인
    expect(result.code).toContain('fill="none"');
    expect(result.code).toContain('export default TestIcon;');
  });

  it('useCurrentColor 옵션이 활성화되면 fill과 stroke를 currentColor로 바꿔야 한다', () => {
    const result = transformSvgToReact(simpleSvg, mockOptions);
    
    expect(result.code).toContain('stroke="currentColor"');
    expect(result.code).not.toContain('stroke="#000"');
  });

  it('TypeScript 비활성화 시 일반 JSX 코드를 생성해야 한다', () => {
    const jsOptions: SvgTransformOptions = {
      ...mockOptions,
      useTypescript: false,
      addPropsInterface: false,
    };
    const result = transformSvgToReact(simpleSvg, jsOptions);
    
    expect(result.code).toContain('const TestIcon = (props) => (');
    expect(result.code).not.toContain('React.SVGProps');
  });

  it('빈 문자열 입력 시 빈 결과물을 반환해야 한다', () => {
    const result = transformSvgToReact('', mockOptions);
    expect(result.code).toBe('');
    expect(result.originalSize).toBe(0);
  });

  it('복잡한 스타일 속성을 React style 객체로 변환해야 한다', () => {
    const styledSvg = `<svg><rect style="fill: red; stroke-width: 2;" /></svg>`;
    const result = transformSvgToReact(styledSvg, mockOptions);
    
    expect(result.code).toContain('style={{ fill: \'red\', strokeWidth: \'2\',  }}');
  });
});
