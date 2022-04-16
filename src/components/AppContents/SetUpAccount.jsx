import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import "./SetUpAccount.scss";
import { useHistory } from "react-router-dom";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function SetUpAccount({
  preview,
  setPreview,
  showPreview,
  removePreview,
}) {
  const [profile, setProfile, profileAvailable, setProfileAvailable] = useContext(ProfileContext);
  const [setupShow, setSetupShow] = useState(true);
  const [imageLoad, setImageLoad] = useState(null);
  const history = useHistory();

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      await setDoc(doc(db, "users", user.uid), {
        ...profile,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    history.push("/homeview");
    setSetupShow(false);
    setPreview();
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + preview.name;
      console.log(name);
      const storageRef = ref(storage, preview.name);
      const uploadTask = uploadBytesResumable(storageRef, preview);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setImageLoad(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setProfile({ ...profile, profilePic: downloadURL });
            setProfileAvailable(true);

          });
        }
      );
    };
    preview && uploadFile();
  }, [preview]);

  console.log(profile);

  return (
    <div className={setupShow ? "setup-show" : "setup-hide"}>
      <div className="container">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Create A Profile...hehe <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <label forhtml="fullName">Full Name: </label>
          <input
            type="text"
            name="fullName"
            onChange={handleInputChange}
          ></input>
          <br /> <br />
          <label forhtml="fullName">username: </label>
          <input
            type="text"
            name="username"
            onChange={handleInputChange}
          ></input>
          <br /> <br /> <br /> <br /> <br /> <br />
          {preview ? (
            <div className="image">
              <img
                src={URL.createObjectURL(preview)}
                className="img"
                alt="profile-pic"
              />
              <br />
              <button className="remove-image" onClick={removePreview}>
                Remove
              </button>
            </div>
          ) : null}
          <br />
          <br />
          <small>Upload Progress: {imageLoad} done!!</small>
          <br />
          <label htmlFor="file-ip" className="label">
            Choose Profile Picture{" "}
          </label>
          <input
            name="image"
            type="file"
            id="file-ip"
            accept="image/*"
            onChange={(e) => {
              showPreview(e);
              handleInputChange(e);
            }}
            hidden
          ></input>
          <br /> <br />
          <button
            className="save-profile"
            onClick={handleSave}
            disabled={imageLoad !== null && imageLoad < 100}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
