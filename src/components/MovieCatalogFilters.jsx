import { useState, useEffect } from 'react';
import '../styles/components/MovieCatalogFilters.scss';

// Sample movie data as provided
const moviesData = [
  { id: 1, title: 'Фильм 1', genre: 'Комедия', year: 2020, rating: 7.5, popularity: 100 },
  { id: 2, title: 'Фильм 2', genre: 'Драма', year: 2019, rating: 8.0, popularity: 80 },
  { id: 3, title: 'Фильм 3', genre: 'Боевик', year: 2021, rating: 7.2, popularity: 90 },
  { id: 4, title: 'Фильм 4', genre: 'Фантастика', year: 2018, rating: 8.5, popularity: 95 },
  { id: 5, title: 'Фильм 5', genre: 'Комедия', year: 2022, rating: 6.8, popularity: 70 },
  { id: 6, title: 'Фильм 6', genre: 'Драма', year: 2020, rating: 8.2, popularity: 85 },
  { id: 7, title: 'Фильм 7', genre: 'Боевик', year: 2019, rating: 7.7, popularity: 92 },
  { id: 8, title: 'Фильм 8', genre: 'Фантастика', year: 2021, rating: 8.0, popularity: 88 },
  { id: 9, title: 'Фильм 9', genre: 'Комедия', year: 2017, rating: 7.0, popularity: 75 },
  { id: 10, title: 'Фильм 10', genre: 'Драма', year: 2022, rating: 8.3, popularity: 91 },
  { id: 11, title: 'Фильм 11', genre: 'Боевик', year: 2018, rating: 7.9, popularity: 87 },
  { id: 12, title: 'Фильм 12', genre: 'Фантастика', year: 2020, rating: 8.1, popularity: 93 }
];

const MovieCatalogFilters = () => {
  // State for filters and sorting
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  const [selectedGenre, setSelectedGenre] = useState('Все жанры');
  const [selectedYear, setSelectedYear] = useState('Все годы');
  const [selectedRating, setSelectedRating] = useState('Любой рейтинг');
  const [sortBy, setSortBy] = useState('popularity');

  // Extract unique values for filters
  const genres = ['Все жанры', ...new Set(moviesData.map(movie => movie.genre))];
  const years = ['Все годы', ...new Set(moviesData.map(movie => movie.year))].sort((a, b) => b - a);
  const ratings = ['Любой рейтинг', '9+', '8+', '7+', '6+'];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...moviesData];

    // Apply genre filter
    if (selectedGenre !== 'Все жанры') {
      result = result.filter(movie => movie.genre === selectedGenre);
    }

    // Apply year filter
    if (selectedYear !== 'Все годы') {
      result = result.filter(movie => movie.year === selectedYear);
    }

    // Apply rating filter
    if (selectedRating !== 'Любой рейтинг') {
      const minRating = parseFloat(selectedRating);
      result = result.filter(movie => movie.rating >= minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        result.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredMovies(result);
  }, [selectedGenre, selectedYear, selectedRating, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedGenre('Все жанры');
    setSelectedYear('Все годы');
    setSelectedRating('Любой рейтинг');
    setSortBy('popularity');
  };

  return (
    <div className="movie-catalog-filters">
      <div className="container">
        <h1 className="page-title">Каталог фильмов</h1>
        
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filters-header">
            <h2>Фильтры</h2>
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
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            {/* Year Filter */}
            <div className="filter-group">
              <label>Год</label>
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
                <option value="popularity">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="year">По году</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Info */}
        <div className="results-info">
          <p>Найдено фильмов: {filteredMovies.length}</p>
        </div>
        
        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="movie-card">
                <div className="movie-card-content">
                  <h3 className="movie-title">{movie.title}</h3>
                  <div className="movie-details">
                    <span className="movie-genre">{movie.genre}</span>
                    <span className="movie-year">{movie.year}</span>
                    <span className="movie-rating">Рейтинг: {movie.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>Фильмы не найдены</h2>
            <p>Попробуйте изменить параметры фильтрации</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCatalogFilters;