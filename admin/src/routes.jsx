import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import CreatePost from "./components/CreatePost/CreatePost";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/posts/:postId", element: <Post /> },
      { path: "/createPost", element: <CreatePost /> },
    ],
  },
];

export default routes;
