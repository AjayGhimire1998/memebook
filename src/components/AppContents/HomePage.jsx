import React, { useContext, useState } from "react";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import CreateMeme from "./CreateMeme";
import HomePageView from "./HomePageView";
import SetUpAccount from "./SetUpAccount";
import Upload from "./Upload";
import { db, auth } from "../../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";

export default function HomePage() {
  const [preview, setPreview] = useState();
  const [allUploadedMemes, setAllUploadedMemes] = useState([]);

  function ShowPreview(e) {
    if (e.target.files && e.target.files.length > 0) {
      const src = e.target.files[0];
      setPreview(src);
    }
  }

  function RemovePreview() {
    setPreview();
  }

  const memeCollectionRef = collection(db, "memes");
  const getAllUploadedMemes = async () => {
    const uploadedMemes = await getDocs(memeCollectionRef);
    // console.log(uploadedMemes.docs)
    setAllUploadedMemes(
      uploadedMemes.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const deleteMeme = (id) => {
    const memeDoc = doc(db, "memes", id);
    return deleteDoc(memeDoc);
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
          <Upload
            preview={preview}
            setPreview={setPreview}
            showPreview={ShowPreview}
            removePreview={RemovePreview}
            getAllUploadedMemes={getAllUploadedMemes}
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
      <HomePageView
        allUploadedMemes={allUploadedMemes}
        deleteMeme={deleteMeme}
        handleDelete={handleDelete}
      />
    </div>
  );
}
