import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  getAllSongs,
  getFeaturedSong,
  getMadeForYou,
  getTrending,
  getSongById,
} from "../controller/song.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSong);
router.get("/made-for-you", getMadeForYou);
router.get("/trending", getTrending);
router.get("/:songId", getSongById);

export default router;
