import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import { SearchProvider } from "./context/SearchContext";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PlayerProvider>
        <SearchProvider>
        <App />
        </SearchProvider>
      </PlayerProvider>
    </AuthProvider>
  </BrowserRouter>
);