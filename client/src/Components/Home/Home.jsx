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
          const result = await response.json();
          const { allPublishedPosts } = result;

          allPublishedPosts.sort((a, b) => a.id - b.id);

          setPosts(allPublishedPosts);
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
                <div className={styles.authorDetails}>
                  <h2 className={styles.username}>{post.author.username}</h2>
                  <h2 className={styles.date}>
                    {new Date(post.createdAt).toLocaleString("en-us", {
                      month: "short",
                      day: "numeric",
                    })}
                  </h2>
                </div>
                <h2>
                  <Link className={styles.cardHeader} to={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default Home;
