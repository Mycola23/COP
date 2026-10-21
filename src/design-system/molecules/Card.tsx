import type { CardProps } from '@/types';

export const Card = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
  headerClassName = '',
}: CardProps) => (
  <section className={`glass-card ${className}`.trim()}>
    {(title || subtitle || actions) && (
      <header className={`glass-card__head ${headerClassName}`.trim()}>
        <div>
          {title && (typeof title === 'string' ? <h2 className="glass-card__title">{title}</h2> : title)}
          {subtitle && <p className="glass-card__subtitle">{subtitle}</p>}
        </div>
        {actions && <div className="glass-card__actions">{actions}</div>}
      </header>
    )}
    <div className="glass-card__body">{children}</div>
  </section>
);