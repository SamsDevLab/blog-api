import styles from "../Comments/Comments.module.css";
import { useState, useEffect } from "react";
import {
  fetchCommentsByPost,
  editCommentInPost,
  deleteCommentFromPost,
} from "../../services/postService";

const Comments = ({ token, postId }) => {
  const [comments, setComments] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCommentsByPost(postId, token);
        if (response.ok === true) {
          const { postComments } = await response.json();
          setComments(postComments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId, token, commentToEdit]);

  function handleEditMode(commentId) {
    setCommentToEdit(commentId);
  }

  function handleCancelEdit() {
    setCommentToEdit(null);
  }

  async function handleCommentEdit(formData) {
    const { editedComment, commentId } = Object.fromEntries(formData);

    try {
      const response = await editCommentInPost(
        +commentId,
        editedComment,
        token,
      );
      if (response.ok === true) {
        setCommentToEdit(null);
      }
    } catch (error) {
      console.error("Error: ", error);
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
              <div className={styles.authorDetails}>
                <h3 className={styles.username}>{comment.author.username}</h3>
                <h3>∙</h3>
                <h4
                  className={styles.date}
                >{`${new Date(comment.createdAt).toLocaleString("en-us", { month: "short", day: "numeric" })}`}</h4>
              </div>
              {commentToEdit === comment.id ? (
                <form action={handleCommentEdit} className={styles.commentForm}>
                  <textarea
                    name="editedComment"
                    comment={comment.id}
                    id="editComment"
                    defaultValue={comment.content}
                    className={styles.editCommentInput}
                  ></textarea>
                  <input
                    type="hidden"
                    name="commentId"
                    value={comment.id}
                  ></input>
                  <div className={styles.commentButtonContainer}>
                    <button
                      className={styles.cancelButton}
                      type="button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button className={styles.submitButton}>Submit</button>
                  </div>
                </form>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <div className={styles.commentButtonContainer}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditMode(comment.id)}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleCommentDeletion(comment)}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Comments;
