import { SetStateAction, useState } from "react";
import copyIcon from "/copy-icon.svg";
import * as jose from "jose";
import { Button } from "react-bootstrap";

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
    <div className="w-100 p-2">
      <h1>JWT Decode</h1>
      <div className="d-flex">
        <div className="w-50">
          <h2>Encoded JWT</h2>
          <textarea
            style={{ width: "98%", height: "567px", fontSize: "16px" }}
            value={jwtToken}
            onChange={handlePlainChange}
          />
        </div>
        <div className="w-50">
          <h2>Decode</h2>
          <div className="d-flex">
            <div style={{ width: "220px" }}>
              <h3>
                Header&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  variant="dark"
                  onClick={() => navigator.clipboard.writeText(headerText)}
                >
                  <img src={copyIcon} className="copyImg" />
                </Button>
              </h3>
            </div>
            <div style={{ width: "98%" }}>
              <textarea
                style={{ width: "98%", height: "200px", fontSize: "16px" }}
                value={headerText}
              />
            </div>
          </div>
          <div className="d-flex">
            <div style={{ width: "220px" }}>
              <h3>
                Payload&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  variant="dark"
                  onClick={() => navigator.clipboard.writeText(dataText)}
                >
                  <img src={copyIcon} className="copyImg" />
                </Button>
              </h3>
            </div>
            <div style={{ width: "98%" }}>
              <textarea
                style={{ width: "98%", height: "200px", fontSize: "16px" }}
                value={dataText}
              />
            </div>
          </div>
        </div>
      </div>
      <Button variant="success" onClick={() => decodeJWT()}>
        Decode JWT
      </Button>{" "}
      <Button
        variant="danger"
        className="clear-all-button"
        onClick={() => clearAll()}
      >
        Clear All
      </Button>
    </div>
  );
};

export default JWT;
