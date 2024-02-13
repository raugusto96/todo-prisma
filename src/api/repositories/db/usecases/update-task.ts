import { Task } from '@prisma/client'

export interface UpdateDbTaskRepository {
  update: (taskId: string) => Promise<Task | null>
}
