export type ObjectType = 'title' | 'text' | 'icon' | 'divider' | 'shape';
export type LayoutType = 'stack' | 'grid' | 'timeline' | 'free';

export interface VibeObject {
  id: string;
  type: ObjectType;
  content: string;
  subContent?: string;
  style: {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    opacity?: number;
    borderRadius?: number;
    padding?: number;
    textAlign?: 'left' | 'center' | 'right';
    accentColor?: string;
    borderWidth?: number;
    shadow?: number;
  };
}

export interface DesignConfig {
  id: string;
  name: string;
  layout: LayoutType;
  backgroundColor: string;
  globalPadding: number;
  canvasWidth: number;
  canvasHeight?: number;
  autoHeight: boolean;
}

export const THEME_PRESETS = [
  { id: 'minimal', name: 'Minimal White', bg: '#FFFFFF', accent: '#000000' },
  { id: 'premium', name: 'Premium Dark', bg: '#0F172A', accent: '#38BDF8' },
  { id: 'vibrant', name: 'Vibrant Orange', bg: '#FFF7ED', accent: '#F97316' },
  { id: 'nature', name: 'Forest Green', bg: '#F0FDF4', accent: '#166534' },
];
