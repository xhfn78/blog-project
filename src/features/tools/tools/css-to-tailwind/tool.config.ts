import { ToolConfig } from "@/shared/config/tools-registry.types";
import { Zap } from "lucide-react";

export const config: ToolConfig = {
  slug: "css-to-tailwind",
  name: "CSS to Tailwind 변환기 - 기존 스타일시트를 유틸리티 클래스로 즉시 전환",
  description:
    "기존 프로젝트의 CSS 스타일 코드를 Tailwind CSS의 유틸리티 클래스로 자동 변환해주는 스마트 개발 도구입니다. " +
    "복잡한 CSS 선언문(예: display: flex; justify-content: center;)을 입력하면 'flex justify-center'와 같은 최적화된 Tailwind 클래스 조합을 즉시 추출합니다. " +
    "기존 레거시 프로젝트를 Tailwind 환경으로 마이그레이션하려는 프론트엔드 개발자와 React, Next.js 프로젝트의 스타일 생산성을 높이고 싶은 엔지니어에게 최적화되어 있습니다. " +
    "단순한 1:1 매핑을 넘어 색상값, 간격(Padding/Margin), 폰트 크기 등을 Tailwind의 기본 디자인 시스템 수치로 근사치 변환하여 코드의 일관성을 유지합니다. " +
    "복사-붙여넣기 한 번으로 복잡한 스타일시트를 80-90% 이상 자동 변환함으로써 작업 시간을 획기적으로 단축시키며, " +
    "완전히 브라우저 내에서 동작하여 보안상 민감한 소스 코드가 외부 서버로 전송되지 않는 안전한 환경을 제공합니다.",
  category: "converter",
  tags: [
    "tailwind-css",
    "css-converter",
    "utility-classes",
    "frontend-migration",
    "react-styling",
    "nextjs-tools",
    "developer-productivity",
  ],
  author: "VibeVisual AI",
};
