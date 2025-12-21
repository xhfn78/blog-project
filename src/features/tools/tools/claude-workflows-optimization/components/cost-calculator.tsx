import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { calculateCost, PRICING, type ModelType } from '../lib/cost-calculator';
import { Calculator } from 'lucide-react';

/**
 * Claude API 비용 계산기
 *
 * 입력 토큰, 출력 토큰, 모델을 선택하여 예상 비용을 계산합니다.
 */
export function CostCalculator() {
  const [inputTokens, setInputTokens] = useState<string>('10000');
  const [outputTokens, setOutputTokens] = useState<string>('2000');
  const [model, setModel] = useState<ModelType>('sonnet');
  const [result, setResult] = useState<ReturnType<typeof calculateCost> | null>(null);

  const handleCalculate = () => {
    const input = parseInt(inputTokens) || 0;
    const output = parseInt(outputTokens) || 0;
    const cost = calculateCost(input, output, model);
    setResult(cost);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Claude API 비용 계산기
        </CardTitle>
        <CardDescription>
          토큰 사용량을 입력하여 예상 비용을 계산하세요 (2025년 1월 기준)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 입력 토큰 */}
          <div className="space-y-2">
            <Label htmlFor="input-tokens">입력 토큰 수</Label>
            <Input
              id="input-tokens"
              type="number"
              value={inputTokens}
              onChange={(e) => setInputTokens(e.target.value)}
              placeholder="10000"
            />
          </div>

          {/* 출력 토큰 */}
          <div className="space-y-2">
            <Label htmlFor="output-tokens">출력 토큰 수</Label>
            <Input
              id="output-tokens"
              type="number"
              value={outputTokens}
              onChange={(e) => setOutputTokens(e.target.value)}
              placeholder="2000"
            />
          </div>
        </div>

        {/* 모델 선택 */}
        <div className="space-y-2">
          <Label htmlFor="model-select">모델 선택</Label>
          <Select value={model} onValueChange={(value) => setModel(value as ModelType)}>
            <SelectTrigger id="model-select">
              <SelectValue placeholder="모델을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="haiku">
                Claude Haiku (가장 저렴)
              </SelectItem>
              <SelectItem value="sonnet">
                Claude Sonnet (균형)
              </SelectItem>
              <SelectItem value="opus">
                Claude Opus (가장 강력)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 가격 정보 */}
        <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
          <p className="font-semibold">선택한 모델: {PRICING[model].name}</p>
          <p className="text-muted-foreground">
            입력: ${PRICING[model].input} / 1M tokens
          </p>
          <p className="text-muted-foreground">
            출력: ${PRICING[model].output} / 1M tokens
          </p>
        </div>

        {/* 계산 버튼 */}
        <Button onClick={handleCalculate} className="w-full">
          비용 계산하기
        </Button>

        {/* 결과 */}
        {result && (
          <div className="border-t pt-4 space-y-2">
            <h4 className="font-semibold">계산 결과</h4>
            <div className="bg-primary/10 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>입력 토큰 비용:</span>
                <span className="font-mono">${result.inputCost.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>출력 토큰 비용:</span>
                <span className="font-mono">${result.outputCost.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>총 비용:</span>
                <span className="font-mono">${result.totalCost.toFixed(4)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * 1,000회 실행 시: ${(result.totalCost * 1000).toFixed(2)} |
              10,000회 실행 시: ${(result.totalCost * 10000).toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
