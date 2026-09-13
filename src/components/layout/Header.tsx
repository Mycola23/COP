import { ThemeToggle } from '@/components/widgets/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className="header">
      <div>
        <h1 className="header__title">Overview</h1>
        <p className="header__subtitle">World countries & little more 😸</p>
      </div>
      <div className="header__controls">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>
    </header>
  );
};
