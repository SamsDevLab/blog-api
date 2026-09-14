import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="main-container">
          <Outlet context={{ token, setToken }} />
        </div>
      </main>
    </div>
  );
}

export default App;
