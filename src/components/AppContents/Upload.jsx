import "./Upload.scss";
import { useContext, useState, useEffect } from "react";
import { UploadMemeContext } from "../../context/UploadMemeContext";
import { useHistory } from "react-router-dom";
import { db, auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ProfileContext } from "../../context/ProfileContext";

export default function Upload({ getAllUploadedMemes }) {
  const [uploadMeme, setUploadMeme] = useContext(UploadMemeContext);
  const [memeImageHehe, SetMemeImageHehe] = useState();
  const [imageLoad, setImageLoad] = useState(null);
  const [profile, setProfile] = useContext(ProfileContext);
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
      const name = new Date().getTime() + memeImageHehe.name;
      // console.log(name);
      const storageRef = ref(storage, memeImageHehe.name);
      const uploadTask = uploadBytesResumable(storageRef, memeImageHehe);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("Upload is " + progress + "% done");
          setImageLoad(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
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
            // console.log("File available at", downloadURL);
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
      // const user = auth.currentUser;
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
    <div className="container">
      <div className="upload-show">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Upload a Meme
            <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <br /> <br /> <br />
          <br />
          {memeImageHehe ? (
            <div className="image">
              <img
                src={URL.createObjectURL(memeImageHehe)}
                className="img"
                alt="profile-pic"
              />
              <br />
              <button className="remove-image" onClick={RemovePreview}>
                Remove
              </button>
            </div>
          ) : null}
          <br /> <br />
          <small>Upload Progress: {imageLoad}% done!!</small>
          <br />
          <label htmlFor="file-ip" className="label">
            Choose Your Meme
          </label>
          <input
            type="file"
            id="file-ip"
            accept="image/*"
            onChange={(e) => {
              ShowPreview(e);
              handleCaptionInput(e);
            }}
            hidden
          ></input>
          <br /> <br /> <br />
          <label forhtml="fullName">Say Something About Your Meme: </label>
          <br /> <br />
          <input
            type="text"
            style={{ height: "80px", width: "auto" }}
            name="caption"
            onChange={handleCaptionInput}
          ></input>
          <br /> <br />
          <button
            className="save-profile"
            onClick={handleUpload}
            disabled={imageLoad !== null && imageLoad < 100}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
