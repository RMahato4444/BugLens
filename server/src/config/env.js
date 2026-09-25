import "dotenv/config";

function required(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return value;
}

const cookieSameSite = (
  process.env.COOKIE_SAME_SITE ||
  "lax"
).toLowerCase();

if (
  !["lax", "strict", "none"].includes(
    cookieSameSite,
  )
) {
  throw new Error(
    "COOKIE_SAME_SITE must be lax, strict or none.",
  );
}

const cookieSecure =
  String(
    process.env.COOKIE_SECURE ||
      "false",
  ).toLowerCase() === "true";

if (
  cookieSameSite === "none" &&
  !cookieSecure
) {
  throw new Error(
    "COOKIE_SECURE must be true when COOKIE_SAME_SITE=none.",
  );
}

const encryptionKey =
  Buffer.from(
    required(
      "ENCRYPTION_KEY",
    ),
    "base64",
  );

if (encryptionKey.length !== 32) {
  throw new Error(
    "ENCRYPTION_KEY must decode to exactly 32 bytes.",
  );
}

export const env = {
  nodeEnv:
    process.env.NODE_ENV ||
    "development",

  port: Number(
    process.env.PORT || 5000,
  ),

  clientUrl:
    process.env.CLIENT_URL ||
    "http://localhost:5173",

  mongoUri:
    required("MONGO_URI"),

  jwtSecret:
    required("JWT_SECRET"),

  jwtExpiresIn:
    process.env.JWT_EXPIRES_IN ||
    "7d",

  authCookieName:
    process.env.AUTH_COOKIE_NAME ||
    "buglens_session",

  cookieSecure,

  cookieSameSite,

  cookieDomain:
    process.env.COOKIE_DOMAIN ||
    undefined,

  encryptionKey,

  aiProvider:
    (
      process.env.AI_PROVIDER ||
      "groq"
    ).toLowerCase(),

  groqApiKey:
    process.env.GROQ_API_KEY ||
    "",

  groqModel:
    process.env.GROQ_MODEL ||
    "qwen/qwen3.8-27b",

  mailService:
    process.env.MAIL_SERVICE ||
    "gmail",

  mailUser:
    process.env.MAIL_USER ||
    "",

  mailPassword:
    process.env.MAIL_PASSWORD ||
    "",

  mailFrom:
    process.env.MAIL_FROM ||
    process.env.MAIL_USER ||
    "",

  resetPasswordUrl:
    process.env.RESET_PASSWORD_URL ||
    "http://localhost:5173/reset-password",
};