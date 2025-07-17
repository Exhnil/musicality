import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import songRoutes from "./routes/songs.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import albumsRoute from "./routes/albums.route.js";
import statsRoute from "./routes/stats.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumsRoute);
app.use("/api/stats", statsRoute);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT + "...");
  connectDB();
});
