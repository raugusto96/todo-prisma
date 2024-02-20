export enum TaskStatus {
  pending = "PENDING",
  canceled = "CANCELED",
  done = "DONE",
}

export interface TaskModel {
  id: string;
  message: string;
  status: TaskStatus;
}
