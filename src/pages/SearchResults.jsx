import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/TMDB';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import SkeletonCard from '../components/SkeletonCard';
import '../styles/pages/SearchResults.scss';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setMovies([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);
        
        const data = await searchMovies(query, page);
        setMovies(data.results || []);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
        setError('Не удалось выполнить поиск. Пожалуйста, проверьте подключение к интернету и попробуйте позже.');
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, searchParams]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    window.location.search = params.toString();
  };

  if (loading && movies.length === 0) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="search-header">
            <h1 className="page-title">Результаты поиска</h1>
          </div>
          <div className="movies-grid">
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="search-header">
            <h1 className="page-title">Результаты поиска</h1>
          </div>
          <div className="error-message">
            <h2>Ошибка поиска</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="search-results">
        <div className="container">
          <div className="search-header">
            <h1 className="page-title">Результаты поиска</h1>
          </div>
          <div className="no-query">
            <h2>Введите поисковый запрос</h2>
            <p>Используйте строку поиска выше, чтобы найти фильмы</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="container">
        <div className="search-header">
          <h1 className="page-title">Результаты поиска</h1>
        </div>
        
        {loading ? (
          <div className="movies-grid">
            {Array.from({ length: 20 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="results-info">
              Найдено {movies.length} фильмов по запросу "{query}"
            </div>
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="no-results">
            <h2>Фильмы не найдены</h2>
            <p>Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;