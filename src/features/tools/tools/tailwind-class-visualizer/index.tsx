"use client";

import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Textarea } from "@/shared/ui/textarea";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Card } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { TAILWIND_DICTIONARY, TailwindClassCategory } from './tailwind-dictionary';
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { SeoGuide } from "./ui/seo-guide";

// Define a type for a parsed class
type ParsedTailwindClass = {
  originalClass: string;
  category: TailwindClassCategory;
  description: string;
};

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function TailwindClassVisualizer() {
  const [inputText, setInputText] = useState("");
  const [livePreviewClasses, setLivePreviewClasses] = useState("");
  const [parsedClasses, setParsedClasses] = useState<Record<TailwindClassCategory, ParsedTailwindClass[]>>({
    Layout: [],
    'Flexbox & Grid': [],
    Spacing: [],
    Sizing: [],
    Typography: [],
    Backgrounds: [],
    Borders: [],
    Effects: [],
    Filters: [],
    Tables: [],
    'Transitions & Animation': [],
    Transforms: [],
    Interactivity: [],
    SVG: [],
    Accessibility: [],
    'Custom or Other': [],
  });

  const extractTailwindClasses = useCallback((text: string) => {
    // Regex to find class names, supporting className="" or class=""
    const classAttrRegex = /(?:className|class)\s*=\s*(["'])((?:.|\n)*?)\1/gs;
    let combinedClasses: string[] = [];
    let match;

    while ((match = classAttrRegex.exec(text)) !== null) {
      const classesString = match[2];
      // Handle multiple spaces, newlines, and filter out empty strings
      const classes = classesString.split(/\s+/).filter(Boolean);
      combinedClasses = combinedClasses.concat(classes);
    }

    // Also extract standalone classes not within className/class attributes
    // This regex looks for words that resemble tailwind classes (e.g., text-red-500, p-4, flex)
    // It avoids matching parts of CSS properties or other non-tailwind strings
    const standaloneClassRegex = /(?<![.\w-])\b([a-z0-9-]+(?:-[a-z0-9\/.+]*)*)\b(?!\()/g;
    let standaloneMatch;
    while ((standaloneMatch = standaloneClassRegex.exec(text)) !== null) {
        const potentialClass = standaloneMatch[1];
        // Simple heuristic to filter out obvious non-tailwind words (e.g., 'function', 'const', 'div')
        // This can be improved with a more comprehensive list of actual tailwind prefixes/values
        if (!['function', 'const', 'let', 'var', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'input', 'button'].includes(potentialClass) &&
            !potentialClass.includes(':') && // Exclude CSS properties like color:red
            !potentialClass.startsWith('(') && !potentialClass.endsWith(')')) { // Exclude function calls
            combinedClasses.push(potentialClass);
        }
    }

    // Remove duplicates and return unique classes
    return Array.from(new Set(combinedClasses)).join(' ');
  }, []);

  const parseAndCategorizeClasses = useCallback((classString: string) => {
    const classes = classString.split(/\s+/).filter(Boolean);
    const categorized: Record<TailwindClassCategory, ParsedTailwindClass[]> = {
      Layout: [],
      'Flexbox & Grid': [],
      Spacing: [],
      Sizing: [],
      Typography: [],
      Backgrounds: [],
      Borders: [],
      Effects: [],
      Filters: [],
      Tables: [],
      'Transitions & Animation': [],
      Transforms: [],
      Interactivity: [],
      SVG: [],
      Accessibility: [],
      'Custom or Other': [],
    };

    classes.forEach((cls) => {
      const info = TAILWIND_DICTIONARY[cls];
      if (info) {
        categorized[info.category].push({ originalClass: cls, ...info });
      } else {
        // Handle responsive prefixes (e.g., md:flex)
        const responsivePrefixMatch = cls.match(/^(sm:|md:|lg:|xl:|2xl:)(.*)$/);
        if (responsivePrefixMatch) {
          const baseClass = responsivePrefixMatch[2];
          const baseInfo = TAILWIND_DICTIONARY[baseClass];
          if (baseInfo) {
            categorized[baseInfo.category].push({
              originalClass: cls,
              category: baseInfo.category,
              description: `${responsivePrefixMatch[1]} 화면 크기에서: ${baseInfo.description}`,
            });
          } else {
            categorized['Custom or Other'].push({
              originalClass: cls,
              category: 'Custom or Other',
              description: '사전에 없는 커스텀 또는 기타 Tailwind 클래스입니다.',
            });
          }
        } else {
          categorized['Custom or Other'].push({
            originalClass: cls,
            category: 'Custom or Other',
            description: '사전에 없는 커스텀 또는 기타 Tailwind 클래스입니다.',
          });
        }
      }
    });

    return categorized;
  }, []);


  useEffect(() => {
    const extractedClasses = extractTailwindClasses(inputText);
    setLivePreviewClasses(extractedClasses);
  }, [inputText, extractTailwindClasses]); // Re-run when inputText changes

  useEffect(() => {
    const categorized = parseAndCategorizeClasses(livePreviewClasses);
    setParsedClasses(categorized);
  }, [livePreviewClasses, parseAndCategorizeClasses]); // Re-run when livePreviewClasses changes


  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    // livePreviewClasses state update is handled by the useEffect above
  }, []);

  const sortedCategories = useMemo(() => {
    return Object.keys(parsedClasses).sort((a, b) => {
      // Prioritize categories with actual classes
      const aHasClasses = parsedClasses[a as TailwindClassCategory].length > 0;
      const bHasClasses = parsedClasses[b as TailwindClassCategory].length > 0;

      if (aHasClasses && !bHasClasses) return -1;
      if (!aHasClasses && bHasClasses) return 1;

      // Keep 'Custom or Other' at the bottom
      if (a === 'Custom or Other') return 1;
      if (b === 'Custom or Other') return -1;

      return a.localeCompare(b);
    }) as TailwindClassCategory[];
  }, [parsedClasses]);


  return (
    <ToolLayout config={config}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ToolSection title="입력 코드" className="h-full">
          <Textarea
            placeholder={`예시:\n<div className="p-4 flex justify-center items-center bg-blue-500 text-white md:p-8">
  <p class="font-bold text-lg">Sample Text</p>
</div>`}
            className="h-full min-h-[250px] font-mono text-sm"
            value={inputText}
            onChange={handleInputChange}
          />
        </ToolSection>

        <div className="flex flex-col gap-6">
          <ToolSection title="실시간 프리뷰" className="mb-0">
            <Card className={`w-full h-32 flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${livePreviewClasses}`}>
              <Typography variant="h4" className="text-center transition-all duration-300 ease-in-out">Sample Text</Typography>
            </Card>
          </ToolSection>

          <ToolSection title="클래스 해설" className="flex-1">
            {sortedCategories.map((category) => {
              const classesInCategory = parsedClasses[category];
              if (classesInCategory.length === 0) return null;

              return (
                <div key={category} className="mb-4 last:mb-0">
                  <Typography variant="h3" className="mb-2 text-lg font-semibold border-b pb-1">
                    {category}
                  </Typography>
                  <div className="grid grid-cols-1 gap-2">
                    {classesInCategory.map((item, index) => (
                      <div key={index} className="flex flex-col space-y-1">
                        <Badge variant="secondary" className="w-fit">
                          {item.originalClass}
                        </Badge>
                        <Typography variant="p" className="text-sm text-gray-700 dark:text-gray-300">
                          {item.description}
                        </Typography>
                        {index < classesInCategory.length - 1 && <Separator className="my-1" />}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {livePreviewClasses === "" && (
              <Typography variant="p" className="text-gray-500 italic">
                코드를 입력하면 여기에 Tailwind CSS 클래스 해설이 표시됩니다.
              </Typography>
            )}
            {livePreviewClasses !== "" && Object.values(parsedClasses).every(arr => arr.length === 0) && (
                 <Typography variant="p" className="text-gray-500 italic">
                 인식할 수 있는 Tailwind 클래스를 찾을 수 없습니다.
               </Typography>
            )}
          </ToolSection>
        </div>
      </div>

      {/* SEO 콘텐츠 섹션 */}
      <ToolSection title="초보자를 위한 Tailwind CSS 완벽 가이드" className="mt-8">
        <SeoGuide />
      </ToolSection>
    </ToolLayout>
  );
}