import { SetStateAction, useState } from "react";
import { localize } from "pseudo-localization"; // https://github.com/tryggvigy/pseudo-localization/tree/master
import copyIcon from "/copy-icon.svg";
import { Button } from "react-bootstrap";

const Localizer = () => {
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
    <div className="w-100 p-2">
      <h1>PsuedoLocalization</h1>
      <div className="d-flex">
        <div className="w-50">
          <h2 style={{ height: "45px" }}>String To Localize</h2>
          <textarea
            style={{ width: "98%", height: "200px", fontSize: "16px" }}
            value={plainText}
            onChange={handlePlainChange}
            onFocus={() => setPlainText("")}
          />
        </div>
        <div className="w-50">
          <h2 style={{ height: "45px" }}>
            Localized String&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => copyLocalizedText(localText)}>
              <img src={copyIcon} className="copyImg" />
            </Button>
          </h2>
          <textarea
            style={{ width: "98%", height: "200px", fontSize: "16px" }}
            value={localText}
          />
        </div>
      </div>
      <div>
        {status && (
          <span style={{ color: "red", fontWeight: "bold" }}>{status}</span>
        )}
        <div className="d-flex flex-column justify-content-center gap-2 px-3">
          <Button variant="success" onClick={() => localIt()}>
            Localize Me!
          </Button>
          <Button variant="danger" onClick={() => clearAll()}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Localizer;
