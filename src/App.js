import "./App.css";
import { useState, useEffect } from "react";
import Memes from "./components/Memes";

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [meme, setMeme] = useState(null);

  const objectToQueryParam = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    return "?" + params.join("&");
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((x) =>
      x.json().then((response) => setTemplates(response.data.memes))
    );
  }, []);

  if (meme) {
    return (
      <div style={{ textAlign: "center" }}>
        <img style={{ width: 200 }} src={meme} alt="custom meme" />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      {template && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const params = {
              template_id: template.id,
              text0: topText,
              text1: bottomText,
              username: "atheleticindia",
              password: "9410297366gg",
            };
            const response = await fetch(
              `https://api.imgflip.com/caption_image${objectToQueryParam(
                params
              )}`
            );
            const json = await response.json();
            setMeme(json.data.url);
          }}
        >
          <Memes template={template} />
          <input
            placeholder="top text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <input
            placeholder="bottom text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
          <button type="submit">create meme</button>
        </form>
      )}

      {!template && (
        <>
          <h1>Pick a template</h1>
          {templates.map((template) => {
            return (
              <Memes
                key={template?.id}
                template={template}
                onClick={() => {
                  setTemplate(template);
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
