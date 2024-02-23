export interface RemoteDeleteTask {
  delete(params: RemoteDeleteTask.Params): Promise<void>;
}

export namespace RemoteDeleteTask {
  export type Params = {
    taskId: string;
  };
}
