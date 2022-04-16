import React, { useContext } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import "./NavBar.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePageContext } from "../../context/HomePageContext";
import { ProfileContext } from "../../context/ProfileContext";

export default function NavBar() {
  const [homePageData, setHomePageData, newMeme, setNewMeme] =
    useContext(HomePageContext);

  const [profile, setProfile, profileAvailable, setProfileAvailable] =
    useContext(ProfileContext);
  const history = useHistory();

  const profilePic = localStorage.getItem("profile", JSON.stringify(profile));
  const parsedProfilePic = JSON.parse(profilePic);

  const getNewMemes = () => {
    fetch(`https://www.reddit.com/r/memes.json?after=${newMeme}`)
      .then((res) => res.json())
      .then((body) => {
        setNewMeme(body.data.after);
        setHomePageData(body.data.children);
      });
  };

  return (
    <div className="nav-bar">
      <button
        className="meme-book"
        onClick={(e) => {
          history.push("/homeview");
          getNewMemes();
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
            style={profileAvailable ? {backgroundImage: `url(${parsedProfilePic.profilePic})`}: {backgroundImage: `url(./images/user.png)`}}
            title="Set Profile"
          ></NavLink>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href=""
            onClick={(e) => {
              history.push("/homeview/setprofile");
            }}
          >
            Set Profile
          </Dropdown.Item>
          <Dropdown.Item
            href=""
            onClick={(e) => {
              window.localStorage.clear();
              history.push("/");
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
