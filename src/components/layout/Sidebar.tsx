import { ReactNode, useState } from 'react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'countries', label: 'Countries', icon: '🌐' },
] as const;

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  const [active, setActive] = useState<string>('overview');

  return (
    <aside className="sidebar">
      <div className="sidebar__logo" aria-hidden="true">
        ◈
      </div>
      <nav className="sidebar__nav">
        <p className="sidebar__caption">Navigation</p>
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button type="button" className={`sidebar__link ${active === item.id ? 'is-active' : ''}`} onClick={() => setActive(item.id)}>
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {children ? (
        <div className="sidebar__filters">
          <p className="sidebar__caption">Filter</p>
          {children}
        </div>
      ) : null}
      <div className="sidebar__footer">
        <p className="sidebar__caption">Data from</p>
        <p className="sidebar__note">
          <a className="sidebar__link" href="https://restcountries.com/" target="_blank">
            restcountries
          </a>{' '}
          time to search filter + debounce 😎))) (Lab 3)
        </p>
      </div>
    </aside>
  );
};
