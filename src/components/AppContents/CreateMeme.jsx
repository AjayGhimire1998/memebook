import { ProfileContext } from "../../context/ProfileContext";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateMemeContext } from "../../context/CreateMemeContext";

export default function CreateMeme({
  preview,
  setPreview,
  showPreview,
  removePreview,
}) {
  const [createMeme, setCreateMeme] = useContext(CreateMemeContext);
  const [imageLoad, setImageLoad] = useState(null);
  const history = useHistory();

  const handleInputChange = (e) => {
    setCreateMeme({ ...createMeme, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="upload-show">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Create a Meme
            <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <br /> <br /> <br />
          <br />
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
          <br /> <br />
          {/* <small>Upload Progress: {imageLoad}% done!!</small> */}
          <br />
          <label htmlFor="file-ip" className="label">
            Choose Your Meme
          </label>
          <input
            name="creatingMeme"
            type="file"
            id="file-ip"
            accept="image/*"
            onChange={(e) => {
              showPreview(e);
              handleInputChange(e);
            }}
            hidden
          ></input>
          <br /> <br /> <br />
          <label forhtml="fullName">Top Text: </label>
          <br /> <br />
          <input
            type="text"
            style={{ height: "auto", width: "auto" }}
            name="topText"
            onChange={handleInputChange}
          ></input>
          <br /> <br /> <br />
          <label forhtml="fullName">Bottom Text: </label>
          <br /> <br />
          <input
            type="text"
            style={{ height: "auto", width: "auto" }}
            name="bottomText"
            onChange={handleInputChange}
          ></input>
          <br /> <br />
          <button
            className="save-profile"
            // onClick={handleUpload}
            disabled={imageLoad !== null && imageLoad < 100}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
