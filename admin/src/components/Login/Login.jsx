import styles from "../Login/Login.module.css";
import { Link } from "react-router";

const Login = () => {
  return (
    <form action="" className={styles.loginForm}>
      <h2>Admin Login</h2>
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <Link to="/">Back</Link>
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Login;
