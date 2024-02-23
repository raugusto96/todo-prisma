import { AddTaskModel } from "@/utils/api/usecases/models/add-task";
export interface AddTask {
  add: (params: AddTask.Params) => Promise<AddTaskModel>;
}

export namespace AddTask {
  export type Params = {
    message: string;
  };

  export type Model = AddTaskModel;
}
