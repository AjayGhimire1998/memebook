import { useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
import { SignUpContext } from "../../../context/SignUpContext";
import { ProfileContext } from "../../../context/ProfileContext";
import LoginForm from "./LoginForm";

export default function Login({ getUserDetails }) {
  const [invalidError, setInvalidError] = useState(false);
  const [currentUser, setCurrentUser, userAvailable, setUserAvailable] =
    useContext(AuthContext);
  const {
    showPassword,
    setShowPassword,
    email,
    password,
    setEmail,
    setPassword,
  } = useContext(SignUpContext);

  const history = useHistory();

  function handleEmailInput(e) {
    setEmail(e.target.value);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }

  function tooglePassword() {
    setShowPassword(!showPassword);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user.email);
        setUserAvailable(true);
        history.push("/homeview");
      })
      .catch((error) => {
        console.log("Error:", error);
        setInvalidError(true);
      });

    setTimeout(getUserDetails, 2000);
  };

  return (
    <LoginForm
      invalidError={invalidError}
      handleEmailInput={handleEmailInput}
      handlePasswordInput={handlePasswordInput}
      tooglePassword={tooglePassword}
      handleLogin={handleLogin}
    />
  );
}
