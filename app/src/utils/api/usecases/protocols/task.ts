import { TaskModel } from "../models/task";

export type TaskParams = {
  message: string;
};

export interface Task {
  task: (params: TaskParams) => Promise<TaskModel>;
}
