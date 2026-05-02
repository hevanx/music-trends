export interface Hook {
  hook: string;
  why: string;
  example: string;
}

export interface Format {
  format: string;
  description: string;
}

export interface Angle {
  angle: string;
  description: string;
}

export interface TrendsData {
  week: string;
  generatedAt: string;
  hooks: Hook[];
  formats: Format[];
  angles: Angle[];
  dying: string[];
  summary: string;
}
