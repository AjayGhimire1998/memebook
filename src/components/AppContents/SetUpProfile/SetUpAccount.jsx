import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../context/ProfileContext";
import "./SetUpAccount.scss";
import { useHistory } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function SetUpAccount() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [imageLoad, setImageLoad] = useState(null);
  const history = useHistory();
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

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      await setDoc(doc(db, "users", user.uid), {
        ...profile,
      });
      history.push("/homeview");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, preview.name);
      const uploadTask = uploadBytesResumable(storageRef, preview);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageLoad(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfile({ ...profile, profilePic: downloadURL });
          });
        }
      );
    };
    preview && uploadFile();
  }, [preview]);

  return (
    <div className="setup-show">
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
              <button className="remove-image" onClick={RemovePreview}>
                Remove
              </button>
            </div>
          ) : null}
          <br />
          <br />
          <small>Upload Progress: {imageLoad}% done!!</small>
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
              ShowPreview(e);
              handleInputChange(e);
            }}
            hidden
          ></input>
          <br /> <br />
          <label
            style={{
              fontFamily: "fantasy",
              fontWeight: "900",
              fontSize: "20px",
            }}
          >
            Please Refresh after Save
          </label>
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
