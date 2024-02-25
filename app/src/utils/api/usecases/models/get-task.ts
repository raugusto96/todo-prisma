import { TaskStatus } from ".";

export interface GetTaskModel {
  id: string;
  message: string;
  status: TaskStatus;
}
