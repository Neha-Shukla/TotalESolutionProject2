import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
