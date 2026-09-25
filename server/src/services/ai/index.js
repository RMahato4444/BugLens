import { env } from "../../config/env.js";
import { analyzeWithGroq } from "./groq.service.js";
import { analyzeWithMock } from "./mock.service.js";

export async function analyzeInput(payload) {
  if (env.aiProvider === "groq") return analyzeWithGroq(payload);
  if (env.aiProvider === "mock") return analyzeWithMock(payload);

  const error = new Error(`Unsupported AI_PROVIDER: ${env.aiProvider}`);
  error.statusCode = 500;
  error.expose = true;
  throw error;
}
