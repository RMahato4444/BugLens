import { apiRequest } from "./apiClient";

export function createAnalysis({ errorText = "", file = null }) {
  const formData = new FormData();
  if (errorText.trim()) formData.append("errorText", errorText);
  if (file) formData.append("file", file);

  return apiRequest("/analyses", {
    method: "POST",
    body: formData,
  });
}

export function listAnalyses() {
  return apiRequest("/analyses");
}

export function getAnalysis(id) {
  return apiRequest(`/analyses/${id}`);
}

export function deleteAnalysis(id) {
  return apiRequest(`/analyses/${id}`, { method: "DELETE" });
}

export function clearAnalyses() {
  return apiRequest("/analyses", { method: "DELETE" });
}
