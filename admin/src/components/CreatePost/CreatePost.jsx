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
    <form action={handleCreatePost} className={styles.newPostForm}>
      <div className={styles.inputContainer}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          placeholder="Enter title here..."
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="newPost">Content</label>
        <textarea
          name="content"
          id="newPost"
          placeholder="Start writing..."
        ></textarea>
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <Link to="/">Back</Link>
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CreatePost;
