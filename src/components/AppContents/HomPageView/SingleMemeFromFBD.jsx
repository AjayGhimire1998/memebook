import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { deleteMeme } from "../../Utilities/utility";

export default function SingleMemeFromFBD({
  memeId,
  username,
  profilePic,
  timeStamp,
  memeUrl,
  caption,
}) {
  const [isHidden, setHidden] = useState(false);
  const [
    currentUser,
    setCurrentUser,
    userAvailable,
    setUserAvailable,
    admin,
    setAdmin,
  ] = useContext(AuthContext);

  function handleHide() {
    setHidden(!isHidden);
  }

  const handleDelete = async (id) => {
    deleteMeme(id);
  };
  return (
    <div className="container-meme-list">
      <div className="meme-container">
        <h4 style={{ float: "left" }}>
          {username}
          <img
            src={profilePic}
            style={{
              height: "40px",
              width: "40px",
              border: "2px solid black",
              borderRadius: "40px",
            }}
            alt="pp"
          />
        </h4>
        <br />
        <small
          style={{
            fontSize: "10px",
            fontStyle: "italic",
            fontWeight: "300",
            float: "left"
          }}
        >
          (Uploaded on:
          {timeStamp?.toDate().toDateString()} at
          {timeStamp?.toDate().toLocaleTimeString()})
        </small>
        <br /> <br/>
        <small
          style={{
            fontStyle: "italic",
            fontWeight: "300",
            fontSize: "15px",
            float: "left",
          }}
        >
          {caption}
        </small>
        <br /> <br />
        <img
          src={memeUrl}
          alt={caption}
          className="meme-image"
          style={{ filter: isHidden ? "blur(8px)" : "none" }}
        />
        <br /> <br />
        <button
          style={{
            backgroundColor: "rgba(0, 255, 244, 0.8)",
            border: "none",
            padding: "0",
          }}
          // onClick={(e) => handleDelete(meme.id)}
          onClick={handleHide}
        >
          {isHidden ? " 👀 see " : " 🙈 hide "}
        </button>
        <br /> <br />
        {admin ? (
          <button
            style={{
              backgroundColor: "rgba(0, 255, 244, 0.8)",
              border: "none",
              padding: "0",
            }}
            onClick={(e) => handleDelete(memeId)}
            // onClick={handleHide}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}
