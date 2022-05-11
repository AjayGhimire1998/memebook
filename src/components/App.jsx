import "../App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingPage from "./AuthForm/LandingPage/LandingPage";
import SignUp from "./AuthForm/Signup/SignUp";
import Login from "./AuthForm/Login/Login";
import Footer from "./AuthForm/Footer";
import HomePage from "./AppContents/HomPageView/HomePage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProfileContext } from "../context/ProfileContext";

function App() {
  const [userAvailable, SetUserAvailable] = useContext(AuthContext);
  const { profileAvailable } = useContext(ProfileContext);
  const [userDetails, setUserDetails] = useState();

  const getUserDetails = async () => {
    const user = auth?.currentUser;
    // console.log(user.uid)
    const userRef = doc(db, "users", user.uid);
    const uploadedDetails = await getDoc(userRef);
    // console.log(uploadedDetails.data());
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
          {userAvailable ? <HomePage /> : <LandingPage />}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
