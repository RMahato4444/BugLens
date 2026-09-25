import AnalyzerActions from "./AnalyzerActions";
import AnalyzerBenefits from "./AnalyzerBenefits";
import AnalyzerHeader, { WorkspaceHeader } from "./AnalyzerHeader";
import AnalyzerInput from "./AnalyzerInput";
import Toast from "../common/Toast";
import { useAnalyzer } from "../../hooks/useAnalyzer";

function AnalyzerView({ mode = "home", onAnalyze, onLogin }) {
  const analyzer = useAnalyzer(onAnalyze, onLogin);

  return (
    <>
      <main className={mode === "home" ? "py-16 sm:py-10 lg:py-10" : "py-10 sm:py-10 lg:py-10"}>
        <AnalyzerHeader mode={mode} />

        <section className={`mx-auto max-w-5xl ${mode === "home" ? "mt-12" : "mt-8"}`}>
          <div id="buglens-analyzer-workspace" className="glass blue-glow overflow-hidden rounded-3xl">
            <WorkspaceHeader mode={mode} />

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.35fr_0.65fr]">
              <div>
                <AnalyzerInput
                  errorText={analyzer.errorText}
                  setErrorText={analyzer.setErrorText}
                  selectedFile={analyzer.selectedFile}
                  filePreview={analyzer.filePreview}
                  isDragging={analyzer.isDragging}
                  fileInputRef={analyzer.fileInputRef}
                  onFileInput={analyzer.handleFileInput}
                  onDragOver={analyzer.handleDragOver}
                  onDragLeave={analyzer.handleDragLeave}
                  onDrop={analyzer.handleDrop}
                  onRemoveFile={analyzer.removeFile}
                />
                <AnalyzerActions
                  fileInputRef={analyzer.fileInputRef}
                  onFileChange={analyzer.handleFileInput}
                  onChooseFile={() => analyzer.fileInputRef.current?.click()}
                  onPaste={analyzer.handlePasteClipboard}
                  onAnalyze={analyzer.handleAnalyze}
                  onClear={analyzer.clearInput}
                  isAnalyzing={analyzer.isAnalyzing}
                  hasInput={analyzer.hasInput}
                />
              </div>

              <AnalyzerBenefits />
            </div>
          </div>
        </section>
      </main>

      <Toast message={analyzer.message} />
    </>
  );
}

export default AnalyzerView;
