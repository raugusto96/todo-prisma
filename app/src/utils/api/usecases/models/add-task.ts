export enum TaskStatus {
  pending = "PENDING",
  canceled = "CANCELED",
  done = "DONE",
}

export interface AddTaskModel {
  id: string;
  message: string;
  status: TaskStatus;
}
