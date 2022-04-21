import { ProfileContext } from "../../../context/ProfileContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CreateMemeContext } from "../../../context/CreateMemeContext";
import "./CreateMeme.css";

export default function CreateMeme() {
  const [createMeme, setCreateMeme] = useContext(CreateMemeContext);
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
      headers: {},
    }).then((res) => {
      res
        .arrayBuffer()
        .then(function (buffer) {
          const downloadUrl = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.setAttribute("download", "MemeBookMeme.png");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log("Error from download", error);
        });
    });
    history.push("/homeview/upload");
    setCreateMeme();
  };

  // console.log(createMeme);
  return (
    <div className="container">
      <div className="create-show">
        <form method="post" className="form">
          <label className="label-top">
            Alright, Lets Create a Meme
            <br />
            <br />
            🤭
          </label>
          <br /> <br />
          <label
            style={{
              fontFamily: "fantasy",
              fontWeight: "900",
              fontSize: "20px",
            }}
          >
            Click below to generate a template
          </label>
          <br />
          <label>⬇️⬇️⬇️</label>
          <br />
          <button className="label" onClick={handleGenerate}>
            Generate Meme Template
          </button>
          <br />
          <label forhtml="fullName">Top Text: </label>
          <br />
          <textarea
            type="text"
            name="topText"
            onChange={handleInputChange}
          ></textarea>
          <br />
          <label forhtml="fullName">Bottom Text: </label>
          <br />
          <textarea
            type="text"
            name="bottomText"
            onChange={handleInputChange}
          ></textarea>
          <br /> <br />
          <label
            style={{
              fontFamily: "fantasy",
              fontWeight: "900",
              fontSize: "20px",
            }}
          >
            Click "Need Idea?" couple times to see Magic 🤭{" "}
          </label>
          <br />
          <label>⬇️⬇️⬇️</label>
          <br />
          <button className="label" onClick={handleIdea}>
            Need Idea?
          </button>
          <br /> <br />
          {imageForMeme ? (
            <div className="meme">
              <img src={imageForMeme} alt="meme" />
              <h2 className="top">{inputText.topText}</h2>
              <h2 className="bottom">{inputText.bottomText}</h2>
            </div>
          ) : null}
          <br />
          <button className="label" onClick={handleCreate}>
            Create
          </button>
          <br /> <br />
          {createMeme ? (
            <img
              src={createMeme.url}
              alt="meme"
              style={{ height: "60%", width: "70%" }}
            />
          ) : null}
          <br /> <br />
          <button className="label" onClick={handleDownload}>
            Download
          </button>
        </form>
      </div>
    </div>
  );
}
