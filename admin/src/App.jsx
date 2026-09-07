import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="main-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
