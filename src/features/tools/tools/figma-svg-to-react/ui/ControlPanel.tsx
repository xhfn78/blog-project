'use client';

import { Textarea } from "@/shared/ui/textarea";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { SvgTransformOptions } from "../model/types";

interface ControlPanelProps {
  inputSvg: string;
  onInputChange: (value: string) => void;
  options: SvgTransformOptions;
  onOptionsChange: (options: Partial<SvgTransformOptions>) => void;
}

export function ControlPanel({
  inputSvg,
  onInputChange,
  options,
  onOptionsChange,
}: ControlPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <Label htmlFor="svg-input" className="text-lg font-semibold">
          SVG 소스 코드 (Figma에서 복사)
        </Label>
        <Textarea
          id="svg-input"
          placeholder='<svg width="100" height="100" ...'
          className="min-h-[200px] font-mono text-sm bg-slate-50"
          value={inputSvg}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-white shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="component-name">컴포넌트 이름</Label>
            <Input
              id="component-name"
              placeholder="IconComponent"
              value={options.componentName}
              onChange={(e) => onOptionsChange({ componentName: e.target.value })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="ts-switch">TypeScript 사용</Label>
            <Switch
              id="ts-switch"
              checked={options.useTypescript}
              onCheckedChange={(checked) => onOptionsChange({ useTypescript: checked })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="color-switch">currentColor 적용 (색상 가변화)</Label>
            <Switch
              id="color-switch"
              checked={options.useCurrentColor}
              onCheckedChange={(checked) => onOptionsChange({ useCurrentColor: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="props-switch">Props 인터페이스 추가</Label>
            <Switch
              id="props-switch"
              checked={options.addPropsInterface}
              disabled={!options.useTypescript}
              onCheckedChange={(checked) => onOptionsChange({ addPropsInterface: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
