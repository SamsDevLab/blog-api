import styles from "../Login/Login.module.css";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  async function handleLogin(formData) {
    const userData = Object.fromEntries(formData);
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    localStorage.setItem("token", result.token);
    navigate("/");
  }

  return (
    <form action={handleLogin} className={styles.loginForm}>
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
