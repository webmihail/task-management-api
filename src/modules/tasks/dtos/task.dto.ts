import { Expose } from "class-transformer";
import { IsEnum, IsString } from "class-validator";

import { TaskStatus } from "../enums/task-status.enum";

export class TaskDTO {
  @IsString()
  @Expose()
  title: string;

  @IsString()
  @Expose()
  description: string;

  @IsEnum(TaskStatus)
  @Expose()
  status: TaskStatus;
}
