import { useState, createContext } from "react";
import { deleteMeme } from "../components/Utilities/utility";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const DBDataContext = createContext();

function DBDataContextProvider({ children }) {
  const [allUploadedMemes, setAllUploadedMemes] = useState([]);

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
    <DBDataContext.Provider
      value={{
        allUploadedMemes,
        setAllUploadedMemes,
        getAllUploadedMemes,
        handleDelete,
      }}
    >
      {children}
    </DBDataContext.Provider>
  );
}

export {DBDataContext, DBDataContextProvider};
