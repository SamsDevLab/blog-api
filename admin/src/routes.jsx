import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/posts/:postId", element: <Post /> },
    ],
  },
];

export default routes;
