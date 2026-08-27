import styles from "../Login/Login.module.css";
import { Link } from "react-router";

const Login = () => {
  return (
    <form className={styles.loginForm} action="">
      <h2>Login</h2>
      <div className={styles.loginInputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className={styles.loginInputContainer}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className={styles.loginInputContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className={styles.loginButtonContainer}>
        <button>
          <Link to="/">Back</Link>
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Login;
