import { Task } from '@prisma/client'

export interface LoadDbTaskRepository {
  load: (taskId: string) => Promise<Task>
}
