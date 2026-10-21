import { useEffect, useState } from 'react';

export function useDebounce(value: string, delayMs = 400): string {
  const [debounced, setDebounced] = useState<string>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
