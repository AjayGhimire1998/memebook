import { createContext, useEffect, useState } from "react";

const UploadMemeContext = createContext();

function UploadMemeContextProvider({children}){
    const [uploadMeme, setUploadMeme] = useState({});

    return (
        <UploadMemeContext.Provider value={[uploadMeme, setUploadMeme]}>
            {children}    
        </UploadMemeContext.Provider>
    );
};

export {UploadMemeContext, UploadMemeContextProvider};