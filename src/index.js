import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ProfileContextProvider } from "./context/ProfileContext";
import { HomePageContextProvider } from "./context/HomePageContext";
import { UploadMemeContextProvider } from "./context/UploadMemeContext";
import { CreateMemeContextProvider } from "./context/CreateMemeContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <ProfileContextProvider>
        <HomePageContextProvider>
          <UploadMemeContextProvider>
            <CreateMemeContextProvider>
              <App />
            </CreateMemeContextProvider>
          </UploadMemeContextProvider>
        </HomePageContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  </Router>
);

reportWebVitals();
