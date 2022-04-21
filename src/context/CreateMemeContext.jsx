import { createContext, useEffect, useState } from "react";

const CreateMemeContext = createContext();

function CreateMemeContextProvider({ children }) {
  const [createMeme, setCreateMeme] = useState();

  return (
    <CreateMemeContext.Provider value={[createMeme, setCreateMeme]}>
      {children}
    </CreateMemeContext.Provider>
  );
}

export { CreateMemeContext, CreateMemeContextProvider };
