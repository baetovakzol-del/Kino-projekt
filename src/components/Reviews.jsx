import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addReview, getReviews, subscribeReviews } from '../api/supabase';
import Loader from './Loader';
import '../styles/components/Reviews.scss';

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const { user } = useAuth();
  const subscriptionRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await getReviews(movieId);
        
        if (error) {
          throw error;
        }
        
        setReviews(data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Не удалось загрузить отзывы');
      } finally {
        setLoading(false);
      }
    };

    const setupSubscription = () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      
      const sub = subscribeReviews(movieId, (payload) => {
        // Refresh reviews when there's a change
        fetchReviews();
      });
      
      subscriptionRef.current = sub;
      setSubscription(sub);
    };

    if (movieId) {
      fetchReviews();
      setupSubscription();
    }

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [movieId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Для оставления отзыва необходимо войти в систему');
      return;
    }
    
    if (comment.length < 3) {
      alert('Отзыв должен содержать минимум 3 символа');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const { data, error } = await addReview(
        movieId,
        user.id,
        user.email.split('@')[0], // Use email prefix as username
        rating,
        comment
      );
      
      if (error) {
        throw error;
      }
      
      // Add new review to the top of the list
      setReviews(prev => [data, ...prev]);
      setRating(5);
      setComment('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Не удалось отправить отзыв');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="reviews-section">
        <div className="reviews-loading">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <h2>Отзывы и рейтинги</h2>
      
      {/* Review Form */}
      <form className="review-form" onSubmit={handleSubmit}>
        <h3>Оставить отзыв</h3>
        
        {user ? (
          <>
            <div className="form-group">
              <label>Рейтинг: {rating}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="rating-slider"
              />
              <div className="rating-value">{rating}</div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Ваш отзыв</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Поделитесь своим мнением о фильме..."
                minLength="3"
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="submit-review-btn"
              disabled={submitting}
            >
              {submitting ? 'Отправка...' : 'Отправить отзыв'}
            </button>
          </>
        ) : (
          <div className="login-prompt">
            <p>Для оставления отзыва необходимо <a href="/login">войти в систему</a>.</p>
          </div>
        )}
      </form>
      
      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">Пока нет отзывов. Будьте первым!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-user">
                  <span className="username">{review.username}</span>
                </div>
                <div className="review-rating">
                  <span className="rating-value">{review.rating}/10</span>
                </div>
              </div>
              <div className="review-content">
                <p>{review.comment}</p>
              </div>
              <div className="review-footer">
                <span className="review-date">{formatDate(review.created_at)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;