import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import MovieCatalog from './pages/MovieCatalog';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import History from './pages/History';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';
import './styles/App.scss';

// Simple title updater hook
const useTitle = (title) => {
  document.title = title;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  {useTitle('Онлайн Кинотеатр - Главная')}
                  <Home />
                </>
              } 
            />
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute>
                  <>
                    {useTitle('Каталог фильмов - Онлайн Кинотеатр')}
                    <MovieCatalog />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/movie/:id" 
              element={
                <ProtectedRoute>
                  <>
                    {useTitle('Фильм - Онлайн Кинотеатр')}
                    <MoviePage />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <>
                    {useTitle('Избранное - Онлайн Кинотеатр')}
                    <Favorites />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/search" 
              element={
                <ProtectedRoute>
                  <>
                    {useTitle('Поиск - Онлайн Кинотеатр')}
                    <SearchResults />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <>
                  {useTitle('Вход - Онлайн Кинотеатр')}
                  <LoginPage />
                </>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <>
                    {useTitle('Профиль - Онлайн Кинотеатр')}
                    <ProfilePage />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <>
                    {useTitle('История просмотров - Онлайн Кинотеатр')}
                    <History />
                  </>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="*" 
              element={
                <>
                  {useTitle('Страница не найдена - Онлайн Кинотеатр')}
                  <NotFound />
                </>
              } 
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;