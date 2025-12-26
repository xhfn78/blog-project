import { SvgTransformOptions } from "../model/types";

export type PresetType = 'icon' | 'illustration' | 'raw';

export const PRESETS: Record<PresetType, { name: string; options: Partial<SvgTransformOptions> }> = {
  icon: {
    name: '아이콘 모드 (권장)',
    options: {
      useCurrentColor: true,
      addPropsInterface: true,
      useTypescript: true,
    }
  },
  illustration: {
    name: '일러스트 모드',
    options: {
      useCurrentColor: false,
      addPropsInterface: true,
      useTypescript: true,
    }
  },
  raw: {
    name: '최소 변환 모드',
    options: {
      useCurrentColor: false,
      addPropsInterface: false,
      useTypescript: false,
    }
  }
};
