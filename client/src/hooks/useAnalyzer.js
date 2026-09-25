import { useRef, useState } from "react";

import { createAnalysis } from "../services/analysisApi";
import {
  MAX_FILE_SIZE,
  SUPPORTED_EXTENSIONS,
  getExtension,
  isImageFile,
} from "../utils/fileUtils";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./useToast";

export function useAnalyzer(onAnalyze, onLogin) {
  const { isAuthenticated } = useAuth();
  const [errorText, setErrorText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const { message, showMessage } = useToast();

  const validateFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      showMessage("error", "File is too large. Maximum size is 5 MB.");
      return false;
    }

    if (!SUPPORTED_EXTENSIONS.includes(getExtension(file.name))) {
      showMessage("error", "Unsupported file type.");
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!file || !validateFile(file)) return;

    setSelectedFile(file);
    setErrorText("");

    const reader = new FileReader();

    reader.onload = (event) => {
      if (isImageFile(file)) {
        setFilePreview(event.target?.result || null);
        showMessage("success", `${file.name} is ready for analysis.`);
        return;
      }

      setErrorText(String(event.target?.result || ""));
      setFilePreview(null);
      showMessage("success", `${file.name} loaded successfully.`);
    };

    reader.onerror = () => showMessage("error", "Unable to read this file.");

    if (isImageFile(file)) reader.readAsDataURL(file);
    else reader.readAsText(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
    event.target.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text.trim()) {
        showMessage("error", "Your clipboard is empty.");
        return;
      }
      setErrorText(text);
      setSelectedFile(null);
      setFilePreview(null);
      showMessage("success", "Error text pasted successfully.");
    } catch {
      showMessage("error", "Clipboard access was blocked.");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setErrorText("");
    showMessage("success", "File removed.");
  };

  const clearInput = () => {
    setErrorText("");
    setSelectedFile(null);
    setFilePreview(null);
    showMessage("success", "Analyzer cleared.");
  };

  const hasInput = errorText.trim().length > 0 || selectedFile !== null;

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      showMessage("error", "Please log in to analyze an error.");
      onLogin?.();
      return;
    }

    if (!hasInput) {
      showMessage("error", "Upload something to analyze first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await createAnalysis({ errorText, file: selectedFile });

      onAnalyze({
        errorText,
        selectedFile,
        filePreview,
        analysis: result.analysis,
        analysisId: result.analysisId,
        saved: result.saved,
      });

      showMessage(
        "success",
        result.saved ? "Analysis saved to your history." : "Analysis completed.",
      );
    } catch (error) {
      showMessage("error", error.message || "Unable to analyze this input.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    errorText,
    setErrorText,
    selectedFile,
    filePreview,
    isDragging,
    isAnalyzing,
    message,
    fileInputRef,
    hasInput,
    supportedExtensions: SUPPORTED_EXTENSIONS,
    handleFileInput,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handlePasteClipboard,
    removeFile,
    clearInput,
    handleAnalyze,
  };
}
