import Groq from "groq-sdk";

import { env } from "../../config/env.js";
import { analysisJsonSchema, analysisPrompt } from "./schema.js";

let groqClient;

function getGroqClient() {
  if (!env.groqApiKey) {
    const error = new Error(
      "Groq is not configured. Add GROQ_API_KEY to server/.env.",
    );
    error.statusCode = 503;
    error.expose = true;
    throw error;
  }

  if (!groqClient) {
    groqClient = new Groq({ apiKey: env.groqApiKey });
  }

  return groqClient;
}

function buildUserPrompt(text) {
  return `${analysisPrompt}\n\nBUGLENS INPUT:\n${text || "No textual error was provided. Inspect the attached image if present."}`;
}

function buildMessageContent({ text, file }) {
  const content = [
    {
      type: "text",
      text: buildUserPrompt(text),
    },
  ];

  if (file?.buffer?.length && file.mimetype?.startsWith("image/")) {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      },
    });
  }

  return content;
}

async function requestWithStructuredOutput(client, messages) {
  return client.chat.completions.create({
    model: env.groqModel,
    messages,
    temperature: 0.2,
    max_completion_tokens: 4096,
    reasoning_effort: "none",
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "buglens_analysis",
        strict: true,
        schema: analysisJsonSchema,
      },
    },
  });
}

async function requestWithJsonObject(client, messages) {
  return client.chat.completions.create({
    model: env.groqModel,
    messages,
    temperature: 0.2,
    max_completion_tokens: 4096,
    reasoning_effort: "none",
    response_format: { type: "json_object" },
  });
}

export async function analyzeWithGroq({ text, file }) {
  const client = getGroqClient();
  const messages = [
    {
      role: "user",
      content: buildMessageContent({ text, file }),
    },
  ];

  let response;

  try {
    response = await requestWithStructuredOutput(client, messages);
  } catch (error) {
    if (error?.status !== 400) throw error;
    response = await requestWithJsonObject(client, messages);
  }

  const content = response?.choices?.[0]?.message?.content;

  if (!content) {
    const error = new Error("Groq returned an empty analysis response.");
    error.statusCode = 502;
    error.expose = true;
    throw error;
  }

  try {
    return JSON.parse(content);
  } catch {
    const error = new Error("Groq returned an invalid analysis response.");
    error.statusCode = 502;
    error.expose = true;
    throw error;
  }
}
