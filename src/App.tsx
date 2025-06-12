import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Vocabulary from "./pages/Vocabulary.tsx";
import Lessons from "./pages/Lessons.tsx";
import Games from "./pages/Games.tsx";
import Progress from "./pages/Progress.tsx";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/games" element={<Games />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
