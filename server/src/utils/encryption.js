import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "node:crypto";

import { env } from "../config/env.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const VERSION = "v1";

export function encryptText(value) {
  const text = String(value ?? "");
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, env.encryptionKey, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    VERSION,
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(".");
}

export function decryptText(payload) {
  if (!payload) return "";

  const [version, ivValue, authTagValue, encryptedValue] = String(payload).split(".");

  if (
    version !== VERSION ||
    !ivValue ||
    !authTagValue ||
    !encryptedValue
  ) {
    throw new Error("Invalid encrypted payload.");
  }

  const iv = Buffer.from(ivValue, "base64url");
  const authTag = Buffer.from(authTagValue, "base64url");
  const encrypted = Buffer.from(encryptedValue, "base64url");

  if (iv.length !== IV_LENGTH || authTag.length !== AUTH_TAG_LENGTH) {
    throw new Error("Invalid encrypted payload metadata.");
  }

  const decipher = createDecipheriv(ALGORITHM, env.encryptionKey, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString("utf8");
}

export function encryptJson(value) {
  return encryptText(JSON.stringify(value ?? null));
}

export function decryptJson(payload) {
  return JSON.parse(decryptText(payload));
}
