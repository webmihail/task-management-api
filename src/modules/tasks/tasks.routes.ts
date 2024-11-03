import express from "express";

import { TasksController } from "./tasks.controller";
import { TaskDTO } from "./dtos/task.dto";
import validation from "@middlewares/validation.middleware";
import authMiddleware from "../auth/middlewares/auth.middleware";

const router = express.Router();
const tasksController = new TasksController();

router.use(authMiddleware);

router.post(
  "/",
  validation(TaskDTO),
  tasksController.createTask.bind(tasksController),
);

router.get("/", tasksController.getTasks.bind(tasksController));

router.get("/:id", tasksController.getTask.bind(tasksController));

router.put(
  "/:id",
  validation(TaskDTO),
  tasksController.updateTask.bind(tasksController),
);

router.delete("/:id", tasksController.deleteTask.bind(tasksController));

export default router;
