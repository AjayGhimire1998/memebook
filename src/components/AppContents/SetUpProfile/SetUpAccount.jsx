import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../context/ProfileContext";
import "./SetUpAccount.css";
import { useHistory } from "react-router-dom";
import { doc, setDoc} from "firebase/firestore";
import { db, auth, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SetUpAccountForm from "./SetUpAccountForm";

export default function SetUpAccount({getUserDetails}) {
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
    getUserDetails();
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
    <SetUpAccountForm
      preview={preview}
      imageLoad={imageLoad}
      ShowPreview={ShowPreview}
      RemovePreview={RemovePreview}
      handleInputChange={handleInputChange}
      handleSave={handleSave}
    />
  );
}
