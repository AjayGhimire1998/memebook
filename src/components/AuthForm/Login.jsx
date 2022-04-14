import React from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";


export default function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmailError, setEmptyEmailError] = useState ("");
  const [emptyPasswordError, setEmptyPasswordError] = useState ("");
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  
  const history = useHistory();

  const emailChange = (e) => {
    setEmail(e.target.value)
  };

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const validateEmailInput = () => {
    if(email.length ===  0 ){
      setEmptyEmailError("Email must not be empty!")
    } else {
      setEmptyEmailError ("")
    }
  }

  const validatePasswordInput = () => {
    if(password.length  === 0) {
      setEmptyPasswordError ("Password must not be empty!")
    } else {
      setEmptyPasswordError ("")
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password,)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setCurrentUser(true);
        history.push("/homeview")
      })
      .catch((error) => {
        setError(true)
      });
  };
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
        <div>
          <br />
          <label htmlFor="first-name">Email: </label>
          <input type="email" onChange={(e) => {emailChange(e); validateEmailInput() }} />
        </div>
        <br/>
        <small style={{color: "red"}}><i>{emptyEmailError}</i></small>
        <div>
          <br />
          <label htmlFor="first-name">Password: </label>
          <input type="password" onChange={(e) => {passwordChange(e);validatePasswordInput()  }} />
        </div>
        <br/>
        <small style={{color: "red"}}><i>{emptyPasswordError}</i></small>
        <br /> <br />
        <small>
          <i>
            By clicking the "Log In" button below, you will be directed to the
            actual app
          </i>
        </small>
        <br /> <br />
        {error && (
          <small style={{ color: "red" }}>Wrong Email or Password !!</small>
        )}
        <br/> <br/>
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
