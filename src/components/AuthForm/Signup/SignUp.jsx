import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Signup.scss";
import { SignUpContext } from "../../../context/SignUpContext";

export default function SignUp() {
  const {
    error,
    showPassword,
    showConfirmPass,
    passwordIsValid,
    passwordIsValidError,
    signError,
    confirmError,
    validatePassword,
    validateEmail,
    tooglePassword,
    toogleConfirmPass,
    handleEmailInput,
    handlePasswordInput,
    handleConfirmPasswordInput,
    handleSignUpClick,
  } = useContext(SignUpContext);

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
              }}
            />
            <br />
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
                handleConfirmPasswordInput(e);
              }}
            />
            <br />

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
