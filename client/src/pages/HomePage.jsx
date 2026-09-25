import AnalyzerView from "../components/analyzer/AnalyzerView";

function HomePage({
  onAnalyze,
  onLogin,
}) {
  return (
    <AnalyzerView
      mode="home"
      onAnalyze={onAnalyze}
      onLogin={onLogin}
    />
  );
}

export default HomePage;