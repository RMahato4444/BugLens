import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

await connectDatabase();

app.listen(
  env.port,
  "0.0.0.0",
  () => {
    console.log(
      `BugLens server running on port ${env.port}`,
    );
  },
);