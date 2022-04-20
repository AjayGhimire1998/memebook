import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory, Link } from "react-router-dom";
import "./NavBar.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePageContext } from "../../context/HomePageContext";
import { ProfileContext } from "../../context/ProfileContext";
import avatar from "./images/user.png";
export default function NavBar({ getAllUploadedMemes }) {
  const [homePageData, setHomePageData, newMeme, setNewMeme] =
    useContext(HomePageContext);

  const [profile, setProfile] = useContext(ProfileContext);

  const [profilePicture, setProfilePicture] = useState();
  const history = useHistory();

  useEffect(() => {
    const profilePic = localStorage?.getItem(
      "profile",
      JSON.stringify(profile)
    );
    const parsedProfilePic = JSON.parse(profilePic);
    setProfilePicture(parsedProfilePic);
  }, [profile]);

  // console.log(parsedProfilePic.profilePic)

  const getNewMemes = () => {
    fetch(`https://www.reddit.com/r/memes.json?after=${newMeme}`)
      .then((res) => res.json())
      .then((body) => {
        setNewMeme(body.data.after);
        setHomePageData(body.data.children);
      });
      ;
  };

  return (
    <div className="nav-bar">
      <button
        className="meme-book"
        onClick={(e) => {
          // getAllUploadedMemes(e);
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
        <br />
        <small
          style={{
            fontFamily: "fantasy",
            fontSize: "15px",
            fontStyle: "italic",
          }}
        >
          Click Me to see Wonders..✨🔮🪄
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
              profilePicture
                ? { backgroundImage: `url("${profilePicture?.profilePic}")` }
                : { backgroundImage: `url(${avatar})` }
            }
            title="Set Profile"
            s
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
