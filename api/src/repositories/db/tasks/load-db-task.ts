import { Task } from '@prisma/client'
import { LoadDbTaskRepository } from '../usecases/load-task'
import prisma from '../../../config/prismaClient'

export class LoadTaskDbRepository implements LoadDbTaskRepository {
  async load(taskId: string): Promise<Task | null> {
    const findedTask = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })
    return findedTask ?? null
  }
}
