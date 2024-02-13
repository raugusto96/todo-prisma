import { LoadDbTaskRepository } from '../usecases/load-task'
import prisma from '../../../config/prismaClient'
import { DeleteDbTaskRepository } from '../usecases/delete-task'

export class DeleteTaskDbRepository implements DeleteDbTaskRepository {
  constructor(private readonly loadDbTaskRepository: LoadDbTaskRepository) {}

  async delete(taskId: string): Promise<void> {
    const task = await this.loadDbTaskRepository.load(taskId)
    if (task) {
      await prisma.task.delete({
        where: { id: taskId }
      })
    }
  }
}
