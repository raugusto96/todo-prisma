import { Task } from '../../../models/usecases/tasks/task-usecase'
import { CreateTaskDTO } from '../../../models/dtos/tasks/task-dto'

export interface AddDbTaskRepository {
  add: (taskData: CreateTaskDTO) => Promise<Task>
}
