export async function analyzeWithMock() {
  return {
    title: "Mock analysis",
    summary: "The server is connected. Switch AI_PROVIDER to groq for real AI analysis.",
    bugType: "Configuration",
    severity: "Low",
    confidence: 100,
    language: "Unknown",
    framework: "Unknown",
    likelyLocation: "Not enough information",
    rootCause: "Mock provider is enabled.",
    whyItHappened: ["AI_PROVIDER is set to mock."],
    fixSteps: ["Set AI_PROVIDER=groq and add GROQ_API_KEY to the server environment."],
    codeFix: "",
    alternativeFix: "",
    prevention: ["Keep AI provider configuration in server-side environment variables."],
    commands: ["npm run dev"],
    concepts: ["API integration", "Environment variables"],
  };
}
