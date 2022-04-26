import { useState, createContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const SignUpContext = createContext();

function SignUpContextProvider({ children }) {
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsValidError, setPasswordIsValidError] = useState(true);

  const [signError, setSignError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasword] = useState("");
  const [confirmError, setConfirmError] = useState(true);

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
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
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
    <SignUpContext.Provider
      value={{
        error,
        setError,
        showPassword,
        setShowPassword,
        showConfirmPass,
        setShowConfirmPass,
        passwordIsValid,
        setPasswordIsValid,
        passwordIsValidError,
        setPasswordIsValidError,
        signError,
        setSignError,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPasword,
        confirmError,
        setConfirmError,
        validatePassword,
        validateEmail,
        tooglePassword,
        toogleConfirmPass,
        handleEmailInput,
        handlePasswordInput,
        handleConfirmPasswordInput,
        handleSignUpClick,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}
export { SignUpContext, SignUpContextProvider };
