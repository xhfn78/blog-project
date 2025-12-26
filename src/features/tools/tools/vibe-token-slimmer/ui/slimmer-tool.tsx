'use client';

import React from "react";
import { ToolSection } from "@/shared/ui/tool-layout";
import { Textarea } from "@/shared/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { CopyButton } from "@/shared/ui/copy-button";
import { useTokenSlimmer } from "@/shared/lib/hooks/use-token-slimmer";
import { motion, AnimatePresence } from "framer-motion";

export function SlimmerToolUI() {
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
