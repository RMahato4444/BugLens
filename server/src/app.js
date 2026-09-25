import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import { env } from "./config/env.js";
import analysisRoutes from "./routes/analysis.routes.js";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const allowedOrigins = env.clientUrl
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin not allowed."));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.use(
  "/api",
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
);

app.use("/api/health", healthRoutes);

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
  authRoutes,
);

app.use("/api/analyses", analysisRoutes);

app.use((_request, response) => {
  response.status(404).json({ message: "Route not found." });
});

app.use(errorHandler);

export default app;
