import type { CountryDto } from '@/types/api';

const BASE_URL = import.meta.env.VITE_RESTCOUNTRIES_BASE;
const TOKEN = import.meta.env.VITE_RESTCOUNTRIES_TOKEN;

interface ApiResponse {
  data: {
    objects: CountryDto[];
    meta: { total: number; count: number; more: boolean };
  };
}

export async function fetchAllCountries(signal?: AbortSignal): Promise<CountryDto[]> {
  if (!BASE_URL) throw new Error('VITE_RESTCOUNTRIES_BASE is not configured');
  if (!TOKEN) throw new Error('VITE_RESTCOUNTRIES_TOKEN is not configured');

  const url = new URL('/countries/v5', BASE_URL);
  url.searchParams.set('pretty', '0');

  const response = await fetch(url, {
    signal,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`restcountries ${response.status}: ${response.statusText} ${text.slice(0, 120)}`);
  }

  const json = (await response.json()) as ApiResponse;
  return json.data.objects ?? [];
}
