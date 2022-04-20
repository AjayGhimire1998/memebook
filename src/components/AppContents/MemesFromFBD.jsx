import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";

export default function MemesFromFBD({ allUploadedMemes, handleDelete }) {
  const [profile, setProfile] = useContext(ProfileContext);

  // const userName = localStorage.getItem("profile", JSON.stringify(profile));
  // const parsedUserName = JSON.parse(userName);

  const uploadedMemeToDisplay = allUploadedMemes.map((meme, index) => {
    const meme_url = meme.uploadedMemeImage;
    return (
      <div className="container-meme-list" key={index}>
        <div className="meme-container">
          <h4 style={{ float: "left" }}>{meme.username}</h4>
          <br />
          <small
            style={{
              fontStyle: "italic",
              fontWeight: "300",
              fontSize: "15px",
              float: "left",
            }}
          >
            {meme.caption}
          </small>
          <br /> <br />
          <img src={meme_url} alt={meme.caption} className="meme-image" />
          <br /> <br />
          <button
            style={{ backgroundColor: "red" }}
            onClick={(e) => handleDelete(meme.id)}
          >
            🗑
          </button>
        </div>
      </div>
    );
  });

  return <div>{uploadedMemeToDisplay}</div>;
}
