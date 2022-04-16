import "../App.css";
import { Route , Switch, Redirect } from "react-router-dom";
import LandingPage from "./AuthForm/LandingPage";
import SignUp from "./AuthForm/SignUp";
import Login from "./AuthForm/Login";
import Footer from "./AuthForm/Footer";
import HomePage from "./AppContents/HomePage";
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
            </ Route>
          <Route path="/homeview">
              {userAvailable ? <HomePage/> :<Redirect to="/" />}
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
