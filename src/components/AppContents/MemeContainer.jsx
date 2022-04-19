import React, { useContext, useEffect, useState } from "react";
import { HomePageContext } from "../../context/HomePageContext";
import "./MemeContainer.css";
// import { ProfileContext } from "../../context/ProfileContext";
import { UploadMemeContext } from "../../context/UploadMemeContext";
import MemesFromFBD from "./MemesFromFBD";

export default function MemeContainer() {
  const [homePageData, setHomePageData] = useContext(HomePageContext);

  const memeToDisplay = homePageData.slice(2, 22).map((d, index) => {
    if (d.data.post_hint === "image") {
      const image_url = d.data.url_overridden_by_dest;
      return (
        <div className="container-meme-list">
          <div className="meme-container" key={index}>
            <h4 style={{ float: "left" }}>{d.data.author}:</h4>
            <br /> <br />
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
            <br /> <br /> <br />
            <img src={image_url} alt={d.data.title} className="meme-image" />
            <br /> <br /> <br/>
            <p>
              Likes:{" "}
              <small>
                <i>{d.data.ups} ❤️</i>
              </small>
            </p>
          </div>
        </div>
      );
    }
  });

  return (
    <div>
      <MemesFromFBD />
      {memeToDisplay}
    </div>
  );
}
