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
      <div className={styles.loginContainer}>
        <h2>
          <Link className={styles.loginLink} to="/login">
            Login to manage posts!
          </Link>
        </h2>
      </div>
    );
  } else {
    return (
      <div className={styles.cardContainer}>
        {posts === null || posts.length === 0 ? (
          <h2 className={styles.blogPostCard}>
            There are no blog posts at this time!
          </h2>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className={styles.blogPostCard}>
                <h2>
                  <Link className={styles.cardHeader} to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <h3>{new Date(post.createdAt).toLocaleString()}</h3>
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
