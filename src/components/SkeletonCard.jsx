import '../styles/components/SkeletonCard.scss';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-meta">
          <div className="skeleton-year"></div>
          <div className="skeleton-rating"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;