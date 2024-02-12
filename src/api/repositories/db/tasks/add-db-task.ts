import { CreateTaskDTO } from '../../../models/dtos'
import { Task } from '../../../models/usecases'
import { AddDbTaskRepository } from '../usecases/add-task'

export class AddTaskDbRepository implements AddDbTaskRepository {
  add: (task: CreateTaskDTO) => Promise<Task>
}
