import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import CreateMeme from "./CreateMeme";
import HomePageView from "./HomePageView";
import SetUpAccount from "./SetUpAccount";
import Upload from "./Upload";
import { HomePageContext } from "../../context/HomePageContext";

export default function HomePage() {
  const [preview, setPreview] = useState();
  function ShowPreview(e) {
    if (e.target.files && e.target.files.length > 0) {
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
      <Switch>
        <Route path="/homeview/upload">
          <Upload
            preview={preview}
            setPreview={setPreview}
            showPreview={ShowPreview}
            removePreview={RemovePreview}
          />
        </Route>
        <Route path="/homeview/create">
          <CreateMeme />
        </Route>
        <Route path="/homeview/setprofile">
          <SetUpAccount
            preview={preview}
            setPreview={setPreview}
            showPreview={ShowPreview}
            removePreview={RemovePreview}
          />
        </Route>
      </Switch>
      <HomePageView />
    </div>
  );
}
