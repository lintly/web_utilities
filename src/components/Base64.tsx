import { SetStateAction, useState } from "react";
import copyIcon from "/copy-icon.svg";

const Base64 = () => {
  const [plainText, setPlainText] = useState<string>("");
  const [encodedText, setEncodedText] = useState<string>("");

  const handlePlainChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPlainText(event.target.value);
  };

  const handleEncodeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEncodedText(event.target.value);
  };

  const encode = () => {
    setEncodedText(btoa(plainText));
  };

  const decode = () => {
    const ugly = atob(encodedText);
    try {
      const obj = JSON.parse(ugly);
      const pretty = JSON.stringify(obj, undefined, 4);
      setPlainText(pretty);
    } catch {
      console.log("String was not in JSON format!");
      setPlainText(ugly);
    }
  };

  const clearAll = () => {
    setPlainText("");
    setEncodedText("");
  };

  return (
    <>
      <h1>Base64 Encode/Decode</h1>
      <div className="flexBox">
        <div style={{ width: "50%" }}>
          <h2>
            String To Encode&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(plainText)}
            >
              <img src={copyIcon} className="copyImg" />
            </button>
          </h2>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={plainText}
            onChange={handlePlainChange}
          />
          <button onClick={() => encode()}>Encode =&gt;</button>
        </div>
        <div style={{ width: "50%" }}>
          <h2>
            String To Decode&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(encodedText)}
            >
              <img src={copyIcon} className="copyImg" />
            </button>
          </h2>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={encodedText}
            onChange={handleEncodeChange}
          />
          <button onClick={() => decode()}>&lt;= Decode</button>
        </div>
      </div>
      <button onClick={() => clearAll()} className="clear-all-button">
        Clear All
      </button>
    </>
  );
};

export default Base64;
