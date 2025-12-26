import React from 'react';
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Slider } from "@/shared/ui/slider";
import { Switch } from "@/shared/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { ProfileCardOptions, CardTheme } from '../model/types';
import { Settings2, User } from 'lucide-react';

interface Props {
  username: string;
  onUsernameChange: (val: string) => void;
  options: ProfileCardOptions;
  onOptionChange: <K extends keyof ProfileCardOptions>(k: K, v: ProfileCardOptions[K]) => void;
  onGenerate: () => void;
}

export const CardControls = ({ username, onUsernameChange, options, onOptionChange, onGenerate }: Props) => {
  return (
    <Card className="p-6 space-y-6 bg-background/50 backdrop-blur-sm border-primary/10">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2 text-primary font-bold">
          <User className="w-4 h-4" /> 사용자 정보
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">GitHub 아이디</Label>
          <div className="flex gap-2">
            <Input 
              id="username" 
              placeholder="예: octocat" 
              value={username} 
              onChange={(e) => onUsernameChange(e.target.value)}
            />
            <button 
              onClick={onGenerate}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              분석
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-primary/5">
        <div className="flex items-center gap-2 mb-2 text-primary font-bold">
          <Settings2 className="w-4 h-4" /> 커스텀 설정
        </div>
        
        <div className="space-y-2">
          <Label>디자인 테마</Label>
          <Select value={options.theme} onValueChange={(v: CardTheme) => onOptionChange('theme', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern Dark</SelectItem>
              <SelectItem value="glassmorphism">Glassmorphism</SelectItem>
              <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>테두리 곡률</Label>
            <span className="text-xs text-muted-foreground">{options.borderRadius}px</span>
          </div>
          <Slider 
            value={[options.borderRadius]} 
            max={40} 
            onValueChange={([v]) => onOptionChange('borderRadius', v)} 
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="show-stats">활동 통계 표시</Label>
          <Switch 
            id="show-stats" 
            checked={options.showStats} 
            onCheckedChange={(v) => onOptionChange('showStats', v)} 
          />
        </div>
      </div>
    </Card>
  );
};
