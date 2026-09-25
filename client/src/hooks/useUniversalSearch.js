import { useEffect, useMemo, useRef, useState } from "react";

import { listAnalyses } from "../services/analysisApi";
import { buildSearchIndex } from "../components/navigation/searchIndex";
import { useAuth } from "../context/AuthContext";

export function useUniversalSearch(onSelect, currentAnalysis = null) {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [historyItems, setHistoryItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const resultRefs = useRef([]);

  const openSearch = async () => {
    setOpen(true);
    if (!isAuthenticated) {
      setHistoryItems([]);
      return;
    }

    try {
      const result = await listAnalyses();
      setHistoryItems(Array.isArray(result.analyses) ? result.analyses : []);
    } catch {
      setHistoryItems([]);
    }
  };

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    resultRefs.current = [];
  };

  const results = useMemo(() => {
    const staticItems = buildSearchIndex(currentAnalysis);
    const historyResults = historyItems.map((item) => ({
      id: `history-${item.id}`,
      title: item.title || "Untitled scan",
      description:
        [item.language, item.framework, item.bugType, item.severity]
          .filter(Boolean)
          .join(" · ") || "Previous BugLens analysis",
      type: "history",
      icon: "Bug",
      view: "history",
      targetId: `buglens-history-item-${item.id}`,
      historyId: item.id,
      historyData: item,
      keywords: [
        item.title,
        item.language,
        item.framework,
        item.bugType,
        item.severity,
        item.inputText,
        item.confidence,
        ...Object.values(item.analysis || {}),
      ].filter(Boolean).flatMap((value) => (Array.isArray(value) ? value : [value])),
    }));

    const allItems = [...staticItems, ...historyResults];
    const normalized = query.trim().toLowerCase();

    if (!normalized) return allItems.slice(0, 14);

    const parts = normalized.split(/\s+/).filter(Boolean);

    return allItems
      .map((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const keywords = item.keywords.map((keyword) => String(keyword).toLowerCase());
        const fullText = [title, description, ...keywords].join(" ");
        let score = 0;

        if (title === normalized) score += 1000;
        if (title.startsWith(normalized)) score += 800;
        if (title.includes(normalized)) score += 650;
        if (description.includes(normalized)) score += 350;

        for (const part of parts) {
          if (title.split(/\s+/).some((word) => word.startsWith(part))) score += 90;
          if (keywords.some((keyword) => keyword.includes(part))) score += 60;
          if (fullText.includes(part)) score += 20;
        }

        return { item, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 16)
      .map(({ item }) => item);
  }, [currentAnalysis, historyItems, query]);

  useEffect(() => {
    setActiveIndex(0);
    resultRefs.current = [];
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || !results.length) return;
    resultRefs.current[activeIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeIndex, open, results]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeSearch();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const result = results[activeIndex] || results[0];
        if (result) {
          onSelect(result);
          closeSearch();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onSelect, open, results]);

  return {
    open,
    query,
    setQuery,
    results,
    activeIndex,
    setActiveIndex,
    inputRef,
    resultRefs,
    openSearch,
    closeSearch,
    onSelect,
  };
}
