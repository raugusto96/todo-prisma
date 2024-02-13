import { Prisma, Task } from '@prisma/client'
import prisma from '../../../config/prismaClient'
import { STATUS } from '../../../models/usecases'
import { AddDbTaskRepository } from '../usecases/add-task'

export class AddTaskDbRepository implements AddDbTaskRepository {
  async add(taskData: Prisma.TaskCreateInput): Promise<Task> {
    const createdTask = await prisma.task.create({
      data: { ...taskData, status: STATUS.PENDING }
    })
    return createdTask
  }
}
