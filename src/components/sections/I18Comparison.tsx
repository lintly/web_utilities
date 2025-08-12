import {
  flattenTranslations,
  unflattenTranslations,
} from "@src/helpers/TranslationHelpers";
import { DiffResult, LanguageFile } from "@src/types/TranslationTypes";
import { useState } from "react";
import DifferenceViewer from "../DifferenceViewer";
import TranslationGenerator from "../TranslationGenerator";
import { Button } from "react-bootstrap";

const I18Comparison = () => {
  const [languageFiles, setLanguageFiles] = useState<LanguageFile[]>([]);
  const [differences, setDifferences] = useState<DiffResult[]>([]);
  const [targetLanguage, setTargetLanguage] = useState<string>("es");
  const [translating, setTranslating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"compare" | "translate">(
    "compare",
  );

  const handleClearFiles = () => {
    setLanguageFiles([]);
    setDifferences([]);
  };

  // Load language files from directory
  const handleDirectoryUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) {
      return;
    }

    const loadedFiles: LanguageFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.name.endsWith(".json")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            const languageCode = file.name.replace(".json", "");

            loadedFiles.push({
              name: file.name,
              code: languageCode,
              data: data,
            });

            if (
              loadedFiles.length ===
              Array.from(files).filter((f) => f.name.endsWith(".json")).length
            ) {
              setLanguageFiles(loadedFiles);
              calculateDifferences(loadedFiles);
            }
          } catch (error) {
            console.error(`Error parsing ${file.name}:`, error);
          }
        };
        reader.readAsText(file);
      }
    });
  };

  // Calculate differences between language files
  const calculateDifferences = (files: LanguageFile[]) => {
    if (files.length === 0) {
      return;
    }

    const allKeys = new Set<string>();
    const fileKeys: { [fileName: string]: Set<string> } = {};

    // Collect all keys from all files
    files.forEach((file) => {
      const flattened = flattenTranslations(file.data);
      fileKeys[file.name] = new Set(Object.keys(flattened));
      Object.keys(flattened).forEach((key) => allKeys.add(key));
    });

    // Find differences
    const diffs: DiffResult[] = [];
    allKeys.forEach((key) => {
      const present: string[] = [];
      const missing: string[] = [];

      files.forEach((file) => {
        if (fileKeys[file.name].has(key)) {
          present.push(file.code);
        } else {
          missing.push(file.code);
        }
      });

      if (missing.length > 0) {
        diffs.push({
          key,
          present,
          missing,
          path: key,
        });
      }
    });

    setDifferences(diffs);
  };

  // Generate new language file from en.json
  const generateTranslation = async () => {
    const enFile = languageFiles.find((f) => f.code === "en");
    if (!enFile || !apiKey) {
      alert("Please ensure en.json is loaded and API key is provided");
      return;
    }

    setTranslating(true);

    try {
      const flattened = flattenTranslations(enFile.data);
      const translated: { [key: string]: string } = {};

      // Translate each text
      for (const key in flattened) {
        translated[key] = await translateText(flattened[key], targetLanguage);
      }

      const translatedData = unflattenTranslations(translated);

      // Create and download the new file
      const blob = new Blob([JSON.stringify(translatedData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${targetLanguage}.json`;
      a.click();
      URL.revokeObjectURL(url);

      // Add to loaded files
      const newFile: LanguageFile = {
        name: `${targetLanguage}.json`,
        code: targetLanguage,
        data: translatedData,
      };

      const updatedFiles = [...languageFiles, newFile];
      setLanguageFiles(updatedFiles);
      calculateDifferences(updatedFiles);
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please check your API key and try again.");
    } finally {
      setTranslating(false);
    }
  };

  // Google Translate API call
  const translateText = async (
    text: string,
    targetLang: string,
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${text}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("result", result);
      if (result && result[0] && result[0][0] && result[0][0][0]) {
        return result[0][0][0];
      }
      return text;
    } catch (err) {
      console.error("ERROR:", err); //
      throw err;
    }
  };

  return (
    <div className="w-100 p-2">
      <h1>i18n Language File Manager</h1>
      <p className="text-muted">
        Compare translation files and generate new language files using Google
        Translate
      </p>
      {/* File Upload */}
      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Load Language Files</h5>
              <div>
                <span className="badge bg-secondary">
                  {languageFiles.length} files loaded
                </span>{" "}
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={handleClearFiles}
                >
                  Clear
                </Button>
                {/* <span>Clear</span> */}
              </div>
            </div>
            <div className="card-body">
              <div className="border border-dashed border-secondary rounded p-5 text-center">
                <div className="mb-3">
                  <span style={{ fontSize: "3rem" }}>📁</span>
                </div>
                <div>
                  <label
                    htmlFor="directory-upload"
                    className="form-label h5 mb-2"
                  >
                    Select your locales directory
                  </label>
                  <input
                    type="file"
                    multiple
                    accept=".json"
                    onChange={handleDirectoryUpload}
                    className="d-none"
                    id="directory-upload"
                  />
                  <div>
                    <label
                      htmlFor="directory-upload"
                      className="btn btn-outline-primary"
                    >
                      Choose Folder
                    </label>
                  </div>
                  <div className="form-text mt-2">
                    Choose the folder containing your .json language files
                  </div>
                </div>
              </div>

              {languageFiles.length > 0 && (
                <div className="mt-4">
                  <h6 className="text-muted mb-2">Loaded Files:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {languageFiles.map((file) => (
                      <span
                        key={file.name}
                        className="badge bg-primary d-flex align-items-center"
                      >
                        📄 {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="row">
        <div className="col">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "compare" ? "active" : ""}`}
                onClick={() => setActiveTab("compare")}
              >
                📊 Compare Differences
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "translate" ? "active" : ""}`}
                onClick={() => setActiveTab("translate")}
              >
                🌍 Generate Translation
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "compare" && (
              <DifferenceViewer
                differences={differences}
                languageFiles={languageFiles}
              />
            )}
            {activeTab === "translate" && (
              <TranslationGenerator
                apiKey={apiKey}
                setApiKey={setApiKey}
                targetLanguage={targetLanguage}
                setTargetLanguage={setTargetLanguage}
                generateTranslation={generateTranslation}
                translating={translating}
                languageFiles={languageFiles}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default I18Comparison;
