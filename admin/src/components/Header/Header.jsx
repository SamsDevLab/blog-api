import styles from "../Header/Header.module.css";
import { Link, useNavigate } from "react-router";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  }

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.mainHeader}>
        <Link className={styles.headerLink} to="/">
          Admin Dashboard
        </Link>
      </h1>
      <nav>
        <ul className={styles.navBar}>
          {token == null ? (
            <li>
              <Link to="/login" className={styles.navButton}>
                Login
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link className={styles.navButton} to="/createPost">
                  Create Post
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.navButton}>
                  Log Out
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
