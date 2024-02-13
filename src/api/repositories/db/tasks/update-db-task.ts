import { Prisma, Task } from '@prisma/client'
import { UpdateDbTaskRepository } from '../usecases/update-task'
import { LoadDbTaskRepository } from '../usecases/load-task'
import prisma from '../../../config/prismaClient'

export class UpdateTaskDbRepository implements UpdateDbTaskRepository {
  constructor(private readonly loadDbTaskRepository: LoadDbTaskRepository) {}

  async update(
    taskId: string,
    data: Prisma.TaskUpdateInput
  ): Promise<Task | null> {
    const task = await this.loadDbTaskRepository.load(taskId)
    if (!task) return null
    const updatedTask = prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        message: data.message,
        status: data.status
      }
    })
    return updatedTask
  }
}
