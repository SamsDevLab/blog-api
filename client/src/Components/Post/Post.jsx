import styles from "../Post/Post.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const Post = () => {
  const { postId } = useParams();
  const [selectedPost, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        if (response.ok === true) {
          const postObject = await response.json();
          setPost(postObject.targetedPost);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  // console.log(selectedPost);

  return (
    <div className={styles.postContainer}>
      <div className={styles.postContent}>
        {selectedPost === null ? (
          <h2>Blog post cannot be found!</h2>
        ) : (
          <>
            <h2>{selectedPost.title}</h2>
            <h3>
              {selectedPost.createdAt
                ? `Created: ${new Date(selectedPost.createdAt).toLocaleString()}`
                : "No date available"}
            </h3>
            <h3>
              {selectedPost.updatedAt
                ? `Updated: ${new Date(selectedPost.updatedAt).toLocaleString()}`
                : "No date available"}
            </h3>
            <p>{selectedPost.content}</p>
          </>
        )}
      </div>
      <div className={styles.commentContainer}>
        <form action="" method="" className={styles.commentForm}>
          <div className={styles.commentInput}>
            <label htmlFor="comment">Comment on Post</label>
            <input type="textarea" id="comment" name="comment" />
          </div>
          <div className={styles.commentButtonContainer}>
            <button>
              <Link to="/">Back</Link>
            </button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
