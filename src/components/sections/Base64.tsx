import { SetStateAction, useState } from "react";
import copyIcon from "/copy-icon.svg";
import { Button } from "react-bootstrap";

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
    <div className="w-100 p-2">
      <h1>Base64 Encode/Decode</h1>
      <div className="d-flex">
        <div className="w-50">
          <h2>
            String To Encode&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="dark"
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(plainText)}
            >
              <img src={copyIcon} className="copyImg" />
            </Button>
          </h2>
          <textarea
            style={{ width: "98%", height: "200px", fontSize: "16px" }}
            value={plainText}
            onChange={handlePlainChange}
          />
          <Button variant="dark" onClick={() => encode()}>
            Encode =&gt;
          </Button>
        </div>
        <div className="w-50">
          <h2>
            String To Decode&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="dark"
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(encodedText)}
            >
              <img src={copyIcon} className="copyImg" />
            </Button>
          </h2>
          <textarea
            style={{ width: "98%", height: "200px", fontSize: "16px" }}
            value={encodedText}
            onChange={handleEncodeChange}
          />
          <Button variant="dark" onClick={() => decode()}>
            &lt;= Decode
          </Button>
        </div>
      </div>
      <Button
        variant="danger"
        onClick={() => clearAll()}
        className="clear-all-button"
      >
        Clear All
      </Button>
    </div>
  );
};

export default Base64;
