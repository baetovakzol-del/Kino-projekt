import { useState, useEffect } from 'react';

// Helper functions for localStorage
const FAVORITES_KEY = 'favoriteMovies';

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
    return false;
  }
};

const loadFavoritesFromStorage = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (data === null) {
      return [];
    }
    const parsed = JSON.parse(data);
    // Ensure we return an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const useFavorites = () => {
  // Initialize state with a function to avoid loading from localStorage on every render
  const [favorites, setFavorites] = useState(() => {
    try {
      return loadFavoritesFromStorage();
    } catch (error) {
      console.error('Error initializing favorites state:', error);
      return [];
    }
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      saveFavoritesToStorage(favorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const isFavorite = (movieId) => {
    if (!movieId) return false;
    return favorites.some(fav => fav.id === movieId);
  };

  const toggleFavorite = (movie) => {
    if (!movie || !movie.id) {
      console.error('Invalid movie object provided to toggleFavorite:', movie);
      return;
    }

    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        // Add to favorites
        return [
          ...prevFavorites,
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview
          }
        ];
      }
    });
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite
  };
};

export default useFavorites;