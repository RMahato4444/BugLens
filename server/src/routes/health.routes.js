import { Router } from "express";

const router = Router();

router.get("/", (_request, response) => {
  response.json({ status: "ok", service: "buglens-server" });
});

export default router;
