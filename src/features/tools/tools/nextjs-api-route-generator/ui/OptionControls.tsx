'use client';

import { Label } from '@/shared/ui/label';
import { Checkbox } from '@/shared/ui/checkbox';
import { Card } from '@/shared/ui/card';
import { GeneratorOptions } from '../model/types';

interface OptionControlsProps {
  options: GeneratorOptions;
  onChange: (newOptions: GeneratorOptions) => void;
}

export function OptionControls({ options, onChange }: OptionControlsProps) {
  const toggleMethod = (method: keyof GeneratorOptions['methods']) => {
    onChange({
      ...options,
      methods: { ...options.methods, [method]: !options.methods[method] },
    });
  };

  const toggleFeature = (feature: keyof GeneratorOptions['features']) => {
    onChange({
      ...options,
      features: { ...options.features, [feature]: !options.features[feature] },
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-slate-50 dark:bg-slate-900 border-none">
        <Label className="text-base font-semibold mb-3 block">HTTP Methods</Label>
        <div className="flex flex-wrap gap-4">
          {(Object.keys(options.methods) as Array<keyof GeneratorOptions['methods']>).map((method) => (
            <div key={method} className="flex items-center space-x-2">
              <Checkbox
                id={`method-${method}`}
                checked={options.methods[method]}
                onCheckedChange={() => toggleMethod(method)}
              />
              <Label htmlFor={`method-${method}`} className="cursor-pointer">{method}</Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 bg-slate-50 dark:bg-slate-900 border-none">
        <Label className="text-base font-semibold mb-3 block">Features</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature-zod"
              checked={options.features.includeZod}
              onCheckedChange={() => toggleFeature('includeZod')}
            />
            <Label htmlFor="feature-zod" className="cursor-pointer">Zod Validation 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature-trycatch"
              checked={options.features.includeTryCatch}
              onCheckedChange={() => toggleFeature('includeTryCatch')}
            />
            <Label htmlFor="feature-trycatch" className="cursor-pointer">Try-Catch 블록 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature-comments"
              checked={options.features.includeComments}
              onCheckedChange={() => toggleFeature('includeComments')}
            />
            <Label htmlFor="feature-comments" className="cursor-pointer">주석 포함</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="feature-dynamic"
              checked={options.features.dynamicRoute}
              onCheckedChange={() => toggleFeature('dynamicRoute')}
            />
            <Label htmlFor="feature-dynamic" className="cursor-pointer">Dynamic Route ([id])</Label>
          </div>
        </div>
      </Card>
    </div>
  );
}
