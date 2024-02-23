import { TaskModel } from "@/utils/api/usecases/models/task";
export interface AddTask {
  add: (params: AddTask.Params) => Promise<TaskModel>;
}

export namespace AddTask {
  export type Params = {
    message: string;
  };

  export type Model = TaskModel;
}
