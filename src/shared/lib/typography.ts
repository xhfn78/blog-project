import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Typography 유틸리티
 * 한글 텍스트에 최적화된 타이포그래피 스타일을 제공합니다.
 *
 * 핵심 원칙:
 * 1. 한글은 word-break: keep-all로 단어 단위 유지
 * 2. 영문은 word-break: break-word로 긴 단어 처리
 * 3. 인라인 스타일 금지, Tailwind 유틸리티만 사용
 */

/**
 * 한글 텍스트에 최적화된 타이포그래피 클래스를 반환합니다.
 *
 * @param additionalClasses - 추가 Tailwind 클래스
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * <h1 className={koreanText("text-4xl font-bold")}>
 *   한글 제목
 * </h1>
 * ```
 */
export function koreanText(...additionalClasses: ClassValue[]) {
  return twMerge(
    clsx(
      "break-keep", // word-break: keep-all - 한글 단어를 끊지 않음
      additionalClasses
    )
  );
}

/**
 * 영문 텍스트에 최적화된 타이포그래피 클래스를 반환합니다.
 *
 * @param additionalClasses - 추가 Tailwind 클래스
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * <p className={englishText("text-lg")}>
 *   Long English text that might need word breaking...
 * </p>
 * ```
 */
export function englishText(...additionalClasses: ClassValue[]) {
  return twMerge(
    clsx(
      "break-words", // overflow-wrap: break-word - 긴 단어 줄바꿈
      additionalClasses
    )
  );
}

/**
 * 혼합 텍스트(한글+영문)에 최적화된 타이포그래피 클래스를 반환합니다.
 * 기본적으로 한글 우선 정책을 사용합니다.
 *
 * @param additionalClasses - 추가 Tailwind 클래스
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * <p className={mixedText("text-base")}>
 *   한글과 English가 섞인 텍스트
 * </p>
 * ```
 */
export function mixedText(...additionalClasses: ClassValue[]) {
  return koreanText(...additionalClasses);
}

/**
 * 제목(Heading) 전용 타이포그래피 클래스를 반환합니다.
 *
 * @param level - 제목 레벨 (h1~h6)
 * @param additionalClasses - 추가 Tailwind 클래스
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * <h1 className={heading(1, "text-blue-600")}>
 *   페이지 제목
 * </h1>
 * ```
 */
export function heading(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  ...additionalClasses: ClassValue[]
) {
  const baseClasses: Record<number, string> = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold",
    3: "text-2xl md:text-3xl lg:text-4xl font-semibold",
    4: "text-xl md:text-2xl lg:text-3xl font-semibold",
    5: "text-lg md:text-xl lg:text-2xl font-medium",
    6: "text-base md:text-lg lg:text-xl font-medium",
  };

  return koreanText(baseClasses[level], ...additionalClasses);
}

/**
 * 본문(Body) 전용 타이포그래피 클래스를 반환합니다.
 *
 * @param size - 본문 크기 ("sm" | "base" | "lg")
 * @param additionalClasses - 추가 Tailwind 클래스
 * @returns 병합된 클래스 문자열
 *
 * @example
 * ```tsx
 * <p className={body("base", "text-muted-foreground")}>
 *   본문 내용입니다.
 * </p>
 * ```
 */
export function body(
  size: "sm" | "base" | "lg" = "base",
  ...additionalClasses: ClassValue[]
) {
  const sizeClasses: Record<string, string> = {
    sm: "text-sm md:text-base leading-relaxed",
    base: "text-base md:text-lg leading-relaxed",
    lg: "text-lg md:text-xl leading-relaxed",
  };

  return koreanText(sizeClasses[size], ...additionalClasses);
}

/**
 * Typography 유틸리티 함수들을 하나의 객체로 export
 *
 * @example
 * ```tsx
 * import { typography } from "@/shared/lib/typography";
 *
 * <h1 className={typography.heading(1)}>제목</h1>
 * <p className={typography.body("base")}>본문</p>
 * ```
 */
export const typography = {
  korean: koreanText,
  english: englishText,
  mixed: mixedText,
  heading,
  body,
} as const;
