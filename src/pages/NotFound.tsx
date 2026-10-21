import { Link } from 'react-router-dom';
import { Card, StateView } from '@/design-system';

export function NotFoundPage() {
  return (
    <Card
      title="404"
      subtitle="page not found"
      actions={
        <Link to="/" className="back-link">
          ← Back to overview
        </Link>
      }
    >
      <StateView
        type="notFound"
        title="This route doesn't exist."
        subtitle="Head back to the overview to continue."
        customIcon="😶‍🌫️"
      />
    </Card>
  );
}