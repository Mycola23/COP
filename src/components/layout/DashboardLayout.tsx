import { useTheme } from '@/context/ThemeContext';
import type { DashboardLayoutProps } from '@/types';

export const DashboardLayout = ({ sidebar, header, children }: DashboardLayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className="app-shell" data-theme={theme}>
      {sidebar}
      <div className="app-shell__main">
        {header}
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  );
};