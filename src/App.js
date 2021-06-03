import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import './App.css';
import Countdown from "./components/Countdown";

function App() {

  return (
    <div className="App">
       <Countdown />
    </div>
  );
}

export default App;
