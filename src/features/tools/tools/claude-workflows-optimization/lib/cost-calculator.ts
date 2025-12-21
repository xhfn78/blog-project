/**
 * Claude API 비용 계산 로직
 */

// 2025년 1월 기준 가격 (per 1M tokens)
export const PRICING = {
  haiku: {
    name: 'Claude Haiku',
    input: 0.25,    // $0.25 per 1M input tokens
    output: 1.25,   // $1.25 per 1M output tokens
  },
  sonnet: {
    name: 'Claude Sonnet',
    input: 3.0,     // $3.00 per 1M input tokens
    output: 15.0,   // $15.00 per 1M output tokens
  },
  opus: {
    name: 'Claude Opus',
    input: 15.0,    // $15.00 per 1M input tokens
    output: 75.0,   // $75.00 per 1M output tokens
  },
};

export type ModelType = keyof typeof PRICING;

export interface CostResult {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  model: string;
}

/**
 * 토큰 사용량을 기반으로 비용 계산
 */
export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: ModelType
): CostResult {
  const pricing = PRICING[model];

  const inputCost = (inputTokens / 1_000_000) * pricing.input;
  const outputCost = (outputTokens / 1_000_000) * pricing.output;
  const totalCost = inputCost + outputCost;

  return {
    inputCost,
    outputCost,
    totalCost,
    model: pricing.name,
  };
}
