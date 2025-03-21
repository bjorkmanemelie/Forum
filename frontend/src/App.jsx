import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThreadProvider } from "./context/ThreadContext";

import HomePage from "./pages/HomePage";
import ThreadPage from "./pages/ThreadPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import Navbar from "./components/Navbar";
import "./App.css";
//Function organiserar koden
function App() {
  return (
    <ThreadProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<ThreadPage />} />
              <Route path="/create" element={<CreateThreadPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThreadProvider>
  );
}

export default App;
