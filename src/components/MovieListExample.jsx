import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/TMDB';

const MovieListExample = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies(1);
        setMovies(popularMovies);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Popular Movies</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListExample;