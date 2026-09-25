export const analysisJsonSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    bugType: { type: "string" },
    severity: {
      type: "string",
      enum: ["Critical", "High", "Medium", "Low"],
    },
    confidence: {
      type: "integer",
      minimum: 0,
      maximum: 100,
    },
    language: { type: "string" },
    framework: { type: "string" },
    likelyLocation: { type: "string" },
    rootCause: { type: "string" },
    whyItHappened: {
      type: "array",
      items: { type: "string" },
    },
    fixSteps: {
      type: "array",
      items: { type: "string" },
    },
    codeFix: { type: "string" },
    alternativeFix: { type: "string" },
    prevention: {
      type: "array",
      items: { type: "string" },
    },
    commands: {
      type: "array",
      items: { type: "string" },
    },
    concepts: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: [
    "title",
    "summary",
    "bugType",
    "severity",
    "confidence",
    "language",
    "framework",
    "likelyLocation",
    "rootCause",
    "whyItHappened",
    "fixSteps",
    "codeFix",
    "alternativeFix",
    "prevention",
    "commands",
    "concepts",
  ],
  additionalProperties: false,
};

export const analysisPrompt = `You are BugLens, an expert software debugging assistant.

Analyze the developer error, stack trace, log, source snippet, or screenshot provided by the user.

Return exactly one JSON object matching the supplied schema.
Do not return markdown, explanations outside the JSON, or a code fence.
Do not invent file paths or line numbers. If the location is unknown, use "Not enough information".
Only identify a language or framework when there is evidence; otherwise use "Unknown".
The confidence value must represent your confidence in the diagnosis from 0 to 100.
Severity must be one of Critical, High, Medium, or Low.
Keep explanations concise but technically useful.
For codeFix, provide a practical corrected snippet when possible.
For alternativeFix, provide a shorter alternative when one is appropriate; otherwise use an empty string.
For commands, include only commands that are genuinely useful for reproducing, inspecting, testing, or fixing the issue.
For prevention, provide concrete engineering practices related to this specific issue.
For concepts, list important technical concepts the developer should understand.

Do not reveal hidden reasoning or chain-of-thought.`;
