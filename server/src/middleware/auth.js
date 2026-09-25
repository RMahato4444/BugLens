import {
  env,
} from "../config/env.js";

import {
  User,
} from "../models/User.js";

import {
  verifyAccessToken,
} from "../utils/jwt.js";

function readCookie(
  header = "",
  name,
) {
  for (
    const part of header.split(";")
  ) {
    const [
      key,
      ...rest
    ] = part
      .trim()
      .split("=");

    if (
      key === name
    ) {
      return decodeURIComponent(
        rest.join("=") || "",
      );
    }
  }

  return null;
}

function getSessionToken(
  request,
) {
  return readCookie(
    request.get("cookie"),
    env.authCookieName,
  );
}

async function resolveUser(
  request,
) {
  const token =
    getSessionToken(request);

  if (!token) {
    return null;
  }

  const payload =
    verifyAccessToken(token);

  if (
    !payload?.sub
  ) {
    return null;
  }

  const user =
    await User.findById(
      payload.sub,
    );

  if (!user) {
    return null;
  }

  if (
    Number(
      payload.sessionVersion,
    ) !==
    Number(
      user.sessionVersion,
    )
  ) {
    return null;
  }

  return user;
}

export async function optionalAuth(
  request,
  response,
  next,
) {
  try {
    request.user =
      await resolveUser(
        request,
      );

    return next();
  } catch {
    return response
      .status(401)
      .json({
        message:
          "Invalid authentication session.",
      });
  }
}

export async function requireAuth(
  request,
  response,
  next,
) {
  try {
    const user =
      await resolveUser(
        request,
      );

    if (!user) {
      return response
        .status(401)
        .json({
          message:
            "Authentication required.",
        });
    }

    request.user = user;

    return next();
  } catch {
    return response
      .status(401)
      .json({
        message:
          "Invalid or expired authentication session.",
      });
  }
}