import styles from "../Header/Header.module.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Sam's Dev Blog</Link>
      </h1>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="login">Log In</Link>
          </li>
          <li>
            <Link to="signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
