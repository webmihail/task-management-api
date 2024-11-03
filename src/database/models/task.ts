import { DataTypes, Model } from "sequelize";

import { TaskStatus } from "@modules/tasks/enums/task-status.enum";
import sequelize from "../dbConnection";

export class Task extends Model {
  public id: number;
  public title: string;
  public description: string;
  public status: TaskStatus;
  public createdAt: Date;
  public updatedAt: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TaskStatus)),
      allowNull: false,
      defaultValue: TaskStatus.PENDING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Task",
    tableName: "tasks",
    timestamps: true,
    hooks: {
      beforeUpdate: async (user) => {
        user.updatedAt = new Date();
      },
    },
  },
);
