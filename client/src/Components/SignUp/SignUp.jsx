import styles from "../SignUp/SignUp.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { submitSignUp, submitLogin } from "../../services/authService";

const SignUp = () => {
  const [signupErrors, setSignupErrors] = useState(null);
  const navigate = useNavigate();

  async function handleNewUserLogin(loginData) {
    const response = await submitLogin(loginData);
    const result = await response.json();

    if (response.ok === false) {
      setSignupErrors(result.error.messages);
    } else if (response.ok === true) {
      localStorage.setItem("token", result.token);
      navigate("/");
    }
  }

  async function handleSignup(formData) {
    const userData = Object.fromEntries(formData);
    const response = await submitSignUp(userData);
    const result = await response.json();

    if (response.ok === false) {
      setSignupErrors(result.error.messages);
    } else if (response.ok === true) {
      const { email, password } = userData;
      const loginData = { email, password };
      handleNewUserLogin(loginData);
    }
  }

  return (
    <form className={styles.signupForm} action={handleSignup}>
      <h2>Sign up</h2>
      {signupErrors !== null &&
        signupErrors.map((error) => <h3 key={error.path}>{error.msg}</h3>)}
      <div className={styles.signupInputContainer}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className={styles.signupInputContainer}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className={styles.signupInputContainer}>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <div className={styles.signupInputContainer}>
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
        />
      </div>
      <div className={styles.signupButtonContainer}>
        <button type="button">
          <Link to="/">Back</Link>
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SignUp;
