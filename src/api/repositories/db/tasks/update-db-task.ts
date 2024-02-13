import { Task } from '@prisma/client'
import { UpdateDbTaskRepository } from '../usecases/update-task'
import { LoadDbTaskRepository } from '../usecases/load-task'

export class UpdateTaskDbRepository implements UpdateDbTaskRepository {
  constructor(private readonly loadDbTaskRepository: LoadDbTaskRepository) {}

  async update(taskId: string): Promise<Task | null> {
    const task = await this.loadDbTaskRepository.load(taskId)
    if (!task) return null
    return {
      id: '',
      message: '',
      status: ''
    }
  }
}
