import styles from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fetchAllPublicPosts } from "../../services/postService";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [token] = useState(() => localStorage.getItem("token"));

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

  return (
    <div>
      <h2>Bloggin'</h2>
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
};

export default Home;
