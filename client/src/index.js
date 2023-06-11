import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StudentMainPage from "./pages/StudentMainPage";
import LoginPage from "./pages/LoginPage";
import ViewCandidates from "./pages/ViewCandidates";
import VoteCandidate from "./pages/VoteCandidate";
import ViewResults from "./pages/ViewResults";
import Application from "./pages/Application";
import Test from "./pages/test";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<StudentMainPage />} />
      <Route path="/candidates" element={<ViewCandidates />} />
      <Route path="/vote" element={<VoteCandidate />} />
      <Route path="/results" element={<ViewResults />} />
      <Route path="/application" element={<Application />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </Router>
);
