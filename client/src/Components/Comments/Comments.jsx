import styles from "../Comments/Comments.module.css";
import { Link } from "react-router";

const Comments = ({ loggedInUserId, comments, onFormSubmit }) => {
  return (
    <div className={styles.commentContainer}>
      {comments.map((comment) => {
        // console.log(typeof loggedInUserId);
        // console.log(typeof comment.authorId);
        return (
          <div key={comment.id} className={styles.comment}>
            <h3>{comment.author.username}</h3>
            <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
            <p>{comment.content}</p>
            {loggedInUserId === comment.authorId && (
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        );
      })}

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
