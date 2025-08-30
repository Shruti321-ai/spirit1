import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import StartPage from "./StartPage";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import ResultPage from "./ResultPage";
import GuidePage from "./GuidePage";   // ✅ import GuidePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz/:categoryId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/guide" element={<GuidePage />} /> {/* ✅ new route */}
      </Routes>
    </Router>
  );
}

export default App;
