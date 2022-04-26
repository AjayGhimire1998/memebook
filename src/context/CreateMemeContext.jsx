import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const CreateMemeContext = createContext();

function CreateMemeContextProvider({ children }) {
  const [createMeme, setCreateMeme] = useState();
  const [inputText, setInputText] = useState([]);
  const [imageForMeme, setImageForMeme] = useState();
  const [memesFromApi, setMemesFromApi] = useState();
  const [currentGeneratedMeme, setCurrentGeneratedMeme] = useState();
  const history = useHistory();
  const [idea, setIdea] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((body) => {
        setMemesFromApi([...body.data.memes]);
      });
  }, []);

  const handleInputChange = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const memesINeed = memesFromApi?.filter((meme) => {
    return meme.box_count === 2;
  });

  const handleGenerate = (e) => {
    e.preventDefault();
    const randomMemeTemplate = Math.floor(Math.random() * memesINeed.length);
    setCurrentGeneratedMeme(memesINeed[randomMemeTemplate]);
    const randomMemeTemplateUrl = memesINeed[randomMemeTemplate].url;
    setImageForMeme(randomMemeTemplateUrl);
    history.push(`/homeview/create/${memesINeed[randomMemeTemplate].name}`);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const currentMeme = currentGeneratedMeme;
    const formData = new FormData();

    formData.append("username", "ajay.gh");
    formData.append("password", "Dharan123");
    formData.append("template_id", currentMeme.id);
    formData.append("text0", inputText.topText);
    formData.append("text1", inputText.bottomText);

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((body) => {
        setCreateMeme(body.data);
      })
      .catch((error) => console.log("Error:", error));
  };

  const handleIdea = (e) => {
    e.preventDefault();
    fetch("https://jokeapi-v2.p.rapidapi.com/joke/Any?type=single", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com",
        "x-rapidapi-key": "285626be1emsh6252dd238a98631p1c38c5jsn328387bb55ff",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIdea(data.joke);
      });

    const wordsMatch = idea.match(/(\w+)/g);
    const words = wordsMatch.length;

    if (words < 30) {
      const firstHalf = idea.split(" ", words / 2).join(" ");

      const secondHalf = idea
        .split(" ")
        .slice(words / 2)
        .join(" ");

      setInputText({ topText: firstHalf, bottomText: secondHalf });
    }
  };
  const handleDownload = (e) => {
    e.preventDefault();
    fetch(createMeme.url, {
      method: "GET",
    }).then((res) => {
      res
        .arrayBuffer()
        .then(function (buffer) {
          const downloadUrl = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", "MemeBookMeme.png");
          link.click();
        })
        .catch((error) => {
          console.log("Error from download", error);
        });
    });
    history.push("/homeview/upload");
    setCreateMeme();
  };

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
        handleInputChange,
        handleGenerate,
        handleCreate,
        handleIdea,
        handleDownload
      }}
    >
      {children}
    </CreateMemeContext.Provider>
  );
}

export { CreateMemeContext, CreateMemeContextProvider };
