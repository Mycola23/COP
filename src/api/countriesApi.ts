import type { CountryDto } from '@/types/api';
import type { CountryFilters } from '@/types/dashboard';

const BASE_URL: string | undefined = import.meta.env.VITE_RESTCOUNTRIES_BASE;
const TOKEN: string | undefined = import.meta.env.VITE_RESTCOUNTRIES_TOKEN;

const PAGE_SIZE = 100;
const MAX_PAGES = 5;

interface V5Meta {
  total: number;
  count: number;
  limit: number;
  offset: number;
  more: boolean;
}
interface V5ListResponse {
  data: { objects: CountryDto[]; meta: V5Meta };
  errors?: { message: string }[];
}

const buildUrl = (filters: CountryFilters, limit: number, offset: number): URL => {
  const url = new URL('/countries/v5', BASE_URL);
  const query = filters.query.trim();
  if (query) url.searchParams.set('q', query);
  if (filters.region !== 'all') url.searchParams.set('region', filters.region);
  if (filters.unOnly) url.searchParams.set('memberships.un', '1');
  url.searchParams.set('limit', String(limit));
  if (offset > 0) url.searchParams.set('offset', String(offset));
  url.searchParams.set('response_fields_omit', 'names.translations,leaders');
  return url;
};

const requestPage = async (url: URL, signal?: AbortSignal): Promise<V5ListResponse> => {
  const response = await fetch(url, {
    signal,
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as V5ListResponse | null;
    const message = body?.errors?.[0]?.message ?? `${response.status} ${response.statusText}`;
    throw new Error(`restcountries: ${message}`);
  }
  return (await response.json()) as V5ListResponse;
};

export async function fetchCountries(filters: CountryFilters, signal?: AbortSignal): Promise<CountryDto[]> {
  if (!BASE_URL) throw new Error('VITE_RESTCOUNTRIES_BASE is not configured');
  if (!TOKEN) throw new Error('VITE_RESTCOUNTRIES_TOKEN is not configured');

  if (filters.limit > 0) {
    const page = await requestPage(buildUrl(filters, Math.min(filters.limit, PAGE_SIZE), 0), signal);
    return dedupeById(page.data.objects ?? []);
  }

  const collected: CountryDto[] = [];
  let offset = 0;
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const result = await requestPage(buildUrl(filters, PAGE_SIZE, offset), signal);
    collected.push(...(result.data.objects ?? []));
    if (!result.data.meta.more) break;
    offset += result.data.meta.count;
  }
  return collected;
}

export const fetchAllCountries = (signal?: AbortSignal): Promise<CountryDto[]> =>
  fetchCountries({ query: '', region: 'all', limit: 0, unOnly: false }, signal);

const stableId = (dto: CountryDto): string => dto.codes.alpha_3 || dto.codes.alpha_2 || dto.names.common;

const dedupeById = (dtos: CountryDto[]): CountryDto[] => {
  const seen = new Set<string>();
  const unique: CountryDto[] = [];
  for (const dto of dtos) {
    const id = stableId(dto);
    if (seen.has(id)) continue;
    seen.add(id);
    unique.push(dto);
  }
  return unique;
};
