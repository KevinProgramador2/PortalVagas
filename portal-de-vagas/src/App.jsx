import { useContext } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeContext, ThemeProvider } from './contexts/ThemeContext';
import AppRouter from './routes/Router';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import styles from './App.module.css';

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.appContainer}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className={styles.mainContent}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

import { BrowserRouter } from 'react-router-dom';

const AppWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default AppWrapper;