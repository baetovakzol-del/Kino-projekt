import { useEffect } from 'react';
import '../styles/components/TrailerModal.scss';

const TrailerModal = ({ trailerKey, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('trailer-modal')) {
      onClose();
    }
  };

  if (!trailerKey) return null;

  return (
    <div className="trailer-modal" onClick={handleClickOutside}>
      <div className="trailer-modal-content">
        <button className="trailer-modal-close" onClick={onClose} aria-label="Закрыть">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <div className="trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Трейлер фильма"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;