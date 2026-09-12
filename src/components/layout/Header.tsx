import { ThemeToggle } from '@/components/widgets/ThemeToggle';
import type { Metric } from '@/types/dashboard';

const METRICS: { id: Metric; label: string }[] = [
  { id: 'population', label: 'Population' },
  { id: 'area', label: 'Area' },
  { id: 'density', label: 'Density' },
];

interface HeaderProps {
  metric: Metric;
  onMetricChange: (metric: Metric) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header = ({ metric, onMetricChange, isDark, onToggleTheme }: HeaderProps) => (
  <header className="header">
    <div>
      <h1 className="header__title">Overview</h1>
      <p className="header__subtitle">World countries & little more 😸</p>
    </div>
    <div className="header__controls">
      <div className="header__tabs" role="tablist" aria-label="Metric">
        {METRICS.map(item => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={metric === item.id}
            className={`header__tab ${metric === item.id ? 'is-active' : ''}`}
            onClick={() => onMetricChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
    </div>
  </header>
);
