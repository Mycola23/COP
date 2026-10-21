import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS: { label: string; icon: string; to: string; end?: boolean }[] = [
  { label: 'Overview', icon: '▦', to: '/', end: true },
  { label: 'Countries', icon: '🌐', to: '/countries' },
];

interface SidebarProps {
  children?: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => (
  <aside className="sidebar">
    <div className="sidebar__logo" aria-hidden="true">
      ◈
    </div>

    <nav className="sidebar__nav">
      <p className="sidebar__caption">Navigation</p>
      <ul>
        {NAV_ITEMS.map(item => (
          <li key={item.to}>
            <NavLink to={item.to} end={item.end} className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}>
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
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
        <a className="sidebar__link" href="https://restcountries.com/" target="_blank" rel="noreferrer noopener">
          restcountries
        </a>{' '}
        time to search filter + debounce 😎))) (Lab 3)
      </p>
    </div>
  </aside>
);
