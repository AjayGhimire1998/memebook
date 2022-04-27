export default function SetUpAccountForm({
  preview,
  imageLoad,
  ShowPreview,
  RemovePreview,
  handleInputChange,
  handleSave,
}) {
  return (
    <div className="setup-show">
      <div className="container">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Create A Profile...hehe <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <br /> <br /> <br />
          {preview ? (
            <div className="image">
              <img
                src={URL.createObjectURL(preview)}
                className="img"
                alt="profile-pic"
              />
              <br />
              <button className="remove-image" onClick={RemovePreview}>
                Remove
              </button>
            </div>
          ) : null}
          <br />
          <br />
          <small>Upload Progress: {imageLoad}% done!!</small>
          <br />
          <label htmlFor="file-ip" className="label">
            Choose Profile Picture{" "}
          </label>
          <input
            name="image"
            type="file"
            id="file-ip"
            accept="image/*"
            onChange={(e) => {
              ShowPreview(e);
              handleInputChange(e);
            }}
            hidden
          ></input>
          <br /> <br />
          <label forhtml="fullName">Full Name: </label>
          <input
            type="text"
            name="fullName"
            onChange={handleInputChange}
            disabled={imageLoad !== null && imageLoad < 100}
          ></input>
          <br /> <br />
          <label forhtml="fullName">username: </label>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
            disabled={imageLoad !== null && imageLoad < 100}
          ></input>
          <br /> <br /> <br />
          {/* <label
            style={{
              fontFamily: "fantasy",
              fontWeight: "900",
              fontSize: "20px",
            }}
          >
            Please Refresh after Save
          </label> */}
          <br /> <br />
          <button
            className="save-profile"
            onClick={handleSave}
            disabled={imageLoad !== null && imageLoad < 100}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
