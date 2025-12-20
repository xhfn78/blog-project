// src/shared/lib/hooks/use-token-slimmer.ts
import { useState, useEffect } from 'react';
import { getStats, slimLogic } from '@/entities/token-slimmer/model';

interface Stats {
  tokens: number;
  cost: string;
}

interface SlimOptions {
  stripImports: boolean;
  stripComments: boolean;
  compressWhitespace: boolean;
}

export function useTokenSlimmer(initialText: string = '') {
  const [inputText, setInputText] = useState(initialText);
  const [processedText, setProcessedText] = useState('');
  const [originalStats, setOriginalStats] = useState<Stats>({ tokens: 0, cost: '0' });
  const [processedStats, setProcessedStats] = useState<Stats>({ tokens: 0, cost: '0' });
  const [slimOptions, setSlimOptions] = useState<SlimOptions>({
    stripImports: true,
    stripComments: true,
    compressWhitespace: true,
  });

  useEffect(() => {
    const original = getStats(inputText);
    setOriginalStats(original);

    const slimmed = slimLogic(inputText, slimOptions);
    setProcessedText(slimmed);

    const processed = getStats(slimmed);
    setProcessedStats(processed);
  }, [inputText, slimOptions]);
  
  const tokensSaved = originalStats.tokens - processedStats.tokens;
  const percentageSaved = originalStats.tokens > 0
    ? ((tokensSaved / originalStats.tokens) * 100).toFixed(2)
    : '0.00';
  const costSaved = (parseFloat(originalStats.cost) - parseFloat(processedStats.cost)).toFixed(4);

  const originalChars = inputText.length;
  const processedChars = processedText.length;
  const charsSaved = originalChars - processedChars;
  const percentageCharsSaved = originalChars > 0
    ? ((charsSaved / originalChars) * 100).toFixed(2)
    : '0.00';

  return {
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
  };
}
