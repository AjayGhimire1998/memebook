import React from "react";
import "./SetUpAccount.scss";

export default function SetUpAccount({ preview, showPreview, removePreview }) {
  return (
    <div className="setup">
      <form method="post" className="form">
        <label forhtml="fullName">Full Name: </label>
        <input type="text" name="fullName"></input>
        <br /> <br />
        <label forhtml="fullName">username: </label>
        <input type="text" name="fullName"></input>
        <br /> <br />
        {preview ? (
          <div className="image">
            <img
              src={URL.createObjectURL(preview)}
              className="img"
              alt="profile-pic"
            />
            <br />
            <button className="remove-image" onClick={removePreview}>
              Remove
            </button>
          </div>
        ) : null}
        <br />
        <label htmlFor="file-ip" className="label">Choose Profile Picture </label>
        <input
          name="image"
          type="file"
          id="file-ip"
          accept="image/*"
          onChange={showPreview}
          hidden
        ></input>
        <br/> <br/>
        <button className="save-profile"> Save</button>
      </form>
    </div>
  );
}
