import styles from "../Login/Login.module.css";
import { useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router";
import { submitLogin } from "../../services/authService";

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  async function handleLogin(formData) {
    const userData = Object.fromEntries(formData);
    const response = await submitLogin(userData);
    const result = await response.json();

    if (response.ok === false) {
      setLoginError(result.errorMessage);
    } else if (response.ok === true) {
      localStorage.setItem("token", result.token);
      setToken(result.token);
      navigate("/");
    }
  }

  return (
    <form action={handleLogin} className={styles.loginForm}>
      <h2 className={styles.header}>Admin Login</h2>
      {loginError !== null && <h2>{loginError}</h2>}
      <div className={styles.inputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className={styles.buttonContainer}>
        <Link className={styles.backLink} to="/">
          Back
        </Link>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
