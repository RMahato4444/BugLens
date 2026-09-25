import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../context/AuthContext";
import {
  clearAnalyses,
  deleteAnalysis,
  listAnalyses,
} from "../services/analysisApi";

export function useHistory() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedScan, setSelectedScan] = useState(null);
  const [deletingIds, setDeletingIds] = useState(() => new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshHistory = async () => {
    if (!isAuthenticated) {
      setHistory([]);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await listAnalyses();
      setHistory(Array.isArray(result.analyses) ? result.analyses : []);
    } catch (requestError) {
      setHistory([]);
      setError(requestError.message || "Unable to load history.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) refreshHistory();
  }, [authLoading, isAuthenticated]);

  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();

    return history.filter((item) => {
      const searchable = [
        item.title,
        item.language,
        item.framework,
        item.bugType,
        item.severity,
        item.inputText,
        item.confidence,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchable.includes(query)) &&
        (severityFilter === "All" || item.severity === severityFilter)
      );
    });
  }, [history, search, severityFilter]);

  const deleteScan = (id) => {
    if (!isAuthenticated) return;

    setDeletingIds((current) => new Set(current).add(id));

    if (selectedScan?.id === id) setSelectedScan(null);

    window.setTimeout(async () => {
      try {
        await deleteAnalysis(id);
        setHistory((current) => current.filter((item) => item.id !== id));
      } catch (requestError) {
        setError(requestError.message || "Unable to delete analysis.");
      } finally {
        setDeletingIds((current) => {
          const next = new Set(current);
          next.delete(id);
          return next;
        });
      }
    }, 420);
  };

  const clearHistory = async () => {
    if (!isAuthenticated) return false;
    if (!window.confirm("Are you sure you want to clear all BugLens history?")) return false;

    try {
      await clearAnalyses();
      setHistory([]);
      setSelectedScan(null);
      return true;
    } catch (requestError) {
      setError(requestError.message || "Unable to clear history.");
      return false;
    }
  };

  return {
    history,
    filteredHistory,
    search,
    setSearch,
    severityFilter,
    setSeverityFilter,
    selectedScan,
    setSelectedScan,
    deletingIds,
    deleteScan,
    clearHistory,
    refreshHistory,
    isLoading,
    error,
    isAuthenticated,
  };
}
