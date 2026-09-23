import { useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header.jsx";
import { Outlet } from "react-router";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <div className="app-container">
      <Header token={token} setToken={setToken} />
      <main className="main-content">
        <div className="main-container">
          <Outlet context={{ token, setToken }} />
        </div>
      </main>
    </div>
  );
}

export default App;
