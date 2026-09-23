import styles from "../Post/Post.module.css";
import { useState, useEffect } from "react";
import { Link, useOutletContext, useParams } from "react-router";
import Comments from "../Comments/Comments";
import { fetchPostById } from "../../services/postService";

const Post = () => {
  const { postId } = useParams();
  const [selectedPost, setPost] = useState(null);
  const { token } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPostById(postId, token);
        if (response.ok === true) {
          const postObject = await response.json();
          setPost(postObject.targetedPost);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (token !== null) fetchData();
  }, [postId, token]);

  if (token === null) {
    return (
      <h2>
        <Link to="/login">Login to view post!</Link>
      </h2>
    );
  } else {
    return (
      <div className={styles.postContainer}>
        <div className={styles.postContent}>
          {selectedPost === null ? (
            <h2>Blog post cannot be found!</h2>
          ) : (
            <>
              <h2 className={styles.postHeader}>{selectedPost.title}</h2>
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
              <Comments token={token} postId={selectedPost.id} />
              <button className={styles.backButton}>
                <Link className={styles.backLink} to="/">
                  Back
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Post;
