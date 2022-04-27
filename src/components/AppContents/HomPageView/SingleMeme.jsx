import React, { useState } from "react";

export default function SingleMeme({ title, url, author, likes }) {
  const [likeCounter, setLikeCounter] = useState(likes);
  const [toogleLiker, setToggleLiker] = useState(true);

  function handleUpVoteClick() {
    setLikeCounter(likeCounter + 1);
    setToggleLiker(!toogleLiker);
  }

  function handleDownVoteClick() {
    setLikeCounter(likeCounter - 1);
    setToggleLiker(!toogleLiker);
  }

  return (
    <div className="container-meme-list">
      <div className="meme-container">
        <h4 style={{ float: "left" }}>{author}:</h4>
        <br />
        <small
          style={{
            fontStyle: "italic",
            fontWeight: "300",
            fontSize: "15px",
            float: "left",
          }}
        >
          {title}
        </small>
        <br />
        <img src={url} alt={title} className="meme-image" />
        <br /> <br />
        {toogleLiker ? (
          <button
            style={{
              border: "none",
              backgroundColor: "rgba(0, 255, 244, 0.8)",
              margin: "5px",
            }}
            onClick={handleUpVoteClick}
          >
            Like 👍🏾
          </button>
        ) : (
          <button
            style={{
              border: "none",
              backgroundColor: "rgba(0, 255, 244, 0.8)",
              margin: "5px",
            }}
            onClick={handleDownVoteClick}
          >
            Unlike 👎🏾
          </button>
        )}
        <p>
          <small>
            <i>{likeCounter} ❤️</i>
          </small>
        </p>
      </div>
    </div>
  );
}
