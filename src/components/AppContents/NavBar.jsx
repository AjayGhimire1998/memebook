import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="nav-bar">
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
      <NavLink to="/homeview/upload" className="meme">
        Upload
      </NavLink>
      <NavLink to="/homeview/create" className="meme">
        Create
      </NavLink>
      <NavLink to="/homeview/profile" className="meme">
        Profile
      </NavLink>
    </div>
  );
};

export default NavBar;
