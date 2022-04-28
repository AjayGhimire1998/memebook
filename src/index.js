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
import { SignUpContextProvider } from "./context/SignUpContext";
import { DBDataContextProvider } from "./context/DBDataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <SignUpContextProvider>
        <ProfileContextProvider>
          <HomePageContextProvider>
            <DBDataContextProvider>
              <UploadMemeContextProvider>
                <CreateMemeContextProvider>
                  <App />
                </CreateMemeContextProvider>
              </UploadMemeContextProvider>
            </DBDataContextProvider>
          </HomePageContextProvider>
        </ProfileContextProvider>
      </SignUpContextProvider>
    </AuthContextProvider>
  </Router>
);

reportWebVitals();
