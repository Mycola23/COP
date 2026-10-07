import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleFavorite } from '@/store/slices/favoritesSlice';
import { selectFavorites, selectCountries, selectFavoriteEntities } from '@/store/selectors';
import type { FavoriteToggleProps } from '@/types';

export const FavoriteToggle = ({ country, code, countryName, className = '' }: FavoriteToggleProps) => {
  const dispatch = useAppDispatch();
  const normalizedCode = code.toUpperCase();
  const favorites = useAppSelector(selectFavorites);
  const countries = useAppSelector(selectCountries);
  const favEntities = useAppSelector(selectFavoriteEntities);

  const isFav = favorites.includes(normalizedCode);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const targetCountry =
      country ??
      favEntities[normalizedCode] ??
      countries.find(c => c.code.toUpperCase() === normalizedCode);

    if (targetCountry) {
      dispatch(toggleFavorite(targetCountry));
    } else {
      dispatch(toggleFavorite(code));
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`fav-btn ${isFav ? 'fav-btn--active' : ''} ${className}`}
      aria-label={isFav ? `Remove ${countryName ?? code} from favorites` : `Add ${countryName ?? code} to favorites`}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <span aria-hidden="true">{isFav ? '★' : '☆'}</span>
    </button>
  );
};