import React, { useState } from "react";
import NavBar from "./NavBar";
import { Route } from "react-router-dom";
import Upload from "./Upload";
import CreateMeme from "./CreateMeme";
import HomePageView from "./HomePageView";
import SetUpAccount from "./SetUpAccount";

export default function HomePage() {
  const [ account, setAccount] = useState (false);
  const [preview, setPreview] = useState ();

  function ShowPreview(e) {
    if(e.target.files && e.target.files.length > 0){
      const src = e.target.files[0];
      setPreview(src);
    }
  }

  function RemovePreview() {
    setPreview();
  }


  return (
    <div>
      <NavBar />
      {/* <Route path="/homeview/feed">
        <FeedContainer />
      </Route> */}
      <Route path="/homeview/upload">
        <Upload />
      </Route>
      <Route path="/homeview/create">
        <CreateMeme />
      </Route>
      {account ? <HomePageView /> : <SetUpAccount preview={preview} showPreview= {ShowPreview} removePreview= {RemovePreview}/>} 
    </div>
  );
}
