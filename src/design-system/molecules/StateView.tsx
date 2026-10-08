import type { StateViewProps } from '@/types';
import { STATE_ICONS } from '@/constants';
import { Spinner } from '../atoms/Spinner';

export const StateView = ({ type, title, subtitle, actionText, onAction, customIcon }: StateViewProps) => (
  <section className={`state state--${type}`} role={type === 'error' ? 'alert' : undefined}>
    {type === 'loading' ? (
      <Spinner />
    ) : (
      <span className="state__icon" aria-hidden="true">
        {customIcon || STATE_ICONS[type] || '∅'}
      </span>
    )}
    <p className="state__title">{title}</p>
    {subtitle && <p className="state__hint">{subtitle}</p>}
    {actionText && onAction && (
      <button type="button" className="state__retry" onClick={onAction}>
        {actionText}
      </button>
    )}
  </section>
);