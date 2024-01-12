import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import EventDetails from "./components/EventDetails.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/events/:eventId" Component={EventDetails} />
      </Routes>
    </Router>
  </React.StrictMode>
);
