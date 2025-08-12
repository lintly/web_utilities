import { SetStateAction, useState } from "react";
import copyIcon from "/copy-icon.svg";
import * as jose from "jose";

const JWT = () => {
  const [jwtToken, setJwtToken] = useState<string>("");
  const [headerText, setHeaderText] = useState<string>("");
  const [dataText, setDataText] = useState<string>("");

  const handlePlainChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setJwtToken(event.target.value);
  };

  const decodeJWT = async () => {
    if (jwtToken) {
      const protectedHeader = jose.decodeProtectedHeader(jwtToken);
      setHeaderText(JSON.stringify(protectedHeader, null, 2));

      const decodedSub = jose.decodeJwt(jwtToken);
      setDataText(JSON.stringify(decodedSub, null, 2));
    }
  };

  const clearAll = () => {
    setJwtToken("");
    setHeaderText("");
  };

  return (
    <>
      <h1>JWT Decode</h1>
      <div className="flexBox">
        <div style={{ width: "50%" }}>
          <h2>Encoded JWT</h2>
          <textarea
            style={{ width: "100%", height: "567px", fontSize: "16px" }}
            value={jwtToken}
            onChange={handlePlainChange}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h2>Decode</h2>
          <h3>
            Header&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(headerText)}
            >
              <img src={copyIcon} className="copyImg" />
            </button>
          </h3>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={headerText}
          />
          <h3>
            Payload&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="copyButton"
              onClick={() => navigator.clipboard.writeText(dataText)}
            >
              <img src={copyIcon} className="copyImg" />
            </button>
          </h3>
          <textarea
            style={{ width: "100%", height: "200px", fontSize: "16px" }}
            value={dataText}
          />
        </div>
      </div>
      <button onClick={() => decodeJWT()}>Decode JWT</button>
      <button className="clear-all-button" onClick={() => clearAll()}>
        Clear All
      </button>
    </>
  );
};

export default JWT;
