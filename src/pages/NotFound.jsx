import { Link } from 'react-router-dom';
import '../styles/pages/NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Страница не найдена</h1>
          <p>Запрашиваемая страница не существует или была перемещена.</p>
          <Link to="/" className="home-link">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;