"use client";

import { useState, useCallback, useEffect } from "react";
import { convertToTailwind } from "./tailwind-mapper";
import { ConversionResult } from "../model/types";

export function useCSSToTailwind() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ConversionResult | null>(null);

  const convert = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      return;
    }
    const converted = convertToTailwind(input);
    setResult(converted);
  }, [input]);

  // 입력값이 변경될 때마다 자동 변환 (Debounced 또는 즉시)
  useEffect(() => {
    const timer = setTimeout(() => {
      convert();
    }, 300);
    return () => clearTimeout(timer);
  }, [input, convert]);

  return {
    input,
    setInput,
    result,
    convert,
  };
}
