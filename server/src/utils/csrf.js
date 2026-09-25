import { randomBytes, timingSafeEqual } from "node:crypto";

import { env } from "../config/env.js";

const CSRF_COOKIE = "buglens_csrf";
const CSRF_HEADER = "x-csrf-token";

function serializeCookieValue(value) {
  return encodeURIComponent(value);
}

function parseCookies(header = "") {
  const result = {};

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (!key) continue;
    result[key] = decodeURIComponent(rest.join("=") || "");
  }

  return result;
}

export function issueCsrfToken(request, response) {
  const existing = parseCookies(request.get("cookie"))[CSRF_COOKIE];
  const token = existing || randomBytes(32).toString("hex");

  response.cookie(CSRF_COOKIE, token, {
    httpOnly: false,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: "/",
  });

  return response.json({ csrfToken: token });
}

function tokensMatch(left, right) {
  if (!left || !right) return false;

  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function requireCsrf(request, response, next) {
  const method = request.method.toUpperCase();

  if (["GET", "HEAD", "OPTIONS"].includes(method)) {
    return next();
  }

  const cookies = parseCookies(request.get("cookie"));
  const cookieToken = cookies[CSRF_COOKIE];
  const headerToken = request.get(CSRF_HEADER);

  if (!tokensMatch(cookieToken, headerToken)) {
    return response.status(403).json({
      message: "Invalid or missing CSRF token.",
    });
  }

  return next();
}

export { CSRF_COOKIE };
