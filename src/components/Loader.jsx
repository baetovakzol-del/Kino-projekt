import '../styles/components/Loader.scss';

const Loader = ({ size = 'medium' }) => {
  return (
    <div className="loader-container">
      <div className={`loader loader-${size}`}>
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default Loader;