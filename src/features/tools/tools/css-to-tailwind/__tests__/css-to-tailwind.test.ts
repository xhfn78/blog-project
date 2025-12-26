import { describe, it, expect } from "vitest";
import { convertToTailwind } from "../lib/tailwind-mapper";

describe("CSS to Tailwind 변환 로직 테스트", () => {
  it("기본 레이아웃 속성을 올바르게 변환해야 한다", () => {
    const css = "display: flex; justify-content: center; align-items: center;";
    const result = convertToTailwind(css);
    
    expect(result.fullClassName).toContain("flex");
    expect(result.fullClassName).toContain("justify-center");
    expect(result.fullClassName).toContain("items-center");
  });

  it("px 수치 값을 Tailwind의 표준 수치 또는 Arbitrary values로 변환해야 한다", () => {
    // 16px -> 4
    const css1 = "padding: 16px;";
    expect(convertToTailwind(css1).fullClassName).toContain("p-4");

    // 17px -> [17px]
    const css2 = "margin-top: 17px;";
    expect(convertToTailwind(css2).fullClassName).toContain("mt-[17px]");
  });

  it("색상 값을 Arbitrary values로 변환해야 한다", () => {
    const css = "color: #3b82f6; background-color: rgb(255, 255, 255);";
    const result = convertToTailwind(css);
    
    expect(result.fullClassName).toContain("text-[#3b82f6]");
    expect(result.fullClassName).toContain("bg-[rgb(255,255,255)]");
  });

  it("미디어 쿼리 블록을 인식하여 접두사를 붙여야 한다", () => {
    const css = `
      padding: 10px;
      @media (min-width: 768px) {
        padding: 20px;
      }
    `;
    const result = convertToTailwind(css);
    
    expect(result.fullClassName).toContain("p-[10px]");
    expect(result.fullClassName).toContain("md:p-5");
  });

  it("비정상적인 입력이나 빈 입력에 대해 안전하게 처리해야 한다", () => {
    expect(convertToTailwind("").fullClassName).toBe("");
    expect(convertToTailwind("invalid css code").fullClassName).toBe("");
  });
});
