import styles from "../Login/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const userData = Object.fromEntries(formData);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (Object.hasOwn(result, "errorMessage")) {
      setLoginError(result.errorMessage);
    } else if (Object.hasOwn(result, "token")) {
      localStorage.setItem("token", result.token);
      navigate("/");
    }
  }

  return (
    <form className={styles.loginForm} action={handleSubmit}>
      <h2>Login</h2>
      {loginError !== null && <h3>{loginError}</h3>}
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
