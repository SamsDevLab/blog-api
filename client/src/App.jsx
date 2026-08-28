// import { useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { Outlet } from "react-router";

function App() {
  return (
    <div class="app-container">
      <Header />
      <main className="main-content">
        <div className="main-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
