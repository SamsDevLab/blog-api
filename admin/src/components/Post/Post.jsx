import styles from "../Post/Post.module.css";
import { useState, useEffect, useRef } from "react";
import Comments from "../Comments/Comments";
import { Link, useParams, useOutletContext } from "react-router";
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
        <Link to="/login">Login to view!</Link>
      </h2>
    );
  } else if (token !== null && selectedPost !== null) {
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
              <Link className={styles.backButton} to="/">
                Back
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Post;
