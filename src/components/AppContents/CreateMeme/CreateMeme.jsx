import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { CreateMemeContext } from "../../../context/CreateMemeContext";
import "./CreateMeme.css";
import { useHistory } from "react-router-dom";
import CreateForm from "./CreateForm";

export default function CreateMeme() {
  const {
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
  } = useContext(CreateMemeContext);
  const [firstSetup, setFirstSetup] = useState();
  const [secondDelivery, setSecondDelivery] = useState();
  const [counterForFetch, setCounterForFetch] = useState(0);

  const history = useHistory();

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

  useEffect(() => {
    fetch("https://jokeapi-v2.p.rapidapi.com/joke/Any?type=twopart", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "jokeapi-v2.p.rapidapi.com",
        "x-rapidapi-key": "285626be1emsh6252dd238a98631p1c38c5jsn328387bb55ff",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIdea(data);
      });
  }, [counterForFetch]);

  useEffect(() => {
    setFirstSetup(idea.setup);
    setSecondDelivery(idea.delivery);
  }, [idea]);

  const handleIdea = (e) => {
    e.preventDefault();
    setCounterForFetch(counterForFetch + 1);
    setInputText({ topText: firstSetup, bottomText: secondDelivery });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const currentMeme = currentGeneratedMeme;
    const formData = new FormData();

    formData.append("username", "AjayGhimire1998");
    formData.append("password", "Ajay123@");
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

  const handleDownload = (e) => {
    e.preventDefault();
    fetch(createMeme.url, {
      method: "GET",
    }).then((res) => {
      res
        .arrayBuffer()
        .then(function (buffer) {
          const downloadUrl = (
            window.URL ||
            window.webkitURL ||
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder
          ).createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.target = "_blank";
          link.href = downloadUrl;
          link.setAttribute("download", "MemeBookMeme.png");
          document.body.appendChild(link);
          link.click();
          setTimeout(function () {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
          }, 100);
        })
        .catch((error) => {
          console.log("Error from download", error);
        });
    });
    history.push("/homeview/upload");
    setCreateMeme();
  };
  return (
    <CreateForm
      topText={inputText.topText}
      bottomText={inputText.bottomText}
      createMeme={createMeme}
      imageForMeme={imageForMeme}
      handleInputChange={handleInputChange}
      handleGenerate={handleGenerate}
      handleIdea={handleIdea}
      handleCreate={handleCreate}
      handleDownload={handleDownload}
    />
  );
}
