import { SetStateAction, useState } from "react";
import copyIcon from "/copy-icon.svg";
import { Button } from "react-bootstrap";

const JsonFormatter = () => {
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
    <div className="w-100 p-2">
      <h1>Json Formatter</h1>
      <div className="d-flex">
        <div className="w-50">
          <h2>Nasty Json To Make Sexy</h2>
          <textarea
            style={{ width: "98%", height: "200px", fontSize: "16px" }}
            value={plainText}
            onChange={handlePlainChange}
          />
          <Button variant="dark" onClick={() => cleanMe()}>
            Clean Me =&gt;
          </Button>
        </div>
        <div className="w-50">
          <h2>
            Sexy Json&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="dark"
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(prettyText)}
            >
              <img src={copyIcon} className="copyImg" />
            </Button>
          </h2>
          <textarea
            style={{ width: "98%", height: "200px", fontSize: "16px" }}
            value={prettyText}
          />
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

export default JsonFormatter;
