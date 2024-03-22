import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import MBEConfigForm from "./MBEConfigForm.tsx";
import BuyNowStore from "./cta_stores/BuyNowStore/BuyNowStore.tsx";

function App() {
  return (
    <div className="App">
      <div className="title-block">
        <h1 className="title-text">MBE Playground</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" Component={MBEConfigForm} />
          <Route path="/buy-now" Component={BuyNowStore} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
