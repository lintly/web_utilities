import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import copyIcon from "/copy-icon.svg";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <HexColorPicker
        color={color}
        onChange={setColor}
        style={{ width: "100%", height: "300px" }}
      />

      <div
        className="value"
        style={{ borderLeftColor: color, fontSize: "20px" }}
      >
        Selected Color:&nbsp;&nbsp;<b>{color}</b>
        <button className="copyButton" onClick={handleClipboard}>
          <img src={copyIcon} className="copyImg" />
        </button>
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
        />
        <button onClick={handleColorText}>Set Color</button>
      </div>
    </div>
  );
};

export default Colorizer;
