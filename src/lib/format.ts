const compactFormatter = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

export const formatCompact = (value: number): string => compactFormatter.format(value);

export const formatSignedPercent = (value: number): string => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
