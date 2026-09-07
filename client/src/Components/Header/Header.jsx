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
    <header className={styles.header}>
      <h1>
        <Link to="/">Sam's Dev Blog</Link>
      </h1>
      <nav className={styles.navBar}>
        {token !== null ? (
          <ul>
            <li>
              <form action={handleLogout}>
                <button>Logout</button>
              </form>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="login">Log In</Link>
            </li>
            <li>
              <Link to="signup">Sign Up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
