const severities = new Set(["Critical", "High", "Medium", "Low"]);

function text(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function list(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean)
    : [];
}

export function normalizeAnalysis(value = {}) {
  const confidence = Number(value.confidence);

  return {
    title: text(value.title, "BugLens analysis"),
    summary: text(value.summary, "No summary was provided."),
    bugType: text(value.bugType, "Unknown"),
    severity: severities.has(value.severity) ? value.severity : "Medium",
    confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(100, Math.round(confidence))) : 50,
    language: text(value.language, "Unknown"),
    framework: text(value.framework, "Unknown"),
    likelyLocation: text(value.likelyLocation, "Not enough information"),
    rootCause: text(value.rootCause, "Not enough information."),
    whyItHappened: list(value.whyItHappened),
    fixSteps: list(value.fixSteps),
    codeFix: text(value.codeFix),
    alternativeFix: text(value.alternativeFix),
    prevention: list(value.prevention),
    commands: list(value.commands),
    concepts: list(value.concepts),
  };
}
