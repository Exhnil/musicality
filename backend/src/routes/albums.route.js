import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("GET albums route");
});

export default router;
