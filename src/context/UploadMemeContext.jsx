import { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { DBDataContext } from "./DBDataContext";
import { ProfileContext } from "./ProfileContext";

const UploadMemeContext = createContext();

function UploadMemeContextProvider({ children }) {
  const [uploadMeme, setUploadMeme] = useState({});
  const [memeImageHehe, SetMemeImageHehe] = useState();
  const [imageLoad, setImageLoad] = useState(null);
  const { getAllUploadedMemes } = useContext(DBDataContext);
  const { profile } = useContext(ProfileContext);
  const history = useHistory();
  
  function ShowPreview(e) {
    if (e.target.files && e.target.files.length > 0) {
      const src = e.target.files[0];
      SetMemeImageHehe(src);
    }
  }
  function RemovePreview() {
    SetMemeImageHehe();
  }

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, memeImageHehe.name);
      const uploadTask = uploadBytesResumable(storageRef, memeImageHehe);

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
            setUploadMeme({ ...uploadMeme, uploadedMeme: downloadURL });
          });
        }
      );
    };
    memeImageHehe && uploadFile();
  }, [memeImageHehe]);

  const handleCaptionInput = (e) => {
    setUploadMeme({ ...uploadMeme, [e.target.name]: e.target.value });
  };

  const userName = localStorage?.getItem("profile", JSON.stringify(profile));
  const parsedUserName = JSON.parse(userName);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const memeCollectionRef = collection(db, "memes");
      await addDoc(memeCollectionRef, {
        username: parsedUserName?.username,
        profilePic: parsedUserName?.profilePic,
        caption: uploadMeme.caption,
        uploadedMemeImage: uploadMeme.uploadedMeme,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    history.push("/homeview");
    SetMemeImageHehe();
    getAllUploadedMemes();
  };

  return (
    <UploadMemeContext.Provider
      value={{
        uploadMeme,
        setUploadMeme,
        memeImageHehe,
        SetMemeImageHehe,
        imageLoad,
        setImageLoad,
        ShowPreview,
        RemovePreview,
        handleCaptionInput,
        handleUpload 
      }}
    >
      {children}
    </UploadMemeContext.Provider>
  );
}

export { UploadMemeContext, UploadMemeContextProvider };
