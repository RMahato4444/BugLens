import HistoryView from "../components/history/HistoryView";

function HistoryPage({ onOpenScan, onLogin }) {
  return <HistoryView onOpenScan={onOpenScan} onLogin={onLogin} />;
}

export default HistoryPage;
