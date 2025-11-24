import { useState, useEffect } from 'react';
import '../styles/components/MovieCatalog.scss';

// Sample movie data with 12+ movies of different genres and years
const moviesData = [
  { id: 1, title: 'Интерстеллар', genre: 'Фантастика', year: 2014, rating: 8.6, popularity: 95 },
  { id: 2, title: 'Начало', genre: 'Фантастика', year: 2010, rating: 8.8, popularity: 92 },
  { id: 3, title: 'Темный рыцарь', genre: 'Боевик', year: 2008, rating: 9.0, popularity: 98 },
  { id: 4, title: 'Матрица', genre: 'Фантастика', year: 1999, rating: 8.7, popularity: 90 },
  { id: 5, title: 'Крёстный отец', genre: 'Драма', year: 1972, rating: 9.3, popularity: 97 },
  { id: 6, title: 'Бойцовский клуб', genre: 'Драма', year: 1999, rating: 8.8, popularity: 94 },
  { id: 7, title: 'Звёздные войны', genre: 'Фантастика', year: 1977, rating: 8.6, popularity: 93 },
  { id: 8, title: 'Титаник', genre: 'Драма', year: 1997, rating: 8.4, popularity: 89 },
  { id: 9, title: 'Мстители', genre: 'Боевик', year: 2012, rating: 8.4, popularity: 91 },
  { id: 10, title: 'Властелин колец', genre: 'Фэнтези', year: 2001, rating: 8.6, popularity: 96 },
  { id: 11, title: 'Гладиатор', genre: 'Боевик', year: 2000, rating: 8.5, popularity: 88 },
  { id: 12, title: 'Король Лев', genre: 'Мультфильм', year: 1994, rating: 8.5, popularity: 87 },
  { id: 13, title: 'Джокер', genre: 'Драма', year: 2019, rating: 8.4, popularity: 92 },
  { id: 14, title: 'Аватар', genre: 'Фантастика', year: 2009, rating: 8.0, popularity: 94 }
];

const MovieCatalog = () => {
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
    <div className="movie-catalog">
      <div className="container">
        <h1 className="catalog-title">Каталог фильмов</h1>
        
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
                <option value="popularity">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="year">По году выпуска</option>
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

export default MovieCatalog;