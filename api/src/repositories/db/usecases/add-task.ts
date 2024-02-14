import { Task } from '@prisma/client'
import { CreateTaskDTO } from '../../../models/dtos/tasks/task-dto'

export interface AddDbTaskRepository {
  add: (taskData: CreateTaskDTO) => Promise<Task>
}
