import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import copyIcon from "/copy-icon.svg";
import { Button } from "react-bootstrap";

const Colorizer = () => {
  const [color, setColor] = useState("#b32aa9");
  const [manualColor, setManualColor] = useState("");
  const [status, setStatus] = useState<string>("");

  const handleClipboard = () => {
    navigator.clipboard.writeText(color);
  };

  const handleColorText = () => {
    let clr = manualColor;
    if (!manualColor.startsWith("#")) {
      setManualColor("#" + manualColor);
      clr = "#" + manualColor;
    }

    if (clr.length != 7) {
      setStatus("Invalid Color Input!");
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } else {
      setColor(clr);
      setStatus("");
    }
  };

  return (
    <div className="w-100 p-2">
      <h1>Colorizer</h1>
      <div className="d-flex flex-column justify-content-center p-3">
        <HexColorPicker
          color={color}
          onChange={setColor}
          style={{ width: "100%", height: "300px" }}
        />

        <div className="p-2" style={{ fontSize: "20px" }}>
          Selected Color:&nbsp;&nbsp;<b>{color}</b>{" "}
          <Button
            variant="dark"
            className="copyButton"
            onClick={handleClipboard}
          >
            <img src={copyIcon} className="copyImg" />
          </Button>
        </div>
        {status && (
          <span style={{ color: "red", fontWeight: "bold" }}>{status}</span>
        )}

        <div>
          <input
            style={{
              padding: "12px 20px",
              margin: "8px 0",
              boxSizing: "border-box",
              fontSize: "16pt",
            }}
            type="text"
            value={manualColor}
            onChange={(e) => setManualColor(e.target.value)}
          />{" "}
          <Button variant="dark" onClick={handleColorText}>
            Set Color
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Colorizer;
