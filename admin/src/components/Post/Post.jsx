import styles from "../Post/Post.module.css";
import { useState, useEffect } from "react";
import Comments from "../Comments/Comments";
import { Link, useParams, useOutletContext } from "react-router";
import {
  fetchPostById,
  deleteCommentFromPost,
} from "../../services/postService";

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

  async function handleCommentDeletion(comment) {
    try {
      const response = await deleteCommentFromPost(comment, token);
      if (response.ok === true) {
        const result = await response.json();
        const { updatedPost } = result;
        setPost(updatedPost);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  if (token === null) {
    return (
      <h2>
        <Link to="/login">Login to view!</Link>
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
              <Comments
                comments={selectedPost.comments}
                onCommentDeletion={handleCommentDeletion}
              />
              <button>
                <Link to="/">Back</Link>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default Post;
