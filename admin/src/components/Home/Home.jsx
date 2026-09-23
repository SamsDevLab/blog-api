import styles from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router";
import {
  getPostsByAuthor,
  togglePublishedStatus,
} from "../../services/postService";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const { token } = useOutletContext();

  useEffect(() => {
    async function fetchData() {
      const response = await getPostsByAuthor(token);
      const result = await response.json();
      const { allPosts } = result;

      allPosts.sort((a, b) => a.id - b.id);

      if (response.ok === true) {
        setPosts(allPosts);
      }
    }

    if (token !== null) {
      fetchData();
    }
  }, [token]);

  async function handlePublishedStatus(post) {
    try {
      const response = await togglePublishedStatus(post, token);
      if (response.ok === true) {
        const result = await response.json();
        const { postsByAuthor } = result;

        postsByAuthor.sort((a, b) => a.id - b.id);

        setPosts(postsByAuthor);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
        {posts === null ? (
          <h2>No blog posts available!</h2>
        ) : (
          posts.map((post) => {
            return (
              <div key={post.id} className={styles.blogPostCard}>
                <h2>
                  <Link className={styles.cardHeader} to={`posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                <h3>{new Date(post.createdAt).toLocaleString()}</h3>
                <p>{post.content}</p>
                {post.published === true ? (
                  <div className={styles.publishedStatusContainer}>
                    <h3 className={styles.publishedBadge}>Published</h3>
                    <form action={() => handlePublishedStatus(post)}>
                      <button className={styles.unpublishButton}>
                        Unpublish
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className={styles.publishedStatusContainer}>
                    <h3 className={styles.draftBadge}>Draft</h3>
                    <form action={() => handlePublishedStatus(post)}>
                      <button className={styles.publishButton}>Publish</button>
                    </form>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default Home;
