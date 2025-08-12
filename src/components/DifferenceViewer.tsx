import { DiffResult, LanguageFile } from "@src/types/TranslationTypes";

type Props = {
  differences: DiffResult[];
  languageFiles: LanguageFile[];
};

const DifferenceViewer: React.FC<Props> = ({ differences, languageFiles }) => (
  <div className="card">
    <div className="card-header">
      <h5 className="card-title d-flex align-items-center mb-0">
        📊 Translation Key Differences
      </h5>
    </div>
    <div className="card-body">
      {differences.length === 0 ? (
        <div className="text-center py-5 text-muted">
          {languageFiles.length === 0
            ? "Load language files to see differences"
            : "All language files are synchronized!"}
        </div>
      ) : (
        <>
          <div className="alert alert-info d-flex align-items-center mb-4">
            <span className="me-2">ℹ️</span>
            Found {differences.length} keys with differences across{" "}
            {languageFiles.length} language files
          </div>
          <div className="d-flex flex-wrap gap-1">
            {differences.map((diff, index) => (
              <div key={index} className="card mb-3" style={{ width: "49%" }}>
                <div className="card-body">
                  <div className="font-monospace fw-bold mb-3">{diff.key}</div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-success fw-bold small mb-2">
                        Present in:
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {diff.present.map((lang) => (
                          <span
                            key={lang}
                            className="badge bg-success d-flex align-items-center"
                          >
                            ✓ {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-danger fw-bold small mb-2">
                        Missing from:
                      </div>
                      <div className="d-flex flex-wrap gap-1">
                        {diff.missing.map((lang) => (
                          <span
                            key={lang}
                            className="badge bg-danger d-flex align-items-center"
                          >
                            ✗ {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

export default DifferenceViewer;
