import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(
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
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
