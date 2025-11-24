import { useState, useEffect, useMemo } from 'react';
import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import '../styles/pages/Favorites.scss';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter favorites based on search query using useMemo for performance
  const filteredFavorites = useMemo(() => {
    if (!searchQuery) {
      return favorites;
    }
    
    return favorites.filter(movie => 
      movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [favorites, searchQuery]);

  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-header">
          <h1 className="page-title">Избранное</h1>
          {favorites.length > 0 && (
            <div className="search-box">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Поиск в избранном..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
              </svg>
            </div>
            <h2>У вас пока нет избранных фильмов</h2>
            <p>Добавьте фильмы в избранное, чтобы найти их здесь</p>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="no-results">
            <h2>Фильмы не найдены</h2>
            <p>Попробуйте изменить поисковый запрос</p>
          </div>
        ) : (
          <>
            <div className="results-info">
              Найдено фильмов: {filteredFavorites.length}
            </div>
            <div className="movies-grid">
              {filteredFavorites.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;