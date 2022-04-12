import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  let [signUpData, setSignUpData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [authData, setAuthData] = useState([]);
  const [passwordTaken, setPasswordTaken] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsValidError, setPasswordIsValidError] = useState("");

  function validateEmail(e) {
    const email = e.target.value;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email)) {
      setEmailIsValid(true);
      setError("Your email is valid");
    } else {
      setEmailIsValid(false);
      setError("Your email is not valid.");
    }
  }

  function tooglePassword() {
    setShowPassword(!showPassword);
  }
  function toogleConfirmPass() {
    setShowConfirmPass(!showConfirmPass);
  }

  useEffect(() => {
    fetch("http://localhost:4000/memebook")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAuthData([...data]);
      });
  }, []);

  function passwordCheck(authData, e) {
    const password = e.target.value;
    authData.map((d) => {
      if (password === d.password) {
        setPasswordTaken(true);
        setPasswordError("This Password is already taken!");
      } else if (password.length < 8) {
        setPasswordTaken(false);
        setPasswordError("");
      }
    });
  }

  function validatePassword(e) {
    const passWord = e.target.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
    if (passwordRegex.test(passWord)) {
      setPasswordIsValid(true);
      setPasswordIsValidError("Password is Valid!");
    } else {
      setPasswordIsValid(false);
      setPasswordIsValidError(
        "Password must be 8-30 characters long and must have at least one Number, Uppercase, Lowercase and a Special character!"
      );
    }
  }

  function handleInput(e) {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  function handleSignUpClick() {
    fetch("http://localhost:4000/memebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: signUpData.firstname,
        lastname: signUpData.lastname,
        email: signUpData.email,
        password: signUpData.password,
        username: signUpData.username,
      }),
    });
  }

  return (
    <div className="sign-up-form">
      <form>
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
          <label htmlFor="first-name">First Name: </label>
          <input type="text" onChange={handleInput} name="firstname" />
        </div>
        <div>
          <br />
          <label htmlFor="last-name">Last Name: </label>
          <input type="text" name="lastname" onChange={handleInput} />
        </div>
        <div>
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              handleInput(e);
              validateEmail(e);
            }}
          />
          <br />
          <small>
            <i>{error}</i>
          </small>
        </div>
        <div>
          <br />
          <label htmlFor="psssword">Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(e) => {
              handleInput(e);
              passwordCheck(authData, e);
              validatePassword(e);
            }}
          />
          <br />
          <input type="checkbox" onClick={tooglePassword} />
          <small>{showPassword ? " Hide " : " Show "} Password</small>
          <br />
          <small>
            <i>{passwordError}</i>
          </small>
          <br />
          <br />
          <small>
            <i>{passwordIsValidError}</i>
          </small>
        </div>
        <div>
          <br />
          <label htmlFor="confirm-password">Confirm Password: </label>
          <input
            type={showConfirmPass ? "text" : "password"}
            name="password"
            onChange={handleInput}
          />
          <br />
          <input type="checkbox" onClick={toogleConfirmPass} />
          <small>{showConfirmPass ? " Hide " : " Show "} Password</small>
        </div>
        <div>
          <br />
          <label htmlFor="username">Set UserName: </label>
          <input type="text" name="username" onChange={handleInput} />
        </div>
        <br /> <br />
        <small>
          <i>
            By clicking the "SignUp" button below, you agree to all terms and
            conditions
          </i>
        </small>
        <br /> <br />
        <div className="landing-signup">
          <Link
            to="/login"
            className="signup-button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
