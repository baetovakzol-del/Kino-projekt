import axios from 'axios';

// TMDB API configuration
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '1393265d75751167ea45f21456975c80';
const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance with default parameters
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ru-RU'
  }
});

// Function to get popular movies
export const getPopularMovies = async (page = 1, sortBy = 'popularity.desc') => {
  try {
    const response = await apiClient.get('/movie/popular', {
      params: {
        page: page,
        sort_by: sortBy
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

// Function to get top rated movies
export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await apiClient.get('/movie/top_rated', {
      params: {
        page: page
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Function to get movie genres
export const getMovieGenres = async () => {
  try {
    const response = await apiClient.get('/genre/movie/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

// Function to search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        query: query,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Function to get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await apiClient.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};

// Function to get movies by year
export const getMoviesByYear = async (year, page = 1) => {
  try {
    const response = await apiClient.get('/discover/movie', {
      params: {
        primary_release_year: year,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by year:', error);
    throw error;
  }
};

// Function to get movies by rating
export const getMoviesByRating = async (rating, page = 1) => {
  try {
    const minRating = Math.max(0, rating - 1);
    const maxRating = Math.min(10, rating);
    const response = await apiClient.get('/discover/movie', {
      params: {
        'vote_average.gte': minRating,
        'vote_average.lte': maxRating,
        page: page
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by rating:', error);
    throw error;
  }
};

// Function to get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Function to get similar movies
export const getSimilarMovies = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/recommendations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    throw error;
  }
};

// Function to get genres (alternative name for getMovieGenres)
export const getGenres = async () => {
  return await getMovieGenres();
};