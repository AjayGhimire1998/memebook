import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import "./NavBar.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePageContext } from "../../../context/HomePageContext";
import { ProfileContext } from "../../../context/ProfileContext";
import avatar from "../images/user.png";
import { getNewMemes } from "../../Utilities/utility";
import { DBDataContext } from "../../../context/DBDataContext";

export default function NavBar({ userDetails }) {
  const { setHomePageData, newMeme, setNewMeme } = useContext(HomePageContext);
  const { profile, setProfileAvailable } = useContext(ProfileContext);
  const { getAllUploadedMemes } = useContext(DBDataContext);
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(userDetails || null));
    if (userDetails) {
      setProfileAvailable(true);
    } else {
      setProfileAvailable(false);
    }
  }, [userDetails]);

  return (
    <div className="nav-bar">
      <button
        className="meme-book"
        onClick={(e) => {
          getAllUploadedMemes(e);
          getNewMemes(newMeme, setNewMeme, setHomePageData);
          history.push("/homeview");
        }}
      >
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
        <br />
        <small
          style={{
            fontFamily: "fantasy",
            fontSize: "15px",
            fontStyle: "italic",
          }}
        >
          Click Me to see more Memes..✨🔮🪄
        </small>
        <br /> <br />
        <small
          style={{ fontSize: "20px", fontFamily: "Calibri", float: "left" }}
        >
          {/* {profile?.username || userDetails?.username
            ? `Welcome...${profile?.username || userDetails?.username}`
            : `Welcome...`} */}
            Welcome...{profile?.username || userDetails?.username || ""} 
        </small>
      </button>

      <Link
        to="/homeview/upload"
        className="meme-upload"
        title="Upload Meme"
      ></Link>
      <Link
        to="/homeview/create"
        className="meme-create"
        title="Create Meme"
      ></Link>

      <Dropdown>
        <Dropdown.Toggle id="custom">
          <NavLink
            to="/homeview/profile"
            className="meme-profile"
            style={
              profile || userDetails
                ? {
                    backgroundImage: `url("${
                      profile?.profilePic || userDetails?.profilePic
                    }")`,
                  }
                : { backgroundImage: `url(${avatar})` }
            }
            title="Set Profile"
          ></NavLink>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href=""
            onClick={() => {
              history.push("/homeview/setprofile");
            }}
          >
            Set Profile
          </Dropdown.Item>
          <Dropdown.Item
            href=""
            onClick={() => {
              window.localStorage.clear();
              history.push("/");
              window.location.reload();
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
