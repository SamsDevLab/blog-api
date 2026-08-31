import styles from "../Login/Login.module.css";
import { Link } from "react-router";

const Login = () => {
  async function handleSubmit(formData) {
    const userData = Object.fromEntries(formData);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const { token } = await response.json();

    localStorage.setItem("token", token);
  }

  return (
    <form className={styles.loginForm} action={handleSubmit}>
      <h2>Login</h2>
      <div className={styles.loginInputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
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
