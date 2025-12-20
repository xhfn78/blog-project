'use client';

import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Textarea } from "@/shared/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { CopyButton } from "@/shared/ui/copy-button";
import { useTokenSlimmer } from "@/shared/lib/hooks/use-token-slimmer";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/ui/button";
import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from 'next/link';

function SlimmerToolUI() {
  const {
    inputText,
    setInputText,
    processedText,
    originalStats,
    processedStats,
    slimOptions,
    setSlimOptions,
    tokensSaved,
    percentageSaved,
    costSaved,
    originalChars,
    processedChars,
    charsSaved,
    percentageCharsSaved,
  } = useTokenSlimmer();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ToolSection title="입력">
        <Label htmlFor="input-textarea" className="sr-only">Input Text</Label>
        <Textarea
          id="input-textarea"
          placeholder="Paste your code or prompt here..."
          className="h-96"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </ToolSection>

      <div>
        <ToolSection title="절감된 출력">
          <div className="relative">
            <Textarea
              id="output-textarea"
              placeholder="Slimmed output will appear here..."
              className="h-48 pr-12"
              value={processedText}
              readOnly
            />
            <div className="absolute top-2 right-2">
              <CopyButton text={processedText} variant="default" size="sm">결과 복사</CopyButton>
            </div>
          </div>
        </ToolSection>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>최적화 옵션</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="strip-imports">임포트 제거</Label>
              <Switch id="strip-imports" checked={slimOptions.stripImports} onCheckedChange={(checked) => setSlimOptions(prev => ({ ...prev, stripImports: checked }))} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="strip-comments">주석 제거</Label>
              <Switch id="strip-comments" checked={slimOptions.stripComments} onCheckedChange={(checked) => setSlimOptions(prev => ({ ...prev, stripComments: checked }))} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compress-whitespace">공백 압축</Label>
              <Switch id="compress-whitespace" checked={slimOptions.compressWhitespace} onCheckedChange={(checked) => setSlimOptions(prev => ({ ...prev, compressWhitespace: checked }))} />
            </div>
          </CardContent>
        </Card>



        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>실시간 절감 현황</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">원본 토큰</span>
                <span className="text-lg font-bold">{originalStats.tokens}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">절감 토큰</span>
                <span className="text-lg font-bold">{processedStats.tokens}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">원본 글자 수</span>
                <span className="text-lg font-bold">{originalChars}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-gray-500">절감 글자 수</span>
                <span className="text-lg font-bold">{processedChars}</span>
              </div>
              <div className="col-span-2 flex flex-col space-y-2 p-4 bg-green-50 rounded-lg">
                <span className="text-sm font-semibold text-green-800">🎉 Vibe Check!</span>
                <p className="text-xl font-bold text-green-900">
                  🎉 방금 토큰&nbsp;
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={tokensSaved}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="secondary" className="text-xl">{tokensSaved}</Badge>
                    </motion.span>
                  </AnimatePresence>
                  &nbsp;개&nbsp;
                  (<Badge variant="outline">{percentageSaved}%</Badge> 절감)
                </p>
                <p className="text-lg font-bold text-green-900">
                  🎉 방금 글자 수&nbsp;
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={charsSaved}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="secondary" className="text-xl">{charsSaved}</Badge>
                    </motion.span>
                  </AnimatePresence>
                  &nbsp;자&nbsp;
                  (<Badge variant="outline">{percentageCharsSaved}%</Badge> 절감)
                </p>
                <p className="text-sm text-gray-600">
                  예상 비용 절감: <span className="font-mono">${costSaved}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}


