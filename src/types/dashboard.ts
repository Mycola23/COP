export type Theme = 'dark' | 'light';
export type Metric = 'population' | 'area' | 'density';

export interface CountrySummary {
  code: string;
  name: string;
  flagEmoji: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  areaKm2: number;
  currencyCodes: string[];
  languageNames: string[];
  isUnMember: boolean;
  timezoneCount: number;
}

export interface KpiData {
  id: string;
  title: string;
  value: string;
  deltaPercent: number;
  deltaAbsolute: string;
  hint: string;
}

export interface ChartSeries {
  labels: string[];
  values: number[];
  unit: string;
}
