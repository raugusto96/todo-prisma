import { Task } from '@prisma/client'

export interface LoadDbTasksRepository {
  load: () => Promise<Task[] | null>
}
