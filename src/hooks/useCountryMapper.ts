import type { CountryDto } from '@/types/api';
import type { CountrySummary } from '@/types/dashboard';

export const useCountrySummary = (dto: CountryDto): CountrySummary => ({
  code: dto.codes.alpha_3 || dto.codes.alpha_2 || dto.names.common,
  name: dto.names.common,
  flagEmoji: dto.flag.emoji ?? '',
  region: dto.region,
  subregion: dto.subregion,
  capital: dto.capitals[0]?.name ?? '—',
  population: dto.population,
  areaKm2: dto.area.kilometers,
  currencyCodes: dto.currencies.map(c => c.code),
  languageNames: dto.languages.map(l => l.name),
  isUnMember: dto.classification.un_member,
  timezoneCount: dto.timezones.length,
});
