import { Link, useParams } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { Loader } from '@/components/ui/Loader';
import { Error as ErrorView } from '@/components/ui/Error';
import { useCountryDetails } from '@/hooks/useCountryDetails';
import { useCountries } from '@/context/CountriesContext';
import { formatCompact } from '@/lib/format';

export function CountryDetailsPage() {
  const { code } = useParams<{ code: string }>();
  const decoded = code ? decodeURIComponent(code) : undefined;

  const { country, loading, error } = useCountryDetails(decoded);
  const { retry: retryList } = useCountries();

  if (loading) {
    return (
      <GlassCard title="Country details" subtitle="loading…">
        <Loader />
      </GlassCard>
    );
  }

  if (error) {
    return (
      <GlassCard title="Country details" subtitle="request failed">
        <ErrorView message={error} onRetry={retryList} />
      </GlassCard>
    );
  }

  if (!country) {
    return (
      <GlassCard
        title="Country not found"
        subtitle={decoded ? `No match for “${decoded}”` : 'Missing country code'}
        actions={
          <Link to="/" className="back-link">
            ← Back to overview
          </Link>
        }
      >
        <div className="not-found">
          <span className="not-found__icon" aria-hidden="true">
            ∅
          </span>
          <p className="not-found__title">We couldn't locate this country.</p>
          <p className="not-found__hint">Try going back and picking another row, or check that the URL is correct.</p>
        </div>
      </GlassCard>
    );
  }

  const density = country.areaKm2 > 0 ? country.population / country.areaKm2 : 0;
  const memberships = Object.entries(country.memberships).filter(([, v]) => v);

  return (
    <GlassCard
      title={
        <span className="details-title">
          <span className="details-flag" aria-hidden="true">
            {country.flagEmoji || '🏳️'}
          </span>
          {country.name}
        </span>
      }
      subtitle={`${country.region} · ${country.subregion} · ${country.capital}`}
      actions={
        <Link to="/" className="back-link">
          ← Back to overview
        </Link>
      }
    >
      <section className="details-grid">
        <div className="details-section">
          <h3 className="details-section__title">Key numbers</h3>
          <dl className="details-dl">
            <dt>Population</dt>
            <dd>{formatCompact(country.population)}</dd>
            <dt>Area</dt>
            <dd>{formatCompact(country.areaKm2)} km²</dd>
            <dt>Density</dt>
            <dd>{isFinite(density) && density > 0 ? `${formatCompact(density)} /km²` : '—'}</dd>
            <dt>Timezones</dt>
            <dd>{country.timezoneCount}</dd>
            <dt>Driving side</dt>
            <dd className="text-cap">{country.carsDrivingSide}</dd>
            <dt>UN member</dt>
            <dd>{country.isUnMember ? 'Yes' : 'No'}</dd>
          </dl>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Languages & currencies</h3>
          <div className="details-chips">
            {country.languageNames.map(lang => (
              <span key={lang} className="chip">
                {lang}
              </span>
            ))}
          </div>
          <div className="details-chips">
            {country.currencyCodes.map(code => (
              <span key={code} className="chip chip--accent">
                {code}
              </span>
            ))}
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Memberships</h3>
          <div className="details-chips">
            {memberships.length === 0 ? (
              <span className="chip chip--muted">None</span>
            ) : (
              memberships.map(([key]) => (
                <span key={key} className="chip chip--accent">
                  {key.toUpperCase()}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Bordering countries</h3>
          <div className="details-chips">
            {country.borders.length === 0 ? (
              <span className="chip chip--muted">{country.landlocked ? 'Landlocked, no neighbours' : 'Island / no land borders'}</span>
            ) : (
              country.borders.map(code => (
                <Link key={code} to={`/country/${encodeURIComponent(code)}`} className="chip chip--link">
                  {code}
                </Link>
              ))
            )}
          </div>
        </div>

        {country.flagDescription ? (
          <div className="details-section details-section--full">
            <h3 className="details-section__title">Flag</h3>
            <p className="details-desc">{country.flagDescription}</p>
          </div>
        ) : null}

        {Object.keys(country.links).length > 0 ? (
          <div className="details-section details-section--full">
            <h3 className="details-section__title">External links</h3>
            <ul className="details-links">
              {Object.entries(country.links)
                .filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].length > 0)
                .map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      {key.replace(/_/g, ' ')} ↗
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </section>
    </GlassCard>
  );
}
