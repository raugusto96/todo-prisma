import { CreateTaskDTO } from '../../models/dtos'
import { Task } from '../../models/usecases'
import { CreateTaskService } from './protocols/add-task-service'

export class AddTaskService implements CreateTaskService {
  async add(task: CreateTaskDTO): Promise<Task> {
    return {
      id: '',
      ...task
    }
  }
}
