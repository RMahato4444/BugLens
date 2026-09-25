import {
  Router,
} from "express";

import {
  forgotPassword,
  login,
  logout,
  me,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";

import {
  requireAuth,
} from "../middleware/auth.js";

import {
  requireCsrf,
  issueCsrfToken,
} from "../utils/csrf.js";

import {
  asyncHandler,
} from "../utils/asyncHandler.js";

const router =
  Router();

router.get(
  "/csrf",
  asyncHandler(
    issueCsrfToken,
  ),
);

router.post(
  "/register",
  requireCsrf,
  asyncHandler(register),
);

router.post(
  "/login",
  requireCsrf,
  asyncHandler(login),
);

router.post(
  "/logout",
  requireCsrf,
  requireAuth,
  asyncHandler(logout),
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(me),
);

router.post(
  "/forgot-password",
  requireCsrf,
  asyncHandler(
    forgotPassword,
  ),
);

router.post(
  "/reset-password",
  requireCsrf,
  asyncHandler(
    resetPassword,
  ),
);

export default router;