import styles from "../Comments/Comments.module.css";
import { Link } from "react-router";

const Comments = ({ onFormSubmit }) => {
  return (
    <div className={styles.commentContainer}>
      <form action={onFormSubmit} className={styles.commentForm}>
        <div className={styles.commentInput}>
          <label htmlFor="comment">Comment on Post</label>
          <input type="textarea" id="comment" name="content" />
        </div>
        <div className={styles.commentButtonContainer}>
          <button>
            <Link to="/">Back</Link>
          </button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
