import express from "express";

import { TasksController } from "./tasks.controller";
import { TaskDTO } from "./dtos/task.dto";
import validation from "@middlewares/validation.middleware";
import authMiddleware from "../auth/middlewares/auth.middleware";

const router = express.Router();
const tasksController = new TasksController();

router.post(
  "/",
  authMiddleware,
  validation(TaskDTO),
  tasksController.createTask.bind(tasksController),
);

router.get("/", authMiddleware, tasksController.getTasks.bind(tasksController));

router.get(
  "/:id",
  authMiddleware,
  tasksController.getTask.bind(tasksController),
);

router.put(
  "/:id",
  authMiddleware,
  validation(TaskDTO),
  tasksController.updateTask.bind(tasksController),
);

router.delete(
  "/:id",
  authMiddleware,
  tasksController.deleteTask.bind(tasksController),
);

export default router;
