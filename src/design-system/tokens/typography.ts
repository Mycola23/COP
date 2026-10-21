export const typography = {
  fontFamily: {
    sans: "'Segoe UI', system-ui, -apple-system, Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '13px',
    md: '15px',
    lg: '18px',
    xl: '24px',
    xxl: '30px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;