import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../contexts/AuthContext';
import { getPopularMovies, getMovieGenres, getMoviesByGenre, getMoviesByYear, getMoviesByRating } from '../api/TMDB';
import '../styles/pages/MovieCatalog.scss';

const MovieCatalog = () => {
  // State for movies and filters
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  
  // Get user from auth context
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Extract unique values for filters
  const years = ['Все годы', ...Array.from({length: 30}, (_, i) => new Date().getFullYear() - i)];
  const ratings = ['Любой рейтинг', '9+', '8+', '7+', '6+'];

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await getMovieGenres();
        setGenres([{ id: '', name: 'Все жанры' }, ...genreData.genres]);
      } catch (err) {
        console.error('Error fetching genres:', err);
        setError('Не удалось загрузить жанры');
      }
    };

    fetchGenres();
  }, []);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let movieData;
        
        if (selectedGenre) {
          movieData = await getMoviesByGenre(selectedGenre);
        } else if (selectedYear && selectedYear !== 'Все годы') {
          movieData = await getMoviesByYear(selectedYear);
        } else if (selectedRating && selectedRating !== 'Любой рейтинг') {
          const ratingValue = parseFloat(selectedRating);
          movieData = await getMoviesByRating(ratingValue);
        } else {
          movieData = await getPopularMovies(1, sortBy);
        }
        
        setMovies(movieData.results || movieData);
        setTotalResults(movieData.total_results || movieData.length);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Не удалось загрузить фильмы');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre, selectedYear, selectedRating, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    setSortBy('popularity.desc');
  };

  if (loading) {
    return (
      <div className="movie-catalog">
        <div className="container">
          <div className="catalog-header">
            <h1>Каталог фильмов</h1>
          </div>
          <div className="loading">
            <p>Загрузка фильмов...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-catalog">
        <div className="container">
          <div className="catalog-header">
            <h1>Каталог фильмов</h1>
          </div>
          <div className="error-message">
            <h2>Ошибка загрузки</h2>
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-catalog">
      <div className="container">
        <div className="catalog-header">
          <div className="header-content">
            <h1>Каталог фильмов</h1>
            {user && (
              <div className="user-greeting">
                <span>Привет, {user.email}</span>
                <div className="user-actions">
                  <a href="/profile" className="profile-link">Профиль</a>
                  <button onClick={handleLogout} className="logout-link">
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="results-count">Найдено: {totalResults} фильмов</div>
        </div>
        
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-header">
            <h2>Фильтры и сортировка</h2>
            <button className="reset-button" onClick={resetFilters}>
              Сбросить все
            </button>
          </div>
          
          <div className="filters-grid">
            {/* Genre Filter */}
            <div className="filter-group">
              <label>Жанр</label>
              <select 
                value={selectedGenre} 
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="filter-select"
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            
            {/* Year Filter */}
            <div className="filter-group">
              <label>Год выпуска</label>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select"
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* Rating Filter */}
            <div className="filter-group">
              <label>Рейтинг</label>
              <select 
                value={selectedRating} 
                onChange={(e) => setSelectedRating(e.target.value)}
                className="filter-select"
              >
                {ratings.map(rating => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>
            
            {/* Sort Options */}
            <div className="filter-group">
              <label>Сортировка</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="popularity.desc">По популярности</option>
                <option value="vote_average.desc">По рейтингу</option>
                <option value="release_date.desc">По году выпуска</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Movies Grid */}
        {movies.length > 0 ? (
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>Фильмы не найдены</h2>
            <p>Попробуйте изменить параметры фильтрации</p>
            <p className="suggestion">Совет: Попробуйте выбрать "Все жанры" или сбросить фильтры</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCatalog;