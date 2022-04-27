import { createContext, useEffect, useState } from "react";

const CreateMemeContext = createContext();

function CreateMemeContextProvider({ children }) {
  const [createMeme, setCreateMeme] = useState();
  const [inputText, setInputText] = useState([]);
  const [imageForMeme, setImageForMeme] = useState();
  const [memesFromApi, setMemesFromApi] = useState();
  const [currentGeneratedMeme, setCurrentGeneratedMeme] = useState();
  const [idea, setIdea] = useState([]);

  return (
    <CreateMemeContext.Provider
      value={{
        createMeme,
        setCreateMeme,
        inputText,
        setInputText,
        imageForMeme,
        setImageForMeme,
        memesFromApi,
        setMemesFromApi,
        currentGeneratedMeme,
        setCurrentGeneratedMeme,
        idea,
        setIdea,
      }}
    >
      {children}
    </CreateMemeContext.Provider>
  );
}

export { CreateMemeContext, CreateMemeContextProvider };
