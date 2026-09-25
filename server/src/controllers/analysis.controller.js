import { Analysis } from "../models/Analysis.js";
import { analyzeInput } from "../services/ai/index.js";
import { normalizeAnalysis } from "../utils/normalizeAnalysis.js";
import { decryptJson, encryptJson } from "../utils/encryption.js";

function readEncryptedPayload(item) {
  if (item.encryptedPayload) {
    return decryptJson(item.encryptedPayload);
  }

  // Backward compatibility for old plaintext documents.
  return {
    inputText: item.inputText || "",
    analysis: item.result || null,
  };
}

function mapHistoryItem(item) {
  const payload = readEncryptedPayload(item);
  const analysis = payload.analysis || {};

  return {
    id: String(item._id),
    title: analysis.title || "Untitled analysis",
    severity: analysis.severity || "Unknown",
    language: analysis.language || "Unknown",
    framework: analysis.framework || "Unknown",
    bugType: analysis.bugType || "Unknown",
    createdAt: item.createdAt,
    inputText: payload.inputText || "",
    confidence: analysis.confidence || 0,
    file: item.file,
    analysis,
  };
}

export async function createAnalysis(request, response) {
  let text = String(request.body?.errorText || "").trim();
  const file = request.file;

  if (!text && file && !file.mimetype?.startsWith("image/")) {
    text = file.buffer.toString("utf8").trim();
  }

  if (!text && !file) {
    return response.status(400).json({
      message: "Upload something to analyze first.",
    });
  }

  const analysisText = text.slice(0, 50000);
  const result = normalizeAnalysis(
    await analyzeInput({
      text: analysisText,
      file,
    }),
  );

  let saved = null;

  if (request.user) {
    saved = await Analysis.create({
      user: request.user._id,
      encryptedPayload: encryptJson({
        inputText:
          analysisText ||
          (file?.mimetype?.startsWith("image/")
            ? "Image analysis"
            : ""),
        analysis: result,
      }),
      file: file
        ? {
            name: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
          }
        : undefined,
    });
  }

  return response.status(201).json({
    analysis: result,
    analysisId: saved ? String(saved._id) : null,
    saved: Boolean(saved),
  });
}

export async function listAnalyses(request, response) {
  const items = await Analysis.find({ user: request.user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return response.json({
    analyses: items.map(mapHistoryItem),
  });
}

export async function getAnalysis(request, response) {
  const item = await Analysis.findOne({
    _id: request.params.id,
    user: request.user._id,
  }).lean();

  if (!item) {
    return response.status(404).json({
      message: "Analysis not found.",
    });
  }

  const payload = readEncryptedPayload(item);

  return response.json({
    analysis: payload.analysis,
    analysisId: String(item._id),
    inputText: payload.inputText || "",
    file: item.file,
    createdAt: item.createdAt,
  });
}

export async function deleteAnalysis(request, response) {
  const deleted = await Analysis.findOneAndDelete({
    _id: request.params.id,
    user: request.user._id,
  });

  if (!deleted) {
    return response.status(404).json({
      message: "Analysis not found.",
    });
  }

  return response.json({
    message: "Analysis deleted.",
  });
}

export async function clearAnalyses(request, response) {
  await Analysis.deleteMany({
    user: request.user._id,
  });

  return response.json({
    message: "History cleared.",
  });
}
