import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

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
