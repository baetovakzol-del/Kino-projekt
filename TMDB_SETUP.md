# TMDB API Setup Instructions

## Setting up the .env file

1. Get your API key from TMDB:
   - Go to https://www.themoviedb.org/
   - Create an account or sign in
   - Go to Settings > API
   - Request an API key (free)
   - Copy your API key

2. Update the .env file:
   - Open the `.env` file in your project root
   - Replace `your_api_key_here` with your actual TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```

## Restarting the development server

After updating the .env file, you need to restart the development server:

1. Stop the current server:
   - In your terminal, press `Ctrl + C`

2. Start the server again:
   ```bash
   npm run dev
   ```

## Using the TMDB API functions

Example of importing and using `getPopularMovies` in a React component:

```jsx
import React, { useState, useEffect } from 'react';
import { getPopularMovies } from './api/TMDB';

const MovieList = () => {
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
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
```

## Available Functions

1. `getPopularMovies(page)` - Returns array of popular movies
2. `getTopRatedMovies(page)` - Returns array of top rated movies
3. `getGenres()` - Returns array of movie genres

All functions handle errors internally and will log errors to the console.