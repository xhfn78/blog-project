import { CSSProperty, TailwindResult, ConversionResult } from "../model/types";

// 주요 CSS 속성과 Tailwind 클래스 매핑 테이블
const propertyMap: Record<string, Record<string, string>> = {
  display: {
    block: "block",
    flex: "flex",
    grid: "grid",
    inline: "inline",
    "inline-block": "inline-block",
    "inline-flex": "inline-flex",
    "inline-grid": "inline-grid",
    contents: "contents",
    hidden: "hidden",
    none: "hidden",
  },
  position: {
    static: "static",
    fixed: "fixed",
    absolute: "absolute",
    relative: "relative",
    sticky: "sticky",
  },
  "flex-direction": {
    row: "flex-row",
    "row-reverse": "flex-row-reverse",
    column: "flex-col",
    "column-reverse": "flex-col-reverse",
  },
  "flex-wrap": {
    nowrap: "flex-nowrap",
    wrap: "flex-wrap",
    "wrap-reverse": "flex-wrap-reverse",
  },
  "justify-content": {
    "flex-start": "justify-start",
    "flex-end": "justify-end",
    center: "justify-center",
    "space-between": "justify-between",
    "space-around": "justify-around",
    "space-evenly": "justify-evenly",
  },
  "align-items": {
    "flex-start": "items-start",
    "flex-end": "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  },
  "text-align": {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  },
  "font-weight": {
    "100": "font-thin",
    "200": "font-extralight",
    "300": "font-light",
    "400": "font-normal",
    "500": "font-medium",
    "600": "font-semibold",
    "700": "font-bold",
    "800": "font-extrabold",
    "900": "font-black",
    normal: "font-normal",
    bold: "font-bold",
  },
  overflow: {
    auto: "overflow-auto",
    hidden: "overflow-hidden",
    clip: "overflow-clip",
    visible: "overflow-visible",
    scroll: "overflow-scroll",
  },
};

// 수치 기반 속성 처리 (padding, margin, width, height 등)
function mapNumericProperty(prop: string, value: string): string | null {
  const prefixMap: Record<string, string> = {
    padding: "p",
    "padding-top": "pt",
    "padding-right": "pr",
    "padding-bottom": "pb",
    "padding-left": "pl",
    "padding-inline": "px",
    "padding-block": "py",
    margin: "m",
    "margin-top": "mt",
    "margin-right": "mr",
    "margin-bottom": "mb",
    "margin-left": "ml",
    "margin-inline": "mx",
    "margin-block": "my",
    width: "w",
    height: "h",
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    gap: "gap",
    "row-gap": "gap-y",
    "column-gap": "gap-x",
  };

  const prefix = prefixMap[prop];
  if (!prefix) return null;

  // px 단위 처리
  if (value.endsWith("px")) {
    const num = parseInt(value);
    // Tailwind의 기본 4px 단위 매핑 (예: 16px -> 4)
    if (num % 4 === 0) {
      return `${prefix}-${num / 4}`;
    }
    return `${prefix}-[${value}]`;
  }

  // rem 단위 처리
  if (value.endsWith("rem")) {
    const num = parseFloat(value);
    if (num === 0) return `${prefix}-0`;
    // 0.25rem 단위 매핑 (예: 1rem -> 4)
    const twValue = num * 4;
    if (Number.isInteger(twValue)) {
      return `${prefix}-${twValue}`;
    }
    return `${prefix}-[${value}]`;
  }

  // percentage 등 기타 단위
  if (value === "auto") return `${prefix}-auto`;
  if (value === "100%") return `${prefix}-full`;
  if (value === "100vh") return `${prefix}-screen`;
  if (value === "100vw") return `${prefix}-screen`;

  return `${prefix}-[${value.replace(/\s+/g, "_")}]`;
}

export function parseCSS(css: string): CSSProperty[] {
  const properties: CSSProperty[] = [];
  // 단순화를 위해 { } 내부만 추출하거나 전체를 속성:값 쌍으로 파싱
  const cleanCSS = css.replace(/\{[^\}]*\}/g, "").trim();
  const lines = css.includes(";") ? css.split(";") : css.split("\n");

  lines.forEach((line) => {
    const [prop, val] = line.split(":").map((s) => s.trim());
    if (prop && val) {
      // 주석 및 불필요한 문자 제거
      const cleanProp = prop.replace(/\/\*[\s\S]*?\*\/|([^a-zA-Z-])/g, "");
      const cleanVal = val.replace(/\/\*[\s\S]*?\*\/|[\}]/g, "").trim();
      if (cleanProp && cleanVal) {
        properties.push({ property: cleanProp, value: cleanVal });
      }
    }
  });

  return properties;
}

export function convertToTailwind(css: string): ConversionResult {
  // 세미콜론 또는 줄바꿈으로 분리하여 각 속성 라인을 추출
  const rawLines = css.split(/[;\n]/);
  const details: TailwindResult[] = [];
  let currentPrefix = "";

  rawLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // 미디어 쿼리 인식
    if (trimmed.startsWith("@media")) {
      if (trimmed.includes("min-width: 768px")) currentPrefix = "md:";
      else if (trimmed.includes("min-width: 1024px")) currentPrefix = "lg:";
      return;
    }
    
    if (trimmed === "}") {
      currentPrefix = "";
      return;
    }

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) return;

    const prop = trimmed.slice(0, colonIndex).trim().replace(/\/\*[\s\S]*?\*\//g, "");
    const val = trimmed.slice(colonIndex + 1).trim().replace(/\/\*[\s\S]*?\*\/|[;}]/g, "").trim();

    if (prop && val) {
      let className: string | null = null;

      // 1. 단순 매핑 테이블 확인
      if (propertyMap[prop] && propertyMap[prop][val]) {
        className = propertyMap[prop][val];
      }

      // 2. 수치 기반 속성 확인
      if (!className) {
        className = mapNumericProperty(prop, val);
      }

      // 3. 색상 등 기타 속성
      if (!className) {
        const colorProps = ["color", "background-color", "border-color"];
        const prefixes: Record<string, string> = {
          color: "text",
          "background-color": "bg",
          "border-color": "border",
        };
        if (colorProps.includes(prop)) {
          className = `${prefixes[prop]}-[${val.replace(/\s+/g, "")}]`;
        }
      }

      if (className) {
        const finalClassName = currentPrefix + className;
        details.push({
          className: finalClassName,
          originalProperty: prop,
          originalValue: val,
        });
      }
    }
  });

  return {
    fullClassName: details.map((d) => d.className).join(" "),
    details,
  };
}
