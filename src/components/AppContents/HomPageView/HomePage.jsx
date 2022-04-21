import React, { useContext, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateMeme from "../CreateMeme/CreateMeme";
import HomePageView from "./HomePageView";
import SetUpAccount from "../SetUpProfile/SetUpAccount"
import Upload from "../Upload/Upload";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProfileContext } from "../../../context/ProfileContext";
import { deleteMeme } from "../../Utilities/utility";

export default function HomePage() {
  const [allUploadedMemes, setAllUploadedMemes] = useState([]);
  const { profileAvailable } = useContext(ProfileContext);

  const memeCollectionRef = collection(db, "memes");
  const getAllUploadedMemes = async () => {
    const uploadedMemes = await getDocs(memeCollectionRef);
    setAllUploadedMemes(
      uploadedMemes.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const handleDelete = async (id) => {
    await deleteMeme(id);
    getAllUploadedMemes();
  };

  return (
    <div>
      <NavBar getAllUploadedMemes={getAllUploadedMemes} />
      <Switch>
        <Route path="/homeview/upload">
          {profileAvailable ? (
            <Upload getAllUploadedMemes={getAllUploadedMemes} />
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
      <HomePageView
        allUploadedMemes={allUploadedMemes}
        deleteMeme={deleteMeme}
        handleDelete={handleDelete}
      />
    </div>
  );
}
