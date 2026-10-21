interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <button type="button" role="switch" aria-checked={isDark} className={`toggle ${isDark ? 'toggle--dark' : 'toggle--light'}`} onClick={onToggle}>
    <span className="toggle__icon" aria-hidden="true">
      {isDark ? <img src="src/assets/dark.svg"></img> : <img src="src/assets/light.svg"></img>}
    </span>
    <span className="toggle__track">
      <span className="toggle__thumb" />
    </span>
    <span className="toggle__label">{isDark ? 'Dark' : 'Light'}</span>
  </button>
);
