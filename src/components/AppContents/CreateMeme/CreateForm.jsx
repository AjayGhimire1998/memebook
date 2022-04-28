import React from "react";

export default function CreateForm({
  inputText,
  createMeme,
  imageForMeme,
  handleInputChange,
  handleGenerate,
  handleCreate,
  handleIdea,
  handleDownload,
}) {
  return (
    <div className="container">
      <div className="create-show">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Create a Meme
            <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <label
            style={{
              fontFamily: "fantasy",
              fontWeight: "900",
              fontSize: "20px",
            }}
          >
            Click below to generate a template
          </label>
          <br />
          <label>⬇️⬇️⬇️</label>
          <br />
          <button className="label" onClick={handleGenerate}>
            Generate Meme Template
          </button>
          <br />
          <label forhtml="fullName">Top Text: </label>
          <br />
          <textarea
            type="text"
            name="topText"
            onChange={handleInputChange}
          ></textarea>
          <br />
          <label forhtml="fullName">Bottom Text: </label>
          <br />
          <textarea
            type="text"
            name="bottomText"
            onChange={handleInputChange}
          ></textarea>
          <br /> <br />
          <label
            style={{
              fontFamily: "fantasy",
              fontWeight: "900",
              fontSize: "20px",
            }}
          >
            Click "Need Idea?" couple times to see Magic 🤭{" "}
          </label>
          <br />
          <label>⬇️⬇️⬇️</label>
          <br />
          <button className="label" onClick={handleIdea}>
            Need Idea?
          </button>
          <br /> <br />
          {imageForMeme ? (
            <div className="meme">
              <img src={imageForMeme} alt="meme" />
              <h2 className="top">{inputText.topText}</h2>
              <h2 className="bottom">{inputText.bottomText}</h2>
            </div>
          ) : null}
          <br />
          <button className="label" onClick={handleCreate}>
            Create
          </button>
          <br /> <br />
          {createMeme ? (
            <img
              className="final-meme"
              src={createMeme.url}
              alt="meme"
              style={{ height: "60%", width: "70%" }}
            />
          ) : null}
          <br /> <br />
          <button className="label" onClick={handleDownload}>
            Download
          </button>
        </form>
      </div>
    </div>
  );
}
