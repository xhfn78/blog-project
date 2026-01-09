/**
 * 관상학 규칙 데이터베이스
 * 얼굴 특징별 해석 규칙
 */

import type { FaceShape } from "@/entities/fun";

// 얼굴형별 해석
export const FACE_SHAPE_READINGS: Record<FaceShape, {
  name: string;
  description: string;
  personality: string[];
  fortune: string;
  compatibility: string;
}> = {
  round: {
    name: "복스러운 둥근 얼굴",
    description: "부드럽고 온화한 인상으로 사람들에게 친근감을 줍니다",
    personality: ["원만한 성격", "사교적", "낙천적", "포용력"],
    fortune: "재물운과 인복이 좋으며, 중년 이후 더욱 풍요로워집니다",
    compatibility: "모든 사람과 잘 어울립니다",
  },
  oval: {
    name: "이상적인 계란형 얼굴",
    description: "균형 잡힌 아름다운 얼굴형으로 세련된 이미지",
    personality: ["균형 잡힌 성격", "우아함", "지적", "세련됨"],
    fortune: "전반적으로 안정적이고 순조로운 운세입니다",
    compatibility: "다양한 분야에서 성공할 수 있습니다",
  },
  square: {
    name: "강인한 사각형 얼굴",
    description: "카리스마 있고 신뢰감을 주는 얼굴형",
    personality: ["리더십", "정직함", "의지가 강함", "책임감"],
    fortune: "사업운이 강하고 리더 자리에 오를 운명입니다",
    compatibility: "경영, 관리직에 적합합니다",
  },
  heart: {
    name: "매력적인 하트형 얼굴",
    description: "사랑스럽고 매력적인 인상을 줍니다",
    personality: ["창의적", "감성적", "매력적", "낭만적"],
    fortune: "예술적 재능과 대인운이 뛰어납니다",
    compatibility: "예술, 엔터테인먼트 분야에 적합합니다",
  },
  long: {
    name: "지적인 긴 얼굴",
    description: "고귀하고 지적인 느낌을 주는 얼굴형",
    personality: ["분석적", "이성적", "신중함", "완벽주의"],
    fortune: "학문과 전문 분야에서 큰 성취를 이룹니다",
    compatibility: "연구, 전문직에 적합합니다",
  },
};

// 이마 해석
export const FOREHEAD_READINGS = {
  wide: {
    description: "넓은 이마는 지혜와 통찰력의 상징",
    traits: ["사회성 뛰어남", "리더십", "계획적", "전략적 사고"],
    fortune: "사회적 성공과 명예를 얻을 관상입니다",
    score: 85,
  },
  medium: {
    description: "균형잡힌 이마는 안정된 사고의 증거",
    traits: ["균형 잡힌 판단", "실용적", "신뢰감"],
    fortune: "착실하게 성장하는 운세입니다",
    score: 70,
  },
  narrow: {
    description: "좁은 이마는 집중력의 표시",
    traits: ["집중력 강함", "전문가 타입", "실행력"],
    fortune: "한 분야의 전문가로 성장합니다",
    score: 65,
  },
};

// 눈썹 해석 (바이럴 포인트!)
export const EYEBROW_READINGS = {
  thick: {
    description: "두꺼운 눈썹은 재물운의 상징! 💰",
    traits: ["재물운 강함", "의지력", "추진력", "성실함"],
    fortune: "돈이 들어오는 관상! 특히 부동산 운이 좋습니다",
    viralMessage: "눈썹이 돈을 부르는 관상이네요! 💰",
    score: 90,
  },
  thin: {
    description: "가는 눈썹은 섬세한 감각의 표시",
    traits: ["섬세함", "예민한 감각", "예술적", "분석적"],
    fortune: "예술이나 디자인 분야에서 재능을 발휘합니다",
    viralMessage: "섬세한 감각의 소유자! 예술적 재능이 돋보입니다",
    score: 75,
  },
  arched: {
    description: "휘어진 눈썹은 사교성의 상징",
    traits: ["사교적", "매력적", "친화력", "협상력"],
    fortune: "대인관계에서 큰 도움을 받습니다",
    viralMessage: "매력으로 사람을 끄는 관상!",
    score: 80,
  },
  straight: {
    description: "일자 눈썹은 이성적 사고의 증거",
    traits: ["논리적", "이성적", "분석적", "공정함"],
    fortune: "판단력이 뛰어나 중요한 결정을 잘 내립니다",
    viralMessage: "냉철한 판단력의 소유자!",
    score: 78,
  },
};

// 눈 해석
export const EYE_READINGS = {
  large: {
    description: "큰 눈은 감수성과 호기심의 상징",
    traits: ["감수성 풍부", "호기심 많음", "표현력", "열정적"],
    fortune: "새로운 기회를 잘 포착합니다",
    score: 80,
  },
  medium: {
    description: "적당한 크기의 눈은 균형의 표시",
    traits: ["균형 잡힌 성격", "신중함", "안정감"],
    fortune: "안정적으로 성장합니다",
    score: 75,
  },
  small: {
    description: "작은 눈은 집중력과 통찰력의 증거",
    traits: ["집중력 뛰어남", "분석적", "신중함", "통찰력"],
    fortune: "깊이 있는 분석으로 성공합니다",
    score: 82,
  },
};

// 코 해석 (재물운)
export const NOSE_READINGS = {
  high: {
    description: "높은 코는 재물운과 건강운의 상징",
    traits: ["자존감", "리더십", "재물운", "건강운"],
    fortune: "재물이 모이고 건강한 삶을 살아갑니다",
    viralMessage: "재물운 상승! 코가 돈을 모으는 관상 💰",
    score: 88,
  },
  medium: {
    description: "적당한 코는 균형잡힌 운세",
    traits: ["균형", "안정", "조화"],
    fortune: "안정적인 재물 축적이 가능합니다",
    score: 75,
  },
  low: {
    description: "낮은 코는 겸손함의 표시",
    traits: ["겸손", "친근함", "배려심"],
    fortune: "인복으로 재물을 모읍니다",
    score: 70,
  },
  wide: {
    description: "넓은 코는 포용력의 상징",
    traits: ["포용력", "너그러움", "인복"],
    fortune: "많은 사람의 도움을 받습니다",
    score: 83,
  },
};

// 입 해석
export const MOUTH_READINGS = {
  large: {
    description: "큰 입은 언변과 사교성의 표시",
    traits: ["언변 뛰어남", "사교적", "적극적", "활동적"],
    fortune: "말로 성공하는 운명입니다",
    score: 85,
  },
  medium: {
    description: "적당한 입은 균형의 상징",
    traits: ["균형 잡힌 성격", "신중함"],
    fortune: "안정적인 대인관계를 유지합니다",
    score: 75,
  },
  small: {
    description: "작은 입은 신중함의 증거",
    traits: ["신중함", "진중함", "사려깊음"],
    fortune: "말을 아껴 신뢰를 얻습니다",
    score: 78,
  },
  upturned: {
    description: "올라간 입꼬리는 긍정의 상징",
    traits: ["긍정적", "낙천적", "행복한 성격"],
    fortune: "행복을 끌어당기는 관상입니다",
    viralMessage: "웃는 얼굴에 복이 온다! 긍정 에너지 만점 😊",
    score: 90,
  },
};

// 종합 점수 계산 가중치
export const FEATURE_WEIGHTS = {
  faceShape: 0.15,      // 15%
  forehead: 0.15,       // 15%
  eyebrow: 0.25,        // 25% (가장 중요!)
  eyes: 0.15,           // 15%
  nose: 0.20,           // 20%
  mouth: 0.10,          // 10%
};
