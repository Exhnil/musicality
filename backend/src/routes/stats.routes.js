import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("GET stats route");
});

export default router;
