import { Link } from 'react-router-dom';
import { Badge } from '../atoms/Badge';
import { FavoriteToggle } from '@/components/ui/FavoriteToggle';
import { formatCompact } from '@/lib/format';
import type { CountryCardProps } from '@/types';

export const CountryCard = ({ country, isFavorite = false, className = '' }: CountryCardProps) => (
  <Link
    to={`/country/${encodeURIComponent(country.code)}`}
    className={`country-card ${isFavorite ? 'country-card--favorite' : ''} ${className}`.trim()}
  >
    <div className="country-card__flag-box">
      <span className="country-card__flag-emoji" aria-hidden="true">
        {country.flagEmoji || '🏳️'}
      </span>
      <span className="country-card__code-badge">{country.code}</span>
      <div className="country-card__fav" onClick={e => e.preventDefault()}>
        <FavoriteToggle country={country} code={country.code} countryName={country.name} />
      </div>
    </div>

    <div className="country-card__content">
      <h3 className="country-card__name" title={country.name}>
        {country.name}
        {isFavorite && <Badge variant="fav">★ Favorite</Badge>}
      </h3>
      <p className="country-card__region">
        {country.region} {country.capital ? `· ${country.capital}` : ''}
      </p>

      <div className="country-card__stats">
        <div className="country-card__stat">
          <span className="country-card__stat-label">Population</span>
          <span className="country-card__stat-value">{formatCompact(country.population)}</span>
        </div>
        {country.areaKm2 ? (
          <div className="country-card__stat">
            <span className="country-card__stat-label">Area</span>
            <span className="country-card__stat-value">{formatCompact(country.areaKm2)} km²</span>
          </div>
        ) : null}
      </div>
    </div>
  </Link>
);