import React, { useState } from "react";

export default function SingleMemeFromFBD({
  username,
  profilePic,
  timeStamp,
  memeUrl,
  caption,
}) {
  const [isHidden, setHidden] = useState(false);

  function handleHide() {
    setHidden(!isHidden);
  }
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
          <small
            style={{
              fontSize: "10px",
              fontStyle: "italic",
              fontWeight: "300",
            }}
          >
            (Uploaded on:
            {timeStamp?.toDate().toDateString()} at
            {timeStamp?.toDate().toLocaleTimeString()})
          </small>
        </h4>
        <br />
        <small
          style={{
            fontStyle: "italic",
            fontWeight: "400",
            fontSize: "20px",
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
      </div>
    </div>
  );
}
