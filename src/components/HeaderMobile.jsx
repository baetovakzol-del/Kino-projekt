import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/HeaderMobile.scss';

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="header-mobile">
      <button className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <button className="close-btn" onClick={closeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <nav className="mobile-nav">
              <ul>
                <li>
                  <Link 
                    to="/" 
                    className={location.pathname === '/' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/movies" 
                    className={location.pathname === '/movies' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Фильмы
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/favorites" 
                    className={location.pathname === '/favorites' ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    Избранное
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;