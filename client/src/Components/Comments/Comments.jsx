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
        const { postComments } = result;
        setComments(postComments);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleCommentDeletion(comment) {
    try {
      const response = await deleteCommentFromPost(postId, token, comment);
      if (response.ok === true) {
        const result = await response.json();
        const { postComments } = result;
        setComments(postComments);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  return (
    <div className={styles.commentContainer}>
      {comments === null || comments.length === 0 ? (
        <h2>No comments yet</h2>
      ) : (
        comments.map((comment) => {
          return (
            <div key={comment.id} className={styles.comment}>
              <h3>{comment.author.username}</h3>
              <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
              <p>{comment.content}</p>
              {comment.currentLoggedInUser === comment.author.id && (
                <form action={() => handleCommentDeletion(comment)}>
                  <button className={styles.deleteButton}>Delete</button>
                </form>
              )}
            </div>
          );
        })
      )}
      <form action={handleCommentSubmission} className={styles.commentForm}>
        <div className={styles.commentInput}>
          <label htmlFor="comment">Comment on Post</label>
          <input type="textarea" id="comment" name="content" />
        </div>
        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default Comments;
