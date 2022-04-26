import React, { useContext, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateMeme from "../CreateMeme/CreateMeme";
import SetUpAccount from "../SetUpProfile/SetUpAccount";
import Upload from "../Upload/Upload";
import { ProfileContext } from "../../../context/ProfileContext";
import MemeContainer from "./MemeContainer";

export default function HomePage() {
  const { profileAvailable } = useContext(ProfileContext);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/homeview/upload">
          {profileAvailable ? (
            <Upload />
          ) : (
            <Redirect to="/homeview/setprofile"></Redirect>
          )}
        </Route>
        <Route path="/homeview/create">
          {profileAvailable ? (
            <CreateMeme />
          ) : (
            <Redirect to="/homeview/setprofile"></Redirect>
          )}
        </Route>
        <Route path="/homeview/setprofile">
          <SetUpAccount />
        </Route>
      </Switch>
      <MemeContainer />
    </div>
  );
}
