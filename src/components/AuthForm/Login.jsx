import React from "react";
import {Link} from "react-router-dom";

export default function Login(){
    return(
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
          <label>Log In</label>
        </div>
        <div>
          <br />
          <label htmlFor="first-name">Email: </label>
          <input type="email" required />
        </div>
        <div>
          <br />
          <label htmlFor="first-name">Password: </label>
          <input type="password" required />
        </div>
        <br/> <br/>      
        <small><i>By clicking the "Log In" button below, you will be directed to the actual app</i></small>
        <br/> <br/>
        <div className="landing-signup">
          <Link to="/homeview" className="signup-button">
            Log In
          </Link>
        </div>
      </form>
    </div>
    )
}