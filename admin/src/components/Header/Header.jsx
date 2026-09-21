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
      <h1>
        <Link to="/">Admin Dashboard</Link>
      </h1>
      <nav>
        <ul>
          {token == null ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/createPost">Create Post</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
