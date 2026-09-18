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
              <h3>{comment.author.username}</h3>
              <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
              <p>{comment.content}</p>
              {commentToEdit === comment.id ? (
                <form action={handleCommentEdit}>
                  <label htmlFor="editComment">Edit Comment</label>
                  <textarea
                    name="editedComment"
                    comment={comment.id}
                    id="editComment"
                    defaultValue={comment.content}
                  ></textarea>
                  <input
                    type="hidden"
                    name="commentId"
                    value={comment.id}
                  ></input>
                  <button>Submit</button>
                </form>
              ) : (
                <form action={() => handleEditMode(comment.id)}>
                  <button>Edit</button>
                </form>
              )}
              <form action={() => handleCommentDeletion(comment)}>
                <button>Delete</button>
              </form>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Comments;
