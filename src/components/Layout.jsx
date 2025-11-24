import Header from './Header';
import Footer from './Footer';
import '../styles/components/Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;