import { AddTaskModel } from "@/utils/api/usecases/models/add-task";
export interface AddTask {
  /**
   *  @param params Os parametros da solicitação
   *  @returns Uma promise que resolve em um modelo de tarefa
   */
  add: (params: AddTask.Params) => Promise<AddTask.Model>;
}

export namespace AddTask {
  /**
   * Parametros para a solicitação de tarefas
   */
  export type Params = {
    message: string;
  };
  /**
   * Modelo de tarefa
   */
  export type Model = AddTaskModel;
}
