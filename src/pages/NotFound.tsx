import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';

export function NotFoundPage() {
  return (
    <GlassCard title="404" subtitle="page not found">
      <div className="not-found">
        <span className="not-found__icon" aria-hidden="true">
          😶‍🌫️
        </span>
        <p className="not-found__title">This route doesn't exist.</p>
        <p className="not-found__hint">Head back to the overview to continue.</p>
        <Link to="/" className="back-link">
          ← Back to the past where all works greatly🔥))
        </Link>
      </div>
    </GlassCard>
  );
}
