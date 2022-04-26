import React, { useContext, useEffect, useState } from "react";
import { DBDataContext } from "../../../context/DBDataContext";
import { HomePageContext } from "../../../context/HomePageContext";
import "./MemeContainer.css";
import MemesFromFBD from "./MemesFromFBD";
import SingleMeme from "./SingleMeme";

export default function MemeContainer() {
  const { homePageData } = useContext(HomePageContext);
  const {allUploadedMemes, handleDelete} = useContext(DBDataContext)

  const memeToDisplay = homePageData.slice(2, 22).map((d, index) => {
    if (d.data.post_hint === "image") {
      const image_url = d.data.url_overridden_by_dest;
      return (
        <SingleMeme
          key={index}
          title={d.data.title}
          author={d.data.author}
          url={image_url}
          likes={d.data.ups}
        />
      );
    }
  });

  return (
    <div>
      <MemesFromFBD
        allUploadedMemes={allUploadedMemes}
        handleDelete={handleDelete}
      />
      {memeToDisplay}
    </div>
  );
}
