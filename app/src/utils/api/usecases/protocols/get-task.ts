import { GetTaskModel } from "../models/get-task";

export interface GetTask {
  /**
   *  @param params Os parametros da solicitação
   *  @returns Uma promise que resolve em um modelo de tarefa ou uma matriz de tarefas
   */
  get(params: GetTask.Params): Promise<GetTask.Model | GetTask.Model[]>;
}

/**
 * Parâmetros para a solicitação de tarefas.
 */
interface TaskRequestHeaders {
  message?: string | null | undefined;
  status?: string | null | undefined;
}

/**
 * Cabeçalhos para a solicitação de tarefas específicas.
 */
interface GetTaskHeaders {
  params: TaskRequestHeaders;
}

export namespace GetTask {
  /**
   * Parametros para a solicitação de tarefas
   */
  export type Params = {
    headers?: GetTaskHeaders | null | undefined;
  };
  /**
   * Modelo de tarefa
   */
  export type Model = GetTaskModel;
}
