import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SignUpContext } from "../../../context/SignUpContext";

export default function LoginForm({
  handleEmailInput,
  handlePasswordInput,
  handleLogin,
  tooglePassword,
  invalidError,
}) {
  const { showPassword } = useContext(SignUpContext);
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
      <div className="login">
        <form>
          <div
            style={{
              textAlign: "center",
              fontSize: "35px",
              fontWeight: "800",
              fontFamily: "Copperplate, Copperplate Gothic Light,fantasy",
            }}
          >
            <label>Log In</label>
          </div>
          <br />
          <div>
            <label htmlFor="first-name">Email: </label>
            <input type="email" onChange={handleEmailInput} />
          </div>
          <br />
          <div>
            <label htmlFor="first-name">Password: </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordInput}
            />
          </div>
          <input type="checkbox" onClick={tooglePassword} />
          <small>{showPassword ? " Hide " : " Show "} Password</small>
          <br />
          <br />
          <small>Use Guest Credentials:</small>
          <br />
          <small>
            <b>Email: </b> <i>guest@test.com</i>
          </small>
          <br />
          <small>
            <b>Password: </b> <i>@Guest123</i>
          </small>
          <br />
          <br />
          <small>
            <i>
              By clicking the "Log In" button below, you will be directed to the
              actual app
            </i>
          </small>
          <br /> <br />
          {invalidError ? (
            <small style={{ color: "red" }}>Wrong Email or Password !!</small>
          ) : null}
          <br /> <br />
          <div className="landing-signup">
            <button className="login-button" onClick={handleLogin}>
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
