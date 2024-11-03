import express from "express";

import taskRoutes from "@modules/tasks/tasks.routes";
import authRoutes from "@modules/auth/auth.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

export default router;
