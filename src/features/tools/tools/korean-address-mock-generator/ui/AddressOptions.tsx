import React from 'react';
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { GenerationOptions, ExportFormat } from '../model/types';
import { Settings, Play } from 'lucide-react';

interface Props {
  options: GenerationOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenerationOptions>>;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const AddressOptions = ({ options, setOptions, onGenerate, isGenerating }: Props) => {
  return (
    <Card className="p-6 space-y-6 border-primary/10">
      <div className="flex items-center gap-2 font-bold text-primary mb-2">
        <Settings className="w-4 h-4" /> 생성 옵션
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>생성 개수 (최대 50)</Label>
          <Input 
            type="number" 
            value={options.count} 
            max={50}
            min={1}
            onChange={(e) => setOptions(prev => ({ ...prev, count: Math.min(50, parseInt(e.target.value) || 1) }))} 
          />
        </div>

        <div className="space-y-2">
          <Label>내보내기 형식</Label>
          <Select value={options.format} onValueChange={(v: ExportFormat) => setOptions(prev => ({ ...prev, format: v }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV (Excel)</SelectItem>
              <SelectItem value="typescript">TypeScript 객체</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-primary/5">
          <Label>위경도 좌표 포함</Label>
          <Switch 
            checked={options.includeCoordinates} 
            onCheckedChange={(v) => setOptions(prev => ({ ...prev, includeCoordinates: v }))} 
          />
        </div>

        <div className="flex items-center justify-between py-2 border-t border-primary/5">
          <Label>상세 주소 생성</Label>
          <Switch 
            checked={options.includeDetail} 
            onCheckedChange={(v) => setOptions(prev => ({ ...prev, includeDetail: v }))} 
          />
        </div>
      </div>

      <Button onClick={onGenerate} disabled={isGenerating} className="w-full gap-2 mt-4" size="lg">
        <Play className="w-4 h-4" /> 주소 데이터 생성
      </Button>
    </Card>
  );
};
