import { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';
import SkeletonCard from './SkeletonCard';
import '../styles/components/Carousel.scss';

const Carousel = ({ title, movies = [], loading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const carouselRef = useRef(null);

  // Update items to show based on screen size
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1440) {
        setItemsToShow(5);
      } else if (width >= 1024) {
        setItemsToShow(4);
      } else if (width >= 768) {
        setItemsToShow(3);
      } else if (width >= 480) {
        setItemsToShow(2);
      } else {
        setItemsToShow(1);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const nextSlide = () => {
    if (currentIndex < movies.length - itemsToShow) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Show skeleton loaders when loading
  if (loading) {
    return (
      <div className="carousel">
        <div className="container">
          <div className="carousel-header">
            <h2 className="carousel-title">{title}</h2>
          </div>
          <div className="carousel-content">
            <div className="movies-grid">
              {Array.from({ length: itemsToShow }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't show carousel if no movies
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="container">
        <div className="carousel-header">
          <h2 className="carousel-title">{title}</h2>
          <div className="carousel-controls">
            <button 
              className={`carousel-btn prev ${currentIndex === 0 ? 'disabled' : ''}`}
              onClick={prevSlide}
              aria-label="Предыдущий"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button 
              className={`carousel-btn next ${currentIndex >= movies.length - itemsToShow ? 'disabled' : ''}`}
              onClick={nextSlide}
              aria-label="Следующий"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="carousel-content">
          <div 
            className="movies-grid"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {movies.map(movie => (
              <div key={movie.id} className="movie-card-wrapper">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;