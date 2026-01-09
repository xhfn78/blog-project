/**
 * 2026년 띠별 운세 데이터
 * 병오년(丙午年) - 붉은 말의 해
 */

import type { ZodiacSign } from "@/entities/fun";

export interface ZodiacInfo {
  sign: ZodiacSign;
  name: string;
  emoji: string;
  years: number[];           // 해당 띠의 출생년도들
  fortuneTitle: string;      // 운세 제목
  description: string;       // 전체 운세 설명
  strengths: string[];       // 강점
  challenges: string[];      // 도전과제
  luckyMonths: number[];     // 행운의 달
  warningMonths: number[];   // 조심해야 할 달
  compatibility: ZodiacSign[]; // 궁합이 좋은 띠
}

// 2026년 띠별 운세
export const ZODIAC_2026: Record<ZodiacSign, ZodiacInfo> = {
  rat: {
    sign: "rat",
    name: "쥐띠",
    emoji: "🐀",
    years: [1960, 1972, 1984, 1996, 2008, 2020],
    fortuneTitle: "재물운 상승의 해",
    description: "2026년 쥐띠는 새로운 기회가 많이 찾아오는 해입니다. 특히 재물운이 상승하며, 부동산이나 투자에서 좋은 성과를 거둘 수 있습니다.",
    strengths: ["재물운 상승", "새로운 기회", "인맥 확장"],
    challenges: ["과욕 주의", "건강 관리 필요"],
    luckyMonths: [3, 6, 9],
    warningMonths: [1, 7],
    compatibility: ["dragon", "monkey", "ox"],
  },

  ox: {
    sign: "ox",
    name: "소띠",
    emoji: "🐂",
    years: [1961, 1973, 1985, 1997, 2009, 2021],
    fortuneTitle: "꾸준한 성장의 해",
    description: "소띠의 성실함이 빛을 발하는 해입니다. 한 걸음씩 나아가면 큰 성과를 이룰 수 있습니다. 인내심을 가지고 꾸준히 노력하세요.",
    strengths: ["성실함 인정", "안정적 수입", "신뢰 구축"],
    challenges: ["변화 두려움", "고집 부리지 않기"],
    luckyMonths: [2, 5, 10],
    warningMonths: [4, 8],
    compatibility: ["rat", "snake", "rooster"],
  },

  tiger: {
    sign: "tiger",
    name: "호랑이띠",
    emoji: "🐯",
    years: [1962, 1974, 1986, 1998, 2010, 2022],
    fortuneTitle: "도약의 해",
    description: "호랑이띠에게 2026년은 큰 도약의 기회가 찾아오는 해입니다. 리더십을 발휘하여 새로운 프로젝트를 시작하기 좋은 시기입니다.",
    strengths: ["리더십 발휘", "새 출발", "승진 운"],
    challenges: ["성급함 주의", "주변 배려"],
    luckyMonths: [3, 7, 11],
    warningMonths: [2, 9],
    compatibility: ["horse", "dog", "pig"],
  },

  rabbit: {
    sign: "rabbit",
    name: "토끼띠",
    emoji: "🐰",
    years: [1963, 1975, 1987, 1999, 2011, 2023],
    fortuneTitle: "안정적인 운세",
    description: "토끼띠는 2026년 평온하고 안정적인 운세를 맞이합니다. 대인관계가 원활하고 주변의 도움을 많이 받을 수 있습니다.",
    strengths: ["대인운 상승", "평화로운 생활", "예술적 성취"],
    challenges: ["우유부단함", "결단력 필요"],
    luckyMonths: [4, 8, 12],
    warningMonths: [3, 10],
    compatibility: ["sheep", "pig", "dog"],
  },

  dragon: {
    sign: "dragon",
    name: "용띠",
    emoji: "🐉",
    years: [1964, 1976, 1988, 2000, 2012, 2024],
    fortuneTitle: "리더십 발휘의 해",
    description: "용띠는 2026년 강력한 카리스마와 리더십을 발휘할 수 있는 해입니다. 사업 확장이나 승진에 유리한 시기입니다.",
    strengths: ["강한 카리스마", "사업 확장", "명예 상승"],
    challenges: ["과신 주의", "겸손함 필요"],
    luckyMonths: [1, 5, 9],
    warningMonths: [6, 11],
    compatibility: ["rat", "monkey", "rooster"],
  },

  snake: {
    sign: "snake",
    name: "뱀띠",
    emoji: "🐍",
    years: [1965, 1977, 1989, 2001, 2013, 2025],
    fortuneTitle: "지혜의 결실을 맺는 해",
    description: "뱀띠는 2026년 그동안의 노력이 결실을 맺는 해입니다. 통찰력과 지혜로 복잡한 문제를 해결할 수 있습니다.",
    strengths: ["통찰력", "문제 해결", "재물 증가"],
    challenges: ["의심 많음", "신뢰 구축"],
    luckyMonths: [2, 6, 10],
    warningMonths: [4, 12],
    compatibility: ["ox", "rooster", "monkey"],
  },

  horse: {
    sign: "horse",
    name: "말띠",
    emoji: "🐴",
    years: [1966, 1978, 1990, 2002, 2014, 2026],
    fortuneTitle: "본띠! 대박의 해 🔥",
    description: "2026년은 말띠의 본띠! 12년에 한 번 오는 특별한 해입니다. 모든 운이 최고조에 달하며, 큰 행운이 찾아옵니다. 적극적으로 도전하세요!",
    strengths: ["모든 운 상승", "활력 넘침", "큰 기회 도래"],
    challenges: ["본띠라 몸조심", "과욕 경계"],
    luckyMonths: [1, 3, 5, 7, 9, 11], // 본띠라 거의 모든 달이 길함
    warningMonths: [],
    compatibility: ["tiger", "sheep", "dog"],
  },

  sheep: {
    sign: "sheep",
    name: "양띠",
    emoji: "🐑",
    years: [1967, 1979, 1991, 2003, 2015, 2027],
    fortuneTitle: "인복이 터지는 해",
    description: "양띠는 2026년 주변 사람들의 도움을 많이 받는 해입니다. 겸손하고 부드러운 성격이 빛을 발합니다.",
    strengths: ["인복 상승", "협력 성공", "예술적 감각"],
    challenges: ["우유부단", "결정 능력"],
    luckyMonths: [4, 7, 11],
    warningMonths: [1, 8],
    compatibility: ["rabbit", "horse", "pig"],
  },

  monkey: {
    sign: "monkey",
    name: "원숭이띠",
    emoji: "🐵",
    years: [1968, 1980, 1992, 2004, 2016, 2028],
    fortuneTitle: "재치로 승부하는 해",
    description: "원숭이띠는 2026년 뛰어난 재치와 유머로 많은 기회를 잡을 수 있습니다. 창의적인 아이디어가 성공을 부릅니다.",
    strengths: ["창의력", "사교성", "기회 포착"],
    challenges: ["산만함 주의", "집중력 필요"],
    luckyMonths: [3, 8, 12],
    warningMonths: [2, 10],
    compatibility: ["rat", "dragon", "snake"],
  },

  rooster: {
    sign: "rooster",
    name: "닭띠",
    emoji: "🐓",
    years: [1969, 1981, 1993, 2005, 2017, 2029],
    fortuneTitle: "성과를 내는 해",
    description: "닭띠는 2026년 부지런함과 정직함으로 큰 성과를 거두는 해입니다. 일의 결실을 맺고 인정받을 수 있습니다.",
    strengths: ["성실함 인정", "목표 달성", "명예 상승"],
    challenges: ["비판 주의", "완벽주의"],
    luckyMonths: [2, 6, 9],
    warningMonths: [5, 11],
    compatibility: ["ox", "snake", "dragon"],
  },

  dog: {
    sign: "dog",
    name: "개띠",
    emoji: "🐕",
    years: [1970, 1982, 1994, 2006, 2018, 2030],
    fortuneTitle: "신뢰를 쌓는 해",
    description: "개띠는 2026년 충직함과 정직함으로 주변의 신뢰를 얻는 해입니다. 인간관계에서 큰 도움을 받을 수 있습니다.",
    strengths: ["신뢰 구축", "충성심", "안정적 관계"],
    challenges: ["걱정 많음", "긍정적 사고"],
    luckyMonths: [3, 7, 10],
    warningMonths: [4, 9],
    compatibility: ["tiger", "rabbit", "horse"],
  },

  pig: {
    sign: "pig",
    name: "돼지띠",
    emoji: "🐖",
    years: [1971, 1983, 1995, 2007, 2019, 2031],
    fortuneTitle: "풍요의 해",
    description: "돼지띠는 2026년 재물과 행운이 가득한 풍요로운 해를 맞이합니다. 관대함과 낙천성이 행운을 부릅니다.",
    strengths: ["재물 풍요", "행운", "관대함"],
    challenges: ["과소비 주의", "계획성 필요"],
    luckyMonths: [1, 5, 8],
    warningMonths: [3, 10],
    compatibility: ["rabbit", "sheep", "tiger"],
  },
};

// 생년으로 띠 계산
export function getZodiacSign(birthYear: number): ZodiacSign {
  // 12지신 순서: 자(쥐), 축(소), 인(호랑이), 묘(토끼), 진(용), 사(뱀), 오(말), 미(양), 신(원숭이), 유(닭), 술(개), 해(돼지)
  const signs: ZodiacSign[] = [
    "rat", "ox", "tiger", "rabbit", "dragon", "snake",
    "horse", "sheep", "monkey", "rooster", "dog", "pig"
  ];

  // 1900년은 쥐띠(庚子年)입니다.
  // (year - 1900) % 12 를 하면 1900년생은 index 0 (rat)이 됩니다.
  let index = (birthYear - 1900) % 12;
  
  // 음수 처리 (1900년 이전 출생자 대응)
  if (index < 0) index += 12;
  
  return signs[index];
}

// 띠 정보 가져오기
export function getZodiacInfo(birthYear: number): ZodiacInfo {
  const sign = getZodiacSign(birthYear);
  return ZODIAC_2026[sign];
}

// 띠 이름 한글로 가져오기
export function getZodiacName(sign: ZodiacSign): string {
  return ZODIAC_2026[sign].name;
}
