import { ITask } from "./interfaces/task.interface";
import { Task } from "@database/models/task";
import { IGetTasksProps } from "./interfaces/get-tasks-props.interface";
import { HttpError } from "@errors/errors";

export class TasksService {
  async createTask(data: ITask) {
    const { title, description, status } = data || {};
    return await Task.create({
      title,
      description,
      status,
    });
  }

  async getTask(id: string) {
    if (!id) throw HttpError.badRequest();

    return await Task.findOne({
      where: { id },
    });
  }

  async getTasks(props: IGetTasksProps) {
    const { page, limit, status } = props || {};
    const where = status ? { status } : undefined;

    return await Task.findAndCountAll({
      where,
      limit: Number(limit),
      offset: Number(page),
    });
  }

  async updateTask(id: string, data: ITask) {
    const [affectedCount, elements] = await Task.update(data, {
      returning: true,
      where: { id },
    });

    if (!affectedCount) throw HttpError.notFoundError();

    return { count: affectedCount, elements };
  }

  async deleteTask(id: string) {
    await Task.destroy({ where: { id } });
    return { id };
  }
}
