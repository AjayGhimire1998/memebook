import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h3>
        Welcome to <span className="meme-book">MemeBook</span>
        <br/>
        <small style={{ fontWeight: "200" }}> The Ultimate Meme App</small>
      </h3>
      <br /> <br />
      <div className="landing-signup">
        <label>
          <small>
            <i>Sign Up to create a new Account: </i>
          </small>
        </label>
        <br />
        <Link to="/signup" className="signup-button">
          SignUp
        </Link>
      </div>
      <div className="landing-login">
        <label>
          <small>
            <i>Already have an account?: </i>
          </small>
        </label>
        <br />
        <Link to="/login" className="login-button">
          LogIn
        </Link>
      </div>
    </div>
  );
}
