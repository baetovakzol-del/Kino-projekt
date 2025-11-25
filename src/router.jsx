import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
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

// Хук для обновления title
const useTitle = (title) => {
    document.title = title;
};

// Обёртка для маршрута с title
const withTitle = (Component, title) => {
    return <Component key={title} />;
};

export const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            { path: '', element: withTitle(Home, 'Онлайн Кинотеатр - Главная') },
            { path: '/movies', element: <ProtectedRoute>{withTitle(MovieCatalog, 'Каталог фильмов - Онлайн Кинотеатр')}</ProtectedRoute> },
            { path: '/movie/:id', element: <ProtectedRoute>{withTitle(MoviePage, 'Фильм - Онлайн Кинотеатр')}</ProtectedRoute> },
            { path: '/favorites', element: <ProtectedRoute>{withTitle(Favorites, 'Избранное - Онлайн Кинотеатр')}</ProtectedRoute> },
            { path: '/search', element: <ProtectedRoute>{withTitle(SearchResults, 'Поиск - Онлайн Кинотеатр')}</ProtectedRoute> },
            { path: '/login', element: withTitle(LoginPage, 'Вход - Онлайн Кинотеатр') },
            { path: '/profile', element: <ProtectedRoute>{withTitle(ProfilePage, 'Профиль - Онлайн Кинотеатр')}</ProtectedRoute> },
            { path: '/history', element: <ProtectedRoute>{withTitle(History, 'История просмотров - Онлайн Кинотеатр')}</ProtectedRoute> },
            { path: '*', element: withTitle(NotFound, 'Страница не найдена - Онлайн Кинотеатр') },
        ]
    }
]);

