import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../api/TMDB';
import { useAuth } from '../contexts/AuthContext';
import { addToHistory } from '../api/supabase';
import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import SkeletonCard from '../components/SkeletonCard';
import TrailerModal from '../components/TrailerModal';
import Reviews from '../components/Reviews';
import '../styles/pages/MoviePage.scss';

const MoviePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const [movieData, similarData] = await Promise.all([
          getMovieDetails(id),
          getSimilarMovies(id)
        ]);

        setMovie(movieData);
        setSimilarMovies(similarData.results || []);

        // Add to watch history if user is logged in
        if (user && movieData) {
          await addToHistory(movieData, user.id);
        }

        // Find YouTube trailer from the movie details response
        const trailer = movieData.videos?.results?.find(
          video => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailerKey(trailer?.key || null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Не удалось загрузить информацию о фильме. Пожалуйста, проверьте подключение к интернету и попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, user]);

  if (loading) {
    return (
      <div className="movie-page">
        <div className="container">
          <div className="movie-loading">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-page">
        <div className="container">
          <div className="movie-error">
            <h2>Ошибка загрузки</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-page">
        <div className="container">
          <div className="movie-not-found">
            <h2>Фильм не найден</h2>
            <p>Извините, мы не смогли найти запрашиваемый фильм.</p>
          </div>
        </div>
      </div>
    );
  }

  const isFav = isFavorite(movie.id);
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const genres = movie.genres?.map(genre => genre.name).join(', ') || 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  const getImageUrl = (path, size = 'w500') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-image.jpg';
  };

  return (
    <div className="movie-page">
      <div className="container">
        <div className="movie-header">
          <div className="movie-poster">
            <img 
              src={getImageUrl(movie.poster_path, 'w500')} 
              alt={movie.title}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
          
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            
            <div className="movie-meta">
              <span className="movie-year">{releaseYear}</span>
              <span className="movie-rating">{rating}</span>
              <span className="movie-duration">
                {movie.runtime ? `${movie.runtime} мин` : 'N/A'}
              </span>
            </div>
            
            <div className="movie-genres">
              {genres}
            </div>
            
            <p className="movie-overview">
              {movie.overview || 'Описание отсутствует.'}
            </p>
            
            <button 
              className={`favorite-button ${isFav ? 'active' : ''}`}
              onClick={() => toggleFavorite(movie)}
            >
              {isFav ? 'Удалить из избранного' : 'Добавить в избранное'}
            </button>
            
            {trailerKey && (
              <button 
                className="trailer-button"
                onClick={() => setShowTrailer(true)}
              >
                Смотреть трейлер
              </button>
            )}
          </div>
        </div>
        
        <div className="movie-cast">
          <h2>Актеры</h2>
          {movie.credits?.cast && movie.credits.cast.length > 0 ? (
            <div className="cast-list">
              {movie.credits.cast.slice(0, 10).map(actor => (
                <div key={actor.id} className="cast-item">
                  <div className="cast-image">
                    <img 
                      src={getImageUrl(actor.profile_path, 'w185')} 
                      alt={actor.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-actor.jpg';
                      }}
                    />
                  </div>
                  <div className="cast-info">
                    <h3 className="actor-name">{actor.name}</h3>
                    <p className="character-name">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Информация об актерах отсутствует.</p>
          )}
        </div>
        
        <div className="similar-movies">
          <h2>Похожие фильмы</h2>
          {similarMovies.length > 0 ? (
            <div className="movies-grid">
              {similarMovies.slice(0, 10).map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p>Похожие фильмы не найдены.</p>
          )}
        </div>
        
        <Reviews movieId={id} />
      </div>
      
      {showTrailer && trailerKey && (
        <TrailerModal 
          trailerKey={trailerKey} 
          onClose={() => setShowTrailer(false)} 
        />
      )}
    </div>
  );
};

export default MoviePage;