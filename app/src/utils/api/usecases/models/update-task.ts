import { TaskStatus } from ".";

export interface UpdateTaskModel {
  id: string;
  message: string;
  status: TaskStatus;
}
