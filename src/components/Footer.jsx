import '../styles/components/Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Онлайн Кинотеатр</h2>
            <p>Откройте для себя следующий любимый фильм</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Навигация</h3>
              <ul>
                <li><a href="/">Главная</a></li>
                <li><a href="/movies">Фильмы</a></li>
                <li><a href="/favorites">Избранное</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Поддержка</h3>
              <ul>
                <li><a href="#">Помощь</a></li>
                <li><a href="#">Контакты</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Правовая информация</h3>
              <ul>
                <li><a href="#">Условия использования</a></li>
                <li><a href="#">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Онлайн Кинотеатр. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;