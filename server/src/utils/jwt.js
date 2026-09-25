import jwt from "jsonwebtoken";

import {
  env,
} from "../config/env.js";

export function signAccessToken(
  user,
  expiresIn = env.jwtExpiresIn,
) {
  return jwt.sign(
    {
      sub: String(user._id),

      email: user.email,

      sessionVersion:
        user.sessionVersion || 0,
    },

    env.jwtSecret,

    {
      expiresIn,
    },
  );
}

export function verifyAccessToken(
  token,
) {
  try {
    return jwt.verify(
      token,
      env.jwtSecret,
    );
  } catch {
    return null;
  }
}