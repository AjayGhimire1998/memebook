import "../App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./AuthForm/LandingPage/LandingPage";
import SignUp from "./AuthForm/Signup/SignUp";
import Login from "./AuthForm/Login/Login";
import Footer from "./AuthForm/Footer";
import HomePage from "./AppContents/HomPageView/HomePage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function App() {
  const [userAvailable, SetUserAvailable] = useContext(AuthContext);

  return (
    <div>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/homeview">
          {userAvailable ? <HomePage /> : <Redirect to="/" />}
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
