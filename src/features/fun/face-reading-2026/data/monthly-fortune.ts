/**
 * 2026년 월별 운세 조언
 */

import type { MonthlyAdvice } from "@/entities/fun";

// 월별 기본 테마 (모든 띠 공통)
export const MONTHLY_THEMES_2026: MonthlyAdvice[] = [
  {
    month: 1,
    theme: "새 출발",
    description: "새해를 맞아 새로운 계획을 세우고 실천하기 좋은 달입니다.",
    warning: "지갑 조심! 새해 지출 계획을 세우세요",
    luckyDay: 15,
  },
  {
    month: 2,
    theme: "준비와 정리",
    description: "본격적인 활동 전 준비를 철저히 하는 시기입니다.",
    warning: "건강 관리에 신경 쓰세요",
    luckyDay: 8,
  },
  {
    month: 3,
    theme: "도약과 확장",
    description: "봄과 함께 새로운 기회가 찾아옵니다. 적극적으로 행동하세요!",
    warning: "과소비 주의! 충동구매 자제하세요",
    luckyDay: 21,
  },
  {
    month: 4,
    theme: "성장의 시기",
    description: "노력한 만큼 성과가 나타나는 달입니다. 꾸준히 전진하세요.",
    warning: "계약서는 꼼꼼히 확인하세요",
    luckyDay: 12,
  },
  {
    month: 5,
    theme: "기회 포착",
    description: "귀인을 만나거나 큰 기회가 찾아올 수 있습니다.",
    warning: "말조심! 작은 실수가 큰 문제로",
    luckyDay: 5,
  },
  {
    month: 6,
    theme: "안정과 휴식",
    description: "상반기를 정리하고 재정비하는 시간입니다.",
    warning: "무리한 투자는 피하세요",
    luckyDay: 18,
  },
  {
    month: 7,
    theme: "열정의 여름",
    description: "활발한 활동과 새로운 도전이 빛을 발하는 시기입니다.",
    warning: "건강 관리 필수! 과로 주의",
    luckyDay: 7,
  },
  {
    month: 8,
    theme: "결실의 시작",
    description: "그동안의 노력이 결실을 맺기 시작합니다.",
    warning: "교통사고 조심하세요",
    luckyDay: 25,
  },
  {
    month: 9,
    theme: "수확과 감사",
    description: "풍요로운 결실을 거두는 시기입니다. 감사하는 마음을 가지세요.",
    warning: "주변 사람들과의 갈등 주의",
    luckyDay: 9,
  },
  {
    month: 10,
    theme: "재정비",
    description: "한 해를 정리하고 남은 목표를 점검하는 시간입니다.",
    warning: "사기 조심! 너무 좋은 제안은 의심하세요",
    luckyDay: 30,
  },
  {
    month: 11,
    theme: "마무리 준비",
    description: "올해의 마무리와 내년 준비를 시작하세요.",
    warning: "감정 소모 주의, 명상이나 휴식 필요",
    luckyDay: 11,
  },
  {
    month: 12,
    theme: "완성과 마무리",
    description: "한 해를 잘 마무리하고 새해를 준비하는 달입니다.",
    warning: "연말 과소비 주의! 계획적인 지출",
    luckyDay: 24,
  },
];

// 특정 달의 조언 가져오기
export function getMonthlyAdvice(month: number): MonthlyAdvice | undefined {
  return MONTHLY_THEMES_2026.find((m) => m.month === month);
}

// 현재 달 기준 향후 3개월 조언
export function getUpcomingAdvice(currentMonth: number = new Date().getMonth() + 1): MonthlyAdvice[] {
  const result: MonthlyAdvice[] = [];

  for (let i = 0; i < 3; i++) {
    let targetMonth = currentMonth + i;
    if (targetMonth > 12) targetMonth -= 12;

    const advice = getMonthlyAdvice(targetMonth);
    if (advice) result.push(advice);
  }

  return result;
}

// 행운의 달 찾기
export function getLuckyMonths(luckyMonthNumbers: number[]): MonthlyAdvice[] {
  return MONTHLY_THEMES_2026.filter((m) => luckyMonthNumbers.includes(m.month));
}

// 주의해야 할 달 찾기
export function getWarningMonths(warningMonthNumbers: number[]): MonthlyAdvice[] {
  return MONTHLY_THEMES_2026.filter((m) => warningMonthNumbers.includes(m.month));
}
