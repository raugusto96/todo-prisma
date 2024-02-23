export interface DeleteTask {
  delete(params: DeleteTask.Params): Promise<void>;
}

export namespace DeleteTask {
  export type Params = {
    taskId: string;
  };
}
