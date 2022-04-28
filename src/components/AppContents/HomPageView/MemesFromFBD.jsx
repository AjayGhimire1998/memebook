import React, { useState } from "react";
import SingleMemeFromFBD from "./SingleMemeFromFBD";

export default function MemesFromFBD({ allUploadedMemes }) {
  const uploadedMemeToDisplay = allUploadedMemes.map((meme, index) => {
    const meme_url = meme.uploadedMemeImage;
    return (
      <SingleMemeFromFBD
        key={index}
        memeUrl={meme_url}
        username={meme.username}
        profilePic={meme.profilePic}
        timeStamp={meme.timeStamp}
        caption={meme.caption}
      />
    );
  });

  return <div>{uploadedMemeToDisplay}</div>;
}
