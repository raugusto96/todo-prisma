import { UpdateTaskModel } from "../models/update-task";

export interface UpdateTask {
  update(params: UpdateTask.Params): Promise<UpdateTask.Model>;
}

export namespace UpdateTask {
  export type Params = {
    headers: {
      params: {
        taskId: string;
      };
    };
    body: {
      message: string;
      status: string;
    };
  };
  export type Model = UpdateTaskModel;
}
