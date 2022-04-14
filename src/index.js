import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
// import { AuthContextProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log("hello");
root.render(
  // <React.StrictMode>
  //   <AuthContextProvider>
      <Router>
        <App />
      </Router>
  //   </AuthContextProvider>
  // </React.StrictMode>
);

reportWebVitals();
