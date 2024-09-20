import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainScreen from "./screens/Main";
import SearchScreen from "./screens/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/search" element={<SearchScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
