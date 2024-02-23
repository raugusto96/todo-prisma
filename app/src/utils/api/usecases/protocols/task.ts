import { TaskModel } from "@/utils/api/usecases/models/task";
export interface Task {
  task: (params: Task.Params) => Promise<TaskModel>;
}

export namespace Task {
  export type Params = {
    message: string;
  };

  export type Model = TaskModel;
}
