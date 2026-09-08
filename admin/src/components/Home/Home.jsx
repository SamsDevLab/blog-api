import styles from "../Home/Home.module.css";
import { useState, useEffect } from "react";
import { getAllPosts, togglePublishedStatus } from "../../services/postService";

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // will need to adjust this fetch to only grab posts the current user authored
      const response = await getAllPosts();
      const result = await response.json();

      if (response.ok === true) {
        setPosts(result.allPosts);
      }
    }

    fetchData();
  }, []);

  async function handlePublishedStatus(postId, publishedStatus) {
    const reversePublishedStatus = !publishedStatus;

    try {
      const response = await togglePublishedStatus(
        postId,
        reversePublishedStatus,
      );

      if (response.ok === true) {
        const result = await response.json();
        const { updatedPost } = result;

        const newArr = posts.map((post) => {
          return post.id === updatedPost.id ? updatedPost : post;
        });

        setPosts(newArr);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {posts === null ? (
        <h2>No blog posts!</h2>
      ) : (
        posts.map((post) => {
          return (
            <div key={post.id} className={styles.blogPostCard}>
              <h2>{post.title}</h2>
              <h3>{new Date(post.createdAt).toLocaleString()}</h3>
              <p>{post.content}</p>
              {post.published === true ? (
                <>
                  <h3>Published</h3>
                  <form
                    action={() =>
                      handlePublishedStatus(post.id, post.published)
                    }
                  >
                    <button>Unpublish</button>
                  </form>
                </>
              ) : (
                <>
                  <h3>Unpublished</h3>
                  <form
                    action={() =>
                      handlePublishedStatus(post.id, post.published)
                    }
                  >
                    <button>Publish</button>
                  </form>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
