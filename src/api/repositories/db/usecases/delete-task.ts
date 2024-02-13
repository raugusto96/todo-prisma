export interface DeleteDbTaskRepository {
  delete: (taskId: string) => Promise<void>
}
