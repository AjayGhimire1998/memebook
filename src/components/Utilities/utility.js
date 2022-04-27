import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const deleteMeme = (id) => {
  const memeDoc = doc(db, "memes", id);
  return deleteDoc(memeDoc);
};

export const getNewMemes = (newMeme, setNewMeme, setHomePageData) => {
  fetch(`https://www.reddit.com/r/memes.json?after=${newMeme}`)
    .then((res) => res.json())
    .then((body) => {
      setNewMeme(body.data.after);
      setHomePageData(body.data.children);
    });
};

