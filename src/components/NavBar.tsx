import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './NavBar.module.css';

export default function NavBar() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          DevTalk <span className={styles.logoAccent}>UA</span>
        </NavLink>

        {/* Navigation links */}
        <nav className={styles.nav}>
          <NavLink
            to="/forum"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Forum
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            News
          </NavLink>
        </nav>

        {/* Auth area */}
        <div className={styles.authArea}>
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className={styles.username}>
                {user?.username}
              </NavLink>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={styles.loginBtn}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
