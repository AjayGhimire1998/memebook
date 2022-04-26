import { createContext, useEffect, useState } from "react";

const HomePageContext = createContext();

function HomePageContextProvider({ children }) {
  const [homePageData, setHomePageData] = useState([]);
  // const [loader, setLoader] = useState(true);
  const [newMeme, setNewMeme] = useState("");

  useEffect(() => {
    fetch(`https://www.reddit.com/r/memes.json?after=${newMeme}`)
      .then((res) => res.json())
      .then((body) => {
        setHomePageData(body.data.children);
      });
  }, [newMeme]);
  return (
    <HomePageContext.Provider
      value={{ homePageData, setHomePageData, newMeme, setNewMeme }}
    >
      {children}
    </HomePageContext.Provider>
  );
}

export { HomePageContext, HomePageContextProvider };

