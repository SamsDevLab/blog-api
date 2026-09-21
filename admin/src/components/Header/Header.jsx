import { Link } from "react-router";
import styles from "../Header/Header.module.css";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <h1>
        <Link to="/">Admin Dashboard</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/createPost">Create Post</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
