import { NextFunction, Request, Response } from "express";

import { TasksService } from "./tasks.service";

export class TasksController {
  private tasksService: TasksService;

  constructor() {
    this.tasksService = new TasksService();
  }

  async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.tasksService.createTask(req.body);
      res.status(201).send(task);
    } catch (error) {
      next(error);
    }
  }

  async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.tasksService.getTask(req.params.id);
      res.status(200).send(task);
    } catch (error) {
      next(error);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset, status } = req.query || {};
      const tasks = await this.tasksService.getTasks({
        limit: Number(limit),
        page: Number(offset),
        status: status as string,
      });
      res.status(200).send(tasks);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.tasksService.updateTask(req.params.id, req.body);
      res.status(200).send(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await this.tasksService.deleteTask(req.params.id);
      res.status(200).send(task);
    } catch (error) {
      next(error);
    }
  }
}
