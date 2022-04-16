import React, { useContext, useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { ProfileContext } from "../../context/ProfileContext";

export default function MemesFromFBD() {
  const [allUploadedMemes, SetAllUploadedMemes] = useState([]);
  const [profile, setProfile] = useContext(ProfileContext);

  const user = auth.currentUser;
  const memeCollectionRef = collection(db, "users", user.uid, "memes");

  useEffect(() => {
    getAllUploadedMemes();
  }, [allUploadedMemes]);

  const getAllUploadedMemes = async () => {
    const uploadedMemes = await getDocs(memeCollectionRef);
    SetAllUploadedMemes(
      uploadedMemes.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const deleteMeme = (id) => {
    const memeDoc = doc(db, "users", user.uid, "memes", id );
    return deleteDoc(memeDoc);
  };

  const handleDelete = async(id) => {
      await deleteMeme(id);
      getAllUploadedMemes();

  }

  const userName = localStorage.getItem("profile", JSON.stringify(profile));
  const parsedUserName = JSON.parse(userName);

  const uploadedMemeToDisplay = allUploadedMemes.map((meme, index) => {
    const meme_url = meme.uploadedMemeImage;
    return (
      <div className="meme-container" key={index + 1}>
        <h4 style={{ float: "left" }}>{parsedUserName.username}</h4>
        <br />
        <small
          style={{
            fontStyle: "italic",
            fontWeight: "300",
            fontSize: "15px",
            float: "left",
          }}
        >
          {meme.caption}
        </small>
        <br /> <br />
        <img src={meme_url} alt={meme.caption} className="meme-image" />
        <br /> <br />
        <button style={{backgroundColor: "red"}} onClick={(e) => handleDelete(meme.id)}>🗑</button>
      </div>
    );
  });

  return <div>{uploadedMemeToDisplay}</div>;
}