export default function VibeTokenSlimmerPage() {
  return (
    <ToolLayout config={config}>
      {/* 1️⃣ Tool Execution Area */}
      <ToolSection title="AI 토큰 절감기">
        <SlimmerToolUI />
      </ToolSection>

      {/* Ad space */}
      <div className="my-8" />

      {/* 2️⃣ Usage Guide */}
      <ToolSection title="사용 방법">
        <div className="space-y-4">
          <Typography variant="p">
            AI 토큰 절감기는 복잡한 코드나 프롬프트를 AI에게 전달하기 전에 군더더기를 제거하여 토큰 사용량을 최적화하는 도구입니다. 사용법은 매우 간단합니다.
          </Typography>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>입력:</strong> 좌측 'Input' 영역에 분석하거나 질문하고 싶은 코드 스니펫, 긴 프롬프트, 또는 일반 텍스트를 붙여넣습니다.</li>
            <li><strong>실시간 변환 확인:</strong> 텍스트를 입력하는 즉시, 우측 'Slimmed Output' 영역에 최적화된 결과가 실시간으로 표시됩니다. 동시에 'Real-time Savings Dashboard'에서 원본 토큰, 절감된 토큰, 그리고 예상 비용 절감액을 확인할 수 있습니다.</li>
            <li><strong>옵션 조절:</strong> 'Slimming Options' 카드에서 'Strip Imports'(임포트 구문 제거), 'Strip Comments'(주석 제거), 'Compress Whitespace'(공백 압축) 옵션을 켜고 끄며 필요에 맞게 최적화 수준을 조절할 수 있습니다.</li>
            <li><strong>결과 복사:</strong> 'One-Click AI Direct Injection' 카드에서 사용하려는 AI 서비스(ChatGPT, Cursor 등)에 맞는 버튼을 클릭하세요. 해당 AI에 최적화된 형식으로 가공된 결과가 클립보드에 복사됩니다.</li>
          </ol>
        </div>
      </ToolSection>

      {/* Ad space */}
      <div className="my-8" />

      {/* 3️⃣ SEO Content Area */}
      <ToolSection title="AI 토큰 절감 완벽 가이드">
        <div className="space-y-6">
          <Typography variant="h2">AI 토큰 절감기란 무엇인가?</Typography>
          <Typography variant="p">
            AI 토큰 절감기는 LLM(거대 언어 모델)과 상호작용할 때 발생하는 비용과 지연 시간을 줄이기 위해 설계된 전처리 도구입니다. ChatGPT, Claude, Gemini 등 대부분의 AI 모델은 입력된 텍스트의 길이에 따라 '토큰'이라는 단위로 사용량을 계산하고 비용을 청구합니다. 코드의 주석, 불필요한 공백, 임포트 구문 등은 사람이 코드를 이해하는 데는 도움이 되지만, AI가 핵심 로직을 파악하는 데는 필수가 아닌 경우가 많습니다. 이 도구는 이러한 군더더기를 제거하여 AI가 핵심에만 집중할 수 있도록 도와, 결과적으로 토큰 사용량을 30~50%까지 절감하고 응답 속도를 향상시킵니다.
            특히 프롬프트 엔지니어, AI/ML 개발자, 그리고 API 기반 AI 서비스를 자주 사용하는 모든 개발자에게 필수적인 생산성 도구입니다.
          </Typography>
          
          <Typography variant="h2">주요 기능</Typography>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>실시간 토큰 분석 및 비용 시각화:</strong>
              입력과 동시에 원본과 최적화된 텍스트의 토큰 수를 gpt-tokenizer 기준으로 계산하여 보여줍니다. 이를 통해 사용자는 얼마나 많은 토큰과 비용을 절약하고 있는지 직관적으로 파악할 수 있습니다.
            </li>
            <li>
              <strong>세밀한 최적화 옵션 제어:</strong>
              주석, 임포트 구문, 공백 등 제거할 요소를 사용자가 직접 선택할 수 있습니다. 예를 들어, 특정 주석이 AI의 컨텍스트 이해에 중요하다면 'Strip Comments' 옵션을 비활성화하여 유연하게 대처할 수 있습니다.
            </li>
            <li>
              <strong>AI 서비스 맞춤형 프롬프트 생성:</strong>
              단순 텍스트 복사를 넘어, ChatGPT, Cursor 등 주요 AI 서비스에 최적화된 프롬프트 형식으로 즉시 변환하여 복사할 수 있습니다. 이는 AI의 응답 정확도를 높이는 데 기여합니다. 이 기능은 <Link href="/utility/json-to-table" className="text-blue-600 hover:underline">JSON 테이블 변환기</Link>와 함께 사용하면 더욱 효과적입니다.
            </li>
          </ul>

          <Typography variant="h2">실무에서 이렇게 사용하세요</Typography>
          <div className="space-y-4">
            <Typography variant="h4">1. 레거시 코드 리팩토링 아이디어 얻기</Typography>
            <Typography variant="p">
              오래되고 복잡한 코드베이스를 분석해야 할 때, 코드 전체를 AI에게 전달하는 것은 비효율적입니다. 이 도구를 사용하여 주석과 불필요한 부분을 제거한 핵심 로직만 AI에게 전달하고 "이 코드를 최신 React Hooks와 TypeScript를 사용하여 리팩토링해줘"라고 질문하면 훨씬 빠르고 정확한 답변을 얻을 수 있습니다.
            </Typography>
            <Typography variant="h4">2. 코드 리뷰 자동화</Typography>
            <Typography variant="p">
              PR(Pull Request)의 변경 사항을 복사하여 이 도구에 붙여넣고, 최적화된 코드를 기반으로 "이 코드 변경 사항에서 발생할 수 있는 잠재적인 버그나 성능 이슈를 알려줘"와 같은 프롬프트를 생성하여 코드 리뷰 과정의 효율성을 높일 수 있습니다.
            </Typography>
             <Typography variant="h4">3. 기술 블로그 초안 작성</Typography>
            <Typography variant="p">
              작성한 코드를 기반으로 기술 블로그를 작성할 때, 코드를 먼저 토큰 절감기로 최적화한 후 AI에게 "이 코드의 작동 원리를 비전공자도 이해하기 쉽게 설명하는 글을 작성해줘"라고 요청하면, AI가 코드의 핵심에 더 집중하여 고품질의 초안을 생성합니다. <Link href="/formatter/markdown-editor" className="text-blue-600 hover:underline">마크다운 에디터</Link>로 다듬으면 완벽한 글이 됩니다.
            </Typography>
          </div>

          <Typography variant="h2">토큰(Token)의 원리와 비용 구조</Typography>
          <Typography variant="p">
            LLM에서 '토큰'은 텍스트를 처리하는 기본 단위입니다. 일반적으로 단어, 문장 부호, 또는 코드의 일부에 해당합니다. 예를 들어, "Hello, world!"는 "Hello", ",", " world", "!" 와 같이 4개의 토큰으로 계산될 수 있습니다. AI 모델은 처리하는 총 토큰 수에 따라 비용을 부과하며, 이는 모델의 종류와 버전에 따라 크게 다릅니다. 따라서 불필요한 토큰을 줄이는 것은 AI 사용 비용을 직접적으로 절감하는 가장 효과적인 방법입니다. (W3C나 MDN 문서에서는 이러한 API 비용 최적화의 중요성을 강조합니다).
          </Typography>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">항목</th>
                <th className="p-2 border">설명</th>
                <th className="p-2 border">토큰 절감 효과</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">주석 (Comments)</td>
                <td className="p-2 border">코드의 기능에 영향을 주지 않는 설명글.</td>
                <td className="p-2 border">매우 높음. 코드 길이의 20-30%를 차지하기도 함.</td>
              </tr>
              <tr>
                <td className="p-2 border">임포트 구문 (Imports)</td>
                <td className="p-2 border">외부 라이브러리를 가져오는 구문. AI는 종종 컨텍스트로 유추 가능.</td>
                <td className="p-2 border">중간. 파일 상단에 집중되어 있음.</td>
              </tr>
              <tr>
                <td className="p-2 border">공백 (Whitespace)</td>
                <td className="p-2 border">들여쓰기, 빈 줄 등. 가독성을 위한 요소.</td>
                <td className="p-2 border">높음. 특히 빈 줄 제거는 상당한 토큰을 절약.</td>
              </tr>
            </tbody>
          </table>
           <Typography variant="p" className="mt-4">
            위 표에서 볼 수 있듯이, 코드에서 사람이 읽기 위해 추가한 많은 요소들이 AI에게는 불필요한 토큰 낭비가 될 수 있습니다. 이 도구는 이러한 요소들을 선택적으로 제거함으로써, 모델의 컨텍스트 창(Context Window)을 효율적으로 사용하고, 더 길고 복잡한 문제에 집중할 수 있도록 돕습니다. 이는 특히 토큰 제한이 엄격한 무료 버전의 AI 모델을 사용할 때 더욱 중요합니다.
          </Typography>
          
          <Typography variant="h2">자주 묻는 질문 (FAQ)</Typography>
          <div className="space-y-4">
            <div>
              <Typography variant="h4">Q1: 토큰을 줄이면 AI의 코드 이해도가 떨어지지 않나요?</Typography>
              <Typography variant="p">
                A: 그렇지 않습니다. 이 도구는 코드의 실행 로직에 영향을 주지 않는 부분(주석, 공백 등)을 중심으로 제거합니다. 오히려 불필요한 정보가 제거되어 AI가 코드의 핵심적인 구조와 알고리즘에 더 집중할 수 있어, 경우에 따라서는 더 정확한 답변을 생성하기도 합니다. 물론, 컨텍스트에 중요한 정보가 담긴 주석이 있다면 해당 옵션을 비활성화하여 유지할 수 있습니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4">Q2: 모든 프로그래밍 언어에 사용할 수 있나요?</Typography>
              <Typography variant="p">
                A: 네, 특정 언어에 종속되지 않는 범용적인 텍스트 처리 방식을 사용하므로 JavaScript, Python, Java, C++ 등 대부분의 프로그래밍 언어뿐만 아니라, 일반적인 텍스트나 프롬프트에도 효과적으로 사용할 수 있습니다. 정규표현식 기반으로 주석과 공백을 제거하므로 대부분의 언어 문법에서 안전하게 동작합니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4">Q3: 계산되는 토큰 수는 100% 정확한가요?</Typography>
              <Typography variant="p">
                A: 이 도구는 OpenAI의 `gpt-tokenizer`를 사용하여 토큰 수를 계산합니다. 이는 GPT-3.5/4 모델군과 매우 유사한 결과를 제공하지만, Claude나 Gemini 같은 다른 모델의 정확한 토큰 계산 방식과는 약간의 차이가 있을 수 있습니다. 따라서 '매우 근사치'로 참고하는 것이 가장 좋으며, 실제 비용은 각 AI 서비스 제공자의 정책을 따릅니다.
              </Typography>
            </div>
          </div>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}