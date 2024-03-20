import React from "react";
import "./styles/App.css";
import MBEConfigForm from './MBEConfigForm.tsx'

function App() {
  return (
    <div className="App">
      <div className="title-block">
        <h1 className="title-text">MBE Playground</h1>
      </div>
      <MBEConfigForm />
    </div>
  );
}

export default App;
