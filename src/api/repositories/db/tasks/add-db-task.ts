import { Prisma, Task } from '@prisma/client'
import prisma from '../../../config/prismaClient'
import { AddDbTaskRepository } from '../usecases/add-task'
import { STATUS } from '../../../models/enums'

export class AddTaskDbRepository implements AddDbTaskRepository {
  async add(taskData: Prisma.TaskCreateInput): Promise<Task> {
    const createdTask = await prisma.task.create({
      data: { ...taskData, status: STATUS.PENDING }
    })
    return createdTask
  }
}
