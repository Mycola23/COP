import { DeltaBadge } from '../atoms/DeltaBadge';
import type { KpiCardProps } from '@/types';

export const KpiWidget = ({ kpi }: KpiCardProps) => (
  <article className="glass-card kpi-card">
    <h3 className="kpi-card__title">{kpi.title}</h3>
    <p className="kpi-card__value">{kpi.value}</p>
    <DeltaBadge percent={kpi.deltaPercent} absolute={kpi.deltaAbsolute} />
    <p className="kpi-card__hint">{kpi.hint}</p>
  </article>
);