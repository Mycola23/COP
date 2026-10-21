import type { ThemeToggleProps } from '@/types';

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={isDark}
    aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    className={`toggle ${isDark ? 'toggle--dark' : 'toggle--light'}`}
    onClick={onToggle}
  >
    <span className="toggle__icon" aria-hidden="true">
      {isDark ? <img src="src/assets/dark.svg" alt="Dark theme icon" /> : <img src="src/assets/light.svg" alt="Light theme icon" />}
    </span>
    <span className="toggle__track">
      <span className="toggle__thumb" />
    </span>
    <span className="toggle__label">{isDark ? 'Dark' : 'Light'}</span>
  </button>
);