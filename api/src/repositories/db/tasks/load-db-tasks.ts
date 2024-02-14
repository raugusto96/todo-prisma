import { Task } from '@prisma/client'
import prisma from '../../../config/prismaClient'
import { LoadDbTasksRepository } from '../usecases/load-tasks'

export class LoadTasksDbRepository implements LoadDbTasksRepository {
  async load(): Promise<Task[] | null> {
    return (await prisma.task.findMany()) ?? null
  }
}
