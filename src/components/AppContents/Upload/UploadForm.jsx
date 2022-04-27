import React from "react";

export default function UploadForm({
  imageLoad,
  memeImageHehe,
  ShowPreview,
  RemovePreview,
  handleCaptionInput,
  handleUpload,
}) {
  return (
    <div className="container">
      <div className="upload-show">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Upload a Meme
            <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <br /> <br /> <br />
          <br />
          {memeImageHehe ? (
            <div className="image">
              <img
                src={URL.createObjectURL(memeImageHehe)}
                className="img"
                alt="profile-pic"
              />
              <br />
              <button className="remove-image" onClick={RemovePreview}>
                Remove
              </button>
            </div>
          ) : null}
          <br /> <br />
          <small>Upload Progress: {imageLoad}% done!!</small>
          <br />
          <label htmlFor="file-ip" className="label">
            Choose Your Meme
          </label>
          <input
            type="file"
            id="file-ip"
            accept="image/*"
            onChange={(e) => {
              ShowPreview(e);
              handleCaptionInput(e);
            }}
            hidden
          ></input>
          <br /> <br /> <br />
          <label forhtml="fullName">Say Something About Your Meme: </label>
          <br /> <br />
          <input
            type="text"
            style={{ height: "80px", width: "auto" }}
            name="caption"
            onChange={handleCaptionInput}
            disabled={imageLoad !== null && imageLoad < 100}
          ></input>
          <br /> <br />
          <button
            className="save-profile"
            onClick={handleUpload}
            disabled={imageLoad !== null && imageLoad < 100}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
