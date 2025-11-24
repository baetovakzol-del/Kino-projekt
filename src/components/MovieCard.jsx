import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import '../styles/components/MovieCard.scss';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  const getImageUrl = (path, size = 'w500') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-image.jpg';
  };

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-image">
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          <button 
            className={`favorite-button ${isFav ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
          >
            {isFav ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
              </svg>
            )}
          </button>
        </div>
        <div className="movie-card-content">
          <h3 className="movie-card-title" title={movie.title}>
            {movie.title}
          </h3>
          <div className="movie-card-meta">
            <span className="movie-card-year">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
            <span className="movie-card-rating">
              {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
            </span>
          </div>
          {isHovered && movie.genre_ids && (
            <div className="movie-card-overlay">
              <span className="movie-card-genres">
                {movie.genre_ids.slice(0, 2).map((id, index) => {
                  // We don't have genre names here, so we'll just show the IDs
                  return (
                    <span key={id} className="genre-tag">
                      Жанр {id}
                    </span>
                  );
                })}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;