import { supabase } from '../utils/supabaseClient';

// ========================
// WATCH HISTORY FUNCTIONS
// ========================

/**
 * Add a movie to user's watch history
 * @param {Object} movie - Movie object with id, title, poster_path
 * @param {string} userId - Supabase user ID
 * @returns {Promise<Object>} - Result of the operation
 */
export const addToHistory = async (movie, userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    if (!movie || !movie.id) {
      throw new Error('Valid movie object with id is required');
    }

    const historyEntry = {
      user_id: userId,
      movie_id: movie.id,
      movie_title: movie.title || 'Unknown Title',
      movie_poster: movie.poster_path || null,
      viewed_at: new Date().toISOString()
    };

    // Check if entry already exists
    const { data: existingEntry, error: fetchError } = await supabase
      .from('watch_history')
      .select('id')
      .eq('user_id', userId)
      .eq('movie_id', movie.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing history entry:', fetchError);
      throw fetchError;
    }

    let result;
    if (existingEntry) {
      // Update existing entry
      result = await supabase
        .from('watch_history')
        .update({ viewed_at: new Date().toISOString() })
        .eq('id', existingEntry.id);
    } else {
      // Insert new entry
      result = await supabase
        .from('watch_history')
        .insert(historyEntry);
    }

    if (result.error) {
      throw result.error;
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error('Error adding to history:', error);
    return { data: null, error };
  }
};

/**
 * Get user's watch history
 * @param {string} userId - Supabase user ID
 * @returns {Promise<Object>} - User's watch history
 */
export const getUserHistory = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const { data, error } = await supabase
      .from('watch_history')
      .select('*')
      .eq('user_id', userId)
      .order('viewed_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user history:', error);
    return { data: null, error };
  }
};

/**
 * Clear user's watch history
 * @param {string} userId - Supabase user ID
 * @returns {Promise<Object>} - Result of the operation
 */
export const clearHistory = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const { error } = await supabase
      .from('watch_history')
      .delete()
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error) {
    console.error('Error clearing history:', error);
    return { error };
  }
};

// ========================
// REVIEWS FUNCTIONS
// ========================

/**
 * Add a review for a movie
 * @param {string} movieId - TMDB movie ID
 * @param {string} userId - Supabase user ID
 * @param {string} username - User's display name
 * @param {number} rating - Rating (1-10)
 * @param {string} comment - Review text
 * @returns {Promise<Object>} - Result of the operation
 */
export const addReview = async (movieId, userId, username, rating, comment) => {
  try {
    if (!movieId || !userId || !username || !rating || !comment) {
      throw new Error('All fields are required');
    }

    if (rating < 1 || rating > 10) {
      throw new Error('Rating must be between 1 and 10');
    }

    if (comment.length < 3) {
      throw new Error('Comment must be at least 3 characters long');
    }

    const review = {
      user_id: userId,
      movie_id: movieId,
      username: username,
      rating: rating,
      comment: comment,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert(review);

    if (error) {
      throw error;
    }

    return { data: data[0], error: null };
  } catch (error) {
    console.error('Error adding review:', error);
    return { data: null, error };
  }
};

/**
 * Get reviews for a movie
 * @param {string} movieId - TMDB movie ID
 * @returns {Promise<Object>} - Movie reviews
 */
export const getReviews = async (movieId) => {
  try {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('movie_id', movieId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { data: null, error };
  }
};

/**
 * Subscribe to real-time updates for movie reviews
 * @param {string} movieId - TMDB movie ID
 * @param {Function} callback - Callback function to handle updates
 * @returns {Object} - Subscription object
 */
export const subscribeReviews = (movieId, callback) => {
  try {
    if (!movieId) {
      throw new Error('Movie ID is required');
    }

    if (!callback || typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    return supabase
      .channel('reviews-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
          filter: `movie_id=eq.${movieId}`
        },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  } catch (error) {
    console.error('Error subscribing to reviews:', error);
    return null;
  }
};