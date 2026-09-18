import styles from "../Comments/Comments.module.css";
import { useState, useEffect } from "react";
import {
  fetchCommentsByPost,
  deleteCommentFromPost,
} from "../../services/postService";

const Comments = ({ token, postId }) => {
  const [comments, setComments] = useState(null);

  console.log(comments);

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
  }, [postId, token]);

  // async function handleCommentEdit(formData, commentId) {
  //   const { editedComment } = Object.fromEntries(formData);
  //   try {
  //     const response = await editCommentInPost(commentId, editedComment, token);
  //     if (response.ok === true) {
  //       setCommentToEditMode(null);
  //       const result = await response.json();
  //       const { updatedPost } = result;
  //       setPost(updatedPost);
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // }

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
