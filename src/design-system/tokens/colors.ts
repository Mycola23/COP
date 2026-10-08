export const colors = {
  palette: {
    bgDark: '#06191f',
    bgLight: '#dce8ee',
    cyan: '#8fd0e0',
    green: '#2ee6a8',
    red: '#ff5c7a',
    gold: '#f2c14e',
    goldLight: '#ffd166',
  },
  semantic: {
    primary: 'var(--accent)',
    primaryStrong: 'var(--accent-strong)',
    surface: 'var(--panel)',
    surfaceStrong: 'var(--panel-strong)',
    surfaceControl: 'var(--control)',
    border: 'var(--panel-border)',
    text: 'var(--text)',
    textMuted: 'var(--muted)',
    success: 'var(--positive)',
    danger: 'var(--negative)',
    warning: '#f2c14e',
  },
} as const;

export const tokens = {
  colors,
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    full: '999px',
  },
  shadow: {
    card: 'var(--shadow)',
    gold: '0 0 10px rgba(242, 193, 78, 0.45)',
  },
} as const;