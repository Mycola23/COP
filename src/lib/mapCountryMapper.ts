import type { CountryDto } from '@/types/api';
import type { CountrySummary } from '@/types/dashboard';

export const mapCountrySummary = (dto: CountryDto): CountrySummary => ({
  code: dto.codes.alpha_3 || dto.codes.alpha_2 || dto.names.common,
  name: dto.names.common,
  flagEmoji: dto.flag.emoji ?? '',
  flagDescription: dto.flag.description ?? '',
  region: dto.region,
  subregion: dto.subregion,
  capital: dto.capitals[0]?.name ?? '—',
  population: dto.population,
  areaKm2: dto.area.kilometers,
  currencyCodes: dto.currencies.map(currency => currency.code),
  languageNames: dto.languages.map(language => language.name),
  isUnMember: dto.classification.un_member,
  landlocked: dto.landlocked,
  timezoneCount: dto.timezones.length,
  timezones: dto.timezones,
  borders: dto.borders ?? [],
  memberships: dto.memberships ?? {},
  links: dto.links ?? {},
  carsDrivingSide: dto.cars?.driving_side ?? 'unknown',
});
