import { LanguageFile } from "@src/types/TranslationTypes";

type Props = {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  targetLanguage: string;
  setTargetLanguage: (targetLanguage: string) => void;
  generateTranslation: () => void;
  translating: boolean;
  languageFiles: LanguageFile[];
};

const TranslationGenerator: React.FC<Props> = ({
  apiKey,
  setApiKey,
  targetLanguage,
  setTargetLanguage,
  generateTranslation,
  translating,
  languageFiles,
}) => (
  <div className="card">
    <div className="card-header">
      <h5 className="card-title d-flex align-items-center mb-0">
        🌍 Generate New Translation
      </h5>
    </div>
    <div className="card-body">
      <div className="mb-3">
        <label className="form-label">Google Translate API Key</label>
        <input
          type="password"
          className="form-control"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Google Translate API key"
        />
      </div>

      {/* All version of English
      Spanish
      French Canadian
      Russian
      Brazil (?)
      Portugal (?) */}

      <div className="mb-3">
        <label className="form-label">Target Language Code</label>
        <select
          className="form-select"
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="es">Spanish (es)</option>
          <option value="es_BR">Spanish Brazil (es_BR)</option>

          <option value="fr">French (fr)</option>
          <option value="fr_CA">French Canadian (fr_CA)</option>

          <option value="pt">Portuguese (pt)</option>
          <option value="pt_BR">Portuguese Brazil (pt_BR)</option>

          <option value="ru">Russian (ru)</option>
        </select>
      </div>

      {!languageFiles.find((f) => f.code === "en") && (
        <div className="alert alert-warning d-flex align-items-center">
          <span className="me-2">⚠️</span>
          <span>
            Please load an en.json file to use as the translation source
          </span>
        </div>
      )}

      <button
        onClick={generateTranslation}
        disabled={
          translating || !apiKey || !languageFiles.find((f) => f.code === "en")
        }
        className="btn btn-primary btn-lg w-100"
      >
        {translating ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Translating...
          </>
        ) : (
          <>➕ Generate {targetLanguage}.json</>
        )}
      </button>
    </div>
  </div>
);

export default TranslationGenerator;
