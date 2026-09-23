import styles from "../CreatePost/CreatePost.module.css";
import { Link, useNavigate, useOutletContext } from "react-router";
import { addNewPost } from "../../services/postService";

const CreatePost = () => {
  const { token } = useOutletContext();
  const navigate = useNavigate();

  async function handleCreatePost(formData) {
    const newPostData = Object.fromEntries(formData);
    const response = await addNewPost(token, newPostData);
    if (response.ok === true) {
      navigate("/");
    }
  }

  return (
    <div className={styles.postContainer}>
      <form action={handleCreatePost} className={styles.newPostForm}>
        <div className={styles.inputContainer}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Enter title here..."
            required
            className={styles.newPostInput}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="newPost">Content</label>
          <textarea
            name="content"
            id="newPost"
            placeholder="Start writing..."
            required
            className={styles.newPostInput}
          ></textarea>
        </div>
        <div className={styles.buttonContainer}>
          <Link className={styles.backLink} to="/">
            Back
          </Link>
          <button className={styles.submitButton}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
