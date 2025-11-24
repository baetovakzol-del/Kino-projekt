import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import HeaderMobile from './HeaderMobile';
import '../styles/components/Header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsProfilePopupOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
  };

  const closeProfilePopup = () => {
    setIsProfilePopupOpen(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfilePopupOpen && !event.target.closest('.user-menu')) {
        closeProfilePopup();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isProfilePopupOpen]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>Онлайн Кинотеатр</h1>
          </Link>
          <nav className="nav-desktop">
            <ul>
              <li>
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/movies" className={location.pathname === '/movies' ? 'active' : ''}>
                  Фильмы
                </Link>
              </li>
              <li>
                <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''}>
                  Избранное
                </Link>
              </li>
              <li>
                <Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>
                  История
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <SearchBar />
          {user ? (
            <div className="user-menu">
              <div className="user-avatar" onClick={toggleProfilePopup}>
                <div className="avatar-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="currentColor"/>
                    <path d="M12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              {isProfilePopupOpen && (
                <div className="profile-popup">
                  <div className="profile-popup-content">
                    <div className="profile-popup-header">
                      <h3>Профиль</h3>
                    </div>
                    <div className="profile-popup-body">
                      <p className="user-email">{user.email}</p>
                      <div className="profile-popup-actions">
                        <Link to="/profile" className="profile-popup-button" onClick={closeProfilePopup}>
                          Профиль
                        </Link>
                        <button onClick={handleLogout} className="profile-popup-button logout">
                          Выйти
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-button">
              Войти
            </Link>
          )}
          <HeaderMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;