import { useContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import { SignUpContext } from "../../../context/SignUpContext";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  const {
    setError,
    showPassword,
    setShowPassword,
    showConfirmPass,
    setShowConfirmPass,
    setPasswordIsValid,
    setPasswordIsValidError,
    setSignError,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPasword,
    setConfirmError,
  } = useContext(SignUpContext);

  function validateEmail(e) {
    const email = e.target.value;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email)) {
      setError(false);
    } else {
      setError(true);
    }
  }

  function tooglePassword() {
    setShowPassword(!showPassword);
  }
  function toogleConfirmPass() {
    setShowConfirmPass(!showConfirmPass);
  }

  function validatePassword(e) {
    const passWord = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if (passwordRegex.test(passWord)) {
      setPasswordIsValid(true);
      setPasswordIsValidError(false);
    } else {
      setPasswordIsValid(false);
      setPasswordIsValidError(true);
    }
  }

  function handleEmailInput(e) {
    setEmail(e.target.value);
    validateEmail(e);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
    validatePassword(e);
  }

  function handleConfirmPasswordInput(e) {
    setConfirmPasword(e.target.value);
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setConfirmError(false);
    } else {
      setConfirmError(true);
    }
  }, [confirmPassword, password]);

  const history = useHistory();

  function handleSignUpClick(e) {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        history.push("./login");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setSignError(error.message);
        } else {
          setSignError("All fields must have valid data!");
        }
      });
  }

  return (
    <SignUpForm
      tooglePassword={tooglePassword}
      toogleConfirmPass={toogleConfirmPass}
      handleEmailInput={handleEmailInput}
      handlePasswordInput={handlePasswordInput}
      handleConfirmPasswordInput={handleConfirmPasswordInput}
      handleSignUpClick={handleSignUpClick}
    />
  );
}
