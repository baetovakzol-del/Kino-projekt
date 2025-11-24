import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserHistory, clearHistory } from '../api/supabase';
import Loader from '../components/Loader';
import '../styles/pages/History.scss';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user) {
          navigate('/login');
          return;
        }

        const { data, error } = await getUserHistory(user.id);
        
        if (error) {
          throw error;
        }
        
        setHistory(data || []);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Не удалось загрузить историю просмотров');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, navigate]);

  const handleClearHistory = async () => {
    if (!window.confirm('Вы уверены, что хотите очистить всю историю просмотров?')) {
      return;
    }

    try {
      setClearing(true);
      const { error } = await clearHistory(user.id);
      
      if (error) {
        throw error;
      }
      
      setHistory([]);
    } catch (err) {
      console.error('Error clearing history:', err);
      alert('Не удалось очистить историю просмотров');
    } finally {
      setClearing(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (path, size = 'w300') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder-image.jpg';
  };

  if (loading) {
    return (
      <div className="history-page">
        <div className="container">
          <div className="history-loading">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="history-page">
        <div className="container">
          <div className="history-error">
            <h2>Ошибка</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Повторить попытку
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="container">
        <div className="history-header">
          <h1>История просмотров</h1>
          {history.length > 0 && (
            <button 
              className="clear-history-btn"
              onClick={handleClearHistory}
              disabled={clearing}
            >
              {clearing ? 'Очистка...' : 'Очистить историю'}
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="empty-history">
            <h2>История просмотров пуста</h2>
            <p>Здесь будут отображаться фильмы, которые вы просматривали.</p>
          </div>
        ) : (
          <div className="history-grid">
            {history.map((item) => (
              <div 
                key={item.id} 
                className="history-card"
                onClick={() => navigate(`/movie/${item.movie_id}`)}
              >
                <div className="history-poster">
                  <img 
                    src={getImageUrl(item.movie_poster)} 
                    alt={item.movie_title}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
                <div className="history-info">
                  <h3 className="history-title">{item.movie_title}</h3>
                  <p className="viewed-at">Просмотрено: {formatDate(item.viewed_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;