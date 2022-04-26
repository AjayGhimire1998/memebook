import React, { useState } from "react";

export default function SingleMeme({ title, url, author, likes}) {
  const [likeCounter, setLikeCounter] = useState(likes);

  function handleClick() {
    setLikeCounter(likeCounter + 1);
  }

  return (
    <div className="container-meme-list">
      <div className="meme-container">
        <h4 style={{ float: "left" }}>{author}:</h4>
        <br/>
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
        <br/>
        <img src={url} alt={title} className="meme-image" />
        <br /> <br/>
        <button onClick={handleClick}>Like Meme</button>
        <p>
          <small>
            <i>{likeCounter} ❤️</i>
          </small>
        </p>
      </div>
    </div>
  );
}
