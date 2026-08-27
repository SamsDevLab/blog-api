import styles from "../SignUp/SignUp.module.css";
import { Link } from "react-router";

const SignUp = () => {
  return (
    <form className={styles.signupForm} action="">
      <h2>This is the sign up form!</h2>
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
