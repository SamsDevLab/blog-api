import styles from "../Header/Header.module.css";
import { Link } from "react-router";

const Header = () => {
  return (
    <header class={styles.header}>
      <h1>Sam's Dev Blog</h1>
      <nav class={styles.navBar}>
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
