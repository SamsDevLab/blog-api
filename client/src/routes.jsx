import App from "./App.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Post from "./Components/Post/Post.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "posts/:postId", element: <Post /> },
    ],
  },
];

export default routes;
