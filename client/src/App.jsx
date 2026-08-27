// import { useState } from "react";

import "./App.css";
import styles from "./App.module.css";
import Header from "./Components/Header/Header.jsx";
import MainContent from "./Components/MainContent/MainContent.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
  return (
    <div class="app-container">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
