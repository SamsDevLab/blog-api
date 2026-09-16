import styles from "../Comments/Comments.module.css";
import { useState, useEffect } from "react";
import {
  fetchCommentsByPost,
  deleteCommentFromPost,
} from "../../services/postService";

const Comments = ({ token, postId }) => {
  const [comments, setComments] = useState(null);

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
      const response = await deleteCommentFromPost(comment, token);
      if (response.ok === true) {
        const { postComments } = await response.json();

        setComments(postComments);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  if (comments === null) {
    return <h3>No Comments yet</h3>;
  } else {
    return (
      <div className={styles.commentContainer}>
        {comments.map((comment) => {
          return (
            <div>
              <div key={comment.id} className={styles.comment}>
                <h3>{comment.author.username}</h3>
                <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
              </div>

              <form action={() => handleCommentDeletion(comment)}>
                <p>{comment.content}</p>
                <button>Delete</button>
              </form>
              <form action="">
                <button>Edit</button>
              </form>
            </div>
          );
        })}
      </div>
    );
  }

  // return (
  //   <div className={styles.commentContainer}>
  //     {comments.map((comment) => {
  //       return (
  //         <div key={comment.id} className={styles.comment}>
  //           <h3>{comment.author.username}</h3>
  //           <h4>{`${new Date(comment.createdAt).toLocaleString()}`}</h4>
  // {
  /* {commentToEdit !== null ? (
                  <form action={(event) => onCommentEdit(event, comment.id)}>
                    <label htmlFor="commentEdit">Edit Comment</label>
                    <textarea
                      name="editedComment"
                      id="commentEdit"
                      defaultValue={comment.content}
                    ></textarea>
                    <div>
                      <button
                        type="button"
                        onClick={() => onCommentEditMode(null)}
                      >
                        Cancel
                      </button>
                      <button>Submit</button>
                    </div>
                  </form>
                ) : ( */
  // }
  //             <>
  //               <p>{comment.content}</p>
  //               <form action={() => onCommentDeletion(comment)}>
  //                 <button>Delete</button>
  //               </form>
  //               <form action="">
  //                 <button>Edit</button>
  //               </form>
  //             </>
  //              )}}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
};

export default Comments;
