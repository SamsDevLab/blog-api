import styles from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";
import { fetchAllPublicPosts } from "../../services/postService";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const { token } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllPublicPosts(token);
        if (response.ok === true) {
          const postObject = await response.json();
          setPosts(postObject.allPublishedPosts);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token !== null) fetchData();
  }, [token]);

  if (token === null) {
    return (
      <h2>
        <Link to="/login">Login to view posts!</Link>
      </h2>
    );
  } else {
    return (
      <div>
        {posts === null ? (
          <h2>No blog posts at the moment!</h2>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className={styles.blogPostCard}>
                <h2>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <h3>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleString()
                    : "No date available"}
                </h3>
                <p>{post.content}</p>
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default Home;
