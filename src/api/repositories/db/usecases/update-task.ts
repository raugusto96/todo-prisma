import { Prisma, Task } from '@prisma/client'

export interface UpdateDbTaskRepository {
  update: (taskId: string, data: Prisma.TaskUpdateInput) => Promise<Task | null>
}
