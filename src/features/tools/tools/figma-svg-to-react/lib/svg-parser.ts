import { SvgTransformOptions, SvgTransformResult } from "../model/types";

/**
 * SVG 속성을 React의 camelCase 속성으로 변환하는 맵
 */
const attrMap: Record<string, string> = {
  'class': 'className',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'clip-path': 'clipPath',
  'fill-opacity': 'fillOpacity',
  'stroke-opacity': 'strokeOpacity',
  'stop-color': 'stopColor',
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink',
};

/**
 * SVG 문자열을 React 컴포넌트 코드로 변환
 */
export function transformSvgToReact(svg: string, options: SvgTransformOptions): SvgTransformResult {
  try {
    if (!svg.trim()) {
      return { code: '', originalSize: 0, optimizedSize: 0 };
    }

    const originalSize = new Blob([svg]).size;
    
    // 1. 불필요한 메타데이터 및 주석 제거
    let processed = svg
      .replace(/<\?xml.*\?>/gi, '')
      .replace(/<!DOCTYPE.*?>/gi, '')
      .replace(/<!--.*?-->/gs, '')
      .trim();

    // 2. 속성 camelCase 변환
    Object.entries(attrMap).forEach(([key, value]) => {
      const regex = new RegExp(`\s${key}=\s`, 'g');
      processed = processed.replace(regex, ` ${value}=`);
    });

    // 3. style 속성 처리 (간단한 구현)
    processed = processed.replace(/style="([^"]*)"/g, (match, p1) => {
      const styleObj = p1.split(';').reduce((acc: string, curr: string) => {
        const [k, v] = curr.split(':');
        if (k && v) {
          const camelK = k.trim().replace(/-./g, (x) => x[1].toUpperCase());
          return acc + `${camelK}: '${v.trim()}', `; 
        }
        return acc;
      }, '');
      return `style={{ ${styleObj} }}`;
    });

    // 4. currentColor 적용
    if (options.useCurrentColor) {
      processed = processed.replace(/fill="((?!none|url).*?)"/g, 'fill="currentColor"');
      processed = processed.replace(/stroke="((?!none|url).*?)"/g, 'stroke="currentColor"');
    }

    // 5. 컴포넌트 구조 생성
    const componentName = options.componentName || 'SvgIcon';
    const propsType = options.useTypescript ? ': React.SVGProps<SVGSVGElement>' : '';
    const interfaceDef = options.useTypescript && options.addPropsInterface 
      ? `interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {}

`
      : '';

    const finalCode = `import React from 'react';

${interfaceDef}const ${componentName} = (props${propsType}) => (
  ${processed.replace('<svg', '<svg {...props}')}
);

export default ${componentName};`;

    const optimizedSize = new Blob([finalCode]).size;

    return {
      code: finalCode,
      originalSize,
      optimizedSize,
    };
  } catch (error) {
    return {
      code: '',
      originalSize: 0,
      optimizedSize: 0,
      error: error instanceof Error ? error.message : '변환 중 알 수 없는 오류가 발생했습니다.',
    };
  }
}
