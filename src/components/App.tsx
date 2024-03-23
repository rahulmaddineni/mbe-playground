import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/App.css";
import MBEConfigForm from "./MBEConfigForm.tsx";
import BuyNowStore from "./cta_stores/BuyNowStore/BuyNowStore.tsx";
import MBEManageRedirect from "./MBEManageRedirect.tsx";

function App() {
  return (
    <div className="app">
      <div className="title-block">
        <h1 className="title-text">MBE Playground</h1>
      </div>
      <div className="app-body">
        <Router>
          <Routes>
            <Route path="/" Component={MBEConfigForm} />
            <Route path="/buy-now" Component={BuyNowStore} />
            <Route path="/manage" Component={MBEManageRedirect} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
