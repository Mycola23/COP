import type { AppShellProps } from '@/types';

export const AppShell = ({ sidebar, header, children, theme = 'dark' }: AppShellProps) => (
  <div className="app-shell" data-theme={theme}>
    {sidebar}
    <div className="app-shell__main">
      {header}
      <main className="app-shell__content">{children}</main>
    </div>
  </div>
);