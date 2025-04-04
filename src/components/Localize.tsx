import { SetStateAction, useState } from "react";
import { localize } from "pseudo-localization"; // https://github.com/tryggvigy/pseudo-localization/tree/master
import copyIcon from "/copy-icon.svg";

const Localize = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [localText, setLocalText] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const copyLocalizedText = (text: string) => {
    navigator.clipboard.writeText(text);
    setStatus("Localized text copied to clipboard!");
    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  const handlePlainChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPlainText(event.target.value);
  };

  const localIt = () => {
    const text = localize(plainText);
    setLocalText(text);
    copyLocalizedText(text);
  };

  const clearAll = () => {
    setPlainText("");
    setLocalText("");
  };

  return (
    <div>
      <h1>PsuedoLocalization</h1>
      <div className="flexBox">
        <div style={{ width: "50%" }}>
          <h2>String To Localize</h2>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={plainText}
            onChange={handlePlainChange}
            onFocus={() => setPlainText("")}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h2>
            Localized String&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="copyButton"
              onClick={() => copyLocalizedText(localText)}
            >
              <img src={copyIcon} className="copyImg" />
            </button>
          </h2>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={localText}
          />
        </div>
      </div>
      {status && (
        <span style={{ color: "red", fontWeight: "bold" }}>{status}</span>
      )}
      <button onClick={() => localIt()}>Localize Me!</button>
      <button className="clear-all-button" onClick={() => clearAll()}>
        Clear All
      </button>
    </div>
  );
};

export default Localize;
