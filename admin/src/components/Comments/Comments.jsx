import styles from "../Comments/Comments.module.css";

const Comments = ({ comments, onCommentDeletion }) => {
  return (
    <div className={styles.commentContainer}>
      {comments.map((comment) => {
        return (
          <div key={comment.id} className={styles.comment}>
            <h3>{comment.author.username}</h3>
            <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
            <p>{comment.content}</p>
            <form action={() => onCommentDeletion(comment)}>
              <button>Delete</button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
