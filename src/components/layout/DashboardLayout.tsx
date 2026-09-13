import type { ReactNode } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface DashboardLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

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
