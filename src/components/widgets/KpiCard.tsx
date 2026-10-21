import { DeltaBadge } from '@/components/ui/DeltaBadge';
import type { KpiData } from '@/types/dashboard';

interface KpiCardProps {
  kpi: KpiData;
}

export const KpiCard = ({ kpi }: KpiCardProps) => (
  <article className="glass-card kpi-card">
    <h3 className="kpi-card__title">{kpi.title}</h3>
    <p className="kpi-card__value">{kpi.value}</p>
    <DeltaBadge percent={kpi.deltaPercent} absolute={kpi.deltaAbsolute} />
    <p className="kpi-card__hint">{kpi.hint}</p>
  </article>
);
