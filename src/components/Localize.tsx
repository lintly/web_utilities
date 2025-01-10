import { SetStateAction, useState } from "react";
import { localize } from 'pseudo-localization'; // https://github.com/tryggvigy/pseudo-localization/tree/master
import copyIcon from "/copy-icon.svg";

import "./Localize.css";

const Localize = () => {
    const [plainText, setPlainText] = useState<string>("");
    const [localText, setLocalText] = useState<string>("");

    const handlePlainChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setPlainText(event.target.value);
    };

    const handleEncodeChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setLocalText(event.target.value);
    };

    const localIt = () => {
        setLocalText(localize(plainText));
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
                    <h2>
                        Encode
                    </h2>
                    <textarea
                        style={{ width: "100%", height: "200px" }}
                        value={plainText}
                        onChange={handlePlainChange}
                    />
                    <button onClick={() => localIt()}>Localize</button>
                </div>
                <div style={{ width: "50%" }}>
                    <h2>
                        Decode&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                            className="copyButton"
                            onClick={() =>
                                navigator.clipboard.writeText(localText)
                            }
                        >
                            <img src={copyIcon} className="copyImg" />
                        </button>
                    </h2>
                    <textarea
                        style={{ width: "100%", height: "200px" }}
                        value={localText}
                        onChange={handleEncodeChange}
                    />
                </div>
            </div>
            <button onClick={() => clearAll()}>Clear All</button>
        </div>
    );
};

export default Localize;
