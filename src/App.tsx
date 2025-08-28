import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Base64 from "./components/Base64";
import Localize from "./components/Localize";
import JWT from "./components/JWT";
import Colorizer from "./components/Colorizer";
import PrettifyJson from "./components/PrettifyJson";

enum sections {
  "home",
  "base64",
  "local",
  "jwt",
  "color",
  "prettify",
}

function App() {
  const [section, setSection] = useState<sections>(sections.home);

  return (
    <>
      <div className="header">
        <button
          className="menu-button"
          onClick={() => setSection(sections.home)}
        >
          Home
        </button>

        <button
          className="menu-button"
          onClick={() => setSection(sections.local)}
        >
          PsuedoLocalization Generator
        </button>

        <button
          className="menu-button"
          onClick={() => setSection(sections.prettify)}
        >
          Prettify
        </button>

        <button
          className="menu-button"
          onClick={() => setSection(sections.jwt)}
        >
          JWT Decode
        </button>

        <button
          className="menu-button"
          onClick={() => setSection(sections.base64)}
        >
          Base64 Encode/Decode
        </button>

        <button
          className="menu-button"
          onClick={() => setSection(sections.color)}
        >
          Colorizer
        </button>
      </div>
      {section === sections.home && <Home />}
      {section === sections.base64 && <Base64 />}
      {section === sections.local && <Localize />}
      {section === sections.jwt && <JWT />}
      {section === sections.color && <Colorizer />}
      {section === sections.prettify && <PrettifyJson />}
    </>
  );
}

export default App;
