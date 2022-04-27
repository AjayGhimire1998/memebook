import { createContext, useState } from "react";

const UploadMemeContext = createContext();

function UploadMemeContextProvider({ children }) {
  const [uploadMeme, setUploadMeme] = useState({});
  const [memeImageHehe, SetMemeImageHehe] = useState();
  const [imageLoad, setImageLoad] = useState(null);

  return (
    <UploadMemeContext.Provider
      value={{
        uploadMeme,
        setUploadMeme,
        memeImageHehe,
        SetMemeImageHehe,
        imageLoad,
        setImageLoad,
      }}
    >
      {children}
    </UploadMemeContext.Provider>
  );
}

export { UploadMemeContext, UploadMemeContextProvider };
