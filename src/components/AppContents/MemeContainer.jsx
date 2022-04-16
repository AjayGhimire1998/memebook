import React, { useContext, useEffect, useState } from "react";
import { HomePageContext } from "../../context/HomePageContext";
import "./MemeContainer.css";
// import { ProfileContext } from "../../context/ProfileContext";
import { UploadMemeContext } from "../../context/UploadMemeContext";
import MemesFromFBD from "./MemesFromFBD";

export default function MemeContainer() {
  const [homePageData, setHomePageData] = useContext(HomePageContext);
  const [uploadMeme, setUploadMeme] = useContext(UploadMemeContext)
  const memeToDisplay = homePageData.slice(2, 10).map((d, index) => {
    if (d.data.post_hint === "image") {
      const image_url = d.data.url_overridden_by_dest;
      return (
        <div className="meme-container" key={index}>
          <h4 style={{ float: "left" }}>{d.data.author}:</h4>
          <br />
          <small
            style={{
              fontStyle: "italic",
              fontWeight: "300",
              fontSize: "15px",
              float: "left",
            }}
          >
            {d.data.title}
          </small>
          <br /> <br />
          <img src={image_url} alt={d.data.title} className="meme-image" />
          <br /> <br />

        </div>
      );
    }
  });

  // const myMemeImage = localStorage.getItem("profile", JSON.stringify(profile));
  // const myMemeCaption = localStorage.getItem("uploadedMeme", JSON.stringify(uploadMeme))
  // const parsedMemeImage = JSON.parse(myMemeImage);
  // const parsedMemeCaption = JSON.parse(myMemeCaption);
  // const newAddedMemeData = {
  //   "parsedUsername": parsedMemeImage.username,
  //   "parsedMemeImage": parsedMemeImage.uploadedMeme,
  //   "parsedCaption": parsedMemeCaption.caption
  // }

  // const [newMemeData, setNewMemeData] = useState({})

  // useEffect(() => {
  //   setNewMemeData(newAddedMemeData)

  // },[newMemeData]);

  return (
    <div>
      <MemesFromFBD />
      {memeToDisplay}
    </div>
  );
}
