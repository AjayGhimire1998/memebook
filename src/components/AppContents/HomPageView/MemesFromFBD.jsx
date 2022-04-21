import React from "react";

export default function MemesFromFBD({ allUploadedMemes, handleDelete }) {
  const uploadedMemeToDisplay = allUploadedMemes.map((meme, index) => {
    const meme_url = meme.uploadedMemeImage;

    return (
      <div className="container-meme-list" key={index}>
        <div className="meme-container">
          <h4 style={{ float: "left" }}>
            {meme.username}
            <img
              src={meme.profilePic}
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
              {meme.timeStamp?.toDate().toDateString()} at
              {meme.timeStamp?.toDate().toLocaleTimeString()})
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
