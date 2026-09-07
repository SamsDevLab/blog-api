import App from "./App";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
    ],
  },
];

export default routes;
