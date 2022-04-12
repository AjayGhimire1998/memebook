import "../App.css";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LandingPage from "./AuthForm/LandingPage";
import SignUp from "./AuthForm/SignUp";
import Login from "./AuthForm/Login";
import Footer from "./AuthForm/Footer";
import HomePage from "./AppContents/HomePage";

function App() {
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
          <HomePage />
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
