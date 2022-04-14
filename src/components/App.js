import "../App.css";
import { Route } from "react-router-dom";
import { BrowserRouter as Router ,Switch, Redirect } from "react-router-dom";
import LandingPage from "./AuthForm/LandingPage";
import SignUp from "./AuthForm/SignUp";
import Login from "./AuthForm/Login";
import Footer from "./AuthForm/Footer";
import HomePage from "./AppContents/HomePage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";



function App() {
  const [currentUser, setCurrentUser] = useContext(AuthContext);

  console.log("hello world")

  return (
    <div>

        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
            </ Route>
          <Route path="/homeview">
              {currentUser ? <HomePage/> :<Redirect to="/login" />}
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      <Footer />
    </div>
  );
}

export default App;
