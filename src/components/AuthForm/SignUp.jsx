import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useHistory, NavLink } from "react-router-dom";
import "./Signup.scss";

export default function SignUp() {
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [error, setError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsValidError, setPasswordIsValidError] = useState(true);
  const [requireTextField, setRequireTextField] = useState(false);
  const [requiredError, setRequiredError] = useState("");

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
      setEmailIsValid(true);
      setError(false);
    } else {
      setEmailIsValid(false);
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

  function requiredField(e) {
    if (e.target.value.length === 0) {
      setRequireTextField(true);
      setRequiredError("*required");
    } else {
      setRequireTextField(false);
      setRequiredError("");
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
    if (password !== confirmPassword) {
      // setPasswordMatch(false);
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }
  }, [confirmPassword]);

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
    <div>
      <NavLink to="/homeview" className="meme-book">
        Meme <br />
        <span
          style={{
            color: "black",
            fontSize: "50px",
            textShadow: "0 0 2px white",
          }}
        >
          Book
        </span>
      </NavLink>
      <div className="sign-up-form">
        <form method="post">
          <div
            style={{
              textAlign: "center",
              fontSize: "35px",
              fontWeight: "800",
              fontFamily: "Copperplate, Copperplate Gothic Light,fantasy",
            }}
          >
            <label>Sign Up</label>
          </div>
          <div>
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              onChange={(e) => {
                handleEmailInput(e);
                validateEmail(e);
                requiredField(e);
              }}
              className={requireTextField ? "required-text" : ""}
            />
            <br />
            <small style={{ color: "red" }}>
              <i>{requiredError}</i>
            </small>
            <br />
            <i>
              {error ? (
                <small style={{ color: "red" }}>
                  Email format is not valid
                </small>
              ) : (
                <small style={{ color: "green" }}>Email format is valid</small>
              )}
            </i>
          </div>
          <div>
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => {
                handlePasswordInput(e);
                validatePassword(e);
              }}
              className={passwordIsValid ? "" : "required-text"}
            />
            <br />
            <small style={{ color: "red" }}>
              <i>{requiredError}</i>
            </small>
            <br />
            <input type="checkbox" onClick={tooglePassword} />
            <small>{showPassword ? " Hide " : " Show "} Password</small>
            <br />
            <small>
              <i>
                {passwordIsValidError ? (
                  <small style={{ color: "red" }}>
                    "Password must be 6-30 characters long and must have at
                    least one Number, Uppercase, Lowercase and a Special
                    character!"
                  </small>
                ) : (
                  <small style={{ color: "green" }}>
                    Your password is valid
                  </small>
                )}
              </i>
            </small>
          </div>
          <div>
            <br />
            <label htmlFor="confirm-password">Confirm Password: </label>
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              onChange={(e) => {
                requiredField(e);
                handleConfirmPasswordInput(e);
              }}
              className={requireTextField ? "required-text" : ""}
            />
            <br />
            <small style={{ color: "red" }}>
              <i>{requiredError}</i>
            </small>
            <br />
            <input type="checkbox" onClick={toogleConfirmPass} />
            <small>{showConfirmPass ? " Hide " : " Show "} Password</small>
            <br />
            <i>
              {confirmError ? (
                <small style={{ color: "red" }}>Password doesn't match</small>
              ) : (
                <small style={{ color: "green" }}>
                  "Password Matches, All Good!!"
                </small>
              )}
            </i>
          </div>
          <br /> <br />
          <small>
            <i>
              By clicking the "SignUp" button below, you agree to all terms and
              conditions
            </i>
          </small>
          <br /> <br />
          <small style={{ color: "red" }}>{signError}</small>
          <br /> <br />
          <div className="landing-signup">
            <button
              to="/login"
              className="signup-button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
