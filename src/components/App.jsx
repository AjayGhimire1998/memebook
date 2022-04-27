import "../App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./AuthForm/LandingPage/LandingPage";
import SignUp from "./AuthForm/Signup/SignUp";
import Login from "./AuthForm/Login/Login";
import Footer from "./AuthForm/Footer";
import HomePage from "./AppContents/HomPageView/HomePage";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ProfileContext } from "../context/ProfileContext";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [userAvailable, SetUserAvailable] = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();

  const getUserDetails = async () => {
    const user = auth?.currentUser;
    const userRef = doc(db, "users", user.uid);
    const uploadedDetails = await getDoc(userRef);
    setUserDetails(uploadedDetails?.data());
  };

  return (
    <div>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login getUserDetails={getUserDetails} userDetails={userDetails} />
        </Route>
        <Route path="/homeview">
          {userAvailable ? (
            <HomePage
              userDetails={userDetails}
              getUserDetails={getUserDetails}
            />
          ) : (
            <Redirect to="/" />
          )}
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
