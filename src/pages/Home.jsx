import { useState, useEffect, useCallback } from 'react';
import { getPopularMovies, getTopRatedMovies, searchMovies, getMovieDetails } from '../api/TMDB';
import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import '../styles/pages/Home.scss';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState({
    popular: true,
    topRated: true,
    actors: true,
    reviews: true,
    surprise: false
  });
  const [error, setError] = useState(null);

  const [surpriseMovie, setSurpriseMovie] = useState(null);
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showMovieModal, setShowMovieModal] = useState(false);

  const { favorites: favoriteMovies } = useFavorites();



  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(prev => ({ ...prev, popular: true, topRated: true }));
        setError(null);
        
        // Fetch all data in parallel
        const [popularData, topRatedData] = await Promise.all([
          getPopularMovies(1),
          getTopRatedMovies(1)
        ]);
        
        setPopularMovies(popularData || []);
        setTopRatedMovies(topRatedData || []);
        
        // Mock data for actors and reviews
        setActors([
          { id: 1, name: "Роберт Дауни мл.", image: "/placeholder-actor.jpg" },
          { id: 2, name: "Скарлетт Йоханссон", image: "/placeholder-actor.jpg" },
          { id: 3, name: "Крис Эванс", image: "/placeholder-actor.jpg" },
          { id: 4, name: "Крис Хемсворт", image: "/placeholder-actor.jpg" },
          { id: 5, name: "Марк Руффало", image: "/placeholder-actor.jpg" },
          { id: 6, name: "Бенедикт Камбербэтч", image: "/placeholder-actor.jpg" },
          { id: 7, name: "Зои Салдана", image: "/placeholder-actor.jpg" },
          { id: 8, name: "Крис Пратт", image: "/placeholder-actor.jpg" }
        ]);
        
        setReviews([
          { id: 1, user: "Алексей", rating: 5, text: "Потрясающий фильм! Смотрел дважды." },
          { id: 2, user: "Мария", rating: 4, text: "Отличный сюжет и актерская игра." },
          { id: 3, user: "Дмитрий", rating: 5, text: "Лучший фильм этого года!" },
          { id: 4, user: "Елена", rating: 4, text: "Рекомендую к просмотру всей семье." },
          { id: 5, user: "Иван", rating: 5, text: "Великолепные спецэффекты и саундтрек." }
        ]);
        
        setLoading(prev => ({ 
          ...prev, 
          popular: false, 
          topRated: false, 
          actors: false,
          reviews: false
        }));
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Не удалось загрузить фильмы. Пожалуйста, проверьте подключение к интернету и попробуйте позже.');
        setLoading(prev => ({ 
          ...prev, 
          popular: false, 
          topRated: false,
          actors: false,
          reviews: false
        }));
      }
    };

    fetchMovies();
  }, []);

  // Update favorites when they change
  useEffect(() => {
    setFavorites(favoriteMovies);
  }, [favoriteMovies]);

  // Get random movie for surprise button
  const getRandomMovie = useCallback(async () => {
    if (popularMovies.length === 0) return;
    
    setLoading(prev => ({ ...prev, surprise: true }));
    
    try {
      // Get a random movie from popular movies
      const randomIndex = Math.floor(Math.random() * popularMovies.length);
      const movie = popularMovies[randomIndex];
      
      // Fetch detailed info for the movie
      const movieDetails = await getMovieDetails(movie.id);
      setSurpriseMovie(movieDetails);
      setShowSurpriseModal(true);
    } catch (error) {
      console.error('Error fetching surprise movie:', error);
    } finally {
      setLoading(prev => ({ ...prev, surprise: false }));
    }
  }, [popularMovies]);

  // Close surprise modal
  const closeSurpriseModal = () => {
    setShowSurpriseModal(false);
    setSurpriseMovie(null);
  };

  // Show movie details modal
  const showMovieDetails = async (movie) => {
    try {
      const movieDetails = await getMovieDetails(movie.id);
      setSelectedMovie(movieDetails);
      setShowMovieModal(true);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // Close movie details modal
  const closeMovieModal = () => {
    setShowMovieModal(false);
    setSelectedMovie(null);
  };

  // Render popular movies section
  const renderPopularMovies = () => {
    if (loading.popular) {
      return (
        <div className="movies-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="movies-grid">
        {popularMovies.slice(0, 8).map(movie => (
          <div key={movie.id} onClick={() => showMovieDetails(movie)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    );
  };

  // Render top rated movies section
  const renderTopRatedMovies = () => {
    if (loading.topRated) {
      return (
        <div className="movies-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="movies-grid">
        {topRatedMovies.slice(0, 8).map(movie => (
          <div key={movie.id} onClick={() => showMovieDetails(movie)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    );
  };

  // Render actors slider
  const renderActorsSlider = () => {
    if (loading.actors) {
      return (
        <div className="actors-slider">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="actor-card skeleton">
              <div className="actor-image skeleton-image"></div>
              <div className="actor-name skeleton-text"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="actors-slider">
        {actors.map(actor => (
          <div key={actor.id} className="actor-card">
            <div className="actor-image">
              <img src={actor.image} alt={actor.name} />
            </div>
            <div className="actor-name">{actor.name}</div>
          </div>
        ))}
      </div>
    );
  };

  // Render reviews section
  const renderReviews = () => {
    if (loading.reviews) {
      return (
        <div className="reviews-slider">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="review-card skeleton">
              <div className="review-header">
                <div className="review-user skeleton-text short"></div>
                <div className="review-rating skeleton-text tiny"></div>
              </div>
              <div className="review-text skeleton-text"></div>
              <div className="review-text skeleton-text short"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="reviews-slider">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="review-user">{review.user}</div>
              <div className="review-rating">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            <div className="review-text">{review.text}</div>
          </div>
        ))}
      </div>
    );
  };

  // Render surprise movie modal
  const renderSurpriseModal = () => {
    if (!showSurpriseModal || !surpriseMovie) return null;

    return (
      <div className="modal-overlay" onClick={closeSurpriseModal}>
        <div className="surprise-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={closeSurpriseModal}>×</button>
          <div className="modal-content">
            <h2>Сюрпризный фильм!</h2>
            <MovieDetail movie={surpriseMovie} />
          </div>
        </div>
      </div>
    );
  };

  // Render movie details modal
  const renderMovieModal = () => {
    if (!showMovieModal || !selectedMovie) return null;

    return (
      <div className="modal-overlay" onClick={closeMovieModal}>
        <div className="surprise-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={closeMovieModal}>×</button>
          <div className="modal-content">
            <h2>{selectedMovie.title}</h2>
            <MovieDetail movie={selectedMovie} />
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="home-page">
        <div className="container">
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Добро пожаловать в Онлайн Кинотеатр</h1>
              <p className="hero-subtitle">Откройте для себя лучшие фильмы со всего мира</p>
              <button className="hero-button" onClick={() => window.location.reload()}>
                Повторить попытку
              </button>
            </div>
          </div>
          <div className="error-message">
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

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Добро пожаловать в Онлайн Кинотеатр</h1>
            <p className="hero-subtitle">Откройте для себя лучшие фильмы со всего мира</p>
            <button 
              className="hero-button surprise-button" 
              onClick={getRandomMovie}
              disabled={loading.surprise}
            >
              {loading.surprise ? 'Загрузка...' : 'Сюрпризный фильм'}
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <SearchBar />
        </div>

        {/* Popular Movies Section */}
        <div className="section">
          <h2 className="section-title">Популярные фильмы</h2>
          {renderPopularMovies()}
        </div>

        {/* Top Rated Movies Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">Топ рейтинга</h2>
            <div className="sorting-options">
              <button className="sort-button active">По рейтингу</button>
              <button className="sort-button">По популярности</button>
            </div>
          </div>
          {renderTopRatedMovies()}
        </div>

        {/* Popular Actors Section */}
        <div className="section">
          <h2 className="section-title">Популярные актеры</h2>
          {renderActorsSlider()}
        </div>

        {/* User Reviews Section */}
        <div className="section">
          <h2 className="section-title">Отзывы пользователей</h2>
          {renderReviews()}
        </div>

        {/* Favorites Section */}
        <div className="section">
          <h2 className="section-title">Избранное</h2>
          {favorites.length > 0 ? (
            <div className="movies-grid">
              {favorites.slice(0, 4).map(movie => (
                <div key={movie.id} onClick={() => showMovieDetails(movie)}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-favorites">
              <p>Вы еще не добавили фильмы в избранное</p>
            </div>
          )}
        </div>
      </div>

      {/* Surprise Movie Modal */}
      {renderSurpriseModal()}

      {/* Movie Details Modal */}
      {renderMovieModal()}
    </div>
  );
};

export default Home;

// Movie Detail Component
const MovieDetail = ({ movie }) => {
  if (!movie) return null;

  const getImageUrl = (path, size = 'w500') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-image.jpg';
  };

  const getVideoUrl = (videoKey) => {
    return videoKey ? `https://www.youtube.com/embed/${videoKey}` : null;
  };

  // Find YouTube trailer if available
  const trailer = movie.videos?.results?.find(
    video => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <div className="movie-detail">
      <div className="movie-poster">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
        />
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p className="movie-overview">{movie.overview || 'Описание отсутствует.'}</p>
        <div className="movie-meta">
          <span>Рейтинг: {movie.vote_average?.toFixed(1) || 'N/A'}</span>
          <span>Год: {movie.release_date 
            ? new Date(movie.release_date).getFullYear() 
            : 'N/A'}</span>
        </div>
        {trailer && (
          <div className="movie-trailer">
            <iframe 
              src={getVideoUrl(trailer.key)} 
              title={`${movie.title} - Trailer`}
              frameBorder="0" 
              allowFullScreen
            ></iframe>
          </div>
        )}
        <button className="watch-button">Смотреть сейчас</button>
      </div>
    </div>
  );
};
