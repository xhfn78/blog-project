import { ToolConfig } from "@/entities/content/model/types";
import { MapPin } from "lucide-react";

export const config: ToolConfig = {
  slug: "korean-address-mock-generator",
  name: "한국형 주소 Mock 데이터 생성기 - 지번/도로명 및 좌표 세트",
  description: "국내 웹 서비스 개발 및 정밀한 테스트 환경 구축에 최적화된 한국형 주소 데이터 생성 도구입니다. 실제 우편번호 체계와 도로명/지번 주소 규칙을 완벽하게 준수하는 데이터를 생성하며, 지도 API 연동을 위한 위도와 경도 좌표 정보를 실시간으로 제공합니다. JSON, CSV, TypeScript 등 개발자가 필요로 하는 모든 데이터 포맷을 지원하여 초기 데이터 시드 및 Mock API 서버 구축 효율을 극대화합니다.",
  category: "generator",
  icon: MapPin,
  tags: [
    "한국 주소",
    "Mock Data",
    "테스트 데이터",
    "도로명 주소",
    "위경도 좌표",
    "데이터 생성기"
  ],
  author: "VibeVisual AI",
  createdAt: "2025-12-25",
};
