import { SetStateAction, useState } from "react";
import { localize } from 'pseudo-localization'; // https://github.com/tryggvigy/pseudo-localization/tree/master
import copyIcon from "/copy-icon.svg";

const Localize = () => {
    const [plainText, setPlainText] = useState<string>("");
    const [localText, setLocalText] = useState<string>("");

    const handlePlainChange = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setPlainText(event.target.value);
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
                        String To Localize
                    </h2>
                    <textarea
                        style={{ width: "100%", height: "200px" }}
                        value={plainText}
                        onChange={handlePlainChange}
                    />
                </div>
                <div style={{ width: "50%"  }}>
                    <h2>
                        Localized String&nbsp;&nbsp;&nbsp;&nbsp;
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
                    />
                </div>
            </div>
            <button onClick={() => localIt()}>Localize Me!</button>
            <button className="clear-all-button" onClick={() => clearAll()}>Clear All</button>
        </div>
    );
};

export default Localize;
