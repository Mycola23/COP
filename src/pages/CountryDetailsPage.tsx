import { Link, useParams } from 'react-router-dom';
import { Card, Badge, StateView, DescriptionList } from '@/design-system';
import { FavoriteToggle } from '@/components/ui/FavoriteToggle';
import { useCountryDetails } from '@/hooks/useCountryDetails';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFilters } from '@/store/selectors';
import { fetchCountriesThunk } from '@/store/slices/countriesSlice';
import { formatCompact } from '@/lib/format';

export function CountryDetailsPage() {
  const { code } = useParams<{ code: string }>();
  const decoded = code ? decodeURIComponent(code) : undefined;
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const { country, loading, error } = useCountryDetails(decoded);

  if (loading) {
    return (
      <Card title="Country details" subtitle="loading…">
        <StateView type="loading" title="All that we do load load load data" subtitle="Fetching data from restcountries.com" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Country details" subtitle="request failed">
        <StateView
          type="error"
          title="Failed to load country details"
          subtitle={error}
          actionText="Retry"
          onAction={() => dispatch(fetchCountriesThunk(filters))}
        />
      </Card>
    );
  }

  if (!country) {
    return (
      <Card
        title="Country not found"
        subtitle={decoded ? `No match for “${decoded}”` : 'Missing country code'}
        actions={
          <Link to="/" className="back-link">
            ← Back to overview
          </Link>
        }
      >
        <StateView
          type="notFound"
          title="We couldn't locate this country."
          subtitle="Try going back and picking another row, or check that the URL is correct."
          customIcon="∅"
        />
      </Card>
    );
  }

  const density = country.areaKm2 > 0 ? country.population / country.areaKm2 : 0;
  const memberships = Object.entries(country.memberships).filter(([, v]) => v);

  const keyNumbers = [
    { label: 'Population', value: formatCompact(country.population) },
    { label: 'Area', value: `${formatCompact(country.areaKm2)} km²` },
    { label: 'Density', value: isFinite(density) && density > 0 ? `${formatCompact(density)} /km²` : '—' },
    { label: 'Timezones', value: country.timezoneCount },
    { label: 'Driving side', value: <span className="text-cap">{country.carsDrivingSide}</span> },
    { label: 'UN member', value: country.isUnMember ? 'Yes' : 'No' },
  ];

  return (
    <Card
      title={
        <span className="details-title">
          <span className="details-flag" aria-hidden="true">
            {country.flagEmoji || '🏳️'}
          </span>
          {country.name}
          <FavoriteToggle country={country} code={country.code} countryName={country.name} className="fav-btn--details" />
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
          <DescriptionList items={keyNumbers} />
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Languages & currencies</h3>
          <div className="details-chips">
            {country.languageNames.map(lang => (
              <Badge key={lang}>{lang}</Badge>
            ))}
          </div>
          <div className="details-chips">
            {country.currencyCodes.map(c => (
              <Badge key={c} variant="accent">{c}</Badge>
            ))}
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Memberships</h3>
          <div className="details-chips">
            {memberships.length === 0 ? (
              <Badge variant="muted">None</Badge>
            ) : (
              memberships.map(([key]) => (
                <Badge key={key} variant="accent">
                  {key.toUpperCase()}
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="details-section">
          <h3 className="details-section__title">Bordering countries</h3>
          <div className="details-chips">
            {country.borders.length === 0 ? (
              <Badge variant="muted">
                {country.landlocked ? 'Landlocked, no neighbours' : 'Island / no land borders'}
              </Badge>
            ) : (
              country.borders.map(b => (
                <Link key={b} to={`/country/${encodeURIComponent(b)}`} className="chip chip--link">
                  {b}
                </Link>
              ))
            )}
          </div>
        </div>

        {country.flagDescription && (
          <div className="details-section details-section--full">
            <h3 className="details-section__title">Flag</h3>
            <p className="details-desc">{country.flagDescription}</p>
          </div>
        )}

        {Object.keys(country.links).length > 0 && (
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
        )}
      </section>
    </Card>
  );
}