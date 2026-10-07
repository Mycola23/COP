import { BASE_URL, TOKEN, PAGE_SIZE, MAX_PAGES } from '@/constants';
import type { CountryDto, CountryFilters, V5ListResponse } from '@/types';

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

const stableId = (dto: CountryDto): string =>
  dto.codes.alpha_3 || dto.codes.alpha_2 || dto.names.common;

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

export async function fetchCountryByCode(code: string, signal?: AbortSignal): Promise<CountryDto | null> {
  if (!BASE_URL) throw new Error('VITE_RESTCOUNTRIES_BASE is not configured');
  if (!TOKEN) throw new Error('VITE_RESTCOUNTRIES_TOKEN is not configured');

  const props = ['codes.alpha_3', 'codes.alpha_2', 'names.common'] as const;
  for (const prop of props) {
    const url = new URL(`/countries/v5/${prop}/${encodeURIComponent(code)}`, BASE_URL);
    url.searchParams.set('response_fields_omit', 'names.translations,leaders');
    try {
      const response = await fetch(url, {
        signal,
        headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
      });
      if (response.status === 404) continue;
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as V5ListResponse | null;
        throw new Error(body?.errors?.[0]?.message ?? `${response.status}`);
      }
      const json = (await response.json()) as V5ListResponse;
      if (json.data.objects?.[0]) return json.data.objects[0];
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') throw err;
      continue;
    }
  }
  return null;
}