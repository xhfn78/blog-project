'use client';

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { MetaTagsData } from "../model/types";

interface MetaInputFormProps {
  data: MetaTagsData;
  onChange: (data: Partial<MetaTagsData>) => void;
}

export function MetaInputForm({ data, onChange }: MetaInputFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="flex justify-between items-center">
            페이지 제목
            <span className={`text-[10px] font-bold ${data.title.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
              {data.title.length} / 60자
            </span>
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="예: 코드피스 - 개발자의 놀이터"
            value={data.title}
            onChange={handleChange}
            className={data.title.length > 60 ? 'border-red-300 focus-visible:ring-red-500' : ''}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="siteName">사이트 이름</Label>
          <Input
            id="siteName"
            name="siteName"
            placeholder="예: 코드피스"
            value={data.siteName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="flex justify-between items-center">
          페이지 설명 (160자 권장)
          <span className={`text-[10px] font-bold ${data.description.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
            {data.description.length} / 160자
          </span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="검색 결과나 소셜 공유 시 표시될 설명 문구를 입력하세요."
          className={`min-h-[80px] ${data.description.length > 160 ? 'border-red-300 focus-visible:ring-red-500' : ''}`}
          value={data.description}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">페이지 URL</Label>
        <Input
          id="url"
          name="url"
          placeholder="https://codepis.com/tools/example"
          value={data.url}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">이미지 URL (1200x630 권장)</Label>
        <Input
          id="image"
          name="image"
          placeholder="https://codepis.com/og-image.png"
          value={data.image}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">콘텐츠 타입</Label>
          <Input
            id="type"
            name="type"
            placeholder="website, article 등"
            value={data.type}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitterHandle">Twitter 핸들</Label>
          <Input
            id="twitterHandle"
            name="twitterHandle"
            placeholder="@codepis_dev"
            value={data.twitterHandle}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
