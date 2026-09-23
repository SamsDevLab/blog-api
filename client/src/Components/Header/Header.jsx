import styles from "../Header/Header.module.css";
import { Link, useNavigate } from "react-router";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  }

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.mainHeader}>
        <Link className={styles.headerLink} to="/">
          Sam's Dev Blog
        </Link>
      </h1>
      <nav>
        {token !== null ? (
          <ul className={styles.navBar}>
            <li>
              <form action={handleLogout}>
                <button className={styles.navButton}>Logout</button>
              </form>
            </li>
          </ul>
        ) : (
          <ul className={styles.navBar}>
            <li>
              <Link className={styles.navButton} to="login">
                Log In
              </Link>
            </li>
            <li>
              <Link className={styles.navButton} to="signup">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
