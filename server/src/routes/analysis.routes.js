import {
  Router,
} from "express";

import {
  clearAnalyses,
  createAnalysis,
  deleteAnalysis,
  getAnalysis,
  listAnalyses,
} from "../controllers/analysis.controller.js";

import {
  requireAuth,
} from "../middleware/auth.js";

import {
  upload,
} from "../middleware/upload.js";

import {
  asyncHandler,
} from "../utils/asyncHandler.js";

import {
  requireCsrf,
} from "../utils/csrf.js";

const router =
  Router();

/*
  Analysis is account-only.
  Guests must authenticate before
  they can use the AI endpoint.
*/

router.post(
  "/",
  requireCsrf,
  requireAuth,
  upload.single("file"),
  asyncHandler(
    createAnalysis,
  ),
);

router.get(
  "/",
  requireAuth,
  asyncHandler(
    listAnalyses,
  ),
);

router.get(
  "/:id",
  requireAuth,
  asyncHandler(
    getAnalysis,
  ),
);

router.delete(
  "/:id",
  requireCsrf,
  requireAuth,
  asyncHandler(
    deleteAnalysis,
  ),
);

router.delete(
  "/",
  requireCsrf,
  requireAuth,
  asyncHandler(
    clearAnalyses,
  ),
);

export default router;