'use client';

import { Card } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";
import { MetaTagsData } from "../model/types";
import { Globe } from "lucide-react";

interface SocialPreviewCardProps {
  data: MetaTagsData;
  platform: 'facebook' | 'twitter';
}

export function SocialPreviewCard({ data, platform }: SocialPreviewCardProps) {
  const isTwitter = platform === 'twitter';
  const displayUrl = data.url ? new URL(data.url).hostname : 'codepis.com';

  return (
    <div className="space-y-4">
      <Typography variant="small" className="font-bold text-slate-500 uppercase tracking-wider">
        {platform === 'facebook' ? 'Facebook / Kakao / Slack' : 'Twitter / X'} 스타일 미리보기
      </Typography>

      <Card className="overflow-hidden border-slate-200 shadow-sm max-w-[500px]">
        {/* 이미지 영역 */}
        <div className="relative aspect-[1.91/1] bg-slate-100 flex items-center justify-center overflow-hidden border-b">
          {data.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={data.image} 
              alt="OG Preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1200x630/f1f5f9/94a3b8?text=Image+Not+Found';
              }}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <Globe className="w-10 h-10 opacity-20" />
              <span className="text-xs">이미지 URL을 입력하세요</span>
            </div>
          )}
        </div>

        {/* 텍스트 영역 */}
        <div className={`p-4 ${isTwitter ? 'bg-white' : 'bg-[#f2f3f5]'}`}>
          <div className="space-y-1">
            <p className="text-[12px] uppercase text-slate-500 font-medium truncate">
              {displayUrl}
            </p>
            <h3 className={`font-bold leading-snug truncate-2-lines ${isTwitter ? 'text-slate-900 text-base' : 'text-[#1d2129] text-[16px]'}`}>
              {data.title || '페이지 제목이 표시됩니다.'}
            </h3>
            <p className="text-[14px] text-slate-500 leading-normal line-clamp-2 mt-1">
              {data.description || '페이지에 대한 설명 문구가 이곳에 노출됩니다. 소셜 미디어 공유 시 사용자의 클릭을 유도하는 중요한 정보입니다.'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
