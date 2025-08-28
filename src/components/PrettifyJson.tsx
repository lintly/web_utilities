import { SetStateAction, useState } from "react";
import copyIcon from "/copy-icon.svg";

const PrettifyJson = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [prettyText, setPrettyText] = useState<string>("");

  const handlePlainChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPlainText(event.target.value);
  };

  const cleanMe = () => {
    try {
      const uglyJSON = JSON.parse(plainText);
      const pretty = JSON.stringify(uglyJSON, null, 2);
      setPrettyText(pretty);
    } catch {
      console.log("String was not in JSON format!");
    }
  };

  const clearAll = () => {
    setPlainText("");
    setPrettyText("");
  };

  return (
    <>
      <h1>JSON Prettifier</h1>
      <div className="flexBox">
        <div style={{ width: "50%" }}>
          <h2>JSON To Make Sexy</h2>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={plainText}
            onChange={handlePlainChange}
          />
          <button onClick={() => cleanMe()}>Clean Me =&gt;</button>
        </div>
        <div style={{ width: "50%" }}>
          <h2>
            Sexy JSON&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(prettyText)}
            >
              <img src={copyIcon} className="copyImg" />
            </button>
          </h2>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={prettyText}
          />
        </div>
      </div>
      <button onClick={() => clearAll()} className="clear-all-button">
        Clear All
      </button>
    </>
  );
};

export default PrettifyJson;
