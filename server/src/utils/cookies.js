import { env } from "../config/env.js";

const DAY = 24 * 60 * 60 * 1000;

function parseMaxAge(value) {
  if (typeof value === "number") return value;

  const raw = String(value || "").trim().toLowerCase();
  const match = raw.match(/^(\d+)\s*(s|m|h|d)?$/);
  if (!match) return 7 * DAY;

  const amount = Number(match[1]);
  const unit = match[2] || "s";

  switch (unit) {
    case "d":
      return amount * DAY;
    case "h":
      return amount * 60 * 60 * 1000;
    case "m":
      return amount * 60 * 1000;
    default:
      return amount * 1000;
  }
}

export function setAuthCookie(response, token, { rememberMe = true } = {}) {
  const options = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: "/",
  };

  if (env.cookieDomain) {
    options.domain = env.cookieDomain;
  }

  if (rememberMe) {
    options.maxAge = parseMaxAge(env.jwtExpiresIn);
  }

  response.cookie(env.authCookieName, token, options);
}

export function clearAuthCookie(response) {
  const options = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: "/",
  };

  if (env.cookieDomain) {
    options.domain = env.cookieDomain;
  }

  response.clearCookie(env.authCookieName, options);
}
