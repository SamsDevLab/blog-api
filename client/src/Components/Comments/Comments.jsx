import styles from "../Comments/Comments.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  fetchCommentsByPost,
  addCommentToPost,
  deleteCommentFromPost,
} from "../../services/postService";

const Comments = ({ token, postId }) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCommentsByPost(postId, token);
        if (response.ok === true) {
          const result = await response.json();
          const { postComments } = result;
          setComments(postComments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId, token]);

  async function handleCommentSubmission(formData) {
    const comment = Object.fromEntries(formData);
    try {
      const response = await addCommentToPost(postId, token, comment);
      if (response.ok === true) {
        const result = await response.json();
        // const { updatedPost } = result;
        // setPost(updatedPost); // will be setComments
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleCommentDeletion(comment) {
    try {
      const response = await deleteCommentFromPost(comment, token);
      if (response.ok === true) {
        const result = await response.json();
        // const { updatedPost } = result;
        // setPost(updatedPost);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  if (comments === null) {
    return (
      <div>
        <h2>No comments at this time</h2>
      </div>
    );
  } else if (comments.length === 0) {
    return (
      <form action={handleCommentSubmission} className={styles.commentForm}>
        <h3>No comments yet</h3>
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
    );
  } else {
    return (
      <div className={styles.commentContainer}>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className={styles.comment}>
              <h3>{comment.author.username}</h3>
              <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
              <p>{comment.content}</p>
              {comment.currentloggedInUser === comment.author.id && (
                <form action={() => handleCommentDeletion(comment)}>
                  <button>Delete</button>
                </form>
              )}
            </div>
          );
        })}
        <form action={handleCommentSubmission} className={styles.commentForm}>
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
  }
};

export default Comments;
