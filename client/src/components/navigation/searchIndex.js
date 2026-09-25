import { docsSections } from "../docs/docsData";

export function buildSearchIndex(analysis = null) {
  const current = analysis || {};
  const whySteps = Array.isArray(current.whyItHappened) ? current.whyItHappened : [];
  const fixSteps = Array.isArray(current.fixSteps) ? current.fixSteps : [];
  const commands = Array.isArray(current.commands) ? current.commands : [];
  const concepts = Array.isArray(current.concepts) ? current.concepts : [];

  return [
    { id: "home", title: "Home", description: "BugLens analyzer home", type: "page", icon: "Home", view: "home", targetId: "buglens-home-hero", keywords: ["home", "buglens", "analyzer", "landing"] },
    { id: "analyzer-workspace", title: "Analyze an error", description: "Open the AI debugging workspace", type: "analyzer", icon: "Upload", view: "home", targetId: "buglens-analyzer-workspace", keywords: ["analyze", "analysis", "error", "debugging", "workspace", "paste", "upload", "drop", "stack trace", "log"] },
    { id: "supported-files", title: "Supported file types", description: "TXT, LOG, JSON, MD, PNG, JPG, JPEG and WEBP", type: "analyzer", icon: "FileCode2", view: "home", targetId: "buglens-supported-files", keywords: ["txt", "log", "json", "md", "png", "jpg", "jpeg", "webp", "5 mb", "file", "files"] },
    { id: "what-you-get", title: "What you'll get", description: "Bug identification, root cause, fix suggestion and AI explanation", type: "analyzer", icon: "Sparkles", view: "home", targetId: "buglens-what-you-get", keywords: ["features", "benefits", "bug identification", "root cause", "fix suggestion", "ai explanation"] },
    { id: "bug-identification", title: "Bug identification", description: "Understand exactly what is failing", type: "feature", icon: "Bug", view: "home", targetId: "buglens-feature-bug-identification", keywords: ["bug", "identify", "failure", "failing", "problem"] },
    { id: "root-cause", title: "Root cause", description: "Find the underlying reason behind the error", type: "feature", icon: "Lightbulb", view: "home", targetId: "buglens-feature-root-cause", keywords: ["root cause", "reason", "underlying", "cause"] },
    { id: "fix-suggestion", title: "Fix suggestion", description: "Get practical steps and corrected code", type: "feature", icon: "CheckCircle2", view: "home", targetId: "buglens-feature-fix-suggestion", keywords: ["fix", "suggestion", "steps", "corrected code", "repair"] },
    { id: "ai-explanation", title: "AI explanation", description: "Turn confusing logs into clear language", type: "feature", icon: "Sparkles", view: "home", targetId: "buglens-feature-ai-explanation", keywords: ["ai", "explanation", "logs", "clear language", "explain"] },
    { id: "developer-focused", title: "Developer focused", description: "JavaScript, TypeScript, Python, Java, C++, APIs, databases and more", type: "feature", icon: "FileCode2", view: "home", targetId: "buglens-developer-focused", keywords: ["developer", "javascript", "typescript", "python", "java", "c++", "api", "apis", "database", "databases"] },
    { id: "history", title: "History", description: "Browse previous BugLens analyses", type: "page", icon: "History", view: "history", targetId: "buglens-history-top", keywords: ["history", "previous", "scans", "analyses", "severity", "search history"] },
    { id: "analysis-overview", title: current.title || "Current BugLens analysis", description: current.summary || "Your latest AI debugging result", type: "analysis", icon: "Sparkles", view: "analysis", targetId: "buglens-analysis-overview", keywords: ["analysis", "summary", "bug lens", current.title, current.summary, current.bugType, current.severity, current.language, current.framework, current.confidence].filter(Boolean) },
    { id: "analysis-bug", title: "What is the bug?", description: "The problem BugLens identified", type: "analysis", icon: "Bug", view: "analysis", targetId: "buglens-analysis-bug", keywords: ["what is the bug", "runtime error", "typeerror", current.rootCause].filter(Boolean) },
    { id: "analysis-why", title: "Why did it happen?", description: "The sequence that caused the error", type: "analysis", icon: "Lightbulb", view: "analysis", targetId: "buglens-analysis-why", keywords: ["why", "happen", "sequence", "cause", ...whySteps] },
    { id: "analysis-fix", title: "How to fix it", description: "Recommended steps to resolve the bug", type: "analysis", icon: "CheckCircle2", view: "analysis", targetId: "buglens-analysis-fix", keywords: ["fix", "resolve", "recommended", ...fixSteps] },
    { id: "analysis-location", title: "Likely location", description: current.likelyLocation || "Where the bug is likely located", type: "analysis", icon: "FileCode2", view: "analysis", targetId: "buglens-analysis-location", keywords: ["location", "file", "line", current.likelyLocation].filter(Boolean) },
    { id: "analysis-stack", title: "Detected stack", description: `${current.language || "Unknown"} · ${current.framework || "Unknown"}`, type: "analysis", icon: "FileCode2", view: "analysis", targetId: "buglens-analysis-stack", keywords: ["stack", "technology", "runtime", current.language, current.framework].filter(Boolean) },
    { id: "analysis-commands", title: "Useful commands", description: "Commands related to this analysis", type: "analysis", icon: "Terminal", view: "analysis", targetId: "buglens-analysis-commands", keywords: ["commands", ...commands] },
    { id: "analysis-concepts", title: "Related concepts", description: "Concepts connected to this bug", type: "analysis", icon: "Search", view: "analysis", targetId: "buglens-analysis-concepts", keywords: ["concepts", "related", ...concepts] },
    { id: "analysis-input", title: "Analyzed input", description: "Review the text or file used for analysis", type: "analysis", icon: "FileSearch", view: "analysis", targetId: "buglens-analysis-input", keywords: ["input", "uploaded", "screenshot", "text", "file"] },
    { id: "analysis-code-fix", title: "Suggested code fix", description: "A safer implementation for the detected bug", type: "analysis", icon: "FileCode2", view: "analysis", targetId: "buglens-analysis-code-fix", keywords: ["suggested code", "code fix", "implementation", "safer", current.codeFix].filter(Boolean) },
    { id: "analysis-alternative-fix", title: "Alternative quick fix", description: "A compact alternative when the value is optional", type: "analysis", icon: "FileCode2", view: "analysis", targetId: "buglens-analysis-alternative-fix", keywords: ["alternative", "quick fix", "optional", "optional chaining", current.alternativeFix].filter(Boolean) },
    { id: "analysis-complete", title: "Analysis complete", description: "Analysis result summary and next action", type: "analysis", icon: "CheckCircle2", view: "analysis", targetId: "buglens-analysis-complete", keywords: ["complete", "finished", "result", "ready"] },
    ...docsSections.map((section) => ({
      id: `docs-${section.id}`,
      title: section.title,
      description: section.description,
      type: "docs",
      icon: "FileSearch",
      view: "docs",
      targetId: `buglens-docs-${section.id}`,
      keywords: section.keywords,
    })),
    { id: "login", title: "Log in", description: "Open the BugLens login page", type: "account", icon: "User", view: "login", targetId: null, keywords: ["login", "log in", "sign in", "account"] },
    { id: "signup", title: "Sign up", description: "Create a BugLens account", type: "account", icon: "Sparkles", view: "signup", targetId: null, keywords: ["signup", "sign up", "register", "create account"] },
  ].map((item) => ({
    ...item,
    keywords: (item.keywords || []).filter(Boolean).map(String),
  }));
}
