import { UpdateTaskModel } from "../models/update-task";

export interface UpdateTask {
  /**
   *  @param params Os parametros da solicitação
   *  @returns Uma promise que resolve em um modelo de tarefa atualizada
   */

  update(params: UpdateTask.Params): Promise<UpdateTask.Model>;
}

export namespace UpdateTask {
  /**
   * Parametros para a solicitação de tarefas
   */
  export type Params = {
    body: {
      message: string;
      status: string;
    };
  };
  /**
   * Modelo de tarefa
   */
  export type Model = UpdateTaskModel;
}
