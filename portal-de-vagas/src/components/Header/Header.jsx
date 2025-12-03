import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../img/logo-portal-vaga-branco-editado.svg";
import logo1 from "../../img/logo-portal-vaga-branco-editado-black.svg";

const Header = ({ theme, toggleTheme }) => {
  const { isAuthenticated, isUserAuthenticated, loginUser, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/portal-de-vagas" className={styles.logo}>
          {theme === "light" ? (
            <img src={logo} alt="portal vagas" />
          ) : (
            <img src={logo1} alt="portal vagas" />
          )}
        </Link>
        <nav className={styles.nav}>
          <Link to="/portal-de-vagas">Vagas Freelance</Link>
          {isUserAuthenticated && <Link to="/portal-de-vagas/curriculo">Meu Currículo</Link>}
          {isAuthenticated && <Link to="/portal-de-vagas/admin">Admin</Link>}
        </nav>
        <div className={styles.authActions}>
          {isAuthenticated || isUserAuthenticated ? (
            <button onClick={logout} className={styles.authButtonLogout}>
              Logout
            </button>
          ) : (
            <Link to="/portal-de-vagas/login" className={styles.authButton}>
              Login
            </Link>
          )}
          <button onClick={toggleTheme} className={styles.themeToggle}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};



export default Header;
