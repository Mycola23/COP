export type Theme = 'dark' | 'light';
export type Metric = 'population' | 'area' | 'density';

export interface CountrySummary {
  code: string;
  name: string;
  flagEmoji: string;
  flagDescription: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  areaKm2: number;
  currencyCodes: string[];
  languageNames: string[];
  isUnMember: boolean;
  landlocked: boolean;
  timezoneCount: number;
  timezones: string[];
  borders: string[];
  memberships: Record<string, boolean>;
  links: Record<string, string | undefined>;
  carsDrivingSide: string;
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

export interface CountryFilters {
  query: string;
  region: string;
  limit: number;
  unOnly: boolean;
}
