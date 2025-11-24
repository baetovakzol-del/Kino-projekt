// Utility functions for localStorage operations

export const saveToLocalStorage = (key, data) => {
  try {
    // Validate data before saving
    if (data === undefined || data === null) {
      console.warn(`Attempted to save ${data} value to localStorage with key: ${key}`);
      return false;
    }
    
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    // Clear corrupted data
    try {
      localStorage.removeItem(key);
    } catch (removeError) {
      console.error('Error removing corrupted data from localStorage:', removeError);
    }
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Helper functions for favorites
export const saveFavoritesToStorage = (favorites) => {
  return saveToLocalStorage('favoriteMovies', favorites);
};

export const loadFavoritesFromStorage = () => {
  return loadFromLocalStorage('favoriteMovies') || [];
};